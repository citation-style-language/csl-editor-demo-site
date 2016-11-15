


// debug provides:
//
// 1. Logging which won't crash on browsers that don't support 'console'
// 2. Assertions

define('src/debug',[],function () {
	var log, time, timeEnd;

	// TODO: Probably best to change to use console.log(), console.time() and console.timeEnd()
	//       throughout code instead of debug.log(), etc...
	//       Reason: Using console.log() will show the original line number where it was called
	//       from in the Chrome console instead of the line number here in debug.js.
	if (typeof(console) === "undefined" && typeof(window) !== "undefined") {
		log = function () {};
		time = function () {};
		timeEnd = function () {};
	} else {
		log = function (message) { console.log(message); };
		time = function (message) { console.time(message); };
		timeEnd = function (message) { console.timeEnd(message); };
	}

	// Throws an error if actual !== expected and puts the current call stack
	// into the error description
	var assertEqual = function (actual, expected) {
		if (actual !== expected) {
			try {
				throw new Error("Assert fail: " + actual + " !== " + expected);
			} catch (err) {
				// put stack trace message in JSON - hack to access from window.onerror
				err.message = err.stack;
				throw err;
			}
		}
	};

	// Throws an error if !assertation and puts the current call stack
	// into the error description
	var assert = function (assertion) {
		var err;
		if (!assertion) {
			try {
				throw new Error("Assert fail");
			} catch (err) {
				// put stack trace message in JSON - hack to access from window.onerror
				err.message = err.stack;
				throw err;
			}
		}
	};

	return {
		assert : assert,
		assertEqual : assertEqual,
		log : log,
		time : time,
		timeEnd : timeEnd
	};
});



// Wraps CSL node JSON objects and provides helpful functions to access thier attributes
//
// # CSL node JSON schema
//
// The CSL node JSON as used throughout the code has the following
// members, and is one-to-one map of the XML tree in the corresponding *.csl file:
//
// - name       - string, name of the XML node e.g. 'text', 'macro', 'layout', 'style'
// - textValue  - string, text contents of a childless XML node. e.g. the 'style/info/title' node
// - attributes - list, each element corresponds to an XML attribute and has the following members:
//     - key     - string
//     - value   - string
//     - enabled - boolean (optional, default is true), should the attribute be used in the output CSL
// - children   - list of child nodes, all of which follow this schema
// - cslId      - the zero-based index of this node within the whole tree, when traversed depth first

define('src/CslNode',['src/debug'], function (debug) {
	// CSLEDIT_CslNode constructor
	//
	// You can pass in a valid CSL node object, e.g.
	//     var node = new CSLEDIT_CslNode({
	//         name : "macro",
	//         attributes : [
	//             {
	//                 key : "name",
	//                 value : "author-short"
	//             }
	//         ],
	//         children : [],
	//         cslId : 54
	//     });
	//
	// or pass separate arguments, e.g.
	//     var node2 = new CSLEDIT_CslNode("macro", [{key: "name", value: "author-short"], [], 54);
	//
	// both are equivalent
	var CSLEDIT_CslNode = function (nameOrNode, attributes, children, cslId) {
		debug.assert(this instanceof CSLEDIT_CslNode);

		if (nameOrNode.hasOwnProperty("name")) {
			this._copy(nameOrNode);
			return;
		}

		this.name = nameOrNode;
		this.attributes = attributes || [];
		this.children = children || [];
		if (typeof cslId === "undefined") {
			this.cslId = -1;
		} else {
			this.cslId = cslId;
		}
	};

	// Creates a shallow copy of source
	CSLEDIT_CslNode.prototype._copy = function (source) {
		this.name = source.name;
		this.attributes = source.attributes;
		this.children = source.children;
		this.textValue = source.textValue;
		this.cslId = source.cslId;
	};

	// Set the given attribute to the given value
	CSLEDIT_CslNode.prototype.setAttr = function (attributeName, value) {
		var index;

		index = this._indexOfAttr(attributeName);

		if (index === -1) {
			this.attributes.push({key: attributeName, value: value, enabled: true});
		} else {
			this.attributes[index].value = value;
			this.attributes[index].enabled = true;
		}
	};

	// Enable the given attribute
	//
	// The reason to store the enabled state is so that the editor can remember the previous
	// value after the user either:
	//
	// 1. Clicks 'Disable'
	// 2. Changes the mode (CSLEDIT_schema.choices) of the node to one where a previously enabled
	//    attribute is no longer present
	//
	// In both these cases, the user can now change their mind and have the old attribute retained
	CSLEDIT_CslNode.prototype.setAttrEnabled = function (attributeName, enabled, defaultValue) {
		var index;

		defaultValue = defaultValue || "";

		index = this._indexOfAttr(attributeName);
		if (index === -1) {
			if (enabled) {
				this.attributes.push({
					key: attributeName,
					value: defaultValue,
					enabled: true
				});
				return;
			} else {
				// a non-existant attribute is equivalent to a disabled one
				return;
			}
		}
		this.attributes[index].enabled = enabled;
	};

	// Is the attribute with the given name present
	CSLEDIT_CslNode.prototype.hasAttr = function (attributeName) {
		var index = this._indexOfAttr(attributeName);
		return index !== -1 && this.attributes[index].enabled;
	};

	// Gets the attribute with the given attribute name
	CSLEDIT_CslNode.prototype.getAttr = function (attributeName) {
		var index;

		index = this._indexOfAttr(attributeName);

		if (index === -1 ||
				(this.attributes[index].hasOwnProperty('enabled') && !this.attributes[index].enabled)) {
			return "";
		} else {
			return this.attributes[index].value;
		}
	};

	// private function, returns -1 if can't find the attribute
	CSLEDIT_CslNode.prototype._indexOfAttr = function (attributeName) {
		var index = -1;
		$.each(this.attributes, function (i, attr) {
			if (attr.key === attributeName) {
				index = i;
				return false;
			}
		});
		return index;
	};

	return CSLEDIT_CslNode;
});



// Hard-coded configuration data used to populate the UI

define('src/uiConfig',
		[	'src/CslNode',
			'src/debug'
		], function (
			CSLEDIT_CslNode,
			debug
		) {
	var CSLEDIT_uiConfig = {};

	// Defines the contents of the Visual Editor tree view
	CSLEDIT_uiConfig.smartTreeSchema = [
		{
			id : "info",
			name : "Style Info",
			// TODO: Fix src/SmartTree so that the locale node can be added.
			//       At present there's a bug where adding a locale node doesn't
			//       put it in the tree because it's a child of the "style" node, and
			//       therefore part of that range.
			//       (note - not an issue for 'style/info' since the bug only affects
			//       nodes added during a session, and 'style/info' is a required node)
			//headingNodePath : "style",
			//headingNodePossibleChildren : {
			//	"locale" : "one"
			//},
			//headingNodeShowPropertyPanel : false,
			nodePaths : ["style/info", "style", /* "style/locale" */],
			macroLinks : false,
			leafNodes : ["info", "style"]
		},
		{
			id : "citations",
			name : "Inline Citations",
			headingNodePath : "style/citation",
			headingNodePossibleChildren : {
				"layout" : "one",
				"sort" : "one"
			},
			nodePaths : ["style/citation/layout", "style/citation/sort"],
			//leafNodes : ["sort"],
			macroLinks : true
		},
		{
			id : "bibliography",
			name : "Bibliography",
			headingNodePath : "style/bibliography",
			headingNodePossibleChildren : {
				"layout" : "one",
				"sort" : "one"
			},
			nodePaths : ["style/bibliography/layout", "style/bibliography/sort"],
			//leafNodes : ["sort"],
			macroLinks : true
		},
		{
			id : "macro",
			name : "Macros",
			headingNodePath : "style",
			headingNodePossibleChildren : {
				"macro" : "zeroOrMore"
			},
			headingNodeShowPropertyPanel : false,
			nodePaths : ["style/macro"],
			macroLinks : true,
		},
		{
			id : "locale",
			name : "Advanced",
			headingNodePath : "",
			macroLinks : false,
			nodePaths : ["style"]
		}
	];

	// If creating an empty node, populate with these attributes
	CSLEDIT_uiConfig.defaultAttributes = {
		"text" : {
			"value" : ""
		},
		"if" : {
			"type" : "article",
			"match" : "any"
		},
		"else-if" : {
			"type" : "article",
			"match" : "any"
		},
		"date" : {
			"form" : "text",
			"date-parts" : "year-month-day",
			"variable" : "issued"
		},
		"date-part" : {
			"name" : "year"
		},
		"key" : {
			"variable" : "author"
		}
	};

	// If creating an empty node, populate with these children
	CSLEDIT_uiConfig.defaultChildren = {
		"bibliography" : [
			{
				name: "layout",
				attributes: [],
				children: []
			}
		]
	};

	// Defines the different fieldsets within the genericPropertyPanel
	CSLEDIT_uiConfig.attributeGroups = {
		"Text formatting" : [
			"fontFormattingControls",
			"display",
			"text-case"
		],
		"Affixes" : [
			"prefix",
			"suffix",
			"delimiter"
		]
	};

	// For displaying the example metadata in Search by Example page
	CSLEDIT_uiConfig.fieldOrder = [
		"type",
		"title",
		"author",
		"editor",
		"translator",
		"issued",
		"container-title",
		"volume",
		"issue",
		"chapter",
		"page",
		"number-of-pages",
		"publisher"
	];

	// Add classes to the <input> or <select> elements for various attributes
	CSLEDIT_uiConfig.attributeClasses = {
		"delimiter" : "short",
		"display" : "exampleClass1 exampleClass2"
	};

	// The icons to use in the Visual Editor tree view
	CSLEDIT_uiConfig.nodeIcons = {
		"default" : "external/famfamfam-icons/bullet_black.png",
		"text" : "external/famfamfam-icons/style.png",
		"macro" : "external/famfamfam-icons/brick.png",
		"info" : "external/famfamfam-icons/information.png",
		"choose" : "external/fugue-icons/question-white.png",
		"date" : "external/famfamfam-icons/date.png",
		"style" : "external/famfamfam-icons/cog.png",
		"citation" : "external/famfamfam-icons/page_white_edit.png",
		"bibliography" : "external/famfamfam-icons/text_list_numbers.png",
		"sort" : "external/fugue-icons/sort-alphabet.png",
		"number" : "external/fugue-icons/edit-number.png",
		"layout" : "external/famfamfam-icons/page_white_stack.png",
		"group" : "external/famfamfam-icons/page_white_stack.png"
	};

	// Returns the given string with the first letter capitalised
	CSLEDIT_uiConfig.capitaliseFirstLetter = function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	// Returns the display name to use to represent the given node
	// in the UI
	CSLEDIT_uiConfig.displayNameFromNode = function (node) {
		if (node.name in CSLEDIT_uiConfig.displayNames) {
			return CSLEDIT_uiConfig.displayNames[node.name](node);
		}

		// fall back to using the node name
		return CSLEDIT_uiConfig.capitaliseFirstLetter(node.name);
	};

	// generates display names for 'if' and 'else-if' tree view nodes
	//   e.g. If article OR book
	CSLEDIT_uiConfig.conditionalDisplayName = function (node) {
		var displayName = "",
			elideLimit = 30,
			match,
			terms = [],
			join = "";

		match = CSLEDIT_schema.attributes("choose/if").match.defaultValue;
		if (match === "") {
			match = "all"; // becuase it's not specified in MLZ schema, TODO: ask Frank
		}

		$.each(node.attributes, function (i, attribute) {
			if (attribute.enabled) {
				if (attribute.key === "match") {
					match = attribute.value;
				} else {
					$.each(attribute.value.split(" "), function (i, val) {
						terms.push(val);
					});
				}
			}
		});

		if (node.name === "if") {
			displayName = "If ";
		} else {
			displayName = "Else-If ";
		}

		if (match === "any") {
			displayName += terms.join(" OR ");
		} else if (match === "all") {
			displayName += terms.join(" AND ");
		} else if (match === "none") {
			displayName += "NOT (" + terms.join(" OR ") + ")";
		} else {
		debug.assert(false);
		}

		if (displayName.length > elideLimit) {
			displayName = displayName.substr(0, elideLimit - 3) + "...";
		}

		return displayName;
	};

	// A map of node names to the function used to generate its display name
	CSLEDIT_uiConfig.displayNames = {
		"macro" : function (node) {
			return "Macro: " + new CSLEDIT_CslNode(node).getAttr("name");
		},
		"text" : function (node) {
			var cslNode = new CSLEDIT_CslNode(node),
				macro = cslNode.getAttr("macro"),
				term = cslNode.getAttr("term"),
				value = cslNode.getAttr("value"),
				variable = cslNode.getAttr("variable");

			if (macro !== "") {
				return macro + " (macro)";
			} else if (term !== "") {
				return term + " (term)";
			} else if (value !== "") {
				return value + " (value)";
			} else if (variable !== "") {
				return variable + " (variable)";
			}
			return "Text";
		},
		"label" : function (node) {
			var variable = new CSLEDIT_CslNode(node).getAttr("variable"),
				displayName = "Label";

			if (variable !== "") {
				displayName = variable + " (label)";
			}
			return displayName;
		},
		"number" : function (node) {
			var variable = new CSLEDIT_CslNode(node).getAttr("variable");

			if (variable !== "") {
				return variable;
			}
			return "Number";
		},
		"if" : CSLEDIT_uiConfig.conditionalDisplayName,
		"else-if" : CSLEDIT_uiConfig.conditionalDisplayName,
		"citation" : function () {
			return "Inline Citations";
		},
		"bibliography" : function () {
			return "Bibliography";
		},
		"choose" : function () {
			return "Conditional";
		},
		"style" : function () {
			return "Global Formatting Options";
		},
		"key" : function (node) {
			var variable = new CSLEDIT_CslNode(node).getAttr("variable"),
				macro = new CSLEDIT_CslNode(node).getAttr("macro");

			if (macro !== "") {
				return "Sort by " + macro;
			} else if (variable !== "") {
				return "Sort by " + variable;
			}

			return "Sort key";
		}
	};
	return CSLEDIT_uiConfig;
});



// Iterates through a tree in depth first order
//
// Each node of the tree must contain a children array containing it's child nodes
// 
// Can retrieve the parent node of each child in the tree

define('src/Iterator',['src/debug'], function (debug) {
	// Creates an iterator
	var CSLEDIT_Iterator = function (rootNode) {
		debug.assert(this instanceof CSLEDIT_Iterator);

		this.rootNode = rootNode;
		this.nodeStack = [];
		this.finished = false;
		this.nextNode = null;
	};

	// Returns the next node in the depth first traversal
	CSLEDIT_Iterator.prototype.next = function () {
		var topNode,
			nextNode,
			currentNode;

		nextNode = this.nextNode;
		this.nextNode = null;

		// used to implement hasNext
		if (nextNode !== null) {
			return nextNode;
		}

		if (this.finished) {
			return null;
		}

		if (this.nodeStack.length === 0) {
			// start
			this.nodeStack.push({ node : this.rootNode, childIndex : -1 });
			return this.nodeStack[0].node;
		}

		topNode = this.nodeStack[this.nodeStack.length - 1];
		topNode.childIndex++;

		if (topNode.childIndex < topNode.node.children.length) {
			nextNode = topNode.node.children[topNode.childIndex];
			this.nodeStack.push({ node : nextNode, childIndex : -1 });
			return nextNode;
		} else {
			this.nodeStack.pop();
			if (this.nodeStack.length === 0) {
				this.finished = true;
			}
			return this.next();
		}
	};

	// Returns true if there's another node left, otherwise returns false
	CSLEDIT_Iterator.prototype.hasNext = function () {
		if (this.nextNode !== null) {
			return true;
		} else {
			if (this.finished) {
				return false;
			} else {
				this.nextNode = this.next();
				return this.nextNode !== null;
			}
		}
	};

	// Returns the parent of the current node
	//
	// Note: after calling next(), you need to call this function before
	//       hasNext(), otherwise this result will be the parent of the
	//       next next() node.
	CSLEDIT_Iterator.prototype.parent = function () {
		if (this.nodeStack.length > 1) {
			return this.nodeStack[this.nodeStack.length - 2].node;
		} else {
			return null;
		}
	};

	// Returns the node stack at the current node
	//
	// Note: after calling next(), you need to call this function before
	//       hasNext(), otherwise this result will be the stack of the
	//       next next() node.
	CSLEDIT_Iterator.prototype.stack = function () {
		var stack = [];

		$.each(this.nodeStack, function(i, node) {
			stack.push(node.node);
		});
		
		return stack;
	};

	return CSLEDIT_Iterator;
});



// Miscellaneous functions for manipulating XML (e.g. stripping tags)

define('src/xmlUtility',[],function () {
	// Returns the given xml, but with all elements *not* within the
	// supportedTags list removed
	//
	// This removes both the tags and the contents within
	var stripUnsupportedTagsAndContents = function (html, supportedTags) {
		var element;

		element = $("<div/>").html(html);
		element.find("*").not(supportedTags.join(", ")).remove();

		return element.html();
	};

	// Returns the given xml, but with all tags *not* within the
	// supportedTags list removed, the contents of the tags are kept
	var stripUnsupportedTags = function (xml, supportedTags) {
		var regExpText = "</?(?:" + supportedTags.join("|") + ")[^<>]*>|(</?[^<>]*>)",
			stripUnsupportedTags,
			match,
			matches = [];

		// will only contain a captured group for unsupported tags
		stripUnsupportedTags = new RegExp(regExpText, "g");

		match = stripUnsupportedTags.exec(xml);
		while (match !== null) {
			if (match.length > 1 && typeof match[1] !== "undefined") {
				matches.push(match[1]);
			}
			match = stripUnsupportedTags.exec(xml);
		}

		$.each(matches, function (index, value) {
			xml = xml.replace(value, "");
		});

		return xml;
	};

	// Remove all attributes from all the matching tags within the given xml
	// and return the result
	var stripAttributesFromTags = function (xml, tags) {
		var regExp = new RegExp("<(" + tags.join("|") + ")[^<>]*>", "g");

		// remove any attributes the tags may have
		xml = xml.replace(regExp, "<$1>");
		return xml;
	};

	// Strip all single line comments from the given xml and return the result
	var stripComments = function (xml) {
		return xml.replace(/<!--[\s\S]*?-->/g, "");
	};

	// Remove certain tags from the given input and return the result
	var cleanInput = function (input, allowCharacters) {
		var supportedTags = [ 'b', 'i', 'u', 'sup', 'sub' ];

		// we want the contents of these but not the actual tags
		var invisibleTags = [ 'p', 'span', 'div', 'second-field-align', 'table', 'tr', 'td', 'tbody' ]; 

		input = stripComments(input);
		input = stripUnsupportedTagsAndContents(input, supportedTags.concat(invisibleTags));
		input = stripUnsupportedTags(input, supportedTags);
		input = stripAttributesFromTags(input, supportedTags);
		
		if (typeof(allowCharacters) === "undefined" || !allowCharacters) {
			input = input.replace(/&nbsp;/g, " ");
			input = input.replace("\n", "");
			input = input.replace(/&amp;/g, "&#38;");
			input = input.replace(/&lt;/g, "&#60;");
			input = input.replace(/&gt;/g, "&#62;");
			input = input.replace(/&quot;/g, "&#34;");
			input = $.trim(input);
		}

		if (input[input.length - 1] === " ") {
			input = $.trim(input) + "&nbsp;";
		}

		return input;
	};

	// Escape characters within text for html and return the result
	var htmlEscape = function (text) {
		var escaped = text;

		escaped = escaped.replace(/&/g, "&amp;");
		escaped = escaped.replace(/</g, "&lt;");
		escaped = escaped.replace(/>/g, "&gt;");
		escaped = escaped.replace(/"/g, "&quot;");

		return escaped;
	};

	return {
		stripUnsupportedTagsAndContents : stripUnsupportedTagsAndContents,
		stripUnsupportedTags : stripUnsupportedTags,
		stripAttributesFromTags : stripAttributesFromTags,
		stripComments : stripComments,
		cleanInput : cleanInput,
		htmlEscape : htmlEscape
	};	
});




// This converts between the following two formats:
//
// 1. A *.csl text file.
// 2. A JSON object as used by get() and set() in src/Data

define('src/cslParser',['src/xmlUtility', 'src/debug'], function (CSLEDIT_xmlUtility, debug) {

	// Recursively generates and returns a CSL style JSON node, converted from the given xmlNode
	//
	// nodeIndex.index is the depth-first traversal position of CSL node
	// it must start at 0, and it will be returned with nodeIndex.index = number of nodes - 1
	var jsonNodeFromXml = function (xmlNode, nodeIndex) {
		var children = [],
			index,
			jsonData,
			childNode,
			textValue,
			ELEMENT_NODE,
			TEXT_NODE,
			thisNodeIndex = nodeIndex.index;

		ELEMENT_NODE = 1;
		TEXT_NODE = 3;
		
		for (index = 0; index < xmlNode.childNodes.length; index++) {
			childNode = xmlNode.childNodes[index];

			//to be compatible with all Chrome versions and Firefox versions,
			//we have to combine both conditions: undefined, null
			if (childNode.nodeType === ELEMENT_NODE) {
				nodeIndex.index++;
				children.push(jsonNodeFromXml(xmlNode.childNodes[index], nodeIndex));
			} else {
				if (childNode.nodeType === TEXT_NODE && typeof childNode.data !== "undefined" &&
						childNode.data.trim() !== "") {
					textValue = childNode.data;
				}
			}
		}

		debug.assert(typeof textValue === "undefined" || children.length === 0, "textValue = " + textValue + " children.length = " + children.length);

		var attributesList = [];
		var thisNodeData;
		
		if (xmlNode.attributes !== null && xmlNode.attributes.length > 0) {
			for (index = 0; index < xmlNode.attributes.length; index++) {
				attributesList.push(
					{
						key : xmlNode.attributes.item(index).nodeName,
						value : xmlNode.attributes.item(index).nodeValue,
						enabled : true
					});
			}
		}

		thisNodeData = {
				name : xmlNode.nodeName,
				attributes : attributesList,
				cslId : thisNodeIndex,
				children : children
			};

		if (typeof textValue !== "undefined") {
			thisNodeData.textValue = textValue;
		}

		return thisNodeData;
	};

	var generateIndent = function (indentAmount) {
		var index,
			result = "";
		for (index = 0; index < indentAmount; index++) {
			result += "  ";
		}
		return result;
	};

	// Recursively generates and returns an XML string from the given jsonData
	var xmlNodeFromJson = function (jsonData, indent, fullClosingTags) {
		var attributesString = "",
			xmlString,
			index,
			innerString;

		if (jsonData.attributes.length > 0) {
			for (index = 0; index < jsonData.attributes.length; index++) {
				if (jsonData.attributes[index].enabled) {
					// TODO: the key probably shouldn't have characters needing escaping anyway,
					//       should not allow to input them in the first place
					attributesString += " " + 
						CSLEDIT_xmlUtility.htmlEscape(jsonData.attributes[index].key) + '="' + 
						CSLEDIT_xmlUtility.htmlEscape(jsonData.attributes[index].value) + '"';
				}
			}
		}
		xmlString = generateIndent(indent);

		if (typeof jsonData.textValue !== "undefined") {
			xmlString += "<" + jsonData.name + attributesString + ">";
			xmlString += CSLEDIT_xmlUtility.htmlEscape(jsonData.textValue) + "</" +
				CSLEDIT_xmlUtility.htmlEscape(jsonData.name) + ">\n";
		} else {
			xmlString += "<" + jsonData.name + attributesString;
			innerString = "";
			if (typeof jsonData.children !== "undefined" && jsonData.children.length > 0) {
				for (index = 0; index < jsonData.children.length; index++) {
					innerString += xmlNodeFromJson(jsonData.children[index], indent + 1, fullClosingTags);
				}
			}
			if (innerString !== "") {
				xmlString += ">\n" + innerString + generateIndent(indent) + "</" + CSLEDIT_xmlUtility.htmlEscape(jsonData.name) + ">\n";
			} else if (fullClosingTags) {
				xmlString += "></" + jsonData.name + ">\n";
			} else {
				xmlString += "/>\n";
			}
		}

		return xmlString;
	};
	
	// Returns a JSON representation of the CSL 'style' node in the given xmlData string
	var cslDataFromCslCode = function (xmlData) {
		var parser = new DOMParser(),
			xmlDoc = parser.parseFromString(xmlData, "application/xml"),
			errors;

		errors = xmlDoc.getElementsByTagName('parsererror');
		debug.assertEqual(errors.length, 0, "xml parser error");

		var styleNode = xmlDoc.childNodes[0];
		debug.assertEqual(styleNode.nodeName, "style", "Invalid style - no style node");

		var jsonData = jsonNodeFromXml(styleNode, { index: 0 });
	
		return jsonData;
	};

	// Returns a CSL style code string
	//
	// - jsonData        - the CSL 'style' node JSON representation
	// - comment         - an optional comment string to insert after the 'style' element
	// - fullClosingTags - use separate closing tags (e.g. <link></link> instead of <link/>)
	var cslCodeFromCslData = function (jsonData, comment /* optional */, fullClosingTags /* optional */) {
		var cslXml = '<?xml version="1.0" encoding="utf-8"?>\n',
			lines,
			lineIndex;
		
		cslXml += xmlNodeFromJson(jsonData, 0, fullClosingTags);

		if (typeof(comment) === "string") {
			lines = cslXml.split("\n");

			// XML comment needs to go on line no. 3, after the XML declaration and style start tag
			lines.splice(2, 0, "  <!-- " + comment + " -->");

			cslXml = lines.join("\n");
		}
		
		return cslXml;
	};

	// public:
	return {
		cslDataFromCslCode : cslDataFromCslCode,
		cslCodeFromCslData : cslCodeFromCslData
	};
});



// Provides persistent key/value storage if localStorage is available,
// otherwise falls back to a simple session based storage
//
// Triggers a callback when getItem() is called if the localStorage value has been
// changed since the last time it was read during this session
//
// The following functions work just like the localStorage equivalents:
//
// - getItem
// - setItem
// - removeItem
// - clear
//
// Additionally:
// 
// - onDataInconsistency - this allows setting a callback function which gets
//                         called whenever an inconsistency between persistent
//                         and session storage is detected

define('src/storage',['src/debug'], function (debug) {
	var CSLEDIT_Storage = function (useLocalStorageIfAvailable) {
		var simpleStorage = {}, // duplicates the data in localStorage to use to verify that the
		                        // localStorage hasn't been changed in another tab, or acts as
								// the only storage if localStorage isn't available
			simpleStorageAPI,
			localStorageAPI,
			finalAPI,
			outOfSyncCallback;

		var outOfSync = function () {
			debug.log("CSLEDIT_storage out of sync with local storage");
			if (typeof(outOfSyncCallback) === "function") {
				outOfSyncCallback();
			}
		};

		simpleStorageAPI = {
			getItem : function (key) {
				if (simpleStorage.hasOwnProperty(key)) {
					return simpleStorage[key];
				} else {
					return null;
				}
			},
			setItem : function (key, value) {
				simpleStorage[key] = value;
			},
			removeItem : function (key) {
				delete simpleStorage[key];
			},
			clear : function () {
				simpleStorage = {};
			}
		};

		localStorageAPI = {
			getItem : function (key) {
				return localStorage.getItem(key);
			},
			setItem : function (key, value) {
				localStorage.setItem(key, value);
			},
			removeItem : function (key) {
				localStorage.removeItem(key);
			},
			clear : function () {
				localStorage.clear();
			}
		};

		if (typeof(localStorage) === "undefined" || localStorage === null ||
				useLocalStorageIfAvailable !== true) {
			debug.log("Not using localStorage");
			finalAPI = simpleStorageAPI;
		} else {
			// use local storage, with simple storage to verify that nothing has changed
			finalAPI = {
				getItem : function (key) {
					var simpleValue,
						localValue;
					
					simpleValue = simpleStorageAPI.getItem(key);
					localValue = localStorageAPI.getItem(key);

					if (simpleValue === null && localValue !== null) {
						simpleStorageAPI.setItem(key, localValue);
					} else if (simpleValue !== localValue) {
						outOfSync();
					}

					return localValue;
				},
				setItem : function (key, value) {
					simpleStorageAPI.setItem(key, value);
					localStorageAPI.setItem(key, value);
				},
				removeItem : function (key) {
					simpleStorageAPI.removeItem(key);
					localStorageAPI.removeItem(key);
				},
				clear : function () {
					simpleStorageAPI.clear();
					localStorageAPI.clear();
				},
				recreateLocalStorage : function (key) {
					localStorageAPI.clear();
					$.each(simpleStorage, function (key, value) {
						localStorageAPI.setItem(key, value);
					});
				}
			};
		}
		
		finalAPI.getItemJson = function (key) {
			var data = finalAPI.getItem(key);
			if (data === null) {
				return null;
			} else {
				try {
					return JSON.parse(data);
				} catch (err) {
					return null;
				}
			}
		};

		finalAPI.onDataInconsistency = function (callback) {
			outOfSyncCallback = callback;
		};

		return finalAPI;
	};

	var CSLEDIT_storage = new CSLEDIT_Storage(true);

	return CSLEDIT_storage;
});



// Hard-coded data for the example citations

define('src/exampleData',[],function () {
	var CSLEDIT_exampleData = {};

	// Possible options to apply to each reference in each inline citation
	CSLEDIT_exampleData.additionalOptions = [
		{
			"description" : "Normal citation",
			"options" : {}
		},
		{
			"description" : "Locator: Pages 244-255",
			"options" : {
				"locator" : "244-252",
				"label" : "page"
			}
		},
		{
			"description" : "Locator: Chapter 5",
			"options" : {
				"locator" : "5",
				"label" : "chapter"
			}
		},
		{
			"description" : "Author only",
			"options" : {
				"author-only" : true
			}
		},
		{
			"description" : "Suppress author",
			"options" : {
				"suppress-author" : true
			}
		}
	];

	// Hard coded default list of csl-data.json references used
	// in the editor and search pages
	CSLEDIT_exampleData.jsonDocumentList = [
	{
		"type": "article-journal",
		"title": "Virgo: a laser interferometer to detect gravitational waves",
		"container-title": "Journal of Instrumentation",
		"page": "P03012-P03012",
		"volume": "7",
		"issue": "03",
		"abstract": "This paper presents a complete description of Virgo, the French-Italian gravitational wave detector.\n The detector, built at Cascina, near Pisa (Italy), is a very large Michelson interferometer, with 3\n km-long arms. In this paper, following a presentation of the physics requirements, leading to the\n specifications for the construction of the detector, a detailed description of all its different\n elements is given. These include civil engineering infrastructures, a huge ultra-high vacuum (UHV)\n chamber (about 6000 cubic metres), all of the optical components, including high quality mirrors and\n their seismic isolating suspensions, all of the electronics required to control the interferometer\n and for signal detection. The expected performances of these different elements are given, leading\n to an overall sensitivity curve as a function of the incoming gravitational wave frequency. This\n description represents the detector as built and used in the first data-taking runs. Improvements in\n different parts have been and continue to be performed, leading to better sensitivities. These will\n be detailed in a forthcoming paper.",
		"DOI": "10.1088/1748-0221/7/03/P03012",
		"ISSN": "1748-0221",
		"journalAbbreviation": "J. Instrum.",
		"language": "en-US",
		"author": [
			{
				"family": "Accadia",
				"given": "T"
			},
			{
				"family": "Acernese",
				"given": "F"
			},
			{
				"family": "Alshourbagy",
				"given": "M"
			},
			{
				"family": "Amico",
				"given": "P"
			},
			{
				"family": "Antonucci",
				"given": "F"
			},
			{
				"family": "Aoudia",
				"given": "S"
			},
			{
				"family": "Arnaud",
				"given": "N"
			},
			{
				"family": "Arnault",
				"given": "C"
			},
			{
				"family": "Arun",
				"given": "K G"
			},
			{
				"family": "Astone",
				"given": "P"
			},
			{
				"family": "Avino",
				"given": "S"
			},
			{
				"family": "Babusci",
				"given": "D"
			},
			{
				"family": "Ballardin",
				"given": "G"
			},
			{
				"family": "Barone",
				"given": "F"
			},
			{
				"family": "Barrand",
				"given": "G"
			},
			{
				"family": "Barsotti",
				"given": "L"
			},
			{
				"family": "Barsuglia",
				"given": "M"
			},
			{
				"family": "Basti",
				"given": "A"
			},
			{
				"family": "Bauer",
				"given": "Th S"
			},
			{
				"family": "Beauville",
				"given": "F"
			},
			{
				"family": "Bebronne",
				"given": "M"
			},
			{
				"family": "Bejger",
				"given": "M"
			},
			{
				"family": "Beker",
				"given": "M G"
			},
			{
				"family": "Bellachia",
				"given": "F"
			},
			{
				"family": "Belletoile",
				"given": "A"
			},
			{
				"family": "Beney",
				"given": "J L"
			},
			{
				"family": "Bernardini",
				"given": "M"
			},
			{
				"family": "Bigotta",
				"given": "S"
			},
			{
				"family": "Bilhaut",
				"given": "R"
			},
			{
				"family": "Birindelli",
				"given": "S"
			},
			{
				"family": "Bitossi",
				"given": "M"
			},
			{
				"family": "Bizouard",
				"given": "M A"
			},
			{
				"family": "Blom",
				"given": "M"
			},
			{
				"family": "Boccara",
				"given": "C"
			},
			{
				"family": "Boget",
				"given": "D"
			},
			{
				"family": "Bondu",
				"given": "F"
			},
			{
				"family": "Bonelli",
				"given": "L"
			},
			{
				"family": "Bonnand",
				"given": "R"
			},
			{
				"family": "Boschi",
				"given": "V"
			},
			{
				"family": "Bosi",
				"given": "L"
			},
			{
				"family": "Bouedo",
				"given": "T"
			},
			{
				"family": "Bouhou",
				"given": "B"
			},
			{
				"family": "Bozzi",
				"given": "A"
			},
			{
				"family": "Bracci",
				"given": "L"
			},
			{
				"family": "Braccini",
				"given": "S"
			},
			{
				"family": "Bradaschia",
				"given": "C"
			},
			{
				"family": "Branchesi",
				"given": "M"
			},
			{
				"family": "Briant",
				"given": "T"
			},
			{
				"family": "Brillet",
				"given": "A"
			},
			{
				"family": "Brisson",
				"given": "V"
			},
			{
				"family": "Brocco",
				"given": "L"
			},
			{
				"family": "Bulik",
				"given": "T"
			},
			{
				"family": "Bulten",
				"given": "H J"
			},
			{
				"family": "Buskulic",
				"given": "D"
			},
			{
				"family": "Buy",
				"given": "C"
			},
			{
				"family": "Cagnoli",
				"given": "G"
			},
			{
				"family": "Calamai",
				"given": "G"
			},
			{
				"family": "Calloni",
				"given": "E"
			},
			{
				"family": "Campagna",
				"given": "E"
			},
			{
				"family": "Canuel",
				"given": "B"
			},
			{
				"family": "Carbognani",
				"given": "F"
			},
			{
				"family": "Carbone",
				"given": "L"
			},
			{
				"family": "Cavalier",
				"given": "F"
			},
			{
				"family": "Cavalieri",
				"given": "R"
			},
			{
				"family": "Cecchi",
				"given": "R"
			},
			{
				"family": "Cella",
				"given": "G"
			},
			{
				"family": "Cesarini",
				"given": "E"
			},
			{
				"family": "Chassande-Mottin",
				"given": "E"
			},
			{
				"family": "Chatterji",
				"given": "S"
			},
			{
				"family": "Chiche",
				"given": "R"
			},
			{
				"family": "Chincarini",
				"given": "A"
			},
			{
				"family": "Chiummo",
				"given": "A"
			},
			{
				"family": "Christensen",
				"given": "N"
			},
			{
				"family": "Clapson",
				"given": "A C"
			},
			{
				"family": "Cleva",
				"given": "F"
			},
			{
				"family": "Coccia",
				"given": "E"
			},
			{
				"family": "Cohadon",
				"given": "P -F"
			},
			{
				"family": "Colacino",
				"given": "C N"
			},
			{
				"family": "Colas",
				"given": "J"
			},
			{
				"family": "Colla",
				"given": "A"
			},
			{
				"family": "Colombini",
				"given": "M"
			},
			{
				"family": "Conforto",
				"given": "G"
			},
			{
				"family": "Corsi",
				"given": "A"
			},
			{
				"family": "Cortese",
				"given": "S"
			},
			{
				"family": "Cottone",
				"given": "F"
			},
			{
				"family": "Coulon",
				"given": "J -P"
			},
			{
				"family": "Cuoco",
				"given": "E"
			},
			{
				"family": "D'Antonio",
				"given": "S"
			},
			{
				"family": "Daguin",
				"given": "G"
			},
			{
				"family": "Dari",
				"given": "A"
			},
			{
				"family": "Dattilo",
				"given": "V"
			},
			{
				"family": "David",
				"given": "P Y"
			},
			{
				"family": "Davier",
				"given": "M"
			},
			{
				"family": "Day",
				"given": "R"
			},
			{
				"family": "Debreczeni",
				"given": "G"
			},
			{
				"family": "Carolis",
				"given": "G De"
			},
			{
				"family": "Dehamme",
				"given": "M"
			},
			{
				"family": "Fabbro",
				"given": "R Del"
			},
			{
				"family": "Pozzo",
				"given": "W Del"
			},
			{
				"family": "Prete",
				"given": "M del"
			},
			{
				"family": "Derome",
				"given": "L"
			},
			{
				"family": "Rosa",
				"given": "R De"
			},
			{
				"family": "DeSalvo",
				"given": "R"
			},
			{
				"family": "Dialinas",
				"given": "M"
			},
			{
				"family": "Fiore",
				"given": "L Di"
			},
			{
				"family": "Lieto",
				"given": "A Di"
			},
			{
				"family": "Emilio",
				"given": "M Di Paolo"
			},
			{
				"family": "Virgilio",
				"given": "A Di"
			},
			{
				"family": "Dietz",
				"given": "A"
			},
			{
				"family": "Doets",
				"given": "M"
			},
			{
				"family": "Dominici",
				"given": "P"
			},
			{
				"family": "Dominjon",
				"given": "A"
			},
			{
				"family": "Drago",
				"given": "M"
			},
			{
				"family": "Drezen",
				"given": "C"
			},
			{
				"family": "Dujardin",
				"given": "B"
			},
			{
				"family": "Dulach",
				"given": "B"
			},
			{
				"family": "Eder",
				"given": "C"
			},
			{
				"family": "Eleuteri",
				"given": "A"
			},
			{
				"family": "Enard",
				"given": "D"
			},
			{
				"family": "Evans",
				"given": "M"
			},
			{
				"family": "Fabbroni",
				"given": "L"
			},
			{
				"family": "Fafone",
				"given": "V"
			},
			{
				"family": "Fang",
				"given": "H"
			},
			{
				"family": "Ferrante",
				"given": "I"
			},
			{
				"family": "Fidecaro",
				"given": "F"
			},
			{
				"family": "Fiori",
				"given": "I"
			},
			{
				"family": "Flaminio",
				"given": "R"
			},
			{
				"family": "Forest",
				"given": "D"
			},
			{
				"family": "Forte",
				"given": "L A"
			},
			{
				"family": "Fournier",
				"given": "J -D"
			},
			{
				"family": "Fournier",
				"given": "L"
			},
			{
				"family": "Franc",
				"given": "J"
			},
			{
				"family": "Francois",
				"given": "O"
			},
			{
				"family": "Frasca",
				"given": "S"
			},
			{
				"family": "Frasconi",
				"given": "F"
			},
			{
				"family": "Freise",
				"given": "A"
			},
			{
				"family": "Gaddi",
				"given": "A"
			},
			{
				"family": "Galimberti",
				"given": "M"
			},
			{
				"family": "Gammaitoni",
				"given": "L"
			},
			{
				"family": "Ganau",
				"given": "P"
			},
			{
				"family": "Garnier",
				"given": "C"
			},
			{
				"family": "Garufi",
				"given": "F"
			},
			{
				"family": "G\u00e1sp\u00e1r",
				"given": "M E"
			},
			{
				"family": "Gemme",
				"given": "G"
			},
			{
				"family": "Genin",
				"given": "E"
			},
			{
				"family": "Gennai",
				"given": "A"
			},
			{
				"family": "Gennaro",
				"given": "G"
			},
			{
				"family": "Giacobone",
				"given": "L"
			},
			{
				"family": "Giazotto",
				"given": "A"
			},
			{
				"family": "Giordano",
				"given": "G"
			},
			{
				"family": "Giordano",
				"given": "L"
			},
			{
				"family": "Girard",
				"given": "C"
			},
			{
				"family": "Gouaty",
				"given": "R"
			},
			{
				"family": "Grado",
				"given": "A"
			},
			{
				"family": "Granata",
				"given": "M"
			},
			{
				"family": "Granata",
				"given": "V"
			},
			{
				"family": "Grave",
				"given": "X"
			},
			{
				"family": "Greverie",
				"given": "C"
			},
			{
				"family": "Groenstege",
				"given": "H"
			},
			{
				"family": "Guidi",
				"given": "G M"
			},
			{
				"family": "Hamdani",
				"given": "S"
			},
			{
				"family": "Hayau",
				"given": "J -F"
			},
			{
				"family": "Hebri",
				"given": "S"
			},
			{
				"family": "Heidmann",
				"given": "A"
			},
			{
				"family": "Heitmann",
				"given": "H"
			},
			{
				"family": "Hello",
				"given": "P"
			},
			{
				"family": "Hemming",
				"given": "G"
			},
			{
				"family": "Hennes",
				"given": "E"
			},
			{
				"family": "Hermel",
				"given": "R"
			},
			{
				"family": "Heusse",
				"given": "P"
			},
			{
				"family": "Holloway",
				"given": "L"
			},
			{
				"family": "Huet",
				"given": "D"
			},
			{
				"family": "Iannarelli",
				"given": "M"
			},
			{
				"family": "Jaranowski",
				"given": "P"
			},
			{
				"family": "Jehanno",
				"given": "D"
			},
			{
				"family": "Journet",
				"given": "L"
			},
			{
				"family": "Karkar",
				"given": "S"
			},
			{
				"family": "Ketel",
				"given": "T"
			},
			{
				"family": "Voet",
				"given": "H"
			},
			{
				"family": "Kovalik",
				"given": "J"
			},
			{
				"family": "Kowalska",
				"given": "I"
			},
			{
				"family": "Kreckelbergh",
				"given": "S"
			},
			{
				"family": "Krolak",
				"given": "A"
			},
			{
				"family": "Lacotte",
				"given": "J C"
			},
			{
				"family": "Lagrange",
				"given": "B"
			},
			{
				"family": "Penna",
				"given": "P La"
			},
			{
				"family": "Laval",
				"given": "M"
			},
			{
				"family": "Marec",
				"given": "J C Le"
			},
			{
				"family": "Leroy",
				"given": "N"
			},
			{
				"family": "Letendre",
				"given": "N"
			},
			{
				"family": "Li",
				"given": "T G F"
			},
			{
				"family": "Lieunard",
				"given": "B"
			},
			{
				"family": "Liguori",
				"given": "N"
			},
			{
				"family": "Lodygensky",
				"given": "O"
			},
			{
				"family": "Lopez",
				"given": "B"
			},
			{
				"family": "Lorenzini",
				"given": "M"
			},
			{
				"family": "Loriette",
				"given": "V"
			},
			{
				"family": "Losurdo",
				"given": "G"
			},
			{
				"family": "Loupias",
				"given": "M"
			},
			{
				"family": "Mackowski",
				"given": "J M"
			},
			{
				"family": "Maiani",
				"given": "T"
			},
			{
				"family": "Majorana",
				"given": "E"
			},
			{
				"family": "Magazz\u00f9",
				"given": "C"
			},
			{
				"family": "Maksimovic",
				"given": "I"
			},
			{
				"family": "Malvezzi",
				"given": "V"
			},
			{
				"family": "Man",
				"given": "N"
			},
			{
				"family": "Mancini",
				"given": "S"
			},
			{
				"family": "Mansoux",
				"given": "B"
			},
			{
				"family": "Mantovani",
				"given": "M"
			},
			{
				"family": "Marchesoni",
				"given": "F"
			},
			{
				"family": "Marion",
				"given": "F"
			},
			{
				"family": "Marin",
				"given": "P"
			},
			{
				"family": "Marque",
				"given": "J"
			},
			{
				"family": "Martelli",
				"given": "F"
			},
			{
				"family": "Masserot",
				"given": "A"
			},
			{
				"family": "Massonnet",
				"given": "L"
			},
			{
				"family": "Matone",
				"given": "G"
			},
			{
				"family": "Matone",
				"given": "L"
			},
			{
				"family": "Mazzoni",
				"given": "M"
			},
			{
				"family": "Menzinger",
				"given": "F"
			},
			{
				"family": "Michel",
				"given": "C"
			},
			{
				"family": "Milano",
				"given": "L"
			},
			{
				"family": "Minenkov",
				"given": "Y"
			},
			{
				"family": "Mitra",
				"given": "S"
			},
			{
				"family": "Mohan",
				"given": "M"
			},
			{
				"family": "Montorio",
				"given": "J -L"
			},
			{
				"family": "Morand",
				"given": "R"
			},
			{
				"family": "Moreau",
				"given": "F"
			},
			{
				"family": "Moreau",
				"given": "J"
			},
			{
				"family": "Morgado",
				"given": "N"
			},
			{
				"family": "Morgia",
				"given": "A"
			},
			{
				"family": "Mosca",
				"given": "S"
			},
			{
				"family": "Moscatelli",
				"given": "V"
			},
			{
				"family": "Mours",
				"given": "B"
			},
			{
				"family": "Mugnier",
				"given": "P"
			},
			{
				"family": "Mul",
				"given": "F -A"
			},
			{
				"family": "Naticchioni",
				"given": "L"
			},
			{
				"family": "Neri",
				"given": "I"
			},
			{
				"family": "Nocera",
				"given": "F"
			},
			{
				"family": "Pacaud",
				"given": "E"
			},
			{
				"family": "Pagliaroli",
				"given": "G"
			},
			{
				"family": "Pai",
				"given": "A"
			},
			{
				"family": "Palladino",
				"given": "L"
			},
			{
				"family": "Palomba",
				"given": "C"
			},
			{
				"family": "Paoletti",
				"given": "F"
			},
			{
				"family": "Paoletti",
				"given": "R"
			},
			{
				"family": "Paoli",
				"given": "A"
			},
			{
				"family": "Pardi",
				"given": "S"
			},
			{
				"family": "Parguez",
				"given": "G"
			},
			{
				"family": "Parisi",
				"given": "M"
			},
			{
				"family": "Pasqualetti",
				"given": "A"
			},
			{
				"family": "Passaquieti",
				"given": "R"
			},
			{
				"family": "Passuello",
				"given": "D"
			},
			{
				"family": "Perciballi",
				"given": "M"
			},
			{
				"family": "Perniola",
				"given": "B"
			},
			{
				"family": "Persichetti",
				"given": "G"
			},
			{
				"family": "Petit",
				"given": "S"
			},
			{
				"family": "Pichot",
				"given": "M"
			},
			{
				"family": "Piergiovanni",
				"given": "F"
			},
			{
				"family": "Pietka",
				"given": "M"
			},
			{
				"family": "Pignard",
				"given": "R"
			},
			{
				"family": "Pinard",
				"given": "L"
			},
			{
				"family": "Poggiani",
				"given": "R"
			},
			{
				"family": "Popolizio",
				"given": "P"
			},
			{
				"family": "Pradier",
				"given": "T"
			},
			{
				"family": "Prato",
				"given": "M"
			},
			{
				"family": "Prodi",
				"given": "G A"
			},
			{
				"family": "Punturo",
				"given": "M"
			},
			{
				"family": "Puppo",
				"given": "P"
			},
			{
				"family": "Qipiani",
				"given": "K"
			},
			{
				"family": "Rabaste",
				"given": "O"
			},
			{
				"family": "Rabeling",
				"given": "D S"
			},
			{
				"family": "R\u00e1cz",
				"given": "I"
			},
			{
				"family": "Raffaelli",
				"given": "F"
			},
			{
				"family": "Rapagnani",
				"given": "P"
			},
			{
				"family": "Rapisarda",
				"given": "S"
			},
			{
				"family": "Re",
				"given": "V"
			},
			{
				"family": "Reboux",
				"given": "A"
			},
			{
				"family": "Regimbau",
				"given": "T"
			},
			{
				"family": "Reita",
				"given": "V"
			},
			{
				"family": "Remilleux",
				"given": "A"
			},
			{
				"family": "Ricci",
				"given": "F"
			},
			{
				"family": "Ricciardi",
				"given": "I"
			},
			{
				"family": "Richard",
				"given": "F"
			},
			{
				"family": "Ripepe",
				"given": "M"
			},
			{
				"family": "Robinet",
				"given": "F"
			},
			{
				"family": "Rocchi",
				"given": "A"
			},
			{
				"family": "Rolland",
				"given": "L"
			},
			{
				"family": "Romano",
				"given": "R"
			},
			{
				"family": "Rosi\u0144ska",
				"given": "D"
			},
			{
				"family": "Roudier",
				"given": "P"
			},
			{
				"family": "Ruggi",
				"given": "P"
			},
			{
				"family": "Russo",
				"given": "G"
			},
			{
				"family": "Salconi",
				"given": "L"
			},
			{
				"family": "Sannibale",
				"given": "V"
			},
			{
				"family": "Sassolas",
				"given": "B"
			},
			{
				"family": "Sentenac",
				"given": "D"
			},
			{
				"family": "Solimeno",
				"given": "S"
			},
			{
				"family": "Sottile",
				"given": "R"
			},
			{
				"family": "Sperandio",
				"given": "L"
			},
			{
				"family": "Stanga",
				"given": "R"
			},
			{
				"family": "Sturani",
				"given": "R"
			},
			{
				"family": "Swinkels",
				"given": "B"
			},
			{
				"family": "Tacca",
				"given": "M"
			},
			{
				"family": "Taddei",
				"given": "R"
			},
			{
				"family": "Taffarello",
				"given": "L"
			},
			{
				"family": "Tarallo",
				"given": "M"
			},
			{
				"family": "Tissot",
				"given": "S"
			},
			{
				"family": "Toncelli",
				"given": "A"
			},
			{
				"family": "Tonelli",
				"given": "M"
			},
			{
				"family": "Torre",
				"given": "O"
			},
			{
				"family": "Tournefier",
				"given": "E"
			},
			{
				"family": "Travasso",
				"given": "F"
			},
			{
				"family": "Tremola",
				"given": "C"
			},
			{
				"family": "Turri",
				"given": "E"
			},
			{
				"family": "Vajente",
				"given": "G"
			},
			{
				"family": "Brand",
				"given": "J F J van den"
			},
			{
				"family": "Broeck",
				"given": "C Van Den"
			},
			{
				"family": "Putten",
				"given": "S van der"
			},
			{
				"family": "Vasuth",
				"given": "M"
			},
			{
				"family": "Vavoulidis",
				"given": "M"
			},
			{
				"family": "Vedovato",
				"given": "G"
			},
			{
				"family": "Verkindt",
				"given": "D"
			},
			{
				"family": "Vetrano",
				"given": "F"
			},
			{
				"family": "V\u00e9ziant",
				"given": "O"
			},
			{
				"family": "Vicer\u00e9",
				"given": "A"
			},
			{
				"family": "Vinet",
				"given": "J -Y"
			},
			{
				"family": "Vilalte",
				"given": "S"
			},
			{
				"family": "Vitale",
				"given": "S"
			},
			{
				"family": "Vocca",
				"given": "H"
			},
			{
				"family": "Ward",
				"given": "R L"
			},
			{
				"family": "Was",
				"given": "M"
			},
			{
				"family": "Yamamoto",
				"given": "K"
			},
			{
				"family": "Yvert",
				"given": "M"
			},
			{
				"family": "Zendri",
				"given": "J -P"
			},
			{
				"family": "Zhang",
				"given": "Z"
			}
		],
		"issued": {
			"date-parts": [
				[
					"2012",
					3,
					29
				]
			]
		}
	},
	{
		"type": "report",
		"title": "Country clustering in comparative political economy",
		"publisher": "Max-Planck Institute for the Study of Societies",
		"publisher-place": "Cologne",
		"page": "32",
		"genre": "MPIfG Discussion Paper",
		"event-place": "Cologne",
		"URL": "www.mpifg.de/pu/mpifg_dp/dp09-5.pdf",
		"number": "09-5",
		"author": [
			{
				"family": "Ahlquist",
				"given": "John S."
			},
			{
				"family": "Breunig",
				"given": "Christian"
			}
		],
		"issued": {
			"date-parts": [
				[
					2009
				]
			]
		},
		"accessed": {
			"date-parts": [
				[
					2012,
					12,
					15
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Selected non-fictions",
		"publisher": "Viking",
		"publisher-place": "New York",
		"number-of-pages": "559",
		"event-place": "New York",
		"ISBN": "0670849472",
		"language": "en-US",
		"author": [
			{
				"family": "Borges",
				"given": "Jorge Luis"
			}
		],
		"editor": [
			{
				"family": "Weinberger",
				"given": "Eliot"
			}
		],
		"translator": [
			{
				"family": "Allen",
				"given": "Esther"
			},
			{
				"family": "Levine",
				"given": "Suzanne Jill"
			},
			{
				"family": "Weinberger",
				"given": "Eliot"
			}
		],
		"issued": {
			"date-parts": [
				[
					1999
				]
			]
		}
	},
	{
		"type": "article-journal",
		"title": "The varieties of capitalism and hybrid success",
		"container-title": "Comparative Political Studies",
		"page": "307-332",
		"volume": "40",
		"issue": "3",
		"abstract": "The varieties of capitalism literature maintains that advanced capitalist countries whose institutions best fit either the liberal or coordinated market economy types will perform better than countries whose institutions are mixed. This is because hybrids are less likely to yield functionally beneficial institutional complementarities. The authors challenge this assertion. Denmark has performed as well as many purer cases during the 1990s. And Denmark has recently developed a more hybrid form than is generally recognized by (a) increasing the exposure of actors to market forces and (b) decentralizing collective learning and decision making. The institutional complementarities associated with such hybridization have contributed to its success; however, these complementarities are based on institutional heterogeneity rather than homogeneity. This is demonstrated by analyses of three cases: Danish labor markets, vocational training, and industrial policy. The implication of the authors' argument is that the varieties of capitalism theory is logically flawed.",
		"URL": "http://cps.sagepub.com.turing.library.northwestern.edu/content/40/3/307.abstract",
		"DOI": "10.1177/0010414006286542",
		"ISSN": "1552-3829",
		"journalAbbreviation": "Comp. Polit. Stud.",
		"language": "en-US",
		"author": [
			{
				"family": "Campbell",
				"given": "John L."
			},
			{
				"family": "Pedersen",
				"given": "Ove K."
			}
		],
		"issued": {
			"date-parts": [
				[
					"2007",
					3,
					1
				]
			]
		},
		"accessed": {
			"date-parts": [
				[
					2010,
					7,
					26
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Planting green roofs and living walls",
		"publisher": "Timber Press",
		"publisher-place": "Portland, OR",
		"number-of-pages": "328",
		"edition": "2",
		"event-place": "Portland, OR",
		"abstract": "The latest techniques for planting roofs and walls to enhance our buildings and benefit the environment. The green roof industry is booming and the technology changing fast as professionals respond to the unique challenges of each new planting. In this comprehensively updated, fully revised edition of their authoritative reference, Nigel Dunnett and Nol Kingsbury reveal the very latest techniques, materials, and plants, and showcase some spectacular new case studies for the non-professional. Green roofs and walls reduce pollution and runoff, help insulate and reduce the maintenance needs of buildings, contribute to biodiversity, and provide habitats for wildlife. In addition to all this, they are attractive to look at and enhance the quality of life of residents. In Planting Green Roofs and Living Walls, Revised and Updated Edition, the authors describe and illustrate the practical techniques required to design, implement, and maintain a green roof or wall to the highest standards. This informative, up-to-the-minute reference will encourage gardeners everywhere to consider the enormous benefits to be gained from planting on their roofs and walls.",
		"ISBN": "0881929115",
		"language": "en-US",
		"author": [
			{
				"family": "Dunnett",
				"given": "Nigel"
			},
			{
				"family": "Kingsbury",
				"given": "No\u00ebl"
			}
		],
		"issued": {
			"date-parts": [
				[
					2008
				]
			]
		}
	},
	{
		"type": "article-journal",
		"title": "On the electrodynamics of moving bodies",
		"container-title": "Annalen der Physik",
		"page": "1-26",
		"volume": "17",
		"issue": "4",
		"abstract": "General description of special relativity",
		"URL": "http://bavard.fourmilab.ch/etexts/einstein/specrel/specrel.pdf",
		"DOI": "10.1088/0143-0807/27/4/007",
		"journalAbbreviation": "Ann. Phys.",
		"language": "en-US",
		"author": [
			{
				"family": "Einstein",
				"given": "Albert"
			}
		],
		"issued": {
			"date-parts": [
				[
					1905
				]
			]
		}
	},
	{
		"type": "article-newspaper",
		"title": "Rooftop greenhouse will boost city farming",
		"container-title": "New York Times",
		"publisher-place": "New York",
		"page": "A20",
		"event-place": "New York",
		"ISSN": "0362-4331",
		"language": "en-US",
		"author": [
			{
				"family": "Foderaro",
				"given": "Lisa W."
			}
		],
		"issued": {
			"date-parts": [
				[
					"2012",
					4,
					6
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Beyond varieties of capitalism: conflict, contradiction, and complementarities in the European economy",
		"publisher": "Oxford University Press",
		"publisher-place": "Oxford and New York",
		"number-of-pages": "438",
		"event-place": "Oxford and New York",
		"ISBN": "9780199206483",
		"shortTitle": "Beyond varieties of capitalism",
		"language": "en-GB",
		"editor": [
			{
				"family": "Hanck\u00e9",
				"given": "Bob"
			},
			{
				"family": "Rhodes",
				"given": "Martin"
			},
			{
				"family": "Thatcher",
				"given": "Mark"
			}
		],
		"issued": {
			"date-parts": [
				[
					2007
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Steve Jobs",
		"publisher": "Simon & Schuster",
		"publisher-place": "New York, NY",
		"number-of-pages": "630",
		"event-place": "New York, NY",
		"ISBN": "9781451648539",
		"language": "en-US",
		"author": [
			{
				"family": "Isaacson",
				"given": "Walter"
			}
		],
		"issued": {
			"date-parts": [
				[
					"2011",
					10,
					24
				]
			]
		}
	},
	{
		"type": "chapter",
		"title": "Firms and the welfare state: When, why, and how does social policy matter to employers?",
		"container-title": "Varieties of capitalism. The institutional foundations of comparative advantage",
		"publisher": "Oxford University Press",
		"publisher-place": "New York",
		"page": "184-213",
		"event-place": "New York",
		"ISBN": "9780199247752",
		"language": "en-US",
		"author": [
			{
				"family": "Mares",
				"given": "Isabela"
			}
		],
		"editor": [
			{
				"family": "Hall",
				"given": "Peter A"
			},
			{
				"family": "Soskice",
				"given": "David"
			}
		],
		"issued": {
			"date-parts": [
				[
					2001
				]
			]
		}
	},
	{
		"type": "book",
		"title": "Shaping the body politic: Art and political formation in early america",
		"publisher": "University of Virginia Press",
		"publisher-place": "Charlottesville, VA",
		"number-of-pages": "313",
		"event-place": "Charlottesville, VA",
		"abstract": "Traditional narratives imply that art in early America was severely limited in scope. By contrast, these essays collectively argue that visual arts played a critical role in shaping an early American understanding of the body politic. American artists in the late colonial and early national periods enlisted the arts to explore and exploit their visions of the relationship of the American colonies to the mother country and, later, to give material shape to the ideals of modern republican nationhood. Taking a uniquely broad view of both politics and art, Shaping the Body Politic ranges in topic from national politics to the politics of national identity, and from presidential portraits to the architectures of the ordinary. The book covers subject matter from the 1760s to the 1820s, ranging from Patience Wright's embodiment of late colonial political tension to Thomas Jefferson's designs for the entry hall at Monticello as a museum. Paul Staiti, Maurie McInnis, and Roger Stein offer new readings of canonical presidential images and spaces: Jean-Antoine Houdon's George Washington, Gilbert Stuart's the Lansdowne portrait of Washington, and Thomas Jefferson's Monticello. In essays that engage print and painting, portraiture and landscape, Wendy Bellion, David Steinberg, and John Crowley explore the formation of national identity. The volume's concluding essays, by Susan Rather and Bernard Herman, examine the politics of the everyday. The accompanying eighty-five illustrations and color plates demonstrate the broad range of politically resonant visual material in early America. ContributorsWendy Bellion, University of Delaware * John E. Crowley, Dalhousie University * Bernard L. Herman, University of North Carolina, Chapel Hill * Maurie D. McInnis, University of Virginia * Louis P. Nelson, University of Virginia * Susan Rather, University of Texas, Austin * Paul Staiti, Mount Holyoke College * Roger B. Stein, emeritus, University of Virginia * David Steinberg, Independent Scholar Thomas Jefferson Foundation Distinguished Lecture Series",
		"ISBN": "0813931029",
		"language": "en-US",
		"author": [
			{
				"family": "McInnis",
				"given": "Maurie Dee"
			},
			{
				"family": "Nelson",
				"given": "Louis P."
			}
		],
		"issued": {
			"date-parts": [
				[
					2011
				]
			]
		}
	},
	{
		"type": "patent",
		"title": "Yo-yo having a modifiable string gap",
		"abstract": "The invention is a yo-yo that includes unique features that enable a user to adjust the yo-yo's string gap. In the preferred embodiment, at least one of the yo-yo's side assemblies includes a screw engaged to a nut that has two thru-bores located in a side-by-side relation. The screw is located to one side of the yo-yo's axis of rotation and can be rotated by a user to adjust the position of the associated side assembly on the yo-yo's axle structure. By appropriate positioning of the side assembly, a user can adjust the yo-yo's performance characteristics.",
		"number": "WO2011US30214",
		"issued": {
			"date-parts": [
				[
					2011
				]
			]
		}
	},
	{
		"type": "article-journal",
		"title": "Molecular structure of nucleic acids; a structure for deoxyribose nucleic acid",
		"container-title": "Nature",
		"page": "737-738",
		"volume": "171",
		"issue": "4356",
		"abstract": "We wish to suggest a structure for the salt of deoxyribose nucleic acid (D.N.A.). This structure has novel features which are of considerable biological interest.",
		"URL": "http://www.ncbi.nlm.nih.gov/pubmed/13054692",
		"DOI": "10.1038/171737a0",
		"ISSN": "0028-0836",
		"shortTitle": "Molecular structure of nucleic acids",
		"journalAbbreviation": "Nature",
		"language": "en-US",
		"author": [
			{
				"family": "Watson",
				"given": "James Dewey"
			},
			{
				"family": "Crick",
				"given": "Francis Harry Compton"
			}
		],
		"issued": {
			"date-parts": [
				[
					1953
				]
			]
		}
	},
	{
		"type": "webpage",
		"title": "CSL search by example",
		"container-title": "Citation Style Editor",
		"URL": "http://editor.citationstyles.org/searchByExample/",
		"accessed": {
			"date-parts": [
				[
					2012,
					12,
					15
				]
			]
		}
	}
]
	return CSLEDIT_exampleData;
});

// A requireJS plugin that returns an absolute URL given a URL relative to
// the base path
//
// e.g. to use:
//
//     require(['src/getUrl!images/elephant.png'], function (elephantUrl) {
//         // do something with elephantUrl
//     });

define('src/getUrl',{
    load: function (name, req, load, config) {
        load(req.toUrl(name));
    }
});




// Miscellaneous functions to deal with URLs

define('src/urlUtils',['src/getUrl'], function (getUrlPlugin) {

	// Returns the value of the query string variable with the given key,
	// or an empty string if it doesn't exist
	//
	// copied from https://gist.github.com/1771618
	var getUrlVar = function (key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || "";
	};

	// Returns the given url, but with the given queryParamKey removed
	var removeQueryParam = function (url, queryParamKey) {
		return url.replace(/\?/, "&").
				replace(new RegExp("(\\&" + queryParamKey + "=[^&]*)", "i"), "").
				replace(/&/, "?"); // replace first & with ?
	};

	// Gets the absolute URL for a relative path using requireJS
	var getResourceUrl = function (resourcePath, data) {
		var url;
		require(['src/getUrl!' + resourcePath], function (newUrl) {
			url = newUrl;
		});
		// TODO: fix in case of no initial query string (would need '?' instead of '&')
		if (typeof(data) != "undefined") {
			$.each(data, function (key, value) {
				url += "&" + key + "=" + value;
			});
		}
		return url;
	};

	return {
		getUrlVar : getUrlVar,
		removeQueryParam : removeQueryParam,
		getResourceUrl : getResourceUrl
	};
});



// Stores customisation options, typically set via contructor functions (e.g. CSLEDIT_VisualEditor())
//
// Provides default options for some things
//
// These options are expected to stay constant during a session. For options
// that change during a session use src/storage.js

define('src/options',
		[	'jquery',
			'src/exampleData',
			'src/urlUtils',
			'src/getUrl'
		], function (
			$,
			CSLEDIT_exampleData,
			CSLEDIT_urlUtils,
			getUrlPlugin
		) {
	var customOptions = {};
	var defaultOptions = {
			loadCSLFunc : function () {
				alert("load CSL function not implemented");
			},
			saveCSLFunc : function (cslCode) {
				window.location.href =
					"data:application/xml;charset=utf-8," +
					encodeURIComponent(cslCode);
			},
			editStyleName : "Edit Style",
			editStyleFunc : function (url) {
				alert("Edit style not avaiable.\n\n" +
					"For implementers: You need to add an editStyle_func to the options.");
			},
			loadStyleFromUrlFunc : function () {
				alert("load from url not implemented");
			},
			exampleReferences : CSLEDIT_exampleData.jsonDocumentList,
			exampleCitations : [[0], [10], []]
		};

	// create the default options which are a function of user options
	var createExtraDefaults = function () {
		defaultOptions.cslSchema_mainURL = CSLEDIT_urlUtils.getResourceUrl("generated/csl-schema/csl.rng");
		defaultOptions.cslSchema_childURLs = [];
		$.each([
				"generated/csl-schema/csl-categories.rng",
				"generated/csl-schema/csl-terms.rng",
				"generated/csl-schema/csl-types.rng",
				"generated/csl-schema/csl-variables.rng"
			], function (i, path) {
				defaultOptions.cslSchema_childURLs.push(CSLEDIT_urlUtils.getResourceUrl(path));
			}
		);
	};

	// Get the option value from the given key
	//
	// Will check the custom options set using setOptions() first,
	// or fall back to default options
	var get = function (key) {
		if (customOptions.hasOwnProperty(key)) {
			return customOptions[key];
		} else {
			return defaultOptions[key];
		}
	};

	createExtraDefaults();
	
	// Sets the custom options
	var setOptions = function (options) {
		customOptions = options;
		createExtraDefaults();
	};

	return {
		get : get,
		setOptions : setOptions
	};
});




// Provides information about the CSL styles repository

define('src/cslStyles',['src/urlUtils', 'src/debug'], function (CSLEDIT_urlUtils, debug) {
	var cache = {},

	// This is the style to load in the Visual Editor on first run,
	// or if the settings are reset
	defaultStyleId = 'http://www.zotero.org/styles/apa';

	// A list of popular styles obtained from some Mendeley data provided
	// by Carles Pina
	var topStyles = [
		'http://www.zotero.org/styles/apa',
		'http://www.zotero.org/styles/ieee',
		'http://www.zotero.org/styles/harvard1',
		'http://www.zotero.org/styles/nature',
		'http://www.zotero.org/styles/american-medical-association', /* manually updated from styles/ama */
		'http://www.zotero.org/styles/chicago-author-date',
		'http://www.zotero.org/styles/american-political-science-association',
		'http://www.zotero.org/styles/vancouver',
		'http://www.zotero.org/styles/american-sociological-association',
		'http://www.zotero.org/styles/modern-language-association',
		'http://www.zotero.org/styles/modern-humanities-research-association',
		'http://www.zotero.org/styles/chicago-fullnote-bibliography',
		'http://www.zotero.org/styles/associacao-brasileira-de-normas-tecnicas', /* manually updated from styles/abnt */
		'http://www.zotero.org/styles/chicago-note-bibliography',
		'http://www.zotero.org/styles/national-library-of-medicine', /* manually updated from styles/nlm */
		'http://www.zotero.org/styles/american-chemical-society',
		'http://www.zotero.org/styles/cell',
		'http://www.zotero.org/styles/science',
		'http://www.zotero.org/styles/elsevier-with-titles',
		'http://www.zotero.org/styles/ecology',
		'http://www.zotero.org/styles/elsevier-harvard',
		'http://www.zotero.org/styles/royal-society-of-chemistry',
		'http://www.zotero.org/styles/journal-of-the-american-chemical-society',
		'http://www.zotero.org/styles/pnas'
	];

	var getJSONData = function (path) {
		var url;

		if (!(path in cache)) {
			url = CSLEDIT_urlUtils.getResourceUrl(path);
			$.ajax({
				url : url,
				dataType : "json",
				async : false,
				success : function (data) {
					debug.log("fetched json: " + path);
					cache[path] = data;
				},
				error : function () {
							debug.log("WARNING: error fetching " + url);
						},
				cache : true
			});
		}
		return cache[path];
	};

	// Returns a normalised style for use in the generated style ID and filename
	//
	// Tries to match the current practice used in the CSL style repository as
	// best it can, despite the repo styles not being completely consistent
	//
	// See the 'style id generation' test in test_cslStyles.js
	//
	// TODO: jshint reports unsafe characters in the following, use better method of
	//       converting unicode characters to ASCII, may help to normalise the unicode
	//       in the pre-generated JSON data first, but needs investigation
	var getNormalisedStyleTitle = function (styleTitle) {
		return styleTitle
			.replace(/&/g, "and")
			.replace(/\([A-Z]*\)/g, "") // remove upper case text (acronyms) in parentheses
			.replace(/\([^\(]*\)$/, "") //remove content between last set of parentheses
			.replace(/\[[^\[]*\]$/, "") //remove content between last set of square parentheses
			.replace(/[\(\)\[\]]/g, "") // remove other parentheses
			.replace(/[,'\.]/g, "")     // remove other chars
			.replace(/[\\\/:"*?<>\| ]+/g, "-")
			.replace(/--+/g, "-")
			.replace(/-$/, "")
			.toLowerCase()
			.replace(/[àáäâ]|Ã£|Ã¡|Ã /g, "a")
			.replace(/[èéëê]|Ã©|Ã¨/g, "e")
			.replace(/[ìíïî]/g, "i")
			.replace(/[òóöô]/g, "o")
			.replace(/[ùúüû]/g, "u")
			.replace(/[ñ]/g, "n")
			.replace(/[ç]|Ã§/g, "c");
	};

	// Returns a style ID based on the given styleTitle that attempts
	// to fit with the convention used in the CSL styles repository
	var generateStyleId = function (styleTitle) {
		return "http://www.zotero.org/styles/" + getNormalisedStyleTitle(styleTitle);
	};

	// Returns the URL of the style with the given styleId on this server
	var localURLFromZoteroId = function (styleId) {
		var baseUrl = "external/csl-styles/";
		if (styles().masterIdFromId[styleId] !== styleId) {
			baseUrl += "dependent/";
		}

		return CSLEDIT_urlUtils.getResourceUrl(
			styleId.replace("http://www.zotero.org/styles/", baseUrl) + ".csl");
	};

	// This fetches the CSL code for the given styleId
	var fetchCslCode = function (styleId, success, error, async /* optional */) {
		var localURL = localURLFromZoteroId(styleId);

		if (typeof(async) === "undefined") {
			async = true;
		}

		$.ajax({
			url : localURL,
			dataType : "text",
			success : success,
			error : error,
			async : async
		});
	};

	// Returns an object containing information on all styles in the repository:
	//
	// - styleTitleFromId - A map of style ID to style title
	// - masterIdFromId   - A map of style ID to it's master style ID
	//                      (Note: Master styles will point to themselves)
	var styles = function () {
		return getJSONData('generated/cslStyles.json');
	};

	// Returns an object with the following property:
	//
	// - exampleCitationsFromMasterId - A map of master style ID to a list of
	//                                  pre-generated example citations and bibliographies
	var exampleCitations = function () {
		return getJSONData('generated/preGeneratedExampleCitations.json');
	};

	// Returns the URL of the default style on this server
	var defaultStyleURL = function () {
		return localURLFromZoteroId(defaultStyleId);
	};

	return {
		styles : styles,
		exampleCitations : exampleCitations,
		defaultStyleId : defaultStyleId,
		defaultStyleURL : defaultStyleURL,
		generateStyleId : generateStyleId,
		fetchCslCode : fetchCslCode,
		localURLFromZoteroId : localURLFromZoteroId,
		topStyles : topStyles
	};
});



// Uses CSLEDIT_storage to store the current csl style
//
// Supports the following actions:
// 
// - New style
// - Load from CSL XML
// - Add node
// - Delete node
// - Amend node
// - Move node

define('src/Data',[	'src/uiConfig', // TODO: remove this dependency
			'src/CslNode',
			'src/Iterator',
			'src/cslParser',
			'src/storage',
			'src/options',
			'src/urlUtils',
			'src/cslStyles',
			'src/debug'
		],
		function (
			CSLEDIT_uiConfig,
			CSLEDIT_CslNode,
			CSLEDIT_Iterator,
			CSLEDIT_cslParser,
			CSLEDIT_storage,
			CSLEDIT_options,
			CSLEDIT_urlUtils,
			CSLEDIT_cslStyles,
			debug
		) {
	return function (CSL_DATA, _requiredNodes /*optional*/, updateTime /*optional*/) {
		var viewControllers = [],
			callbacksEnabled = true,
			requiredNodes = _requiredNodes || [],
			
			// TODO: decide better place to put styleInfoOrder.
			//       Maybe add this general functionality to the schema for
			//       other nodes too and place the hard-coded list(s) in schemaOptions.
			//
			//       Currently only used when converting to/from CSL code, not as a
			//       constraint while using the editor, due to difficulty of
			//       implementation.
			styleInfoOrder = [
				"title",
				"title-short",
				"id",
				'link rel="self"',
				'link rel="independent-parent"',
				'link rel="template"',
				'link rel="documentation"',
				"author",
				"contributor",
				"category citation-format",
				"category field",
				"issn",
				"eissn",
				"issnl",
				"summary",
				"published",
				"updated",
				"rights"
			];

		// This returns a JSON object representing the whole CSL tree
		// exactly as it's stored in local storage
		//
		// Each node of the tree contains the same member variables as CSLEDIT_CslNode
		var get = function () {
			return CSLEDIT_storage.getItemJson(CSL_DATA);
		};

		// This sets the JSON object representing the whole CSL tree
		// as it's stored in local storage
		//
		// Each node of the tree contains the same member variables as CSLEDIT_CslNode
		var set = function (cslData) {
			var updatedNode,
				iter,
				index,
				node;

			if (updateTime) {
				// update 'style/info/updated'
				updatedNode = getNodesFromPath('style/info/updated', cslData)[0];
				if (typeof(updatedNode) === "undefined") {
					debug.log("WARNING: no style/info/updated node");
				} else {
					// write timestamp to updated node
					iter = new CSLEDIT_Iterator(cslData);
					index = 0;
					while (iter.hasNext()) {
						node = iter.next();
						if (index === updatedNode.cslId) {	
							node.textValue = (new Date()).toISOString().replace(/\.[0-9]{3}Z$/, "+00:00");
							break;
						}
						index++;
					}
				}
			}

			CSLEDIT_storage.setItem(CSL_DATA, JSON.stringify(cslData));
			return cslData;
		};

		var nodeMatch = function (nodeData, nodeString) {
			var nodeInfo = nodeString.split(" "),
				nodeName = nodeInfo[0],
				attribute,
				attributeName,
				attributeValue,
				cslNode = new CSLEDIT_CslNode(nodeData);

			if (nodeInfo.length > 1) {
				attribute = nodeInfo[1].split("=");
				attributeName = attribute[0];
				if (attribute.length > 1) {
					attributeValue = attribute[1].replace(/"/g, "");
				}
			}

			if (nodeName !== nodeData.name) {
				return false;
			}
			
			if (typeof(attributeName) !== "undefined" && !cslNode.hasAttr(attributeName)) {
				return false;
			}

			if (typeof(attributeValue) !== "undefined" &&
					cslNode.getAttr(attributeName) !== attributeValue) {
				return false;
			}

			return true;
		};

		var reorderStyleInfoNode = function (cslData /*optional*/) {
			var styleInfoNode;

			cslData = cslData || get();

			// re-order the style/info child nodes:
			$.each(getNodesFromPath('style/info', cslData), function (i, infoNode) {
				var iterator,
					cslId = infoNode.cslId;

				styleInfoNode = infoNode;

				// re-order
				infoNode.children.sort(function (a, b) {
					var orderA = styleInfoOrder.length,
						orderB = styleInfoOrder.length;

					$.each(styleInfoOrder, function (i, nodeString) {
						if (nodeMatch(a, nodeString)) {
							orderA = i;
						}
						if (nodeMatch(b, nodeString)) {
							orderB = i;
						}
					});

					return orderA - orderB;
				});

				// set cslIds
				iterator = new CSLEDIT_Iterator(infoNode);
				while (iterator.hasNext()) {
					iterator.next().cslId = cslId;
					cslId++;
				}

				return false;
			});

			return styleInfoNode;
		};

		// Sets the current CSL style from the given string containing XML
		var setCslCode = function (cslCode, allowDependentStyle /* optional */) {
			var cslData,
				error;
			
			try {
				cslData = CSLEDIT_cslParser.cslDataFromCslCode(cslCode);
			} catch (err) {
				return { error: {
					type: "cslParsing",
					message: "Error parsing CSL Code"
				}};
			}

			if (!allowDependentStyle) {
				// check if this is a dependent style:
				$.each(getNodesFromPath('style/info/link', cslData), function (i, node) {
					var linkNode = new CSLEDIT_CslNode(node);
					if (linkNode.getAttr("rel") === "independent-parent") {
						error = {
							type: "dependentStyle",
							parentURL: linkNode.getAttr("href"),
							message: "Editing of dependent styles not yet supported.\n\n" + 
								"Please find and edit this master style instead:\n\n" +
								linkNode.getAttr("href")
						};
					}
				});
			}

			// check it contains required nodes
			if (typeof error === "undefined") {
				$.each(requiredNodes, function (i, requiredNode) {
					if (getNodesFromPath(requiredNode, cslData).length === 0) {
						error = {
							type: "nodeMissing",
							node: requiredNode,
							message: "CSL code is missing essential node: " + requiredNode
						};
						return false;
					}
				});
			}

			reorderStyleInfoNode(cslData);

			if (error) {
				return { error: error };
			}

			if (updateTime) {
				// add a style/info/updated node if not present
				// (this will be written to on every edit, create here
				//  to avoid doing on every change which would complicate
				//  undo/redo code in CSLEDIT_controller)
				updateTime = false;
				set(cslData);
				if (getNodesFromPath('style/info/updated').length === 0) {
					debug.log("creating required updated node");
					_addNode(getNodesFromPath('style/info')[0].cslId, "last",
							new CSLEDIT_CslNode("updated", [], [], -1), true);
				}
				cslData = get();
				updateTime = true;
			}

			set(cslData);

			emit("newStyle", []);
			return {};
		};

		// Returns a string with the CSL style in XML format ready for output
		var getCslCode = function (comment /* optional */) {
			var cslData = get();
			reorderStyleInfoNode(cslData);
		
			return CSLEDIT_cslParser.cslCodeFromCslData(cslData, comment);
		};

		var spliceNode = function (cslId, position, nodesToDelete, newNode) {
			var iter,
				cslData,
				index,
				node,
				nodesBefore;

			cslData = get();

			nodesBefore = numNodes(cslData);

			// Find the id of the node to add
			iter = new CSLEDIT_Iterator(cslData);

			index = 0;
			while (iter.hasNext()) {
				node = iter.next();
				
				if (index === cslId) {
					debug.assertEqual(node.cslId, index);
					debug.assert(position + nodesToDelete <= node.children.length);

					if (typeof newNode === "undefined") {
						node.children.splice(position, nodesToDelete);
					} else {
						node.children.splice(position, nodesToDelete, newNode);
					}
				}
				index++;
			}

			// correct the cslId numbering
			iter = new CSLEDIT_Iterator(cslData);
			index = 0;
			while (iter.hasNext()) {
				node = iter.next();
				node.cslId = index;
				index++;
			}

			set(cslData);

			return index - nodesBefore; // difference in number of nodes
		};

		// Returns an object containing:
		//
		// node - the CSL node with the given cslId,
		// parent - it's parent
		var getNodeAndParent = function (cslId) {
			var iter = new CSLEDIT_Iterator(get()),
				node;

			while (iter.hasNext()) {
				node = iter.next();

				if (node.cslId === cslId) {
					return {
						node : node,
						parent : iter.parent()
					};
				}
			}

			// not found
			return { node : null, parent : null };
		};

		// Returns a list containing the node at cslId, and all it's parents
		//
		// The first element will be the root 'style' node
		// The last element will be the node with the given cslId
		var getNodeStack = function (cslId) {
			var iter = new CSLEDIT_Iterator(get()),
				nodeStack,
				node;

			while (iter.hasNext()) {
				node = iter.next();

				if (node.cslId === cslId) {
					return iter.stack();
				}
			}
		};

		// Returns a list of node names correspoding to the current node stack
		// (see getNodeStack())
		var getNodePath = function (cslId) {
			var nodeNames = [];
			$.each(getNodeStack(cslId), function (i, node) {
				nodeNames.push(node.name);
			});
			return nodeNames.join('/');
		};

		// Returns CSL node JSON of the node with the given cslId
		var getNode = function (cslId, cslData /* optional */) {
			if (typeof cslData !== "undefined") {
				return getNodeAndParent(cslId, cslData).node;
			} else {
				return getNodeAndParent(cslId).node;
			}
		};

		// Returns all matching nodes with the given path or
		// null if it couldn't find a match
		//
		// path is a '/' delimited string of the node stack you are searching for.
		//
		// e.g. 'style/citation/layout'
		var getNodesFromPath = function (path, cslData /* optional */) {
			var splitPath = path.split("/"),
				rootNode,
				result = [];

			if (typeof cslData === "undefined") {
				cslData = get();
			}

			rootNode = splitPath.splice(0, 1);

			if (rootNode[0] === "") {
				return result;
			}

			getNodesFromPath_inner(splitPath, cslData, result);
			return result;
		};

		var getNodesFromPath_inner = function (path, nodeData, result) {
			var index,
				rootNode,
				regExp,
				newPath;

			if (path.length === 0) {
				result.push(nodeData);
				return;
			}

			rootNode = path[0];
			newPath = path.slice(1, path.length);

			// convert '*' wildcard to regexp equivalent
			regExp = new RegExp("^" + rootNode.replace("*", ".*") + "$");

			for (index = 0; index < nodeData.children.length; index++) {
				if (regExp.test(nodeData.children[index].name)) {
					getNodesFromPath_inner(newPath, nodeData.children[index], result);
				}
			}
		};

		// Returns the cslId of the first node within the given cslData tree
		// with the name nodeName
		var getFirstCslId = function (cslData, nodeName) {
			var index,
				result;

			if (cslData.name === nodeName) {
				return cslData.cslId;
			} else {
				for (index = 0; index < cslData.children.length; index++) {
					result = getFirstCslId(cslData.children[index], nodeName);
					if (result > -1) {
						return result;
					}
				}
			}
			// couldn't find it
			return -1;
		};
		
		// Returns the number of nodes in the given CSL node tree
		var numNodes = function (cslNode) {
			// use the whole tree if none specified
			cslNode = cslNode || get();

			var iter = new CSLEDIT_Iterator(cslNode),
				index = 0;

			while (iter.hasNext()) {
				iter.next();
				index++;
			}

			return index;
		};

		var emit = function (event, args) {
			$.each(viewControllers, function (index, controller) {
				controller.styleChanged(event, args);
			});
		};
		
		// Get the index of the given childNode within the given parentNode
		// or -1 if childNode is not a child of parentNode
		var indexOfChild = function (childNode, parentNode) {
			var index;
			for (index = 0; index < parentNode.children.length; index++) {
				if (childNode.cslId === parentNode.children[index].cslId) {
					return index;
				}
			}
			return -1;
		};
		
		// If the node 'cslId' is a macro instance, return the cslId of the 
		// corresponding macro definition
		//
		// Else, return 'cslId'
		var macroDefinitionIdFromInstanceId = function (cslId) {
			var node = new CSLEDIT_CslNode(getNode(cslId)),
				macroName,
				macroNodes,
				macroNode;

			macroName = node.getAttr("macro");
			if (node.name === "text" && macroName !== "") {
				macroNodes = getNodesFromPath("style/macro");

				$.each(macroNodes, function (i, macroNode) {
					var thisMacroNode = new CSLEDIT_CslNode(macroNode);
					if (thisMacroNode.getAttr("name") === macroName) {
						cslId = thisMacroNode.cslId;
						return false;
					}
				});
			}
			return cslId;
		};
		
		// Adds a CSL node
		//
		// cslId - The existing CSL node cslId to create within or next to
		// position - Where to place the new node relative to the exitsing one.
		//            Can be one of the following positions:
		// 
		//   - integer  - the child index within the existing node
		//   - "first"  - the first child of the existing node
		//   - "last"   - the last child of the existing node
		//   - "inside" - same as "last"
		//   - "before" - the sibling before the existing node
		//   - "after"  - the sibling after the existing node
		//
		// newNode - the new CSL node to add (follows the CSL node JSON described in src/CslNode.js)
		var addNode = function (cslId, position, newNode) {
			var newCslId = _addNode(cslId, position, newNode),
				inverse;
			emit("updateFinished");

			// return the inverse command for undo functionality
			return {
				command : "deleteNode",
				args : [ newCslId ]
			};
		};

		var _addNode = function (cslId, position, newNode, suppressViewUpdate /*optional*/) {
			var nodeInfo,
				positionIndex,
				nodesAdded,
				defaultAttributes,
				defaultChildren;
			
			newNode.cslId = -1;
			newNode.children = newNode.children || [];
			newNode.attributes = newNode.attributes || [];

			defaultAttributes = CSLEDIT_uiConfig.defaultAttributes[newNode.name];

			// populate with default attributes
			if (newNode.attributes.length === 0 && typeof defaultAttributes !== "undefined") {
				$.each(defaultAttributes, function (attribute, value) {
					newNode.attributes.push({key: attribute, value: value, enabled: true});
				});
			}

			defaultChildren = CSLEDIT_uiConfig.defaultChildren[newNode.name];

			// populate with default children
			if (newNode.children.length === 0 && typeof defaultChildren !== "undefined") {
				newNode.children = defaultChildren;
			}

			if (typeof position === "number") {
				// change parent cslId from macro instances to macro definitions
				cslId = macroDefinitionIdFromInstanceId(cslId);

				nodesAdded = spliceNode(cslId, position, 0, newNode);
				if (!suppressViewUpdate) {
					emit("addNode", [cslId, position, newNode, nodesAdded]);
				}
			} else {
				switch (position) {
				case "first":
					// change parent cslId from macro instances to macro definitions
					cslId = macroDefinitionIdFromInstanceId(cslId);

					return _addNode(cslId, 0, newNode, suppressViewUpdate);
				case "inside":
				case "last":
					// change parent cslId from macro instances to macro definitions
					cslId = macroDefinitionIdFromInstanceId(cslId);
					
					return _addNode(cslId, getNode(cslId).children.length, newNode, suppressViewUpdate);
				case "before":
				case "after":
					debug.assert(cslId !== 0);
					nodeInfo = getNodeAndParent(cslId);
					positionIndex = indexOfChild(nodeInfo.node, nodeInfo.parent);
					if (position === "after") {
						positionIndex++;
					}
					return _addNode(nodeInfo.parent.cslId, positionIndex, newNode, suppressViewUpdate);
				case "default":
					debug.assert(false, "position: " + position + " not recognised");
				}
			}
			return newNode.cslId;
		};
		
		// Deletes the CSL node with the given cslId
		var deleteNode = function (cslId) {
			var deletedNode,
				nodeAndParent = getNodeAndParent(cslId),
				parentNode,
				position,
				nodePath = getNodePath(cslId),
				error;

			// can't delete required nodes
			$.each(requiredNodes, function (i, requiredNodePath) {
				if (nodePath === requiredNodePath) {
					error = {
						type: "requiredNode",
						message: "Cannot delete required node: " + nodePath
					};
					return false;
				}
			});

			// can't delete the updated node
			// (this isn't in requiredNodes because it's OK to load a style without it)
			if (nodePath === "style/info/updated") {
				error = {
					type: "requiredNode",
					message: "Cannot delete required node: " + nodePath
				};
			}

			if (error) {
				return { error : error };
			}

			parentNode = nodeAndParent.parent.cslId;
			position = indexOfChild(nodeAndParent.node, nodeAndParent.parent);

			deletedNode = _deleteNode(cslId);

			emit("updateFinished");

			// return the inverse command for undo functionality
			return {
				command : "addNode",
				args : [ parentNode, position, deletedNode ]
			};
		};

		var _deleteNode = function (cslId) {
			var iter = new CSLEDIT_Iterator(get()),
				index,
				node,
				parentNode,
				nodesDeleted;

			debug.assert(cslId !== 0); // can't delete the style node

			index = 0;
			while (iter.hasNext()) {
				node = iter.next();

				if (index === cslId) {
					parentNode = iter.parent();
					break;
				}
				index++;
			}

			debug.assert(typeof parentNode !== "undefined");
			nodesDeleted = -spliceNode(parentNode.cslId, indexOfChild(node, parentNode), 1);
			debug.assertEqual(node.cslId, cslId);
			
			emit("deleteNode", [cslId, nodesDeleted]);
			
			return node;
		};

		// Replaces the CSL node at the given cslId, with the given ammendedNode
		//
		// Note: This leaves the list of children intact, so that the whole ammendedNode
		//       sub-tree doesn't need to be passed
		var amendNode = function (cslId, amendedNode) {
			var cslData = get(),
				iter,
				node,
				index,
				result,
				oldNode;
			
			iter = new CSLEDIT_Iterator(cslData);
			index = 0;

			while (iter.hasNext()) {
				node = iter.next();
				if (index === cslId) {
					debug.assertEqual(node.cslId, cslId);
					
					oldNode = new CSLEDIT_CslNode(node.name, node.attributes, [], node.cslId);
					oldNode.textValue = node.textValue;

					node.name = amendedNode.name;
					node.attributes = amendedNode.attributes;
					node.textValue = amendedNode.textValue;

					break;
				}
				index++;
			}
			debug.assert(typeof node !== "undefined");
			set(cslData);
			emit("amendNode", [cslId, node]);
			emit("updateFinished");
			// return inverse command
			return {
				command : "amendNode",
				args : [cslId, oldNode]
			};
		};

		// This deletes the node with the given fromCslId, and adds it near the toCslId
		// at the given position.
		//
		// position accepts the same values as addNode()
		var moveNode = function (fromCslId, toCslId, position) {
			var deletedNode, fromNode,
				inverseFromCslId,
				inverseToNodeAndParent = getNodeAndParent(fromCslId),
				inverseToCslId,
				inverseToPosition;

			callbacksEnabled = false;

			inverseToCslId = inverseToNodeAndParent.parent.cslId;
			inverseToPosition = indexOfChild(inverseToNodeAndParent.node, inverseToNodeAndParent.parent);

			deletedNode = _deleteNode(fromCslId);

			debug.log("deletedNode = " + deletedNode.cslId);
			if (toCslId > fromCslId) {
				toCslId -= numNodes(deletedNode);
			}

			inverseFromCslId = _addNode(toCslId, position, deletedNode);
			if (inverseToCslId > inverseFromCslId) {
				inverseToCslId += numNodes(deletedNode);
			}

			callbacksEnabled = true;

			emit("updateFinished");
			// return inverse command
			return {
				command : "moveNode",
				args : [inverseFromCslId, inverseToCslId, inverseToPosition]
			};
		};

		// Tries in the following order to initialise the CSL style, if one fails
		// try the next
		//
		// - Get the one specified in CSLEDIT_options("initialCslCode")
		// - Get the one in CSLEDIT_storage.getItem("CSLEDIT.data")
		// - Get the default style specified in CSLEDIT_cslStyles.defaultStyleURL()
		//
		// Then call the given callback function
		var initPageStyle = function (callback) {
			var cslData, styleURL, result;
			cslData = get(); 
			
			// First try loading the style specified in options
			if (typeof CSLEDIT_options.get("initialCslCode") !== "undefined") {
				result = setCslCode(CSLEDIT_options.get("initialCslCode"));
				if (result.hasOwnProperty('error')) {
					alert(result.error.message);
				} else {
					if (typeof callback !== "undefined") {
						callback();
					}
					return;
				}
			}
			
			// Next try the 
			if (cslData === null || cslData === "") {
				styleURL = CSLEDIT_cslStyles.defaultStyleURL();
				$.get(styleURL, {}, function (cslCode) {
					var result;
					cslCode = cslCode.replace(/<!--.*?-->/g, "");
					result = setCslCode(cslCode);
					if (result.hasOwnProperty('error')) {
						alert(result.error);
					}
					if (typeof callback !== "undefined") {
						callback();
					}
				}, "text");
			} else {
				if (typeof callback !== "undefined") {
					callback();
				}
			}
		};

		// remove all view controllers
		var clearViewControllers = function () {
			viewControllers = [];
		};

		// add a view controller which will get notified by calling the relevant
		// function (addNode, deleteNode, etc...) whenever the CSL style is changed
		var addViewController = function (viewController) {
			viewControllers.push(viewController);
		};

		return {
			// Write functions (if CSLEDIT_controller is being used on this page,
			//                  use the equivalent CSLEDIT_controller commands
			//                  instead of these)
			setCslCode : setCslCode,
			addNode : addNode,
			deleteNode : deleteNode,
			amendNode : amendNode,
			moveNode : moveNode,

			// Read-only functions (safe to use anywhere)
			getCslCode : getCslCode,
			get : get,
			getNode : getNode,
			getNodeAndParent : getNodeAndParent,
			getNodeStack : getNodeStack,
			getNodePath : getNodePath,
			getFirstCslId : getFirstCslId,

			initPageStyle : initPageStyle,
			numNodes : numNodes,
			clearViewControllers : clearViewControllers,
			addViewController : addViewController,
			getNodesFromPath : getNodesFromPath,
			indexOfChild : indexOfChild,
			macroDefinitionIdFromInstanceId : macroDefinitionIdFromInstanceId
		};
	};
});



// The global instance of CSLEDIT_Data, which stores the currently loaded CSL style
//
// Note: Despite its name, this is always loaded as CSLEDIT_data in the rest of the code.
//       (The reason is that data.js and Data.js are the same filename on Windows)

define('src/dataInstance',['src/Data'], function (CSLEDIT_Data) {
	// Returns the global instance of CSLEDIT_Data
	return CSLEDIT_Data("CSLEDIT.cslData", [
		"style",
		"style/info",
		"style/info/title",
		"style/info/id",
		"style/citation",
		"style/citation/layout"
	], true);
});



// Sends commands to CSLEDIT_Data, and maintains the command history used by
// the undo function.
//
// The CSLEDIT_controller allows you to issue commands which alter the current
// CSL style, to do this you use the CSLEDIT_controller.exec() function, passing 
// the name of the CSLEDIT_Data function you want to call as argument 1, and the
// list of arguments to that CSLEDIT_Data function as argument 2. The list of 
// functions it's intended to execute are defined below in 'commands'.
//
// **If the controller is being used, any action which affects CSLEDIT_data
//   needs to be done using the controller**
define('src/controller',['src/dataInstance', 'src/debug'], function (CSLEDIT_data, debug) {
	var commands = [
			"addNode",
			"deleteNode",
			"moveNode",
			"amendNode",
			"setCslCode"
		],
		commandHistory = [],
		undoCommandHistory = [],
		cslData;

	// Sets the CSL_Data instance to:
	//
	// - issue commands to
	// - get information about the current CSL style
	var setCslData = function (_cslData) {
		$.each(commands, function (index, command) {
			debug.assertEqual(typeof _cslData[command], "function", "cslData must contain: " + command);
		});
		
		cslData = _cslData;
	};

	// set the default data instance (can be changed by the unit tests):
	setCslData(CSLEDIT_data);

	// These can be called like regular commands, but can't be subscribed to.
	// They use the regular commands to perform more complicated tasks.
	var macros = {
		addPath : function ( path ) {
			var splitPath = path.split("/"),
				index,
				currentPath = "",
				nodes,
				parentCslId,
				result,
				errors = [];

			for (index = 0; index < splitPath.length; index++) {
				if (index > 0) {
					currentPath += "/";
				}
				currentPath += splitPath[index];
				nodes = cslData.getNodesFromPath(currentPath)
				if (nodes.length === 0) {
					if (index === 0) {
						// add root node
						result = _exec("addNode", [0, "before", {name: splitPath[index]}], commandHistory);
						if ("error" in result) {
							errors.push(result.error);
						}
						parentCslId = 0;
					} else {
						result = _exec("addNode",
							[parentCslId, "first", {name: splitPath[index]}], commandHistory);
						if ("error" in result) {
							errors.push(result.error);
						}
						parentCslId++;
					}
				} else {
					parentCslId = nodes[0].cslId;
				}
			}

			if (errors.length > 0) {
				return {
					error:
					{
						type: "macroError",
						message: "These errors occurred: " + JSON.stringify(errors)
					}
				};
			}
		}
	};

	// Perform the inverse of the previous command
	//
	// Check that commandHistory is not empty before calling this
	var undo = function () {
		var command = commandHistory.pop();

		_exec(command.inverse.command, command.inverse.args, undoCommandHistory);
	};

	// Perform the inverse of the previous undo action
	//
	// Check that undoCommandHistory is not empty before calling this
	var redo = function () {
		var command = undoCommandHistory.pop();

		_exec(command.inverse.command, command.inverse.args, commandHistory);
	};

	// Issue the given command with the given arguments to the CSLEDIT_Data instance
	//
	// If silent is not true, it will display an error dialog
	var exec = function (command, args, silent /* optional, default is false */) {
		var result;

		undoCommandHistory.length = 0;
		if (command in macros) {
			result = macros[command].apply(null, args);
		} else {
			debug.assert(commands.indexOf(command) !== -1, "command doesn't exist");
			result = _exec(command, args, commandHistory);
		}
		
		if (silent !== true && "error" in result) {
			alert(result.error.message);
		}

		return result;
	};

	var _exec = function(command, args, history) {
		var inverseCommand;

		debug.log("executing command " + command + "(" + JSON.stringify(args) + ")");
		inverseCommand = cslData[command].apply(null, args);
		
		if (typeof inverseCommand !== "undefined" && inverseCommand.hasOwnProperty("error")) {
			return inverseCommand;
		}

		if (command === "setCslCode") {
			// no undo available for this yet, wipe command history
			history.length = 0;
		} else {
			history.push({command:command, args:args, inverse:inverseCommand});
		}
		return {};
	};

	return {
		setCslData : setCslData,
		exec : exec,
		commandHistory : commandHistory,
		undoCommandHistory : undoCommandHistory,
		undo : undo,
		redo : redo,
		clearHistory : function () {
			commandHistory.length = 0;
		}
	};
});



// Watches a CSL node represented by nodePath and calls onChange whenever it changes
//
// It's OK if no node exists at nodePath
// It's not OK if > 1 node exists at nodePath

define('src/NodeWatcher',['src/debug'], function (debug) {
	// Creates a NodeWatcher watching the given nodePath using the given
	// dataInstance
	// 
	// - nodePath     - a '/' separated string containing the full path of the node to watch
	//                  e.g. 'style/citation/layout'
	// - dataInstance - the instance of CSLEDIT_Data to watch
	// - onChange     - this function will be called after every change to the watched node
	var CSLEDIT_NodeWatcher = function (nodePath, dataInstance, onChange) {
		var that = this;
		
		this.nodeData = null;

		this.nodePath = nodePath;
		this.dataInstance = dataInstance;
		this.onChange = onChange;

		this._updateNodeData();
		this._nodeUpdated();
	};

	// Calls the onChange callback
	CSLEDIT_NodeWatcher.prototype._nodeUpdated = function () {
		this.onChange(this.nodeData);
	};

	CSLEDIT_NodeWatcher.prototype._updateNodeData = function () {
		var nodes;

		this.nodeData = null;
		
		if (typeof(this.nodePath) === "undefined") {
			return;
		}

		nodes = this.dataInstance.getNodesFromPath(this.nodePath);

		if (nodes.length > 0) {
			this.nodeData = nodes[0];
		}
	};

	// Respond to an addNode event
	CSLEDIT_NodeWatcher.prototype.addNode = function (id, position, node, numAdded) {
		if (this.nodeData !== null) {
			if (node.cslId <= this.nodeData.cslId) {
				// shift the nodeData forward
				this.nodeData.cslId += numAdded;
				this._nodeUpdated();
			}
		} else {
			this._updateNodeData();
			this._nodeUpdated();
		}
	};

	// Respond to a deleteNode event
	CSLEDIT_NodeWatcher.prototype.deleteNode = function (id, numDeleted) {
		if (this.nodeData === null) {
			return;
		}

		if (this.nodeData.cslId >= id && this.nodeData.cslId < id + numDeleted) {
			// this node has been deleted
			this._updateNodeData();
			this._nodeUpdated();
			return;
		}

		if (this.nodeData.cslId >= id + numDeleted) {
			this.nodeData.cslId -= numDeleted;
			this._nodeUpdated();
		}
	};

	// Respond to an amendNode event
	CSLEDIT_NodeWatcher.prototype.amendNode = function (id, amendedNode) {
		if (this.nodeData === null) {
			return;
		}

		if (id === this.nodeData.cslId) {
			this.nodeData = amendedNode;
			this._nodeUpdated();
		}
	};

	return CSLEDIT_NodeWatcher;
});



// Uses a NodeWatcher to monitor the style/info/title node for changes
// and updates the titlebar

define('src/Titlebar',
		[	'src/NodeWatcher',
			'src/dataInstance',
			'src/xmlUtility',
			'src/debug'
		], function (
			CSLEDIT_NodeWatcher,
			CSLEDIT_data,
			CSLEDIT_xmlUtility,
			debug
		) {
	// Creates a titlebar within the given jQuery element
	var CSLEDIT_Titlebar = function (element) {
		var that = this;

		this.element = element;
		this.element.html('<h3><span cslid="-1"/></h3>').css({cursor: "default"});

		this.nodeWatcher = new CSLEDIT_NodeWatcher("style/info/title", CSLEDIT_data, function (nodeData) {
			that._updateTitle(nodeData);
		});
		
		this.addNode = function (id, position, nodeData, numNodes) {
			that.nodeWatcher.addNode(id, position, nodeData, numNodes);
		};
		this.deleteNode = function (id, numNodes) {
			that.nodeWatcher.deleteNode(id, numNodes);
		};
		this.amendNode = function (id, nodeData) {
			that.nodeWatcher.amendNode(id, nodeData);
		};
	};

	CSLEDIT_Titlebar.prototype._updateTitle = function (nodeData) {
		var title;
		if (nodeData === null) {
			title = "No title";
		} else {
			title = nodeData.textValue;
		}
		this.element.find('span[cslid]').text(title).attr('cslid', nodeData.cslId);
	};

	return CSLEDIT_Titlebar;
});



// A slide-down notification bar with a "Dismiss" button

define('src/notificationBar',[],function () {
	var element, messageElement;

	// Initialise the notification bar
	//
	// - _element - the jQuery element to initialise within
	//              Note: this should contain
	//              - <span class=message/> to put messages in
	//              - <button class=dismiss>Your Dismiss Text</button>
	var init = function (_element) {
		element = _element;
		messageElement = element.find('span.message');
		
		element.find('button.dismiss').on('click', function () {
			element.slideUp();
		});
	};

	// Display a plain text or html message within 'span.message'
	//
	// - message - the message to display
	// - useHtml - set this to true if your message is HTML
	var showMessage = function (message, useHtml /* optional */) {
		var percentage;

		element.css({'display' : 'none'});

		if (useHtml) {
			messageElement.html(message);
		} else {
			messageElement.text(message);
		}

		percentage = Math.round(50 * 
			(element.parent().width() - element.width()) / element.parent().width());

		element.css({
			'left' : percentage + '%'
		});
		element.slideDown();
	};

	return {
		init : init,
		showMessage : showMessage
	};
});

/*
 * jsTree 1.0-rc3
 * http://jstree.com/
 *
 * Copyright (c) 2010 Ivan Bozhanov (vakata.com)
 *
 * Licensed same as jquery - under the terms of either the MIT License or the GPL Version 2 License
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Date: 2011-02-09 01:17:14 +0200 (ср, 09 февр 2011) $
 * $Revision: 236 $
 */

/*jslint browser: true, onevar: true, undef: true, bitwise: true, strict: true */
/*global window : false, clearInterval: false, clearTimeout: false, document: false, setInterval: false, setTimeout: false, jQuery: false, navigator: false, XSLTProcessor: false, DOMParser: false, XMLSerializer: false*/



// top wrapper to prevent multiple inclusion (is this OK?)
(function () { if(jQuery && jQuery.jstree) { return; }
	var is_ie6 = false, is_ie7 = false, is_ff2 = false;

/* 
 * jsTree core
 */
(function ($) {
	// Common functions not related to jsTree 
	// decided to move them to a `vakata` "namespace"
	$.vakata = {};
	// CSS related functions
	$.vakata.css = {
		get_css : function(rule_name, delete_flag, sheet) {
			rule_name = rule_name.toLowerCase();
			var css_rules = sheet.cssRules || sheet.rules,
				j = 0;
			do {
				if(css_rules.length && j > css_rules.length + 5) { return false; }
				if(css_rules[j].selectorText && css_rules[j].selectorText.toLowerCase() == rule_name) {
					if(delete_flag === true) {
						if(sheet.removeRule) { sheet.removeRule(j); }
						if(sheet.deleteRule) { sheet.deleteRule(j); }
						return true;
					}
					else { return css_rules[j]; }
				}
			}
			while (css_rules[++j]);
			return false;
		},
		add_css : function(rule_name, sheet) {
			if($.jstree.css.get_css(rule_name, false, sheet)) { return false; }
			if(sheet.insertRule) { sheet.insertRule(rule_name + ' { }', 0); } else { sheet.addRule(rule_name, null, 0); }
			return $.vakata.css.get_css(rule_name);
		},
		remove_css : function(rule_name, sheet) { 
			return $.vakata.css.get_css(rule_name, true, sheet); 
		},
		add_sheet : function(opts) {
			var tmp = false, is_new = true;
			if(opts.str) {
				if(opts.title) { tmp = $("style[id='" + opts.title + "-stylesheet']")[0]; }
				if(tmp) { is_new = false; }
				else {
					tmp = document.createElement("style");
					tmp.setAttribute('type',"text/css");
					if(opts.title) { tmp.setAttribute("id", opts.title + "-stylesheet"); }
				}
				if(tmp.styleSheet) {
					if(is_new) { 
						document.getElementsByTagName("head")[0].appendChild(tmp); 
						tmp.styleSheet.cssText = opts.str; 
					}
					else {
						tmp.styleSheet.cssText = tmp.styleSheet.cssText + " " + opts.str; 
					}
				}
				else {
					tmp.appendChild(document.createTextNode(opts.str));
					document.getElementsByTagName("head")[0].appendChild(tmp);
				}
				return tmp.sheet || tmp.styleSheet;
			}
			if(opts.url) {
				if(document.createStyleSheet) {
					try { tmp = document.createStyleSheet(opts.url); } catch (e) { }
				}
				else {
					tmp			= document.createElement('link');
					tmp.rel		= 'stylesheet';
					tmp.type	= 'text/css';
					tmp.media	= "all";
					tmp.href	= opts.url;
					document.getElementsByTagName("head")[0].appendChild(tmp);
					return tmp.styleSheet;
				}
			}
		}
	};

	// private variables 
	var instances = [],			// instance array (used by $.jstree.reference/create/focused)
		focused_instance = -1,	// the index in the instance array of the currently focused instance
		plugins = {},			// list of included plugins
		prepared_move = {};		// for the move_node function

	// jQuery plugin wrapper (thanks to jquery UI widget function)
	$.fn.jstree = function (settings) {
		var isMethodCall = (typeof settings == 'string'), // is this a method call like $().jstree("open_node")
			args = Array.prototype.slice.call(arguments, 1), 
			returnValue = this;

		// if a method call execute the method on all selected instances
		if(isMethodCall) {
			if(settings.substring(0, 1) == '_') { return returnValue; }
			this.each(function() {
				var instance = instances[$.data(this, "jstree_instance_id")],
					methodValue = (instance && $.isFunction(instance[settings])) ? instance[settings].apply(instance, args) : instance;
					if(typeof methodValue !== "undefined" && (settings.indexOf("is_") === 0 || (methodValue !== true && methodValue !== false))) { returnValue = methodValue; return false; }
			});
		}
		else {
			this.each(function() {
				// extend settings and allow for multiple hashes and $.data
				var instance_id = $.data(this, "jstree_instance_id"),
					a = [],
					b = settings ? $.extend({}, true, settings) : {},
					c = $(this), 
					s = false, 
					t = [];
				a = a.concat(args);
				if(c.data("jstree")) { a.push(c.data("jstree")); }
				b = a.length ? $.extend.apply(null, [true, b].concat(a)) : b;

				// if an instance already exists, destroy it first
				if(typeof instance_id !== "undefined" && instances[instance_id]) { instances[instance_id].destroy(); }
				// push a new empty object to the instances array
				instance_id = parseInt(instances.push({}),10) - 1;
				// store the jstree instance id to the container element
				$.data(this, "jstree_instance_id", instance_id);
				// clean up all plugins
				b.plugins = $.isArray(b.plugins) ? b.plugins : $.jstree.defaults.plugins.slice();
				b.plugins.unshift("core");
				// only unique plugins
				b.plugins = b.plugins.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(",");

				// extend defaults with passed data
				s = $.extend(true, {}, $.jstree.defaults, b);
				s.plugins = b.plugins;
				$.each(plugins, function (i, val) { 
					if($.inArray(i, s.plugins) === -1) { s[i] = null; delete s[i]; } 
					else { t.push(i); }
				});
				s.plugins = t;

				// push the new object to the instances array (at the same time set the default classes to the container) and init
				instances[instance_id] = new $.jstree._instance(instance_id, $(this).addClass("jstree jstree-" + instance_id), s); 
				// init all activated plugins for this instance
				$.each(instances[instance_id]._get_settings().plugins, function (i, val) { instances[instance_id].data[val] = {}; });
				$.each(instances[instance_id]._get_settings().plugins, function (i, val) { if(plugins[val]) { plugins[val].__init.apply(instances[instance_id]); } });
				// initialize the instance
				setTimeout(function() { if(instances[instance_id]) { instances[instance_id].init(); } }, 0);
			});
		}
		// return the jquery selection (or if it was a method call that returned a value - the returned value)
		return returnValue;
	};
	// object to store exposed functions and objects
	$.jstree = {
		defaults : {
			plugins : []
		},
		_focused : function () { return instances[focused_instance] || null; },
		_reference : function (needle) { 
			// get by instance id
			if(instances[needle]) { return instances[needle]; }
			// get by DOM (if still no luck - return null
			var o = $(needle); 
			if(!o.length && typeof needle === "string") { o = $("#" + needle); }
			if(!o.length) { return null; }
			return instances[o.closest(".jstree").data("jstree_instance_id")] || null; 
		},
		_instance : function (index, container, settings) { 
			// for plugins to store data in
			this.data = { core : {} };
			this.get_settings	= function () { return $.extend(true, {}, settings); };
			this._get_settings	= function () { return settings; };
			this.get_index		= function () { return index; };
			this.get_container	= function () { return container; };
			this.get_container_ul = function () { return container.children("ul:eq(0)"); };
			this._set_settings	= function (s) { 
				settings = $.extend(true, {}, settings, s);
			};
		},
		_fn : { },
		plugin : function (pname, pdata) {
			pdata = $.extend({}, {
				__init		: $.noop, 
				__destroy	: $.noop,
				_fn			: {},
				defaults	: false
			}, pdata);
			plugins[pname] = pdata;

			$.jstree.defaults[pname] = pdata.defaults;
			$.each(pdata._fn, function (i, val) {
				val.plugin		= pname;
				val.old			= $.jstree._fn[i];
				$.jstree._fn[i] = function () {
					var rslt,
						func = val,
						args = Array.prototype.slice.call(arguments),
						evnt = new $.Event("before.jstree"),
						rlbk = false;

					if(this.data.core.locked === true && i !== "unlock" && i !== "is_locked") { return; }

					// Check if function belongs to the included plugins of this instance
					do {
						if(func && func.plugin && $.inArray(func.plugin, this._get_settings().plugins) !== -1) { break; }
						func = func.old;
					} while(func);
					if(!func) { return; }

					// context and function to trigger events, then finally call the function
					if(i.indexOf("_") === 0) {
						rslt = func.apply(this, args);
					}
					else {
						rslt = this.get_container().triggerHandler(evnt, { "func" : i, "inst" : this, "args" : args, "plugin" : func.plugin });
						if(rslt === false) { return; }
						if(typeof rslt !== "undefined") { args = rslt; }

						rslt = func.apply(
							$.extend({}, this, { 
								__callback : function (data) { 
									this.get_container().triggerHandler( i + '.jstree', { "inst" : this, "args" : args, "rslt" : data, "rlbk" : rlbk });
								},
								__rollback : function () { 
									rlbk = this.get_rollback();
									return rlbk;
								},
								__call_old : function (replace_arguments) {
									return func.old.apply(this, (replace_arguments ? Array.prototype.slice.call(arguments, 1) : args ) );
								}
							}), args);
					}

					// return the result
					return rslt;
				};
				$.jstree._fn[i].old = val.old;
				$.jstree._fn[i].plugin = pname;
			});
		},
		rollback : function (rb) {
			if(rb) {
				if(!$.isArray(rb)) { rb = [ rb ]; }
				$.each(rb, function (i, val) {
					instances[val.i].set_rollback(val.h, val.d);
				});
			}
		}
	};
	// set the prototype for all instances
	$.jstree._fn = $.jstree._instance.prototype = {};

	// load the css when DOM is ready
	$(function() {
		// code is copied from jQuery ($.browser is deprecated + there is a bug in IE)
		var u = navigator.userAgent.toLowerCase(),
			v = (u.match( /.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
			css_string = '' + 
				'.jstree ul, .jstree li { display:block; margin:0 0 0 0; padding:0 0 0 0; list-style-type:none; } ' + 
				'.jstree li { display:block; min-height:18px; line-height:18px; white-space:nowrap; margin-left:18px; min-width:18px; } ' + 
				'.jstree-rtl li { margin-left:0; margin-right:18px; } ' + 
				'.jstree > ul > li { margin-left:0px; } ' + 
				'.jstree-rtl > ul > li { margin-right:0px; } ' + 
				'.jstree ins { display:inline-block; text-decoration:none; width:18px; height:18px; margin:0 0 0 0; padding:0; } ' + 
				'.jstree a { display:inline-block; line-height:16px; height:16px; color:black; white-space:nowrap; text-decoration:none; padding:1px 2px; margin:0; } ' + 
				'.jstree a:focus { outline: none; } ' + 
				'.jstree a > ins { height:16px; width:16px; } ' + 
				'.jstree a > .jstree-icon { margin-right:3px; } ' + 
				'.jstree-rtl a > .jstree-icon { margin-left:3px; margin-right:0; } ' + 
				'li.jstree-open > ul { display:block; } ' + 
				'li.jstree-closed > ul { display:none; } ';
		// Correct IE 6 (does not support the > CSS selector)
		if(/msie/.test(u) && parseInt(v, 10) == 6) { 
			is_ie6 = true;

			// fix image flicker and lack of caching
			try {
				document.execCommand("BackgroundImageCache", false, true);
			} catch (err) { }

			css_string += '' + 
				'.jstree li { height:18px; margin-left:0; margin-right:0; } ' + 
				'.jstree li li { margin-left:18px; } ' + 
				'.jstree-rtl li li { margin-left:0px; margin-right:18px; } ' + 
				'li.jstree-open ul { display:block; } ' + 
				'li.jstree-closed ul { display:none !important; } ' + 
				'.jstree li a { display:inline; border-width:0 !important; padding:0px 2px !important; } ' + 
				'.jstree li a ins { height:16px; width:16px; margin-right:3px; } ' + 
				'.jstree-rtl li a ins { margin-right:0px; margin-left:3px; } ';
		}
		// Correct IE 7 (shifts anchor nodes onhover)
		if(/msie/.test(u) && parseInt(v, 10) == 7) { 
			is_ie7 = true;
			css_string += '.jstree li a { border-width:0 !important; padding:0px 2px !important; } ';
		}
		// correct ff2 lack of display:inline-block
		if(!/compatible/.test(u) && /mozilla/.test(u) && parseFloat(v, 10) < 1.9) {
			is_ff2 = true;
			css_string += '' + 
				'.jstree ins { display:-moz-inline-box; } ' + 
				'.jstree li { line-height:12px; } ' + // WHY??
				'.jstree a { display:-moz-inline-box; } ' + 
				'.jstree .jstree-no-icons .jstree-checkbox { display:-moz-inline-stack !important; } ';
				/* this shouldn't be here as it is theme specific */
		}
		// the default stylesheet
		$.vakata.css.add_sheet({ str : css_string, title : "jstree" });
	});

	// core functions (open, close, create, update, delete)
	$.jstree.plugin("core", {
		__init : function () {
			this.data.core.locked = false;
			this.data.core.to_open = this.get_settings().core.initially_open;
			this.data.core.to_load = this.get_settings().core.initially_load;
		},
		defaults : { 
			html_titles	: false,
			animation	: 500,
			initially_open : [],
			initially_load : [],
			open_parents : true,
			notify_plugins : true,
			rtl			: false,
			load_open	: false,
			strings		: {
				loading		: "Loading ...",
				new_node	: "New node",
				multiple_selection : "Multiple selection"
			}
		},
		_fn : { 
			init	: function () { 
				this.set_focus(); 
				if(this._get_settings().core.rtl) {
					this.get_container().addClass("jstree-rtl").css("direction", "rtl");
				}
				this.get_container().html("<ul><li class='jstree-last jstree-leaf'><ins>&#160;</ins><a class='jstree-loading' href='#'><ins class='jstree-icon'>&#160;</ins>" + this._get_string("loading") + "</a></li></ul>");
				this.data.core.li_height = this.get_container_ul().find("li.jstree-closed, li.jstree-leaf").eq(0).height() || 18;

				this.get_container()
					.delegate("li > ins", "click.jstree", $.proxy(function (event) {
							var trgt = $(event.target);
							// if(trgt.is("ins") && event.pageY - trgt.offset().top < this.data.core.li_height) { this.toggle_node(trgt); }
							this.toggle_node(trgt);
						}, this))
					.bind("mousedown.jstree", $.proxy(function () { 
							this.set_focus(); // This used to be setTimeout(set_focus,0) - why?
						}, this))
					.bind("dblclick.jstree", function (event) { 
						var sel;
						if(document.selection && document.selection.empty) { document.selection.empty(); }
						else {
							if(window.getSelection) {
								sel = window.getSelection();
								try { 
									sel.removeAllRanges();
									sel.collapse();
								} catch (err) { }
							}
						}
					});
				if(this._get_settings().core.notify_plugins) {
					this.get_container()
						.bind("load_node.jstree", $.proxy(function (e, data) { 
								var o = this._get_node(data.rslt.obj),
									t = this;
								if(o === -1) { o = this.get_container_ul(); }
								if(!o.length) { return; }
								o.find("li").each(function () {
									var th = $(this);
									if(th.data("jstree")) {
										$.each(th.data("jstree"), function (plugin, values) {
											if(t.data[plugin] && $.isFunction(t["_" + plugin + "_notify"])) {
												t["_" + plugin + "_notify"].call(t, th, values);
											}
										});
									}
								});
							}, this));
				}
				if(this._get_settings().core.load_open) {
					this.get_container()
						.bind("load_node.jstree", $.proxy(function (e, data) { 
								var o = this._get_node(data.rslt.obj),
									t = this;
								if(o === -1) { o = this.get_container_ul(); }
								if(!o.length) { return; }
								o.find("li.jstree-open:not(:has(ul))").each(function () {
									t.load_node(this, $.noop, $.noop);
								});
							}, this));
				}
				this.__callback();
				this.load_node(-1, function () { this.loaded(); this.reload_nodes(); });
			},
			destroy	: function () { 
				var i,
					n = this.get_index(),
					s = this._get_settings(),
					_this = this;

				$.each(s.plugins, function (i, val) {
					try { plugins[val].__destroy.apply(_this); } catch(err) { }
				});
				this.__callback();
				// set focus to another instance if this one is focused
				if(this.is_focused()) { 
					for(i in instances) { 
						if(instances.hasOwnProperty(i) && i != n) { 
							instances[i].set_focus(); 
							break; 
						} 
					}
				}
				// if no other instance found
				if(n === focused_instance) { focused_instance = -1; }
				// remove all traces of jstree in the DOM (only the ones set using jstree*) and cleans all events
				this.get_container()
					.unbind(".jstree")
					.undelegate(".jstree")
					.removeData("jstree_instance_id")
					.find("[class^='jstree']")
						.andSelf()
						.attr("class", function () { return this.className.replace(/jstree[^ ]*|$/ig,''); });
				$(document)
					.unbind(".jstree-" + n)
					.undelegate(".jstree-" + n);
				// remove the actual data
				instances[n] = null;
				delete instances[n];
			},

			_core_notify : function (n, data) {
				if(data.opened) {
					this.open_node(n, false, true);
				}
			},

			lock : function () {
				this.data.core.locked = true;
				this.get_container().children("ul").addClass("jstree-locked").css("opacity","0.7");
				this.__callback({});
			},
			unlock : function () {
				this.data.core.locked = false;
				this.get_container().children("ul").removeClass("jstree-locked").css("opacity","1");
				this.__callback({});
			},
			is_locked : function () { return this.data.core.locked; },
			save_opened : function () {
				var _this = this;
				this.data.core.to_open = [];
				this.get_container_ul().find("li.jstree-open").each(function () { 
					if(this.id) { _this.data.core.to_open.push("#" + this.id.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:")); }
				});
				this.__callback(_this.data.core.to_open);
			},
			save_loaded : function () { },
			reload_nodes : function (is_callback) {
				var _this = this,
					done = true,
					current = [],
					remaining = [];
				if(!is_callback) { 
					this.data.core.reopen = false; 
					this.data.core.refreshing = true; 
					this.data.core.to_open = $.map($.makeArray(this.data.core.to_open), function (n) { return "#" + n.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:"); });
					this.data.core.to_load = $.map($.makeArray(this.data.core.to_load), function (n) { return "#" + n.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:"); });
					if(this.data.core.to_open.length) {
						this.data.core.to_load = this.data.core.to_load.concat(this.data.core.to_open);
					}
				}
				if(this.data.core.to_load.length) {
					$.each(this.data.core.to_load, function (i, val) {
						if(val == "#") { return true; }
						if($(val).length) { current.push(val); }
						else { remaining.push(val); }
					});
					if(current.length) {
						this.data.core.to_load = remaining;
						$.each(current, function (i, val) { 
							if(!_this._is_loaded(val)) {
								_this.load_node(val, function () { _this.reload_nodes(true); }, function () { _this.reload_nodes(true); });
								done = false;
							}
						});
					}
				}
				if(this.data.core.to_open.length) {
					$.each(this.data.core.to_open, function (i, val) {
						_this.open_node(val, false, true); 
					});
				}
				if(done) { 
					// TODO: find a more elegant approach to syncronizing returning requests
					if(this.data.core.reopen) { clearTimeout(this.data.core.reopen); }
					this.data.core.reopen = setTimeout(function () { _this.__callback({}, _this); }, 50);
					this.data.core.refreshing = false;
					this.reopen();
				}
			},
			reopen : function () {
				var _this = this;
				if(this.data.core.to_open.length) {
					$.each(this.data.core.to_open, function (i, val) {
						_this.open_node(val, false, true); 
					});
				}
				this.__callback({});
			},
			refresh : function (obj) {
				var _this = this;
				this.save_opened();
				if(!obj) { obj = -1; }
				obj = this._get_node(obj);
				if(!obj) { obj = -1; }
				if(obj !== -1) { obj.children("UL").remove(); }
				else { this.get_container_ul().empty(); }
				this.load_node(obj, function () { _this.__callback({ "obj" : obj}); _this.reload_nodes(); });
			},
			// Dummy function to fire after the first load (so that there is a jstree.loaded event)
			loaded	: function () { 
				this.__callback(); 
			},
			// deal with focus
			set_focus	: function () { 
				if(this.is_focused()) { return; }
				var f = $.jstree._focused();
				if(f) { f.unset_focus(); }

				this.get_container().addClass("jstree-focused"); 
				focused_instance = this.get_index(); 
				this.__callback();
			},
			is_focused	: function () { 
				return focused_instance == this.get_index(); 
			},
			unset_focus	: function () {
				if(this.is_focused()) {
					this.get_container().removeClass("jstree-focused"); 
					focused_instance = -1; 
				}
				this.__callback();
			},

			// traverse
			_get_node		: function (obj) { 
				var $obj = $(obj, this.get_container()); 
				if($obj.is(".jstree") || obj == -1) { return -1; } 
				$obj = $obj.closest("li", this.get_container()); 
				return $obj.length ? $obj : false; 
			},
			_get_next		: function (obj, strict) {
				obj = this._get_node(obj);
				if(obj === -1) { return this.get_container().find("> ul > li:first-child"); }
				if(!obj.length) { return false; }
				if(strict) { return (obj.nextAll("li").size() > 0) ? obj.nextAll("li:eq(0)") : false; }

				if(obj.hasClass("jstree-open")) { return obj.find("li:eq(0)"); }
				else if(obj.nextAll("li").size() > 0) { return obj.nextAll("li:eq(0)"); }
				else { return obj.parentsUntil(".jstree","li").next("li").eq(0); }
			},
			_get_prev		: function (obj, strict) {
				obj = this._get_node(obj);
				if(obj === -1) { return this.get_container().find("> ul > li:last-child"); }
				if(!obj.length) { return false; }
				if(strict) { return (obj.prevAll("li").length > 0) ? obj.prevAll("li:eq(0)") : false; }

				if(obj.prev("li").length) {
					obj = obj.prev("li").eq(0);
					while(obj.hasClass("jstree-open")) { obj = obj.children("ul:eq(0)").children("li:last"); }
					return obj;
				}
				else { var o = obj.parentsUntil(".jstree","li:eq(0)"); return o.length ? o : false; }
			},
			_get_parent		: function (obj) {
				obj = this._get_node(obj);
				if(obj == -1 || !obj.length) { return false; }
				var o = obj.parentsUntil(".jstree", "li:eq(0)");
				return o.length ? o : -1;
			},
			_get_children	: function (obj) {
				obj = this._get_node(obj);
				if(obj === -1) { return this.get_container().children("ul:eq(0)").children("li"); }
				if(!obj.length) { return false; }
				return obj.children("ul:eq(0)").children("li");
			},
			get_path		: function (obj, id_mode) {
				var p = [],
					_this = this;
				obj = this._get_node(obj);
				if(obj === -1 || !obj || !obj.length) { return false; }
				obj.parentsUntil(".jstree", "li").each(function () {
					p.push( id_mode ? this.id : _this.get_text(this) );
				});
				p.reverse();
				p.push( id_mode ? obj.attr("id") : this.get_text(obj) );
				return p;
			},

			// string functions
			_get_string : function (key) {
				return this._get_settings().core.strings[key] || key;
			},

			is_open		: function (obj) { obj = this._get_node(obj); return obj && obj !== -1 && obj.hasClass("jstree-open"); },
			is_closed	: function (obj) { obj = this._get_node(obj); return obj && obj !== -1 && obj.hasClass("jstree-closed"); },
			is_leaf		: function (obj) { obj = this._get_node(obj); return obj && obj !== -1 && obj.hasClass("jstree-leaf"); },
			correct_state	: function (obj) {
				obj = this._get_node(obj);
				if(!obj || obj === -1) { return false; }
				obj.removeClass("jstree-closed jstree-open").addClass("jstree-leaf").children("ul").remove();
				this.__callback({ "obj" : obj });
			},
			// open/close
			open_node	: function (obj, callback, skip_animation) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				if(!obj.hasClass("jstree-closed")) { if(callback) { callback.call(); } return false; }
				var s = skip_animation || is_ie6 ? 0 : this._get_settings().core.animation,
					t = this;
				if(!this._is_loaded(obj)) {
					obj.children("a").addClass("jstree-loading");
					this.load_node(obj, function () { t.open_node(obj, callback, skip_animation); }, callback);
				}
				else {
					if(this._get_settings().core.open_parents) {
						obj.parentsUntil(".jstree",".jstree-closed").each(function () {
							t.open_node(this, false, true);
						});
					}
					if(s) { obj.children("ul").css("display","none"); }
					obj.removeClass("jstree-closed").addClass("jstree-open").children("a").removeClass("jstree-loading");
					if(s) { obj.children("ul").stop(true, true).slideDown(s, function () { this.style.display = ""; t.after_open(obj); }); }
					else { t.after_open(obj); }
					this.__callback({ "obj" : obj });
					if(callback) { callback.call(); }
				}
			},
			after_open	: function (obj) { this.__callback({ "obj" : obj }); },
			close_node	: function (obj, skip_animation) {
				obj = this._get_node(obj);
				var s = skip_animation || is_ie6 ? 0 : this._get_settings().core.animation,
					t = this;
				if(!obj.length || !obj.hasClass("jstree-open")) { return false; }
				if(s) { obj.children("ul").attr("style","display:block !important"); }
				obj.removeClass("jstree-open").addClass("jstree-closed");
				if(s) { obj.children("ul").stop(true, true).slideUp(s, function () { this.style.display = ""; t.after_close(obj); }); }
				else { t.after_close(obj); }
				this.__callback({ "obj" : obj });
			},
			after_close	: function (obj) { this.__callback({ "obj" : obj }); },
			toggle_node	: function (obj) {
				obj = this._get_node(obj);
				if(obj.hasClass("jstree-closed")) { return this.open_node(obj); }
				if(obj.hasClass("jstree-open")) { return this.close_node(obj); }
			},
			open_all	: function (obj, do_animation, original_obj) {
				obj = obj ? this._get_node(obj) : -1;
				if(!obj || obj === -1) { obj = this.get_container_ul(); }
				if(original_obj) { 
					obj = obj.find("li.jstree-closed");
				}
				else {
					original_obj = obj;
					if(obj.is(".jstree-closed")) { obj = obj.find("li.jstree-closed").andSelf(); }
					else { obj = obj.find("li.jstree-closed"); }
				}
				var _this = this;
				obj.each(function () { 
					var __this = this; 
					if(!_this._is_loaded(this)) { _this.open_node(this, function() { _this.open_all(__this, do_animation, original_obj); }, !do_animation); }
					else { _this.open_node(this, false, !do_animation); }
				});
				// so that callback is fired AFTER all nodes are open
				if(original_obj.find('li.jstree-closed').length === 0) { this.__callback({ "obj" : original_obj }); }
			},
			close_all	: function (obj, do_animation) {
				var _this = this;
				obj = obj ? this._get_node(obj) : this.get_container();
				if(!obj || obj === -1) { obj = this.get_container_ul(); }
				obj.find("li.jstree-open").andSelf().each(function () { _this.close_node(this, !do_animation); });
				this.__callback({ "obj" : obj });
			},
			clean_node	: function (obj) {
				obj = obj && obj != -1 ? $(obj) : this.get_container_ul();
				obj = obj.is("li") ? obj.find("li").andSelf() : obj.find("li");
				obj.removeClass("jstree-last")
					.filter("li:last-child").addClass("jstree-last").end()
					.filter(":has(li)")
						.not(".jstree-open").removeClass("jstree-leaf").addClass("jstree-closed");
				obj.not(".jstree-open, .jstree-closed").addClass("jstree-leaf").children("ul").remove();
				this.__callback({ "obj" : obj });
			},
			// rollback
			get_rollback : function () { 
				this.__callback();
				return { i : this.get_index(), h : this.get_container().children("ul").clone(true), d : this.data }; 
			},
			set_rollback : function (html, data) {
				this.get_container().empty().append(html);
				this.data = data;
				this.__callback();
			},
			// Dummy functions to be overwritten by any datastore plugin included
			load_node	: function (obj, s_call, e_call) { this.__callback({ "obj" : obj }); },
			_is_loaded	: function (obj) { return true; },

			// Basic operations: create
			create_node	: function (obj, position, js, callback, is_loaded) {
				obj = this._get_node(obj);
				position = typeof position === "undefined" ? "last" : position;
				var d = $("<li />"),
					s = this._get_settings().core,
					tmp;

				if(obj !== -1 && !obj.length) { return false; }
				if(!is_loaded && !this._is_loaded(obj)) { this.load_node(obj, function () { this.create_node(obj, position, js, callback, true); }); return false; }

				this.__rollback();

				if(typeof js === "string") { js = { "data" : js }; }
				if(!js) { js = {}; }
				if(js.attr) { d.attr(js.attr); }
				if(js.metadata) { d.data(js.metadata); }
				if(js.state) { d.addClass("jstree-" + js.state); }
				if(!js.data) { js.data = this._get_string("new_node"); }
				if(!$.isArray(js.data)) { tmp = js.data; js.data = []; js.data.push(tmp); }
				$.each(js.data, function (i, m) {
					tmp = $("<a />");
					if($.isFunction(m)) { m = m.call(this, js); }
					if(typeof m == "string") { tmp.attr('href','#')[ s.html_titles ? "html" : "text" ](m); }
					else {
						if(!m.attr) { m.attr = {}; }
						if(!m.attr.href) { m.attr.href = '#'; }
						tmp.attr(m.attr)[ s.html_titles ? "html" : "text" ](m.title);
						if(m.language) { tmp.addClass(m.language); }
					}
					tmp.prepend("<ins class='jstree-icon'>&#160;</ins>");
					if(!m.icon && js.icon) { m.icon = js.icon; }
					if(m.icon) { 
						if(m.icon.indexOf("/") === -1) { tmp.children("ins").addClass(m.icon); }
						else { tmp.children("ins").css("background","url('" + m.icon + "') center center no-repeat"); }
					}
					d.append(tmp);
				});
				d.prepend("<ins class='jstree-icon'>&#160;</ins>");
				if(obj === -1) {
					obj = this.get_container();
					if(position === "before") { position = "first"; }
					if(position === "after") { position = "last"; }
				}
				switch(position) {
					case "before": obj.before(d); tmp = this._get_parent(obj); break;
					case "after" : obj.after(d);  tmp = this._get_parent(obj); break;
					case "inside":
					case "first" :
						if(!obj.children("ul").length) { obj.append("<ul />"); }
						obj.children("ul").prepend(d);
						tmp = obj;
						break;
					case "last":
						if(!obj.children("ul").length) { obj.append("<ul />"); }
						obj.children("ul").append(d);
						tmp = obj;
						break;
					default:
						if(!obj.children("ul").length) { obj.append("<ul />"); }
						if(!position) { position = 0; }
						tmp = obj.children("ul").children("li").eq(position);
						if(tmp.length) { tmp.before(d); }
						else { obj.children("ul").append(d); }
						tmp = obj;
						break;
				}
				if(tmp === -1 || tmp.get(0) === this.get_container().get(0)) { tmp = -1; }
				this.clean_node(tmp);
				this.__callback({ "obj" : d, "parent" : tmp });
				if(callback) { callback.call(this, d); }
				return d;
			},
			// Basic operations: rename (deal with text)
			get_text	: function (obj) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				var s = this._get_settings().core.html_titles;
				obj = obj.children("a:eq(0)");
				if(s) {
					obj = obj.clone();
					obj.children("INS").remove();
					return obj.html();
				}
				else {
					obj = obj.contents().filter(function() { return this.nodeType == 3; })[0];
					return obj.nodeValue;
				}
			},
			set_text	: function (obj, val) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				obj = obj.children("a:eq(0)");
				if(this._get_settings().core.html_titles) {
					var tmp = obj.children("INS").clone();
					obj.html(val).prepend(tmp);
					this.__callback({ "obj" : obj, "name" : val });
					return true;
				}
				else {
					obj = obj.contents().filter(function() { return this.nodeType == 3; })[0];
					this.__callback({ "obj" : obj, "name" : val });
					return (obj.nodeValue = val);
				}
			},
			rename_node : function (obj, val) {
				obj = this._get_node(obj);
				this.__rollback();
				if(obj && obj.length && this.set_text.apply(this, Array.prototype.slice.call(arguments))) { this.__callback({ "obj" : obj, "name" : val }); }
			},
			// Basic operations: deleting nodes
			delete_node : function (obj) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				this.__rollback();
				var p = this._get_parent(obj), prev = $([]), t = this;
				obj.each(function () {
					prev = prev.add(t._get_prev(this));
				});
				obj = obj.detach();
				if(p !== -1 && p.find("> ul > li").length === 0) {
					p.removeClass("jstree-open jstree-closed").addClass("jstree-leaf");
				}
				this.clean_node(p);
				this.__callback({ "obj" : obj, "prev" : prev, "parent" : p });
				return obj;
			},
			prepare_move : function (o, r, pos, cb, is_cb) {
				var p = {};

				p.ot = $.jstree._reference(o) || this;
				p.o = p.ot._get_node(o);
				p.r = r === - 1 ? -1 : this._get_node(r);
				p.p = (typeof pos === "undefined" || pos === false) ? "last" : pos; // TODO: move to a setting
				if(!is_cb && prepared_move.o && prepared_move.o[0] === p.o[0] && prepared_move.r[0] === p.r[0] && prepared_move.p === p.p) {
					this.__callback(prepared_move);
					if(cb) { cb.call(this, prepared_move); }
					return;
				}
				p.ot = $.jstree._reference(p.o) || this;
				p.rt = $.jstree._reference(p.r) || this; // r === -1 ? p.ot : $.jstree._reference(p.r) || this
				if(p.r === -1 || !p.r) {
					p.cr = -1;
					switch(p.p) {
						case "first":
						case "before":
						case "inside":
							p.cp = 0; 
							break;
						case "after":
						case "last":
							p.cp = p.rt.get_container().find(" > ul > li").length; 
							break;
						default:
							p.cp = p.p;
							break;
					}
				}
				else {
					if(!/^(before|after)$/.test(p.p) && !this._is_loaded(p.r)) {
						return this.load_node(p.r, function () { this.prepare_move(o, r, pos, cb, true); });
					}
					switch(p.p) {
						case "before":
							p.cp = p.r.index();
							p.cr = p.rt._get_parent(p.r);
							break;
						case "after":
							p.cp = p.r.index() + 1;
							p.cr = p.rt._get_parent(p.r);
							break;
						case "inside":
						case "first":
							p.cp = 0;
							p.cr = p.r;
							break;
						case "last":
							p.cp = p.r.find(" > ul > li").length; 
							p.cr = p.r;
							break;
						default: 
							p.cp = p.p;
							p.cr = p.r;
							break;
					}
				}
				p.np = p.cr == -1 ? p.rt.get_container() : p.cr;
				p.op = p.ot._get_parent(p.o);
				p.cop = p.o.index();
				if(p.op === -1) { p.op = p.ot ? p.ot.get_container() : this.get_container(); }
				if(!/^(before|after)$/.test(p.p) && p.op && p.np && p.op[0] === p.np[0] && p.o.index() < p.cp) { p.cp++; }
				//if(p.p === "before" && p.op && p.np && p.op[0] === p.np[0] && p.o.index() < p.cp) { p.cp--; }
				p.or = p.np.find(" > ul > li:nth-child(" + (p.cp + 1) + ")");
				prepared_move = p;
				this.__callback(prepared_move);
				if(cb) { cb.call(this, prepared_move); }
			},
			check_move : function () {
				var obj = prepared_move, ret = true, r = obj.r === -1 ? this.get_container() : obj.r;
				if(!obj || !obj.o || obj.or[0] === obj.o[0]) { return false; }
				if(!obj.cy) {
					if(obj.op && obj.np && obj.op[0] === obj.np[0] && obj.cp - 1 === obj.o.index()) { return false; }
					obj.o.each(function () { 
						if(r.parentsUntil(".jstree", "li").andSelf().index(this) !== -1) { ret = false; return false; }
					});
				}
				return ret;
			},
			move_node : function (obj, ref, position, is_copy, is_prepared, skip_check) {
				if(!is_prepared) { 
					return this.prepare_move(obj, ref, position, function (p) {
						this.move_node(p, false, false, is_copy, true, skip_check);
					});
				}
				if(is_copy) { 
					prepared_move.cy = true;
				}
				if(!skip_check && !this.check_move()) { return false; }

				this.__rollback();
				var o = false;
				if(is_copy) {
					o = obj.o.clone(true);
					o.find("*[id]").andSelf().each(function () {
						if(this.id) { this.id = "copy_" + this.id; }
					});
				}
				else { o = obj.o; }

				if(obj.or.length) { obj.or.before(o); }
				else { 
					if(!obj.np.children("ul").length) { $("<ul />").appendTo(obj.np); }
					obj.np.children("ul:eq(0)").append(o); 
				}

				try { 
					obj.ot.clean_node(obj.op);
					obj.rt.clean_node(obj.np);
					if(!obj.op.find("> ul > li").length) {
						obj.op.removeClass("jstree-open jstree-closed").addClass("jstree-leaf").children("ul").remove();
					}
				} catch (e) { }

				if(is_copy) { 
					prepared_move.cy = true;
					prepared_move.oc = o; 
				}
				this.__callback(prepared_move);
				return prepared_move;
			},
			_get_move : function () { return prepared_move; }
		}
	});
})(jQuery);
//*/

/* 
 * jsTree ui plugin
 * This plugins handles selecting/deselecting/hovering/dehovering nodes
 */
(function ($) {
	var scrollbar_width, e1, e2;
	$(function() {
		if (/msie/.test(navigator.userAgent.toLowerCase())) {
			e1 = $('<textarea cols="10" rows="2"></textarea>').css({ position: 'absolute', top: -1000, left: 0 }).appendTo('body');
			e2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({ position: 'absolute', top: -1000, left: 0 }).appendTo('body');
			scrollbar_width = e1.width() - e2.width();
			e1.add(e2).remove();
		} 
		else {
			e1 = $('<div />').css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: 0 })
					.prependTo('body').append('<div />').find('div').css({ width: '100%', height: 200 });
			scrollbar_width = 100 - e1.width();
			e1.parent().remove();
		}
	});
	$.jstree.plugin("ui", {
		__init : function () { 
			this.data.ui.selected = $(); 
			this.data.ui.last_selected = false; 
			this.data.ui.hovered = null;
			this.data.ui.to_select = this.get_settings().ui.initially_select;

			this.get_container()
				.delegate("a", "click.jstree", $.proxy(function (event) {
						event.preventDefault();
						event.currentTarget.blur();
						if(!$(event.currentTarget).hasClass("jstree-loading")) {
							this.select_node(event.currentTarget, true, event);
						}
					}, this))
				.delegate("a", "mouseenter.jstree", $.proxy(function (event) {
						if(!$(event.currentTarget).hasClass("jstree-loading")) {
							this.hover_node(event.target);
						}
					}, this))
				.delegate("a", "mouseleave.jstree", $.proxy(function (event) {
						if(!$(event.currentTarget).hasClass("jstree-loading")) {
							this.dehover_node(event.target);
						}
					}, this))
				.bind("reopen.jstree", $.proxy(function () { 
						this.reselect();
					}, this))
				.bind("get_rollback.jstree", $.proxy(function () { 
						this.dehover_node();
						this.save_selected();
					}, this))
				.bind("set_rollback.jstree", $.proxy(function () { 
						this.reselect();
					}, this))
				.bind("close_node.jstree", $.proxy(function (event, data) { 
						var s = this._get_settings().ui,
							obj = this._get_node(data.rslt.obj),
							clk = (obj && obj.length) ? obj.children("ul").find("a.jstree-clicked") : $(),
							_this = this;
						if(s.selected_parent_close === false || !clk.length) { return; }
						clk.each(function () { 
							_this.deselect_node(this);
							if(s.selected_parent_close === "select_parent") { _this.select_node(obj); }
						});
					}, this))
				.bind("delete_node.jstree", $.proxy(function (event, data) { 
						var s = this._get_settings().ui.select_prev_on_delete,
							obj = this._get_node(data.rslt.obj),
							clk = (obj && obj.length) ? obj.find("a.jstree-clicked") : [],
							_this = this;
						clk.each(function () { _this.deselect_node(this); });
						if(s && clk.length) { 
							data.rslt.prev.each(function () { 
								if(this.parentNode) { _this.select_node(this); return false; /* if return false is removed all prev nodes will be selected */}
							});
						}
					}, this))
				.bind("move_node.jstree", $.proxy(function (event, data) { 
						if(data.rslt.cy) { 
							data.rslt.oc.find("a.jstree-clicked").removeClass("jstree-clicked");
						}
					}, this));
		},
		defaults : {
			select_limit : -1, // 0, 1, 2 ... or -1 for unlimited
			select_multiple_modifier : "ctrl", // on, or ctrl, shift, alt
			select_range_modifier : "shift",
			selected_parent_close : "select_parent", // false, "deselect", "select_parent"
			selected_parent_open : true,
			select_prev_on_delete : true,
			disable_selecting_children : false,
			initially_select : []
		},
		_fn : { 
			_get_node : function (obj, allow_multiple) {
				if(typeof obj === "undefined" || obj === null) { return allow_multiple ? this.data.ui.selected : this.data.ui.last_selected; }
				var $obj = $(obj, this.get_container()); 
				if($obj.is(".jstree") || obj == -1) { return -1; } 
				$obj = $obj.closest("li", this.get_container()); 
				return $obj.length ? $obj : false; 
			},
			_ui_notify : function (n, data) {
				if(data.selected) {
					this.select_node(n, false);
				}
			},
			save_selected : function () {
				var _this = this;
				this.data.ui.to_select = [];
				this.data.ui.selected.each(function () { if(this.id) { _this.data.ui.to_select.push("#" + this.id.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:")); } });
				this.__callback(this.data.ui.to_select);
			},
			reselect : function () {
				var _this = this,
					s = this.data.ui.to_select;
				s = $.map($.makeArray(s), function (n) { return "#" + n.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:"); });
				// this.deselect_all(); WHY deselect, breaks plugin state notifier?
				$.each(s, function (i, val) { if(val && val !== "#") { _this.select_node(val); } });
				this.data.ui.selected = this.data.ui.selected.filter(function () { return this.parentNode; });
				this.__callback();
			},
			refresh : function (obj) {
				this.save_selected();
				return this.__call_old();
			},
			hover_node : function (obj) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				//if(this.data.ui.hovered && obj.get(0) === this.data.ui.hovered.get(0)) { return; }
				if(!obj.hasClass("jstree-hovered")) { this.dehover_node(); }
				this.data.ui.hovered = obj.children("a").addClass("jstree-hovered").parent();
				this._fix_scroll(obj);
				this.__callback({ "obj" : obj });
			},
			dehover_node : function () {
				var obj = this.data.ui.hovered, p;
				if(!obj || !obj.length) { return false; }
				p = obj.children("a").removeClass("jstree-hovered").parent();
				if(this.data.ui.hovered[0] === p[0]) { this.data.ui.hovered = null; }
				this.__callback({ "obj" : obj });
			},
			select_node : function (obj, check, e) {
				obj = this._get_node(obj);
				if(obj == -1 || !obj || !obj.length) { return false; }
				var s = this._get_settings().ui,
					is_multiple = (s.select_multiple_modifier == "on" || (s.select_multiple_modifier !== false && e && e[s.select_multiple_modifier + "Key"])),
					is_range = (s.select_range_modifier !== false && e && e[s.select_range_modifier + "Key"] && this.data.ui.last_selected && this.data.ui.last_selected[0] !== obj[0] && this.data.ui.last_selected.parent()[0] === obj.parent()[0]),
					is_selected = this.is_selected(obj),
					proceed = true,
					t = this;
				if(check) {
					if(s.disable_selecting_children && is_multiple && 
						(
							(obj.parentsUntil(".jstree","li").children("a.jstree-clicked").length) ||
							(obj.children("ul").find("a.jstree-clicked:eq(0)").length)
						)
					) {
						return false;
					}
					proceed = false;
					switch(!0) {
						case (is_range):
							this.data.ui.last_selected.addClass("jstree-last-selected");
							obj = obj[ obj.index() < this.data.ui.last_selected.index() ? "nextUntil" : "prevUntil" ](".jstree-last-selected").andSelf();
							if(s.select_limit == -1 || obj.length < s.select_limit) {
								this.data.ui.last_selected.removeClass("jstree-last-selected");
								this.data.ui.selected.each(function () {
									if(this !== t.data.ui.last_selected[0]) { t.deselect_node(this); }
								});
								is_selected = false;
								proceed = true;
							}
							else {
								proceed = false;
							}
							break;
						case (is_selected && !is_multiple): 
							this.deselect_all();
							is_selected = false;
							proceed = true;
							break;
						case (!is_selected && !is_multiple): 
							if(s.select_limit == -1 || s.select_limit > 0) {
								this.deselect_all();
								proceed = true;
							}
							break;
						case (is_selected && is_multiple): 
							this.deselect_node(obj);
							break;
						case (!is_selected && is_multiple): 
							if(s.select_limit == -1 || this.data.ui.selected.length + 1 <= s.select_limit) { 
								proceed = true;
							}
							break;
					}
				}
				if(proceed && !is_selected) {
					if(!is_range) { this.data.ui.last_selected = obj; }
					obj.children("a").addClass("jstree-clicked");
					if(s.selected_parent_open) {
						obj.parents(".jstree-closed").each(function () { t.open_node(this, false, true); });
					}
					this.data.ui.selected = this.data.ui.selected.add(obj);
					this._fix_scroll(obj.eq(0));
					this.__callback({ "obj" : obj, "e" : e });
				}
			},
			_fix_scroll : function (obj) {
				var c = this.get_container()[0], t;
				if(c.scrollHeight > c.offsetHeight) {
					obj = this._get_node(obj);
					if(!obj || obj === -1 || !obj.length || !obj.is(":visible")) { return; }
					t = obj.offset().top - this.get_container().offset().top;
					if(t < 0) { 
						c.scrollTop = c.scrollTop + t - 1; 
					}
					if(t + this.data.core.li_height + (c.scrollWidth > c.offsetWidth ? scrollbar_width : 0) > c.offsetHeight) { 
						c.scrollTop = c.scrollTop + (t - c.offsetHeight + this.data.core.li_height + 1 + (c.scrollWidth > c.offsetWidth ? scrollbar_width : 0)); 
					}
				}
			},
			deselect_node : function (obj) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				if(this.is_selected(obj)) {
					obj.children("a").removeClass("jstree-clicked");
					this.data.ui.selected = this.data.ui.selected.not(obj);
					if(this.data.ui.last_selected.get(0) === obj.get(0)) { this.data.ui.last_selected = this.data.ui.selected.eq(0); }
					this.__callback({ "obj" : obj });
				}
			},
			toggle_select : function (obj) {
				obj = this._get_node(obj);
				if(!obj.length) { return false; }
				if(this.is_selected(obj)) { this.deselect_node(obj); }
				else { this.select_node(obj); }
			},
			is_selected : function (obj) { return this.data.ui.selected.index(this._get_node(obj)) >= 0; },
			get_selected : function (context) { 
				return context ? $(context).find("a.jstree-clicked").parent() : this.data.ui.selected; 
			},
			deselect_all : function (context) {
				var ret = context ? $(context).find("a.jstree-clicked").parent() : this.get_container().find("a.jstree-clicked").parent();
				ret.children("a.jstree-clicked").removeClass("jstree-clicked");
				this.data.ui.selected = $([]);
				this.data.ui.last_selected = false;
				this.__callback({ "obj" : ret });
			}
		}
	});
	// include the selection plugin by default
	$.jstree.defaults.plugins.push("ui");
})(jQuery);
//*/

/* 
 * jsTree CRRM plugin
 * Handles creating/renaming/removing/moving nodes by user interaction.
 */
(function ($) {
	$.jstree.plugin("crrm", { 
		__init : function () {
			this.get_container()
				.bind("move_node.jstree", $.proxy(function (e, data) {
					if(this._get_settings().crrm.move.open_onmove) {
						var t = this;
						data.rslt.np.parentsUntil(".jstree").andSelf().filter(".jstree-closed").each(function () {
							t.open_node(this, false, true);
						});
					}
				}, this));
		},
		defaults : {
			input_width_limit : 200,
			move : {
				always_copy			: false, // false, true or "multitree"
				open_onmove			: true,
				default_position	: "last",
				check_move			: function (m) { return true; }
			}
		},
		_fn : {
			_show_input : function (obj, callback) {
				obj = this._get_node(obj);
				var rtl = this._get_settings().core.rtl,
					w = this._get_settings().crrm.input_width_limit,
					w1 = obj.children("ins").width(),
					w2 = obj.find("> a:visible > ins").width() * obj.find("> a:visible > ins").length,
					t = this.get_text(obj),
					h1 = $("<div />", { css : { "position" : "absolute", "top" : "-200px", "left" : (rtl ? "0px" : "-1000px"), "visibility" : "hidden" } }).appendTo("body"),
					h2 = obj.css("position","relative").append(
					$("<input />", { 
						"value" : t,
						"class" : "jstree-rename-input",
						// "size" : t.length,
						"css" : {
							"padding" : "0",
							"border" : "1px solid silver",
							"position" : "absolute",
							"left"  : (rtl ? "auto" : (w1 + w2 + 4) + "px"),
							"right" : (rtl ? (w1 + w2 + 4) + "px" : "auto"),
							"top" : "0px",
							"height" : (this.data.core.li_height - 2) + "px",
							"lineHeight" : (this.data.core.li_height - 2) + "px",
							"width" : "150px" // will be set a bit further down
						},
						"blur" : $.proxy(function () {
							var i = obj.children(".jstree-rename-input"),
								v = i.val();
							if(v === "") { v = t; }
							h1.remove();
							i.remove(); // rollback purposes
							this.set_text(obj,t); // rollback purposes
							this.rename_node(obj, v);
							callback.call(this, obj, v, t);
							obj.css("position","");
						}, this),
						"keyup" : function (event) {
							var key = event.keyCode || event.which;
							if(key == 27) { this.value = t; this.blur(); return; }
							else if(key == 13) { this.blur(); return; }
							else {
								h2.width(Math.min(h1.text("pW" + this.value).width(),w));
							}
						},
						"keypress" : function(event) {
							var key = event.keyCode || event.which;
							if(key == 13) { return false; }
						}
					})
				).children(".jstree-rename-input"); 
				this.set_text(obj, "");
				h1.css({
						fontFamily		: h2.css('fontFamily')		|| '',
						fontSize		: h2.css('fontSize')		|| '',
						fontWeight		: h2.css('fontWeight')		|| '',
						fontStyle		: h2.css('fontStyle')		|| '',
						fontStretch		: h2.css('fontStretch')		|| '',
						fontVariant		: h2.css('fontVariant')		|| '',
						letterSpacing	: h2.css('letterSpacing')	|| '',
						wordSpacing		: h2.css('wordSpacing')		|| ''
				});
				h2.width(Math.min(h1.text("pW" + h2[0].value).width(),w))[0].select();
			},
			rename : function (obj) {
				obj = this._get_node(obj);
				this.__rollback();
				var f = this.__callback;
				this._show_input(obj, function (obj, new_name, old_name) { 
					f.call(this, { "obj" : obj, "new_name" : new_name, "old_name" : old_name });
				});
			},
			create : function (obj, position, js, callback, skip_rename) {
				var t, _this = this;
				obj = this._get_node(obj);
				if(!obj) { obj = -1; }
				this.__rollback();
				t = this.create_node(obj, position, js, function (t) {
					var p = this._get_parent(t),
						pos = $(t).index();
					if(callback) { callback.call(this, t); }
					if(p.length && p.hasClass("jstree-closed")) { this.open_node(p, false, true); }
					if(!skip_rename) { 
						this._show_input(t, function (obj, new_name, old_name) { 
							_this.__callback({ "obj" : obj, "name" : new_name, "parent" : p, "position" : pos });
						});
					}
					else { _this.__callback({ "obj" : t, "name" : this.get_text(t), "parent" : p, "position" : pos }); }
				});
				return t;
			},
			remove : function (obj) {
				obj = this._get_node(obj, true);
				var p = this._get_parent(obj), prev = this._get_prev(obj);
				this.__rollback();
				obj = this.delete_node(obj);
				if(obj !== false) { this.__callback({ "obj" : obj, "prev" : prev, "parent" : p }); }
			},
			check_move : function () {
				if(!this.__call_old()) { return false; }
				var s = this._get_settings().crrm.move;
				if(!s.check_move.call(this, this._get_move())) { return false; }
				return true;
			},
			move_node : function (obj, ref, position, is_copy, is_prepared, skip_check) {
				var s = this._get_settings().crrm.move;
				if(!is_prepared) { 
					if(typeof position === "undefined") { position = s.default_position; }
					if(position === "inside" && !s.default_position.match(/^(before|after)$/)) { position = s.default_position; }
					return this.__call_old(true, obj, ref, position, is_copy, false, skip_check);
				}
				// if the move is already prepared
				if(s.always_copy === true || (s.always_copy === "multitree" && obj.rt.get_index() !== obj.ot.get_index() )) {
					is_copy = true;
				}
				this.__call_old(true, obj, ref, position, is_copy, true, skip_check);
			},

			cut : function (obj) {
				obj = this._get_node(obj, true);
				if(!obj || !obj.length) { return false; }
				this.data.crrm.cp_nodes = false;
				this.data.crrm.ct_nodes = obj;
				this.__callback({ "obj" : obj });
			},
			copy : function (obj) {
				obj = this._get_node(obj, true);
				if(!obj || !obj.length) { return false; }
				this.data.crrm.ct_nodes = false;
				this.data.crrm.cp_nodes = obj;
				this.__callback({ "obj" : obj });
			},
			paste : function (obj) { 
				obj = this._get_node(obj);
				if(!obj || !obj.length) { return false; }
				var nodes = this.data.crrm.ct_nodes ? this.data.crrm.ct_nodes : this.data.crrm.cp_nodes;
				if(!this.data.crrm.ct_nodes && !this.data.crrm.cp_nodes) { return false; }
				if(this.data.crrm.ct_nodes) { this.move_node(this.data.crrm.ct_nodes, obj); this.data.crrm.ct_nodes = false; }
				if(this.data.crrm.cp_nodes) { this.move_node(this.data.crrm.cp_nodes, obj, false, true); }
				this.__callback({ "obj" : obj, "nodes" : nodes });
			}
		}
	});
	// include the crr plugin by default
	// $.jstree.defaults.plugins.push("crrm");
})(jQuery);
//*/

/* 
 * jsTree themes plugin
 * Handles loading and setting themes, as well as detecting path to themes, etc.
 */
(function ($) {
	var themes_loaded = [];
	// this variable stores the path to the themes folder - if left as false - it will be autodetected
	$.jstree._themes = false;
	$.jstree.plugin("themes", {
		__init : function () { 
			this.get_container()
				.bind("init.jstree", $.proxy(function () {
						var s = this._get_settings().themes;
						this.data.themes.dots = s.dots; 
						this.data.themes.icons = s.icons; 
						this.set_theme(s.theme, s.url);
					}, this))
				.bind("loaded.jstree", $.proxy(function () {
						// bound here too, as simple HTML tree's won't honor dots & icons otherwise
						if(!this.data.themes.dots) { this.hide_dots(); }
						else { this.show_dots(); }
						if(!this.data.themes.icons) { this.hide_icons(); }
						else { this.show_icons(); }
					}, this));
		},
		defaults : { 
			theme : "default", 
			url : false,
			dots : true,
			icons : true
		},
		_fn : {
			set_theme : function (theme_name, theme_url) {
				if(!theme_name) { return false; }
				if(!theme_url) { theme_url = $.jstree._themes + theme_name + '/style.css'; }
				if($.inArray(theme_url, themes_loaded) == -1) {
					$.vakata.css.add_sheet({ "url" : theme_url });
					themes_loaded.push(theme_url);
				}
				if(this.data.themes.theme != theme_name) {
					this.get_container().removeClass('jstree-' + this.data.themes.theme);
					this.data.themes.theme = theme_name;
				}
				this.get_container().addClass('jstree-' + theme_name);
				if(!this.data.themes.dots) { this.hide_dots(); }
				else { this.show_dots(); }
				if(!this.data.themes.icons) { this.hide_icons(); }
				else { this.show_icons(); }
				this.__callback();
			},
			get_theme	: function () { return this.data.themes.theme; },

			show_dots	: function () { this.data.themes.dots = true; this.get_container().children("ul").removeClass("jstree-no-dots"); },
			hide_dots	: function () { this.data.themes.dots = false; this.get_container().children("ul").addClass("jstree-no-dots"); },
			toggle_dots	: function () { if(this.data.themes.dots) { this.hide_dots(); } else { this.show_dots(); } },

			show_icons	: function () { this.data.themes.icons = true; this.get_container().children("ul").removeClass("jstree-no-icons"); },
			hide_icons	: function () { this.data.themes.icons = false; this.get_container().children("ul").addClass("jstree-no-icons"); },
			toggle_icons: function () { if(this.data.themes.icons) { this.hide_icons(); } else { this.show_icons(); } }
		}
	});
	// autodetect themes path
	$(function () {
		if($.jstree._themes === false) {
			$("script").each(function () { 
				if(this.src.toString().match(/jquery\.jstree[^\/]*?\.js(\?.*)?$/)) { 
					$.jstree._themes = this.src.toString().replace(/jquery\.jstree[^\/]*?\.js(\?.*)?$/, "") + 'themes/'; 
					return false; 
				}
			});
		}
		if($.jstree._themes === false) { $.jstree._themes = "themes/"; }
	});
	// include the themes plugin by default
	$.jstree.defaults.plugins.push("themes");
})(jQuery);
//*/

/*
 * jsTree hotkeys plugin
 * Enables keyboard navigation for all tree instances
 * Depends on the jstree ui & jquery hotkeys plugins
 */
(function ($) {
	var bound = [];
	function exec(i, event) {
		var f = $.jstree._focused(), tmp;
		if(f && f.data && f.data.hotkeys && f.data.hotkeys.enabled) { 
			tmp = f._get_settings().hotkeys[i];
			if(tmp) { return tmp.call(f, event); }
		}
	}
	$.jstree.plugin("hotkeys", {
		__init : function () {
			if(typeof $.hotkeys === "undefined") { throw "jsTree hotkeys: jQuery hotkeys plugin not included."; }
			if(!this.data.ui) { throw "jsTree hotkeys: jsTree UI plugin not included."; }
			$.each(this._get_settings().hotkeys, function (i, v) {
				if(v !== false && $.inArray(i, bound) == -1) {
					$(document).bind("keydown", i, function (event) { return exec(i, event); });
					bound.push(i);
				}
			});
			this.get_container()
				.bind("lock.jstree", $.proxy(function () {
						if(this.data.hotkeys.enabled) { this.data.hotkeys.enabled = false; this.data.hotkeys.revert = true; }
					}, this))
				.bind("unlock.jstree", $.proxy(function () {
						if(this.data.hotkeys.revert) { this.data.hotkeys.enabled = true; }
					}, this));
			this.enable_hotkeys();
		},
		defaults : {
			"up" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
				this.hover_node(this._get_prev(o));
				return false; 
			},
			"ctrl+up" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
				this.hover_node(this._get_prev(o));
				return false; 
			},
			"shift+up" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
				this.hover_node(this._get_prev(o));
				return false; 
			},
			"down" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
				this.hover_node(this._get_next(o));
				return false;
			},
			"ctrl+down" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
				this.hover_node(this._get_next(o));
				return false;
			},
			"shift+down" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected || -1;
				this.hover_node(this._get_next(o));
				return false;
			},
			"left" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected;
				if(o) {
					if(o.hasClass("jstree-open")) { this.close_node(o); }
					else { this.hover_node(this._get_prev(o)); }
				}
				return false;
			},
			"ctrl+left" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected;
				if(o) {
					if(o.hasClass("jstree-open")) { this.close_node(o); }
					else { this.hover_node(this._get_prev(o)); }
				}
				return false;
			},
			"shift+left" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected;
				if(o) {
					if(o.hasClass("jstree-open")) { this.close_node(o); }
					else { this.hover_node(this._get_prev(o)); }
				}
				return false;
			},
			"right" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected;
				if(o && o.length) {
					if(o.hasClass("jstree-closed")) { this.open_node(o); }
					else { this.hover_node(this._get_next(o)); }
				}
				return false;
			},
			"ctrl+right" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected;
				if(o && o.length) {
					if(o.hasClass("jstree-closed")) { this.open_node(o); }
					else { this.hover_node(this._get_next(o)); }
				}
				return false;
			},
			"shift+right" : function () { 
				var o = this.data.ui.hovered || this.data.ui.last_selected;
				if(o && o.length) {
					if(o.hasClass("jstree-closed")) { this.open_node(o); }
					else { this.hover_node(this._get_next(o)); }
				}
				return false;
			},
			"space" : function () { 
				if(this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").click(); } 
				return false; 
			},
			"ctrl+space" : function (event) { 
				event.type = "click";
				if(this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").trigger(event); } 
				return false; 
			},
			"shift+space" : function (event) { 
				event.type = "click";
				if(this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").trigger(event); } 
				return false; 
			},
			"f2" : function () { this.rename(this.data.ui.hovered || this.data.ui.last_selected); },
			"del" : function () { this.remove(this.data.ui.hovered || this._get_node(null)); }
		},
		_fn : {
			enable_hotkeys : function () {
				this.data.hotkeys.enabled = true;
			},
			disable_hotkeys : function () {
				this.data.hotkeys.enabled = false;
			}
		}
	});
})(jQuery);
//*/

/* 
 * jsTree JSON plugin
 * The JSON data store. Datastores are build by overriding the `load_node` and `_is_loaded` functions.
 */
(function ($) {
	$.jstree.plugin("json_data", {
		__init : function() {
			var s = this._get_settings().json_data;
			if(s.progressive_unload) {
				this.get_container().bind("after_close.jstree", function (e, data) {
					data.rslt.obj.children("ul").remove();
				});
			}
		},
		defaults : { 
			// `data` can be a function:
			//  * accepts two arguments - node being loaded and a callback to pass the result to
			//  * will be executed in the current tree's scope & ajax won't be supported
			data : false, 
			ajax : false,
			correct_state : true,
			progressive_render : false,
			progressive_unload : false
		},
		_fn : {
			load_node : function (obj, s_call, e_call) { var _this = this; this.load_node_json(obj, function () { _this.__callback({ "obj" : _this._get_node(obj) }); s_call.call(this); }, e_call); },
			_is_loaded : function (obj) { 
				var s = this._get_settings().json_data;
				obj = this._get_node(obj); 
				return obj == -1 || !obj || (!s.ajax && !s.progressive_render && !$.isFunction(s.data)) || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").length > 0;
			},
			refresh : function (obj) {
				obj = this._get_node(obj);
				var s = this._get_settings().json_data;
				if(obj && obj !== -1 && s.progressive_unload && ($.isFunction(s.data) || !!s.ajax)) {
					obj.removeData("jstree_children");
				}
				return this.__call_old();
			},
			load_node_json : function (obj, s_call, e_call) {
				var s = this.get_settings().json_data, d,
					error_func = function () {},
					success_func = function () {};
				obj = this._get_node(obj);

				if(obj && obj !== -1 && (s.progressive_render || s.progressive_unload) && !obj.is(".jstree-open, .jstree-leaf") && obj.children("ul").children("li").length === 0 && obj.data("jstree_children")) {
					d = this._parse_json(obj.data("jstree_children"), obj);
					if(d) {
						obj.append(d);
						if(!s.progressive_unload) { obj.removeData("jstree_children"); }
					}
					this.clean_node(obj);
					if(s_call) { s_call.call(this); }
					return;
				}

				if(obj && obj !== -1) {
					if(obj.data("jstree_is_loading")) { return; }
					else { obj.data("jstree_is_loading",true); }
				}
				switch(!0) {
					case (!s.data && !s.ajax): throw "Neither data nor ajax settings supplied.";
					// function option added here for easier model integration (also supporting async - see callback)
					case ($.isFunction(s.data)):
						s.data.call(this, obj, $.proxy(function (d) {
							d = this._parse_json(d, obj);
							if(!d) { 
								if(obj === -1 || !obj) {
									if(s.correct_state) { this.get_container().children("ul").empty(); }
								}
								else {
									obj.children("a.jstree-loading").removeClass("jstree-loading");
									obj.removeData("jstree_is_loading");
									if(s.correct_state) { this.correct_state(obj); }
								}
								if(e_call) { e_call.call(this); }
							}
							else {
								if(obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
								else { obj.append(d).children("a.jstree-loading").removeClass("jstree-loading"); obj.removeData("jstree_is_loading"); }
								this.clean_node(obj);
								if(s_call) { s_call.call(this); }
							}
						}, this));
						break;
					case (!!s.data && !s.ajax) || (!!s.data && !!s.ajax && (!obj || obj === -1)):
						if(!obj || obj == -1) {
							d = this._parse_json(s.data, obj);
							if(d) {
								this.get_container().children("ul").empty().append(d.children());
								this.clean_node();
							}
							else { 
								if(s.correct_state) { this.get_container().children("ul").empty(); }
							}
						}
						if(s_call) { s_call.call(this); }
						break;
					case (!s.data && !!s.ajax) || (!!s.data && !!s.ajax && obj && obj !== -1):
						error_func = function (x, t, e) {
							var ef = this.get_settings().json_data.ajax.error; 
							if(ef) { ef.call(this, x, t, e); }
							if(obj != -1 && obj.length) {
								obj.children("a.jstree-loading").removeClass("jstree-loading");
								obj.removeData("jstree_is_loading");
								if(t === "success" && s.correct_state) { this.correct_state(obj); }
							}
							else {
								if(t === "success" && s.correct_state) { this.get_container().children("ul").empty(); }
							}
							if(e_call) { e_call.call(this); }
						};
						success_func = function (d, t, x) {
							var sf = this.get_settings().json_data.ajax.success; 
							if(sf) { d = sf.call(this,d,t,x) || d; }
							if(d === "" || (d && d.toString && d.toString().replace(/^[\s\n]+$/,"") === "") || (!$.isArray(d) && !$.isPlainObject(d))) {
								return error_func.call(this, x, t, "");
							}
							d = this._parse_json(d, obj);
							if(d) {
								if(obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
								else { obj.append(d).children("a.jstree-loading").removeClass("jstree-loading"); obj.removeData("jstree_is_loading"); }
								this.clean_node(obj);
								if(s_call) { s_call.call(this); }
							}
							else {
								if(obj === -1 || !obj) {
									if(s.correct_state) { 
										this.get_container().children("ul").empty(); 
										if(s_call) { s_call.call(this); }
									}
								}
								else {
									obj.children("a.jstree-loading").removeClass("jstree-loading");
									obj.removeData("jstree_is_loading");
									if(s.correct_state) { 
										this.correct_state(obj);
										if(s_call) { s_call.call(this); } 
									}
								}
							}
						};
						s.ajax.context = this;
						s.ajax.error = error_func;
						s.ajax.success = success_func;
						if(!s.ajax.dataType) { s.ajax.dataType = "json"; }
						if($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, obj); }
						if($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, obj); }
						$.ajax(s.ajax);
						break;
				}
			},
			_parse_json : function (js, obj, is_callback) {
				var d = false, 
					p = this._get_settings(),
					s = p.json_data,
					t = p.core.html_titles,
					tmp, i, j, ul1, ul2;

				if(!js) { return d; }
				if(s.progressive_unload && obj && obj !== -1) { 
					obj.data("jstree_children", d);
				}
				if($.isArray(js)) {
					d = $();
					if(!js.length) { return false; }
					for(i = 0, j = js.length; i < j; i++) {
						tmp = this._parse_json(js[i], obj, true);
						if(tmp.length) { d = d.add(tmp); }
					}
				}
				else {
					if(typeof js == "string") { js = { data : js }; }
					if(!js.data && js.data !== "") { return d; }
					d = $("<li />");
					if(js.attr) { d.attr(js.attr); }
					if(js.metadata) { d.data(js.metadata); }
					if(js.state) { d.addClass("jstree-" + js.state); }
					if(!$.isArray(js.data)) { tmp = js.data; js.data = []; js.data.push(tmp); }
					$.each(js.data, function (i, m) {
						tmp = $("<a />");
						if($.isFunction(m)) { m = m.call(this, js); }
						if(typeof m == "string") { tmp.attr('href','#')[ t ? "html" : "text" ](m); }
						else {
							if(!m.attr) { m.attr = {}; }
							if(!m.attr.href) { m.attr.href = '#'; }
							tmp.attr(m.attr)[ t ? "html" : "text" ](m.title);
							if(m.language) { tmp.addClass(m.language); }
						}
						tmp.prepend("<ins class='jstree-icon'>&#160;</ins>");
						if(!m.icon && js.icon) { m.icon = js.icon; }
						if(m.icon) { 
							if(m.icon.indexOf("/") === -1) { tmp.children("ins").addClass(m.icon); }
							else { tmp.children("ins").css("background","url('" + m.icon + "') center center no-repeat"); }
						}
						d.append(tmp);
					});
					d.prepend("<ins class='jstree-icon'>&#160;</ins>");
					if(js.children) { 
						if(s.progressive_render && js.state !== "open") {
							d.addClass("jstree-closed").data("jstree_children", js.children);
						}
						else {
							if(s.progressive_unload) { d.data("jstree_children", js.children); }
							if($.isArray(js.children) && js.children.length) {
								tmp = this._parse_json(js.children, obj, true);
								if(tmp.length) {
									ul2 = $("<ul />");
									ul2.append(tmp);
									d.append(ul2);
								}
							}
						}
					}
				}
				if(!is_callback) {
					ul1 = $("<ul />");
					ul1.append(d);
					d = ul1;
				}
				return d;
			},
			get_json : function (obj, li_attr, a_attr, is_callback) {
				var result = [], 
					s = this._get_settings(), 
					_this = this,
					tmp1, tmp2, li, a, t, lang;
				obj = this._get_node(obj);
				if(!obj || obj === -1) { obj = this.get_container().find("> ul > li"); }
				li_attr = $.isArray(li_attr) ? li_attr : [ "id", "class" ];
				if(!is_callback && this.data.types) { li_attr.push(s.types.type_attr); }
				a_attr = $.isArray(a_attr) ? a_attr : [ ];

				obj.each(function () {
					li = $(this);
					tmp1 = { data : [] };
					if(li_attr.length) { tmp1.attr = { }; }
					$.each(li_attr, function (i, v) { 
						tmp2 = li.attr(v); 
						if(tmp2 && tmp2.length && tmp2.replace(/jstree[^ ]*/ig,'').length) {
							tmp1.attr[v] = (" " + tmp2).replace(/ jstree[^ ]*/ig,'').replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,""); 
						}
					});
					if(li.hasClass("jstree-open")) { tmp1.state = "open"; }
					if(li.hasClass("jstree-closed")) { tmp1.state = "closed"; }
					if(li.data()) { tmp1.metadata = li.data(); }
					a = li.children("a");
					a.each(function () {
						t = $(this);
						if(
							a_attr.length || 
							$.inArray("languages", s.plugins) !== -1 || 
							t.children("ins").get(0).style.backgroundImage.length || 
							(t.children("ins").get(0).className && t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,'').length)
						) { 
							lang = false;
							if($.inArray("languages", s.plugins) !== -1 && $.isArray(s.languages) && s.languages.length) {
								$.each(s.languages, function (l, lv) {
									if(t.hasClass(lv)) {
										lang = lv;
										return false;
									}
								});
							}
							tmp2 = { attr : { }, title : _this.get_text(t, lang) }; 
							$.each(a_attr, function (k, z) {
								tmp2.attr[z] = (" " + (t.attr(z) || "")).replace(/ jstree[^ ]*/ig,'').replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"");
							});
							if($.inArray("languages", s.plugins) !== -1 && $.isArray(s.languages) && s.languages.length) {
								$.each(s.languages, function (k, z) {
									if(t.hasClass(z)) { tmp2.language = z; return true; }
								});
							}
							if(t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,'').replace(/^\s+$/ig,"").length) {
								tmp2.icon = t.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,'').replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"");
							}
							if(t.children("ins").get(0).style.backgroundImage.length) {
								tmp2.icon = t.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","");
							}
						}
						else {
							tmp2 = _this.get_text(t);
						}
						if(a.length > 1) { tmp1.data.push(tmp2); }
						else { tmp1.data = tmp2; }
					});
					li = li.find("> ul > li");
					if(li.length) { tmp1.children = _this.get_json(li, li_attr, a_attr, true); }
					result.push(tmp1);
				});
				return result;
			}
		}
	});
})(jQuery);
//*/

/* 
 * jsTree languages plugin
 * Adds support for multiple language versions in one tree
 * This basically allows for many titles coexisting in one node, but only one of them being visible at any given time
 * This is useful for maintaining the same structure in many languages (hence the name of the plugin)
 */
(function ($) {
	var sh = false;
	$.jstree.plugin("languages", {
		__init : function () { this._load_css();  },
		defaults : [],
		_fn : {
			set_lang : function (i) { 
				var langs = this._get_settings().languages,
					st = false,
					selector = ".jstree-" + this.get_index() + ' a';
				if(!$.isArray(langs) || langs.length === 0) { return false; }
				if($.inArray(i,langs) == -1) {
					if(!!langs[i]) { i = langs[i]; }
					else { return false; }
				}
				if(i == this.data.languages.current_language) { return true; }
				st = $.vakata.css.get_css(selector + "." + this.data.languages.current_language, false, sh);
				if(st !== false) { st.style.display = "none"; }
				st = $.vakata.css.get_css(selector + "." + i, false, sh);
				if(st !== false) { st.style.display = ""; }
				this.data.languages.current_language = i;
				this.__callback(i);
				return true;
			},
			get_lang : function () {
				return this.data.languages.current_language;
			},
			_get_string : function (key, lang) {
				var langs = this._get_settings().languages,
					s = this._get_settings().core.strings;
				if($.isArray(langs) && langs.length) {
					lang = (lang && $.inArray(lang,langs) != -1) ? lang : this.data.languages.current_language;
				}
				if(s[lang] && s[lang][key]) { return s[lang][key]; }
				if(s[key]) { return s[key]; }
				return key;
			},
			get_text : function (obj, lang) {
				obj = this._get_node(obj) || this.data.ui.last_selected;
				if(!obj.size()) { return false; }
				var langs = this._get_settings().languages,
					s = this._get_settings().core.html_titles;
				if($.isArray(langs) && langs.length) {
					lang = (lang && $.inArray(lang,langs) != -1) ? lang : this.data.languages.current_language;
					obj = obj.children("a." + lang);
				}
				else { obj = obj.children("a:eq(0)"); }
				if(s) {
					obj = obj.clone();
					obj.children("INS").remove();
					return obj.html();
				}
				else {
					obj = obj.contents().filter(function() { return this.nodeType == 3; })[0];
					return obj.nodeValue;
				}
			},
			set_text : function (obj, val, lang) {
				obj = this._get_node(obj) || this.data.ui.last_selected;
				if(!obj.size()) { return false; }
				var langs = this._get_settings().languages,
					s = this._get_settings().core.html_titles,
					tmp;
				if($.isArray(langs) && langs.length) {
					lang = (lang && $.inArray(lang,langs) != -1) ? lang : this.data.languages.current_language;
					obj = obj.children("a." + lang);
				}
				else { obj = obj.children("a:eq(0)"); }
				if(s) {
					tmp = obj.children("INS").clone();
					obj.html(val).prepend(tmp);
					this.__callback({ "obj" : obj, "name" : val, "lang" : lang });
					return true;
				}
				else {
					obj = obj.contents().filter(function() { return this.nodeType == 3; })[0];
					this.__callback({ "obj" : obj, "name" : val, "lang" : lang });
					return (obj.nodeValue = val);
				}
			},
			_load_css : function () {
				var langs = this._get_settings().languages,
					str = "/* languages css */",
					selector = ".jstree-" + this.get_index() + ' a',
					ln;
				if($.isArray(langs) && langs.length) {
					this.data.languages.current_language = langs[0];
					for(ln = 0; ln < langs.length; ln++) {
						str += selector + "." + langs[ln] + " {";
						if(langs[ln] != this.data.languages.current_language) { str += " display:none; "; }
						str += " } ";
					}
					sh = $.vakata.css.add_sheet({ 'str' : str, 'title' : "jstree-languages" });
				}
			},
			create_node : function (obj, position, js, callback) {
				var t = this.__call_old(true, obj, position, js, function (t) {
					var langs = this._get_settings().languages,
						a = t.children("a"),
						ln;
					if($.isArray(langs) && langs.length) {
						for(ln = 0; ln < langs.length; ln++) {
							if(!a.is("." + langs[ln])) {
								t.append(a.eq(0).clone().removeClass(langs.join(" ")).addClass(langs[ln]));
							}
						}
						a.not("." + langs.join(", .")).remove();
					}
					if(callback) { callback.call(this, t); }
				});
				return t;
			}
		}
	});
})(jQuery);
//*/

/*
 * jsTree cookies plugin
 * Stores the currently opened/selected nodes in a cookie and then restores them
 * Depends on the jquery.cookie plugin
 */
(function ($) {
	$.jstree.plugin("cookies", {
		__init : function () {
			if(typeof $.cookie === "undefined") { throw "jsTree cookie: jQuery cookie plugin not included."; }

			var s = this._get_settings().cookies,
				tmp;
			if(!!s.save_loaded) {
				tmp = $.cookie(s.save_loaded);
				if(tmp && tmp.length) { this.data.core.to_load = tmp.split(","); }
			}
			if(!!s.save_opened) {
				tmp = $.cookie(s.save_opened);
				if(tmp && tmp.length) { this.data.core.to_open = tmp.split(","); }
			}
			if(!!s.save_selected) {
				tmp = $.cookie(s.save_selected);
				if(tmp && tmp.length && this.data.ui) { this.data.ui.to_select = tmp.split(","); }
			}
			this.get_container()
				.one( ( this.data.ui ? "reselect" : "reopen" ) + ".jstree", $.proxy(function () {
					this.get_container()
						.bind("open_node.jstree close_node.jstree select_node.jstree deselect_node.jstree", $.proxy(function (e) { 
								if(this._get_settings().cookies.auto_save) { this.save_cookie((e.handleObj.namespace + e.handleObj.type).replace("jstree","")); }
							}, this));
				}, this));
		},
		defaults : {
			save_loaded		: "jstree_load",
			save_opened		: "jstree_open",
			save_selected	: "jstree_select",
			auto_save		: true,
			cookie_options	: {}
		},
		_fn : {
			save_cookie : function (c) {
				if(this.data.core.refreshing) { return; }
				var s = this._get_settings().cookies;
				if(!c) { // if called manually and not by event
					if(s.save_loaded) {
						this.save_loaded();
						$.cookie(s.save_loaded, this.data.core.to_load.join(","), s.cookie_options);
					}
					if(s.save_opened) {
						this.save_opened();
						$.cookie(s.save_opened, this.data.core.to_open.join(","), s.cookie_options);
					}
					if(s.save_selected && this.data.ui) {
						this.save_selected();
						$.cookie(s.save_selected, this.data.ui.to_select.join(","), s.cookie_options);
					}
					return;
				}
				switch(c) {
					case "open_node":
					case "close_node":
						if(!!s.save_opened) { 
							this.save_opened(); 
							$.cookie(s.save_opened, this.data.core.to_open.join(","), s.cookie_options); 
						}
						if(!!s.save_loaded) { 
							this.save_loaded(); 
							$.cookie(s.save_loaded, this.data.core.to_load.join(","), s.cookie_options); 
						}
						break;
					case "select_node":
					case "deselect_node":
						if(!!s.save_selected && this.data.ui) { 
							this.save_selected(); 
							$.cookie(s.save_selected, this.data.ui.to_select.join(","), s.cookie_options); 
						}
						break;
				}
			}
		}
	});
	// include cookies by default
	// $.jstree.defaults.plugins.push("cookies");
})(jQuery);
//*/

/*
 * jsTree sort plugin
 * Sorts items alphabetically (or using any other function)
 */
(function ($) {
	$.jstree.plugin("sort", {
		__init : function () {
			this.get_container()
				.bind("load_node.jstree", $.proxy(function (e, data) {
						var obj = this._get_node(data.rslt.obj);
						obj = obj === -1 ? this.get_container().children("ul") : obj.children("ul");
						this.sort(obj);
					}, this))
				.bind("rename_node.jstree create_node.jstree create.jstree", $.proxy(function (e, data) {
						this.sort(data.rslt.obj.parent());
					}, this))
				.bind("move_node.jstree", $.proxy(function (e, data) {
						var m = data.rslt.np == -1 ? this.get_container() : data.rslt.np;
						this.sort(m.children("ul"));
					}, this));
		},
		defaults : function (a, b) { return this.get_text(a) > this.get_text(b) ? 1 : -1; },
		_fn : {
			sort : function (obj) {
				var s = this._get_settings().sort,
					t = this;
				obj.append($.makeArray(obj.children("li")).sort($.proxy(s, t)));
				obj.find("> li > ul").each(function() { t.sort($(this)); });
				this.clean_node(obj);
			}
		}
	});
})(jQuery);
//*/

/*
 * jsTree DND plugin
 * Drag and drop plugin for moving/copying nodes
 */
(function ($) {
	var o = false,
		r = false,
		m = false,
		ml = false,
		sli = false,
		sti = false,
		dir1 = false,
		dir2 = false,
		last_pos = false;
	$.vakata.dnd = {
		is_down : false,
		is_drag : false,
		helper : false,
		scroll_spd : 10,
		init_x : 0,
		init_y : 0,
		threshold : 5,
		helper_left : 5,
		helper_top : 10,
		user_data : {},

		drag_start : function (e, data, html) { 
			if($.vakata.dnd.is_drag) { $.vakata.drag_stop({}); }
			try {
				e.currentTarget.unselectable = "on";
				e.currentTarget.onselectstart = function() { return false; };
				if(e.currentTarget.style) { e.currentTarget.style.MozUserSelect = "none"; }
			} catch(err) { }
			$.vakata.dnd.init_x = e.pageX;
			$.vakata.dnd.init_y = e.pageY;
			$.vakata.dnd.user_data = data;
			$.vakata.dnd.is_down = true;
			$.vakata.dnd.helper = $("<div id='vakata-dragged' />").html(html); //.fadeTo(10,0.25);
			$(document).bind("mousemove", $.vakata.dnd.drag);
			$(document).bind("mouseup", $.vakata.dnd.drag_stop);
			return false;
		},
		drag : function (e) { 
			if(!$.vakata.dnd.is_down) { return; }
			if(!$.vakata.dnd.is_drag) {
				if(Math.abs(e.pageX - $.vakata.dnd.init_x) > 5 || Math.abs(e.pageY - $.vakata.dnd.init_y) > 5) { 
					$.vakata.dnd.helper.appendTo("body");
					$.vakata.dnd.is_drag = true;
					$(document).triggerHandler("drag_start.vakata", { "event" : e, "data" : $.vakata.dnd.user_data });
				}
				else { return; }
			}

			// maybe use a scrolling parent element instead of document?
			if(e.type === "mousemove") { // thought of adding scroll in order to move the helper, but mouse poisition is n/a
				var d = $(document), t = d.scrollTop(), l = d.scrollLeft();
				if(e.pageY - t < 20) { 
					if(sti && dir1 === "down") { clearInterval(sti); sti = false; }
					if(!sti) { dir1 = "up"; sti = setInterval(function () { $(document).scrollTop($(document).scrollTop() - $.vakata.dnd.scroll_spd); }, 150); }
				}
				else { 
					if(sti && dir1 === "up") { clearInterval(sti); sti = false; }
				}
				if($(window).height() - (e.pageY - t) < 20) {
					if(sti && dir1 === "up") { clearInterval(sti); sti = false; }
					if(!sti) { dir1 = "down"; sti = setInterval(function () { $(document).scrollTop($(document).scrollTop() + $.vakata.dnd.scroll_spd); }, 150); }
				}
				else { 
					if(sti && dir1 === "down") { clearInterval(sti); sti = false; }
				}

				if(e.pageX - l < 20) {
					if(sli && dir2 === "right") { clearInterval(sli); sli = false; }
					if(!sli) { dir2 = "left"; sli = setInterval(function () { $(document).scrollLeft($(document).scrollLeft() - $.vakata.dnd.scroll_spd); }, 150); }
				}
				else { 
					if(sli && dir2 === "left") { clearInterval(sli); sli = false; }
				}
				if($(window).width() - (e.pageX - l) < 20) {
					if(sli && dir2 === "left") { clearInterval(sli); sli = false; }
					if(!sli) { dir2 = "right"; sli = setInterval(function () { $(document).scrollLeft($(document).scrollLeft() + $.vakata.dnd.scroll_spd); }, 150); }
				}
				else { 
					if(sli && dir2 === "right") { clearInterval(sli); sli = false; }
				}
			}

			$.vakata.dnd.helper.css({ left : (e.pageX + $.vakata.dnd.helper_left) + "px", top : (e.pageY + $.vakata.dnd.helper_top) + "px" });
			$(document).triggerHandler("drag.vakata", { "event" : e, "data" : $.vakata.dnd.user_data });
		},
		drag_stop : function (e) {
			if(sli) { clearInterval(sli); }
			if(sti) { clearInterval(sti); }
			$(document).unbind("mousemove", $.vakata.dnd.drag);
			$(document).unbind("mouseup", $.vakata.dnd.drag_stop);
			$(document).triggerHandler("drag_stop.vakata", { "event" : e, "data" : $.vakata.dnd.user_data });
			$.vakata.dnd.helper.remove();
			$.vakata.dnd.init_x = 0;
			$.vakata.dnd.init_y = 0;
			$.vakata.dnd.user_data = {};
			$.vakata.dnd.is_down = false;
			$.vakata.dnd.is_drag = false;
		}
	};
	$(function() {
		var css_string = '#vakata-dragged { display:block; margin:0 0 0 0; padding:4px 4px 4px 24px; position:absolute; top:-2000px; line-height:16px; z-index:10000; } ';
		$.vakata.css.add_sheet({ str : css_string, title : "vakata" });
	});

	$.jstree.plugin("dnd", {
		__init : function () {
			this.data.dnd = {
				active : false,
				after : false,
				inside : false,
				before : false,
				off : false,
				prepared : false,
				w : 0,
				to1 : false,
				to2 : false,
				cof : false,
				cw : false,
				ch : false,
				i1 : false,
				i2 : false,
				mto : false
			};
			this.get_container()
				.bind("mouseenter.jstree", $.proxy(function (e) {
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							if(this.data.themes) {
								m.attr("class", "jstree-" + this.data.themes.theme); 
								if(ml) { ml.attr("class", "jstree-" + this.data.themes.theme); }
								$.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme);
							}
							//if($(e.currentTarget).find("> ul > li").length === 0) {
							if(e.currentTarget === e.target && $.vakata.dnd.user_data.obj && $($.vakata.dnd.user_data.obj).length && $($.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0] !== e.target) { // node should not be from the same tree
								var tr = $.jstree._reference(e.target), dc;
								if(tr.data.dnd.foreign) {
									dc = tr._get_settings().dnd.drag_check.call(this, { "o" : o, "r" : tr.get_container(), is_root : true });
									if(dc === true || dc.inside === true || dc.before === true || dc.after === true) {
										$.vakata.dnd.helper.children("ins").attr("class","jstree-ok");
									}
								}
								else {
									tr.prepare_move(o, tr.get_container(), "last");
									if(tr.check_move()) {
										$.vakata.dnd.helper.children("ins").attr("class","jstree-ok");
									}
								}
							}
						}
					}, this))
				.bind("mouseup.jstree", $.proxy(function (e) {
						//if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && $(e.currentTarget).find("> ul > li").length === 0) {
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && e.currentTarget === e.target && $.vakata.dnd.user_data.obj && $($.vakata.dnd.user_data.obj).length && $($.vakata.dnd.user_data.obj).parents(".jstree:eq(0)")[0] !== e.target) { // node should not be from the same tree
							var tr = $.jstree._reference(e.currentTarget), dc;
							if(tr.data.dnd.foreign) {
								dc = tr._get_settings().dnd.drag_check.call(this, { "o" : o, "r" : tr.get_container(), is_root : true });
								if(dc === true || dc.inside === true || dc.before === true || dc.after === true) {
									tr._get_settings().dnd.drag_finish.call(this, { "o" : o, "r" : tr.get_container(), is_root : true });
								}
							}
							else {
								tr.move_node(o, tr.get_container(), "last", e[tr._get_settings().dnd.copy_modifier + "Key"]);
							}
						}
					}, this))
				.bind("mouseleave.jstree", $.proxy(function (e) {
						if(e.relatedTarget && e.relatedTarget.id && e.relatedTarget.id === "jstree-marker-line") {
							return false; 
						}
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							if(this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
							if(this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
							if(this.data.dnd.to1) { clearTimeout(this.data.dnd.to1); }
							if(this.data.dnd.to2) { clearTimeout(this.data.dnd.to2); }
							if($.vakata.dnd.helper.children("ins").hasClass("jstree-ok")) {
								$.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
							}
						}
					}, this))
				.bind("mousemove.jstree", $.proxy(function (e) {
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							var cnt = this.get_container()[0];

							// Horizontal scroll
							if(e.pageX + 24 > this.data.dnd.cof.left + this.data.dnd.cw) {
								if(this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
								this.data.dnd.i1 = setInterval($.proxy(function () { this.scrollLeft += $.vakata.dnd.scroll_spd; }, cnt), 100);
							}
							else if(e.pageX - 24 < this.data.dnd.cof.left) {
								if(this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
								this.data.dnd.i1 = setInterval($.proxy(function () { this.scrollLeft -= $.vakata.dnd.scroll_spd; }, cnt), 100);
							}
							else {
								if(this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
							}

							// Vertical scroll
							if(e.pageY + 24 > this.data.dnd.cof.top + this.data.dnd.ch) {
								if(this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
								this.data.dnd.i2 = setInterval($.proxy(function () { this.scrollTop += $.vakata.dnd.scroll_spd; }, cnt), 100);
							}
							else if(e.pageY - 24 < this.data.dnd.cof.top) {
								if(this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
								this.data.dnd.i2 = setInterval($.proxy(function () { this.scrollTop -= $.vakata.dnd.scroll_spd; }, cnt), 100);
							}
							else {
								if(this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
							}

						}
					}, this))
				.bind("scroll.jstree", $.proxy(function (e) { 
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && m && ml) {
							m.hide();
							ml.hide();
						}
					}, this))
				.delegate("a", "mousedown.jstree", $.proxy(function (e) { 
						if(e.which === 1) {
							this.start_drag(e.currentTarget, e);
							return false;
						}
					}, this))
				.delegate("a", "mouseenter.jstree", $.proxy(function (e) { 
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							this.dnd_enter(e.currentTarget);
						}
					}, this))
				.delegate("a", "mousemove.jstree", $.proxy(function (e) { 
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							if(!r || !r.length || r.children("a")[0] !== e.currentTarget) {
								this.dnd_enter(e.currentTarget);
							}
							if(typeof this.data.dnd.off.top === "undefined") { this.data.dnd.off = $(e.target).offset(); }
							this.data.dnd.w = (e.pageY - (this.data.dnd.off.top || 0)) % this.data.core.li_height;
							if(this.data.dnd.w < 0) { this.data.dnd.w += this.data.core.li_height; }
							this.dnd_show();
						}
					}, this))
				.delegate("a", "mouseleave.jstree", $.proxy(function (e) { 
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							if(e.relatedTarget && e.relatedTarget.id && e.relatedTarget.id === "jstree-marker-line") {
								return false; 
							}
								if(m) { m.hide(); }
								if(ml) { ml.hide(); }
							/*
							var ec = $(e.currentTarget).closest("li"), 
								er = $(e.relatedTarget).closest("li");
							if(er[0] !== ec.prev()[0] && er[0] !== ec.next()[0]) {
								if(m) { m.hide(); }
								if(ml) { ml.hide(); }
							}
							*/
							this.data.dnd.mto = setTimeout( 
								(function (t) { return function () { t.dnd_leave(e); }; })(this),
							0);
						}
					}, this))
				.delegate("a", "mouseup.jstree", $.proxy(function (e) { 
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree) {
							this.dnd_finish(e);
						}
					}, this));

			$(document)
				.bind("drag_stop.vakata", $.proxy(function () {
						if(this.data.dnd.to1) { clearTimeout(this.data.dnd.to1); }
						if(this.data.dnd.to2) { clearTimeout(this.data.dnd.to2); }
						if(this.data.dnd.i1) { clearInterval(this.data.dnd.i1); }
						if(this.data.dnd.i2) { clearInterval(this.data.dnd.i2); }
						this.data.dnd.after		= false;
						this.data.dnd.before	= false;
						this.data.dnd.inside	= false;
						this.data.dnd.off		= false;
						this.data.dnd.prepared	= false;
						this.data.dnd.w			= false;
						this.data.dnd.to1		= false;
						this.data.dnd.to2		= false;
						this.data.dnd.i1		= false;
						this.data.dnd.i2		= false;
						this.data.dnd.active	= false;
						this.data.dnd.foreign	= false;
						if(m) { m.css({ "top" : "-2000px" }); }
						if(ml) { ml.css({ "top" : "-2000px" }); }
					}, this))
				.bind("drag_start.vakata", $.proxy(function (e, data) {
						if(data.data.jstree) { 
							var et = $(data.event.target);
							if(et.closest(".jstree").hasClass("jstree-" + this.get_index())) {
								this.dnd_enter(et);
							}
						}
					}, this));
				/*
				.bind("keydown.jstree-" + this.get_index() + " keyup.jstree-" + this.get_index(), $.proxy(function(e) {
						if($.vakata.dnd.is_drag && $.vakata.dnd.user_data.jstree && !this.data.dnd.foreign) {
							var h = $.vakata.dnd.helper.children("ins");
							if(e[this._get_settings().dnd.copy_modifier + "Key"] && h.hasClass("jstree-ok")) {
								h.parent().html(h.parent().html().replace(/ \(Copy\)$/, "") + " (Copy)");
							} 
							else {
								h.parent().html(h.parent().html().replace(/ \(Copy\)$/, ""));
							}
						}
					}, this)); */



			var s = this._get_settings().dnd;
			if(s.drag_target) {
				$(document)
					.delegate(s.drag_target, "mousedown.jstree-" + this.get_index(), $.proxy(function (e) {
						o = e.target;
						$.vakata.dnd.drag_start(e, { jstree : true, obj : e.target }, "<ins class='jstree-icon'></ins>" + $(e.target).text() );
						if(this.data.themes) { 
							if(m) { m.attr("class", "jstree-" + this.data.themes.theme); }
							if(ml) { ml.attr("class", "jstree-" + this.data.themes.theme); }
							$.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme); 
						}
						$.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
						var cnt = this.get_container();
						this.data.dnd.cof = cnt.offset();
						this.data.dnd.cw = parseInt(cnt.width(),10);
						this.data.dnd.ch = parseInt(cnt.height(),10);
						this.data.dnd.foreign = true;
						e.preventDefault();
					}, this));
			}
			if(s.drop_target) {
				$(document)
					.delegate(s.drop_target, "mouseenter.jstree-" + this.get_index(), $.proxy(function (e) {
							if(this.data.dnd.active && this._get_settings().dnd.drop_check.call(this, { "o" : o, "r" : $(e.target), "e" : e })) {
								$.vakata.dnd.helper.children("ins").attr("class","jstree-ok");
							}
						}, this))
					.delegate(s.drop_target, "mouseleave.jstree-" + this.get_index(), $.proxy(function (e) {
							if(this.data.dnd.active) {
								$.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
							}
						}, this))
					.delegate(s.drop_target, "mouseup.jstree-" + this.get_index(), $.proxy(function (e) {
							if(this.data.dnd.active && $.vakata.dnd.helper.children("ins").hasClass("jstree-ok")) {
								this._get_settings().dnd.drop_finish.call(this, { "o" : o, "r" : $(e.target), "e" : e });
							}
						}, this));
			}
		},
		defaults : {
			copy_modifier	: "ctrl",
			check_timeout	: 100,
			open_timeout	: 500,
			drop_target		: ".jstree-drop",
			drop_check		: function (data) { return true; },
			drop_finish		: $.noop,
			drag_target		: ".jstree-draggable",
			drag_finish		: $.noop,
			drag_check		: function (data) { return { after : false, before : false, inside : true }; },
			move_requested  : $.noop
		},
		_fn : {
			dnd_prepare : function () {
				if(!r || !r.length) { return; }
				this.data.dnd.off = r.offset();
				if(this._get_settings().core.rtl) {
					this.data.dnd.off.right = this.data.dnd.off.left + r.width();
				}
				if(this.data.dnd.foreign) {
					var a = this._get_settings().dnd.drag_check.call(this, { "o" : o, "r" : r });
					this.data.dnd.after = a.after;
					this.data.dnd.before = a.before;
					this.data.dnd.inside = a.inside;
					this.data.dnd.prepared = true;
					return this.dnd_show();
				}
				this.prepare_move(o, r, "before");
				this.data.dnd.before = this.check_move();
				this.prepare_move(o, r, "after");
				this.data.dnd.after = this.check_move();
				if(this._is_loaded(r)) {
					this.prepare_move(o, r, "inside");
					this.data.dnd.inside = this.check_move();
				}
				else {
					this.data.dnd.inside = false;
				}
				this.data.dnd.prepared = true;
				return this.dnd_show();
			},
			dnd_show : function () {
				if(!this.data.dnd.prepared) { return; }
				var o = ["before","inside","after"],
					r = false,
					rtl = this._get_settings().core.rtl,
					pos;
				if(this.data.dnd.w < this.data.core.li_height/3) { o = ["before","inside","after"]; }
				else if(this.data.dnd.w <= this.data.core.li_height*2/3) {
					o = this.data.dnd.w < this.data.core.li_height/2 ? ["inside","before","after"] : ["inside","after","before"];
				}
				else { o = ["after","inside","before"]; }
				$.each(o, $.proxy(function (i, val) { 
					if(this.data.dnd[val]) {
						$.vakata.dnd.helper.children("ins").attr("class","jstree-ok");
						r = val;
						return false;
					}
				}, this));
				if(r === false) { $.vakata.dnd.helper.children("ins").attr("class","jstree-invalid"); }
				
				pos = rtl ? (this.data.dnd.off.right - 18) : (this.data.dnd.off.left + 10);
				switch(r) {
					case "before":
						m.css({ "left" : pos + "px", "top" : (this.data.dnd.off.top - 6) + "px" }).show();
						if(ml) { ml.css({ "left" : (pos + 8) + "px", "top" : (this.data.dnd.off.top - 1) + "px" }).show(); }
						break;
					case "after":
						m.css({ "left" : pos + "px", "top" : (this.data.dnd.off.top + this.data.core.li_height - 6) + "px" }).show();
						if(ml) { ml.css({ "left" : (pos + 8) + "px", "top" : (this.data.dnd.off.top + this.data.core.li_height - 1) + "px" }).show(); }
						break;
					case "inside":
						m.css({ "left" : pos + ( rtl ? -4 : 4) + "px", "top" : (this.data.dnd.off.top + this.data.core.li_height/2 - 5) + "px" }).show();
						if(ml) { ml.hide(); }
						break;
					default:
						m.hide();
						if(ml) { ml.hide(); }
						break;
				}
				last_pos = r;
				return r;
			},
			dnd_open : function () {
				this.data.dnd.to2 = false;
				this.open_node(r, $.proxy(this.dnd_prepare,this), true);
			},
			dnd_finish : function (e) {
				if(this.data.dnd.foreign) {
					if(this.data.dnd.after || this.data.dnd.before || this.data.dnd.inside) {
						this._get_settings().dnd.drag_finish.call(this, { "o" : o, "r" : r, "p" : last_pos });
					}
				}
				else {
					this.dnd_prepare();
					this._get_settings().dnd.move_requested.call(this,
						{ "o" : o, "r" : r, "last_pos" : last_pos, "e" : e[this._get_settings().dnd.copy_modifier + "Key"] });
				}
				o = false;
				r = false;
				m.hide();
				if(ml) { ml.hide(); }
			},
			dnd_enter : function (obj) {
				if(this.data.dnd.mto) { 
					clearTimeout(this.data.dnd.mto);
					this.data.dnd.mto = false;
				}
				var s = this._get_settings().dnd;
				this.data.dnd.prepared = false;
				r = this._get_node(obj);
				if(s.check_timeout) { 
					// do the calculations after a minimal timeout (users tend to drag quickly to the desired location)
					if(this.data.dnd.to1) { clearTimeout(this.data.dnd.to1); }
					this.data.dnd.to1 = setTimeout($.proxy(this.dnd_prepare, this), s.check_timeout); 
				}
				else { 
					this.dnd_prepare(); 
				}
				if(s.open_timeout) { 
					if(this.data.dnd.to2) { clearTimeout(this.data.dnd.to2); }
					if(r && r.length && r.hasClass("jstree-closed")) { 
						// if the node is closed - open it, then recalculate
						this.data.dnd.to2 = setTimeout($.proxy(this.dnd_open, this), s.open_timeout);
					}
				}
				else {
					if(r && r.length && r.hasClass("jstree-closed")) { 
						this.dnd_open();
					}
				}
			},
			dnd_leave : function (e) {
				this.data.dnd.after		= false;
				this.data.dnd.before	= false;
				this.data.dnd.inside	= false;
				$.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
				m.hide();
				if(ml) { ml.hide(); }
				if(r && r[0] === e.target.parentNode) {
					if(this.data.dnd.to1) {
						clearTimeout(this.data.dnd.to1);
						this.data.dnd.to1 = false;
					}
					if(this.data.dnd.to2) {
						clearTimeout(this.data.dnd.to2);
						this.data.dnd.to2 = false;
					}
				}
			},
			start_drag : function (obj, e) {
				o = this._get_node(obj);
				if(this.data.ui && this.is_selected(o)) { o = this._get_node(null, true); }
				var dt = o.length > 1 ? this._get_string("multiple_selection") : this.get_text(o),
					cnt = this.get_container();
				if(!this._get_settings().core.html_titles) { dt = dt.replace(/</ig,"&lt;").replace(/>/ig,"&gt;"); }
				$.vakata.dnd.drag_start(e, { jstree : true, obj : o }, "<ins class='jstree-icon'></ins>" + dt );
				if(this.data.themes) { 
					if(m) { m.attr("class", "jstree-" + this.data.themes.theme); }
					if(ml) { ml.attr("class", "jstree-" + this.data.themes.theme); }
					$.vakata.dnd.helper.attr("class", "jstree-dnd-helper jstree-" + this.data.themes.theme); 
				}
				this.data.dnd.cof = cnt.offset();
				this.data.dnd.cw = parseInt(cnt.width(),10);
				this.data.dnd.ch = parseInt(cnt.height(),10);
				this.data.dnd.active = true;
			}
		}
	});
	$(function() {
		var css_string = '' + 
			'#vakata-dragged ins { display:block; text-decoration:none; width:16px; height:16px; margin:0 0 0 0; padding:0; position:absolute; top:4px; left:4px; ' + 
			' -moz-border-radius:4px; border-radius:4px; -webkit-border-radius:4px; ' +
			'} ' + 
			'#vakata-dragged .jstree-ok { background:green; } ' + 
			'#vakata-dragged .jstree-invalid { background:red; } ' + 
			'#jstree-marker { padding:0; margin:0; font-size:12px; overflow:hidden; height:12px; width:8px; position:absolute; top:-30px; z-index:10001; background-repeat:no-repeat; display:none; background-color:transparent; text-shadow:1px 1px 1px white; color:black; line-height:10px; } ' + 
			'#jstree-marker-line { padding:0; margin:0; line-height:0%; font-size:1px; overflow:hidden; height:1px; width:100px; position:absolute; top:-30px; z-index:10000; background-repeat:no-repeat; display:none; background-color:#456c43; ' + 
			' cursor:pointer; border:1px solid #eeeeee; border-left:0; -moz-box-shadow: 0px 0px 2px #666; -webkit-box-shadow: 0px 0px 2px #666; box-shadow: 0px 0px 2px #666; ' + 
			' -moz-border-radius:1px; border-radius:1px; -webkit-border-radius:1px; ' +
			'}' + 
			'';
		$.vakata.css.add_sheet({ str : css_string, title : "jstree" });
		m = $("<div />").attr({ id : "jstree-marker" }).hide().html("&raquo;")
			.bind("mouseleave mouseenter", function (e) { 
				m.hide();
				ml.hide();
				e.preventDefault(); 
				e.stopImmediatePropagation(); 
				return false; 
			})
			.appendTo("body");
		ml = $("<div />").attr({ id : "jstree-marker-line" }).hide()
			.bind("mouseup", function (e) { 
				if(r && r.length) { 
					r.children("a").trigger(e); 
					e.preventDefault(); 
					e.stopImmediatePropagation(); 
					return false; 
				} 
			})
			.bind("mouseleave", function (e) { 
				var rt = $(e.relatedTarget);
				if(rt.is(".jstree") || rt.closest(".jstree").length === 0) {
					if(r && r.length) { 
						r.children("a").trigger(e); 
						m.hide();
						ml.hide();
						e.preventDefault(); 
						e.stopImmediatePropagation(); 
						return false; 
					}
				}
			})
			.appendTo("body");
		$(document).bind("drag_start.vakata", function (e, data) {
			if(data.data.jstree) { m.show(); if(ml) { ml.show(); } }
		});
		$(document).bind("drag_stop.vakata", function (e, data) {
			if(data.data.jstree) { m.hide(); if(ml) { ml.hide(); } }
		});
	});
})(jQuery);
//*/

/*
 * jsTree checkbox plugin
 * Inserts checkboxes in front of every node
 * Depends on the ui plugin
 * DOES NOT WORK NICELY WITH MULTITREE DRAG'N'DROP
 */
(function ($) {
	$.jstree.plugin("checkbox", {
		__init : function () {
			this.data.checkbox.noui = this._get_settings().checkbox.override_ui;
			if(this.data.ui && this.data.checkbox.noui) {
				this.select_node = this.deselect_node = this.deselect_all = $.noop;
				this.get_selected = this.get_checked;
			}

			this.get_container()
				.bind("open_node.jstree create_node.jstree clean_node.jstree refresh.jstree", $.proxy(function (e, data) { 
						this._prepare_checkboxes(data.rslt.obj);
					}, this))
				.bind("loaded.jstree", $.proxy(function (e) {
						this._prepare_checkboxes();
					}, this))
				.delegate( (this.data.ui && this.data.checkbox.noui ? "a" : "ins.jstree-checkbox") , "click.jstree", $.proxy(function (e) {
						e.preventDefault();
						if(this._get_node(e.target).hasClass("jstree-checked")) { this.uncheck_node(e.target); }
						else { this.check_node(e.target); }
						if(this.data.ui && this.data.checkbox.noui) {
							this.save_selected();
							if(this.data.cookies) { this.save_cookie("select_node"); }
						}
						else {
							e.stopImmediatePropagation();
							return false;
						}
					}, this));
		},
		defaults : {
			override_ui : false,
			two_state : false,
			real_checkboxes : false,
			checked_parent_open : true,
			real_checkboxes_names : function (n) { return [ ("check_" + (n[0].id || Math.ceil(Math.random() * 10000))) , 1]; }
		},
		__destroy : function () {
			this.get_container()
				.find("input.jstree-real-checkbox").removeClass("jstree-real-checkbox").end()
				.find("ins.jstree-checkbox").remove();
		},
		_fn : {
			_checkbox_notify : function (n, data) {
				if(data.checked) {
					this.check_node(n, false);
				}
			},
			_prepare_checkboxes : function (obj) {
				obj = !obj || obj == -1 ? this.get_container().find("> ul > li") : this._get_node(obj);
				if(obj === false) { return; } // added for removing root nodes
				var c, _this = this, t, ts = this._get_settings().checkbox.two_state, rc = this._get_settings().checkbox.real_checkboxes, rcn = this._get_settings().checkbox.real_checkboxes_names;
				obj.each(function () {
					t = $(this);
					c = t.is("li") && (t.hasClass("jstree-checked") || (rc && t.children(":checked").length)) ? "jstree-checked" : "jstree-unchecked";
					t.find("li").andSelf().each(function () {
						var $t = $(this), nm;
						$t.children("a" + (_this.data.languages ? "" : ":eq(0)") ).not(":has(.jstree-checkbox)").prepend("<ins class='jstree-checkbox'>&#160;</ins>").parent().not(".jstree-checked, .jstree-unchecked").addClass( ts ? "jstree-unchecked" : c );
						if(rc) {
							if(!$t.children(":checkbox").length) {
								nm = rcn.call(_this, $t);
								$t.prepend("<input type='checkbox' class='jstree-real-checkbox' id='" + nm[0] + "' name='" + nm[0] + "' value='" + nm[1] + "' />");
							}
							else {
								$t.children(":checkbox").addClass("jstree-real-checkbox");
							}
						}
						if(!ts) {
							if(c === "jstree-checked" || $t.hasClass("jstree-checked") || $t.children(':checked').length) {
								$t.find("li").andSelf().addClass("jstree-checked").children(":checkbox").prop("checked", true);
							}
						}
						else {
							if($t.hasClass("jstree-checked") || $t.children(':checked').length) {
								$t.addClass("jstree-checked").children(":checkbox").prop("checked", true);
							}
						}
					});
				});
				if(!ts) {
					obj.find(".jstree-checked").parent().parent().each(function () { _this._repair_state(this); }); 
				}
			},
			change_state : function (obj, state) {
				obj = this._get_node(obj);
				var coll = false, rc = this._get_settings().checkbox.real_checkboxes;
				if(!obj || obj === -1) { return false; }
				state = (state === false || state === true) ? state : obj.hasClass("jstree-checked");
				if(this._get_settings().checkbox.two_state) {
					if(state) { 
						obj.removeClass("jstree-checked").addClass("jstree-unchecked"); 
						if(rc) { obj.children(":checkbox").prop("checked", false); }
					}
					else { 
						obj.removeClass("jstree-unchecked").addClass("jstree-checked"); 
						if(rc) { obj.children(":checkbox").prop("checked", true); }
					}
				}
				else {
					if(state) { 
						coll = obj.find("li").andSelf();
						if(!coll.filter(".jstree-checked, .jstree-undetermined").length) { return false; }
						coll.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked"); 
						if(rc) { coll.children(":checkbox").prop("checked", false); }
					}
					else { 
						coll = obj.find("li").andSelf();
						if(!coll.filter(".jstree-unchecked, .jstree-undetermined").length) { return false; }
						coll.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked"); 
						if(rc) { coll.children(":checkbox").prop("checked", true); }
						if(this.data.ui) { this.data.ui.last_selected = obj; }
						this.data.checkbox.last_selected = obj;
					}
					obj.parentsUntil(".jstree", "li").each(function () {
						var $this = $(this);
						if(state) {
							if($this.children("ul").children("li.jstree-checked, li.jstree-undetermined").length) {
								$this.parentsUntil(".jstree", "li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
								if(rc) { $this.parentsUntil(".jstree", "li").andSelf().children(":checkbox").prop("checked", false); }
								return false;
							}
							else {
								$this.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked");
								if(rc) { $this.children(":checkbox").prop("checked", false); }
							}
						}
						else {
							if($this.children("ul").children("li.jstree-unchecked, li.jstree-undetermined").length) {
								$this.parentsUntil(".jstree", "li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
								if(rc) { $this.parentsUntil(".jstree", "li").andSelf().children(":checkbox").prop("checked", false); }
								return false;
							}
							else {
								$this.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
								if(rc) { $this.children(":checkbox").prop("checked", true); }
							}
						}
					});
				}
				if(this.data.ui && this.data.checkbox.noui) { this.data.ui.selected = this.get_checked(); }
				this.__callback(obj);
				return true;
			},
			check_node : function (obj) {
				if(this.change_state(obj, false)) { 
					obj = this._get_node(obj);
					if(this._get_settings().checkbox.checked_parent_open) {
						var t = this;
						obj.parents(".jstree-closed").each(function () { t.open_node(this, false, true); });
					}
					this.__callback({ "obj" : obj }); 
				}
			},
			uncheck_node : function (obj) {
				if(this.change_state(obj, true)) { this.__callback({ "obj" : this._get_node(obj) }); }
			},
			check_all : function () {
				var _this = this, 
					coll = this._get_settings().checkbox.two_state ? this.get_container_ul().find("li") : this.get_container_ul().children("li");
				coll.each(function () {
					_this.change_state(this, false);
				});
				this.__callback();
			},
			uncheck_all : function () {
				var _this = this,
					coll = this._get_settings().checkbox.two_state ? this.get_container_ul().find("li") : this.get_container_ul().children("li");
				coll.each(function () {
					_this.change_state(this, true);
				});
				this.__callback();
			},

			is_checked : function(obj) {
				obj = this._get_node(obj);
				return obj.length ? obj.is(".jstree-checked") : false;
			},
			get_checked : function (obj, get_all) {
				obj = !obj || obj === -1 ? this.get_container() : this._get_node(obj);
				return get_all || this._get_settings().checkbox.two_state ? obj.find(".jstree-checked") : obj.find("> ul > .jstree-checked, .jstree-undetermined > ul > .jstree-checked");
			},
			get_unchecked : function (obj, get_all) { 
				obj = !obj || obj === -1 ? this.get_container() : this._get_node(obj);
				return get_all || this._get_settings().checkbox.two_state ? obj.find(".jstree-unchecked") : obj.find("> ul > .jstree-unchecked, .jstree-undetermined > ul > .jstree-unchecked");
			},

			show_checkboxes : function () { this.get_container().children("ul").removeClass("jstree-no-checkboxes"); },
			hide_checkboxes : function () { this.get_container().children("ul").addClass("jstree-no-checkboxes"); },

			_repair_state : function (obj) {
				obj = this._get_node(obj);
				if(!obj.length) { return; }
				if(this._get_settings().checkbox.two_state) {
					obj.find('li').andSelf().not('.jstree-checked').removeClass('jstree-undetermined').addClass('jstree-unchecked').children(':checkbox').prop('checked', true);
					return;
				}
				var rc = this._get_settings().checkbox.real_checkboxes,
					a = obj.find("> ul > .jstree-checked").length,
					b = obj.find("> ul > .jstree-undetermined").length,
					c = obj.find("> ul > li").length;
				if(c === 0) { if(obj.hasClass("jstree-undetermined")) { this.change_state(obj, false); } }
				else if(a === 0 && b === 0) { this.change_state(obj, true); }
				else if(a === c) { this.change_state(obj, false); }
				else { 
					obj.parentsUntil(".jstree","li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
					if(rc) { obj.parentsUntil(".jstree", "li").andSelf().children(":checkbox").prop("checked", false); }
				}
			},
			reselect : function () {
				if(this.data.ui && this.data.checkbox.noui) { 
					var _this = this,
						s = this.data.ui.to_select;
					s = $.map($.makeArray(s), function (n) { return "#" + n.toString().replace(/^#/,"").replace(/\\\//g,"/").replace(/\//g,"\\\/").replace(/\\\./g,".").replace(/\./g,"\\.").replace(/\:/g,"\\:"); });
					this.deselect_all();
					$.each(s, function (i, val) { _this.check_node(val); });
					this.__callback();
				}
				else { 
					this.__call_old(); 
				}
			},
			save_loaded : function () {
				var _this = this;
				this.data.core.to_load = [];
				this.get_container_ul().find("li.jstree-closed.jstree-undetermined").each(function () {
					if(this.id) { _this.data.core.to_load.push("#" + this.id); }
				});
			}
		}
	});
	$(function() {
		var css_string = '.jstree .jstree-real-checkbox { display:none; } ';
		$.vakata.css.add_sheet({ str : css_string, title : "jstree" });
	});
})(jQuery);
//*/

/* 
 * jsTree XML plugin
 * The XML data store. Datastores are build by overriding the `load_node` and `_is_loaded` functions.
 */
(function ($) {
	$.vakata.xslt = function (xml, xsl, callback) {
		var rs = "", xm, xs, processor, support;
		// TODO: IE9 no XSLTProcessor, no document.recalc
		if(document.recalc) {
			xm = document.createElement('xml');
			xs = document.createElement('xml');
			xm.innerHTML = xml;
			xs.innerHTML = xsl;
			$("body").append(xm).append(xs);
			setTimeout( (function (xm, xs, callback) {
				return function () {
					callback.call(null, xm.transformNode(xs.XMLDocument));
					setTimeout( (function (xm, xs) { return function () { $(xm).remove(); $(xs).remove(); }; })(xm, xs), 200);
				};
			})(xm, xs, callback), 100);
			return true;
		}
		if(typeof window.DOMParser !== "undefined" && typeof window.XMLHttpRequest !== "undefined" && typeof window.XSLTProcessor === "undefined") {
			xml = new DOMParser().parseFromString(xml, "text/xml");
			xsl = new DOMParser().parseFromString(xsl, "text/xml");
			// alert(xml.transformNode());
			// callback.call(null, new XMLSerializer().serializeToString(rs));
			
		}
		if(typeof window.DOMParser !== "undefined" && typeof window.XMLHttpRequest !== "undefined" && typeof window.XSLTProcessor !== "undefined") {
			processor = new XSLTProcessor();
			support = $.isFunction(processor.transformDocument) ? (typeof window.XMLSerializer !== "undefined") : true;
			if(!support) { return false; }
			xml = new DOMParser().parseFromString(xml, "text/xml");
			xsl = new DOMParser().parseFromString(xsl, "text/xml");
			if($.isFunction(processor.transformDocument)) {
				rs = document.implementation.createDocument("", "", null);
				processor.transformDocument(xml, xsl, rs, null);
				callback.call(null, new XMLSerializer().serializeToString(rs));
				return true;
			}
			else {
				processor.importStylesheet(xsl);
				rs = processor.transformToFragment(xml, document);
				callback.call(null, $("<div />").append(rs).html());
				return true;
			}
		}
		return false;
	};
	var xsl = {
		'nest' : '<' + '?xml version="1.0" encoding="utf-8" ?>' + 
			'<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >' + 
			'<xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/html" />' + 
			'<xsl:template match="/">' + 
			'	<xsl:call-template name="nodes">' + 
			'		<xsl:with-param name="node" select="/root" />' + 
			'	</xsl:call-template>' + 
			'</xsl:template>' + 
			'<xsl:template name="nodes">' + 
			'	<xsl:param name="node" />' + 
			'	<ul>' + 
			'	<xsl:for-each select="$node/item">' + 
			'		<xsl:variable name="children" select="count(./item) &gt; 0" />' + 
			'		<li>' + 
			'			<xsl:attribute name="class">' + 
			'				<xsl:if test="position() = last()">jstree-last </xsl:if>' + 
			'				<xsl:choose>' + 
			'					<xsl:when test="@state = \'open\'">jstree-open </xsl:when>' + 
			'					<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>' + 
			'					<xsl:otherwise>jstree-leaf </xsl:otherwise>' + 
			'				</xsl:choose>' + 
			'				<xsl:value-of select="@class" />' + 
			'			</xsl:attribute>' + 
			'			<xsl:for-each select="@*">' + 
			'				<xsl:if test="name() != \'class\' and name() != \'state\' and name() != \'hasChildren\'">' + 
			'					<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' + 
			'				</xsl:if>' + 
			'			</xsl:for-each>' + 
			'	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>' + 
			'			<xsl:for-each select="content/name">' + 
			'				<a>' + 
			'				<xsl:attribute name="href">' + 
			'					<xsl:choose>' + 
			'					<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>' + 
			'					<xsl:otherwise>#</xsl:otherwise>' + 
			'					</xsl:choose>' + 
			'				</xsl:attribute>' + 
			'				<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>' + 
			'				<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>' + 
			'				<xsl:for-each select="@*">' + 
			'					<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">' + 
			'						<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' + 
			'					</xsl:if>' + 
			'				</xsl:for-each>' + 
			'					<ins>' + 
			'						<xsl:attribute name="class">jstree-icon ' + 
			'							<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>' + 
			'						</xsl:attribute>' + 
			'						<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>' + 
			'						<xsl:text>&#xa0;</xsl:text>' + 
			'					</ins>' + 
			'					<xsl:copy-of select="./child::node()" />' + 
			'				</a>' + 
			'			</xsl:for-each>' + 
			'			<xsl:if test="$children or @hasChildren"><xsl:call-template name="nodes"><xsl:with-param name="node" select="current()" /></xsl:call-template></xsl:if>' + 
			'		</li>' + 
			'	</xsl:for-each>' + 
			'	</ul>' + 
			'</xsl:template>' + 
			'</xsl:stylesheet>',

		'flat' : '<' + '?xml version="1.0" encoding="utf-8" ?>' + 
			'<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >' + 
			'<xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/xml" />' + 
			'<xsl:template match="/">' + 
			'	<ul>' + 
			'	<xsl:for-each select="//item[not(@parent_id) or @parent_id=0 or not(@parent_id = //item/@id)]">' + /* the last `or` may be removed */
			'		<xsl:call-template name="nodes">' + 
			'			<xsl:with-param name="node" select="." />' + 
			'			<xsl:with-param name="is_last" select="number(position() = last())" />' + 
			'		</xsl:call-template>' + 
			'	</xsl:for-each>' + 
			'	</ul>' + 
			'</xsl:template>' + 
			'<xsl:template name="nodes">' + 
			'	<xsl:param name="node" />' + 
			'	<xsl:param name="is_last" />' + 
			'	<xsl:variable name="children" select="count(//item[@parent_id=$node/attribute::id]) &gt; 0" />' + 
			'	<li>' + 
			'	<xsl:attribute name="class">' + 
			'		<xsl:if test="$is_last = true()">jstree-last </xsl:if>' + 
			'		<xsl:choose>' + 
			'			<xsl:when test="@state = \'open\'">jstree-open </xsl:when>' + 
			'			<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>' + 
			'			<xsl:otherwise>jstree-leaf </xsl:otherwise>' + 
			'		</xsl:choose>' + 
			'		<xsl:value-of select="@class" />' + 
			'	</xsl:attribute>' + 
			'	<xsl:for-each select="@*">' + 
			'		<xsl:if test="name() != \'parent_id\' and name() != \'hasChildren\' and name() != \'class\' and name() != \'state\'">' + 
			'		<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' + 
			'		</xsl:if>' + 
			'	</xsl:for-each>' + 
			'	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>' + 
			'	<xsl:for-each select="content/name">' + 
			'		<a>' + 
			'		<xsl:attribute name="href">' + 
			'			<xsl:choose>' + 
			'			<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>' + 
			'			<xsl:otherwise>#</xsl:otherwise>' + 
			'			</xsl:choose>' + 
			'		</xsl:attribute>' + 
			'		<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>' + 
			'		<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>' + 
			'		<xsl:for-each select="@*">' + 
			'			<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">' + 
			'				<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>' + 
			'			</xsl:if>' + 
			'		</xsl:for-each>' + 
			'			<ins>' + 
			'				<xsl:attribute name="class">jstree-icon ' + 
			'					<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>' + 
			'				</xsl:attribute>' + 
			'				<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>' + 
			'				<xsl:text>&#xa0;</xsl:text>' + 
			'			</ins>' + 
			'			<xsl:copy-of select="./child::node()" />' + 
			'		</a>' + 
			'	</xsl:for-each>' + 
			'	<xsl:if test="$children">' + 
			'		<ul>' + 
			'		<xsl:for-each select="//item[@parent_id=$node/attribute::id]">' + 
			'			<xsl:call-template name="nodes">' + 
			'				<xsl:with-param name="node" select="." />' + 
			'				<xsl:with-param name="is_last" select="number(position() = last())" />' + 
			'			</xsl:call-template>' + 
			'		</xsl:for-each>' + 
			'		</ul>' + 
			'	</xsl:if>' + 
			'	</li>' + 
			'</xsl:template>' + 
			'</xsl:stylesheet>'
	},
	escape_xml = function(string) {
		return string
			.toString()
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
	};
	$.jstree.plugin("xml_data", {
		defaults : { 
			data : false,
			ajax : false,
			xsl : "flat",
			clean_node : false,
			correct_state : true,
			get_skip_empty : false,
			get_include_preamble : true
		},
		_fn : {
			load_node : function (obj, s_call, e_call) { var _this = this; this.load_node_xml(obj, function () { _this.__callback({ "obj" : _this._get_node(obj) }); s_call.call(this); }, e_call); },
			_is_loaded : function (obj) { 
				var s = this._get_settings().xml_data;
				obj = this._get_node(obj);
				return obj == -1 || !obj || (!s.ajax && !$.isFunction(s.data)) || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").size() > 0;
			},
			load_node_xml : function (obj, s_call, e_call) {
				var s = this.get_settings().xml_data,
					error_func = function () {},
					success_func = function () {};

				obj = this._get_node(obj);
				if(obj && obj !== -1) {
					if(obj.data("jstree_is_loading")) { return; }
					else { obj.data("jstree_is_loading",true); }
				}
				switch(!0) {
					case (!s.data && !s.ajax): throw "Neither data nor ajax settings supplied.";
					case ($.isFunction(s.data)):
						s.data.call(this, obj, $.proxy(function (d) {
							this.parse_xml(d, $.proxy(function (d) {
								if(d) {
									d = d.replace(/ ?xmlns="[^"]*"/ig, "");
									if(d.length > 10) {
										d = $(d);
										if(obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
										else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d); obj.removeData("jstree_is_loading"); }
										if(s.clean_node) { this.clean_node(obj); }
										if(s_call) { s_call.call(this); }
									}
									else {
										if(obj && obj !== -1) { 
											obj.children("a.jstree-loading").removeClass("jstree-loading");
											obj.removeData("jstree_is_loading");
											if(s.correct_state) { 
												this.correct_state(obj);
												if(s_call) { s_call.call(this); } 
											}
										}
										else {
											if(s.correct_state) { 
												this.get_container().children("ul").empty();
												if(s_call) { s_call.call(this); } 
											}
										}
									}
								}
							}, this));
						}, this));
						break;
					case (!!s.data && !s.ajax) || (!!s.data && !!s.ajax && (!obj || obj === -1)):
						if(!obj || obj == -1) {
							this.parse_xml(s.data, $.proxy(function (d) {
								if(d) {
									d = d.replace(/ ?xmlns="[^"]*"/ig, "");
									if(d.length > 10) {
										d = $(d);
										this.get_container().children("ul").empty().append(d.children());
										if(s.clean_node) { this.clean_node(obj); }
										if(s_call) { s_call.call(this); }
									}
								}
								else { 
									if(s.correct_state) { 
										this.get_container().children("ul").empty(); 
										if(s_call) { s_call.call(this); }
									}
								}
							}, this));
						}
						break;
					case (!s.data && !!s.ajax) || (!!s.data && !!s.ajax && obj && obj !== -1):
						error_func = function (x, t, e) {
							var ef = this.get_settings().xml_data.ajax.error; 
							if(ef) { ef.call(this, x, t, e); }
							if(obj !== -1 && obj.length) {
								obj.children("a.jstree-loading").removeClass("jstree-loading");
								obj.removeData("jstree_is_loading");
								if(t === "success" && s.correct_state) { this.correct_state(obj); }
							}
							else {
								if(t === "success" && s.correct_state) { this.get_container().children("ul").empty(); }
							}
							if(e_call) { e_call.call(this); }
						};
						success_func = function (d, t, x) {
							d = x.responseText;
							var sf = this.get_settings().xml_data.ajax.success; 
							if(sf) { d = sf.call(this,d,t,x) || d; }
							if(d === "" || (d && d.toString && d.toString().replace(/^[\s\n]+$/,"") === "")) {
								return error_func.call(this, x, t, "");
							}
							this.parse_xml(d, $.proxy(function (d) {
								if(d) {
									d = d.replace(/ ?xmlns="[^"]*"/ig, "");
									if(d.length > 10) {
										d = $(d);
										if(obj === -1 || !obj) { this.get_container().children("ul").empty().append(d.children()); }
										else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d); obj.removeData("jstree_is_loading"); }
										if(s.clean_node) { this.clean_node(obj); }
										if(s_call) { s_call.call(this); }
									}
									else {
										if(obj && obj !== -1) { 
											obj.children("a.jstree-loading").removeClass("jstree-loading");
											obj.removeData("jstree_is_loading");
											if(s.correct_state) { 
												this.correct_state(obj);
												if(s_call) { s_call.call(this); } 
											}
										}
										else {
											if(s.correct_state) { 
												this.get_container().children("ul").empty();
												if(s_call) { s_call.call(this); } 
											}
										}
									}
								}
							}, this));
						};
						s.ajax.context = this;
						s.ajax.error = error_func;
						s.ajax.success = success_func;
						if(!s.ajax.dataType) { s.ajax.dataType = "xml"; }
						if($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, obj); }
						if($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, obj); }
						$.ajax(s.ajax);
						break;
				}
			},
			parse_xml : function (xml, callback) {
				var s = this._get_settings().xml_data;
				$.vakata.xslt(xml, xsl[s.xsl], callback);
			},
			get_xml : function (tp, obj, li_attr, a_attr, is_callback) {
				var result = "", 
					s = this._get_settings(), 
					_this = this,
					tmp1, tmp2, li, a, lang;
				if(!tp) { tp = "flat"; }
				if(!is_callback) { is_callback = 0; }
				obj = this._get_node(obj);
				if(!obj || obj === -1) { obj = this.get_container().find("> ul > li"); }
				li_attr = $.isArray(li_attr) ? li_attr : [ "id", "class" ];
				if(!is_callback && this.data.types && $.inArray(s.types.type_attr, li_attr) === -1) { li_attr.push(s.types.type_attr); }

				a_attr = $.isArray(a_attr) ? a_attr : [ ];

				if(!is_callback) { 
					if(s.xml_data.get_include_preamble) { 
						result += '<' + '?xml version="1.0" encoding="UTF-8"?' + '>'; 
					}
					result += "<root>"; 
				}
				obj.each(function () {
					result += "<item";
					li = $(this);
					$.each(li_attr, function (i, v) { 
						var t = li.attr(v);
						if(!s.xml_data.get_skip_empty || typeof t !== "undefined") {
							result += " " + v + "=\"" + escape_xml((" " + (t || "")).replace(/ jstree[^ ]*/ig,'').replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"")) + "\""; 
						}
					});
					if(li.hasClass("jstree-open")) { result += " state=\"open\""; }
					if(li.hasClass("jstree-closed")) { result += " state=\"closed\""; }
					if(tp === "flat") { result += " parent_id=\"" + escape_xml(is_callback) + "\""; }
					result += ">";
					result += "<content>";
					a = li.children("a");
					a.each(function () {
						tmp1 = $(this);
						lang = false;
						result += "<name";
						if($.inArray("languages", s.plugins) !== -1) {
							$.each(s.languages, function (k, z) {
								if(tmp1.hasClass(z)) { result += " lang=\"" + escape_xml(z) + "\""; lang = z; return false; }
							});
						}
						if(a_attr.length) { 
							$.each(a_attr, function (k, z) {
								var t = tmp1.attr(z);
								if(!s.xml_data.get_skip_empty || typeof t !== "undefined") {
									result += " " + z + "=\"" + escape_xml((" " + t || "").replace(/ jstree[^ ]*/ig,'').replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"")) + "\"";
								}
							});
						}
						if(tmp1.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,'').replace(/^\s+$/ig,"").length) {
							result += ' icon="' + escape_xml(tmp1.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,'').replace(/\s+$/ig," ").replace(/^ /,"").replace(/ $/,"")) + '"';
						}
						if(tmp1.children("ins").get(0).style.backgroundImage.length) {
							result += ' icon="' + escape_xml(tmp1.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","").replace(/'/ig,"").replace(/"/ig,"")) + '"';
						}
						result += ">";
						result += "<![CDATA[" + _this.get_text(tmp1, lang) + "]]>";
						result += "</name>";
					});
					result += "</content>";
					tmp2 = li[0].id || true;
					li = li.find("> ul > li");
					if(li.length) { tmp2 = _this.get_xml(tp, li, li_attr, a_attr, tmp2); }
					else { tmp2 = ""; }
					if(tp == "nest") { result += tmp2; }
					result += "</item>";
					if(tp == "flat") { result += tmp2; }
				});
				if(!is_callback) { result += "</root>"; }
				return result;
			}
		}
	});
})(jQuery);
//*/

/*
 * jsTree search plugin
 * Enables both sync and async search on the tree
 * DOES NOT WORK WITH JSON PROGRESSIVE RENDER
 */
(function ($) {
	$.expr[':'].jstree_contains = function(a,i,m){
		return (a.textContent || a.innerText || "").toLowerCase().indexOf(m[3].toLowerCase())>=0;
	};
	$.expr[':'].jstree_title_contains = function(a,i,m) {
		return (a.getAttribute("title") || "").toLowerCase().indexOf(m[3].toLowerCase())>=0;
	};
	$.jstree.plugin("search", {
		__init : function () {
			this.data.search.str = "";
			this.data.search.result = $();
			if(this._get_settings().search.show_only_matches) {
				this.get_container()
					.bind("search.jstree", function (e, data) {
						$(this).children("ul").find("li").hide().removeClass("jstree-last");
						data.rslt.nodes.parentsUntil(".jstree").andSelf().show()
							.filter("ul").each(function () { $(this).children("li:visible").eq(-1).addClass("jstree-last"); });
					})
					.bind("clear_search.jstree", function () {
						$(this).children("ul").find("li").css("display","").end().end().jstree("clean_node", -1);
					});
			}
		},
		defaults : {
			ajax : false,
			search_method : "jstree_contains", // for case insensitive - jstree_contains
			show_only_matches : false
		},
		_fn : {
			search : function (str, skip_async) {
				if($.trim(str) === "") { this.clear_search(); return; }
				var s = this.get_settings().search, 
					t = this,
					error_func = function () { },
					success_func = function () { };
				this.data.search.str = str;

				if(!skip_async && s.ajax !== false && this.get_container_ul().find("li.jstree-closed:not(:has(ul)):eq(0)").length > 0) {
					this.search.supress_callback = true;
					error_func = function () { };
					success_func = function (d, t, x) {
						var sf = this.get_settings().search.ajax.success; 
						if(sf) { d = sf.call(this,d,t,x) || d; }
						this.data.search.to_open = d;
						this._search_open();
					};
					s.ajax.context = this;
					s.ajax.error = error_func;
					s.ajax.success = success_func;
					if($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, str); }
					if($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, str); }
					if(!s.ajax.data) { s.ajax.data = { "search_string" : str }; }
					if(!s.ajax.dataType || /^json/.exec(s.ajax.dataType)) { s.ajax.dataType = "json"; }
					$.ajax(s.ajax);
					return;
				}
				if(this.data.search.result.length) { this.clear_search(); }
				this.data.search.result = this.get_container().find("a" + (this.data.languages ? "." + this.get_lang() : "" ) + ":" + (s.search_method) + "(" + this.data.search.str + ")");
				this.data.search.result.addClass("jstree-search").parent().parents(".jstree-closed").each(function () {
					t.open_node(this, false, true);
				});
				this.__callback({ nodes : this.data.search.result, str : str });
			},
			clear_search : function (str) {
				this.data.search.result.removeClass("jstree-search");
				this.__callback(this.data.search.result);
				this.data.search.result = $();
			},
			_search_open : function (is_callback) {
				var _this = this,
					done = true,
					current = [],
					remaining = [];
				if(this.data.search.to_open.length) {
					$.each(this.data.search.to_open, function (i, val) {
						if(val == "#") { return true; }
						if($(val).length && $(val).is(".jstree-closed")) { current.push(val); }
						else { remaining.push(val); }
					});
					if(current.length) {
						this.data.search.to_open = remaining;
						$.each(current, function (i, val) { 
							_this.open_node(val, function () { _this._search_open(true); }); 
						});
						done = false;
					}
				}
				if(done) { this.search(this.data.search.str, true); }
			}
		}
	});
})(jQuery);
//*/

/* 
 * jsTree contextmenu plugin
 */
(function ($) {
	$.vakata.context = {
		hide_on_mouseleave : false,

		cnt		: $("<div id='vakata-contextmenu' />"),
		vis		: false,
		tgt		: false,
		par		: false,
		func	: false,
		data	: false,
		rtl		: false,
		show	: function (s, t, x, y, d, p, rtl) {
			$.vakata.context.rtl = !!rtl;
			var html = $.vakata.context.parse(s), h, w;
			if(!html) { return; }
			$.vakata.context.vis = true;
			$.vakata.context.tgt = t;
			$.vakata.context.par = p || t || null;
			$.vakata.context.data = d || null;
			$.vakata.context.cnt
				.html(html)
				.css({ "visibility" : "hidden", "display" : "block", "left" : 0, "top" : 0 });

			if($.vakata.context.hide_on_mouseleave) {
				$.vakata.context.cnt
					.one("mouseleave", function(e) { $.vakata.context.hide(); });
			}

			h = $.vakata.context.cnt.height();
			w = $.vakata.context.cnt.width();
			if(x + w > $(document).width()) { 
				x = $(document).width() - (w + 5); 
				$.vakata.context.cnt.find("li > ul").addClass("right"); 
			}
			if(y + h > $(document).height()) { 
				y = y - (h + t[0].offsetHeight); 
				$.vakata.context.cnt.find("li > ul").addClass("bottom"); 
			}

			$.vakata.context.cnt
				.css({ "left" : x, "top" : y })
				.find("li:has(ul)")
					.bind("mouseenter", function (e) { 
						var w = $(document).width(),
							h = $(document).height(),
							ul = $(this).children("ul").show(); 
						if(w !== $(document).width()) { ul.toggleClass("right"); }
						if(h !== $(document).height()) { ul.toggleClass("bottom"); }
					})
					.bind("mouseleave", function (e) { 
						$(this).children("ul").hide(); 
					})
					.end()
				.css({ "visibility" : "visible" })
				.show();
			$(document).triggerHandler("context_show.vakata");
		},
		hide	: function () {
			$.vakata.context.vis = false;
			$.vakata.context.cnt.attr("class","").css({ "visibility" : "hidden" });
			$(document).triggerHandler("context_hide.vakata");
		},
		parse	: function (s, is_callback) {
			if(!s) { return false; }
			var str = "",
				tmp = false,
				was_sep = true;
			if(!is_callback) { $.vakata.context.func = {}; }
			str += "<ul>";
			$.each(s, function (i, val) {
				if(!val) { return true; }
				$.vakata.context.func[i] = val.action;
				if(!was_sep && val.separator_before) {
					str += "<li class='vakata-separator vakata-separator-before'></li>";
				}
				was_sep = false;
				str += "<li class='" + (val._class || "") + (val._disabled ? " jstree-contextmenu-disabled " : "") + "'><ins ";
				if(val.icon && val.icon.indexOf("/") === -1) { str += " class='" + val.icon + "' "; }
				if(val.icon && val.icon.indexOf("/") !== -1) { str += " style='background:url(" + val.icon + ") center center no-repeat;' "; }
				str += ">&#160;</ins><a href='#' rel='" + i + "'>";
				if(val.submenu) {
					str += "<span style='float:" + ($.vakata.context.rtl ? "left" : "right") + ";'>&raquo;</span>";
				}
				str += val.label + "</a>";
				if(val.submenu) {
					tmp = $.vakata.context.parse(val.submenu, true);
					if(tmp) { str += tmp; }
				}
				str += "</li>";
				if(val.separator_after) {
					str += "<li class='vakata-separator vakata-separator-after'></li>";
					was_sep = true;
				}
			});
			str = str.replace(/<li class\='vakata-separator vakata-separator-after'\><\/li\>$/,"");
			str += "</ul>";
			$(document).triggerHandler("context_parse.vakata");
			return str.length > 10 ? str : false;
		},
		exec	: function (i) {
			if($.isFunction($.vakata.context.func[i])) {
				// if is string - eval and call it!
				$.vakata.context.func[i].call($.vakata.context.data, $.vakata.context.par);
				return true;
			}
			else { return false; }
		}
	};
	$(function () {
		var css_string = '' + 
			'#vakata-contextmenu { display:block; visibility:hidden; left:0; top:-200px; position:absolute; margin:0; padding:0; min-width:180px; background:#ebebeb; border:1px solid silver; z-index:10000; *width:180px; } ' + 
			'#vakata-contextmenu ul { min-width:180px; *width:180px; } ' + 
			'#vakata-contextmenu ul, #vakata-contextmenu li { margin:0; padding:0; list-style-type:none; display:block; } ' + 
			'#vakata-contextmenu li { line-height:20px; min-height:20px; position:relative; padding:0px; } ' + 
			'#vakata-contextmenu li a { padding:1px 6px; line-height:17px; display:block; text-decoration:none; margin:1px 1px 0 1px; } ' + 
			'#vakata-contextmenu li ins { float:left; width:16px; height:16px; text-decoration:none; margin-right:2px; } ' + 
			'#vakata-contextmenu li a:hover, #vakata-contextmenu li.vakata-hover > a { background:gray; color:white; } ' + 
			'#vakata-contextmenu li ul { display:none; position:absolute; top:-2px; left:100%; background:#ebebeb; border:1px solid gray; } ' + 
			'#vakata-contextmenu .right { right:100%; left:auto; } ' + 
			'#vakata-contextmenu .bottom { bottom:-1px; top:auto; } ' + 
			'#vakata-contextmenu li.vakata-separator { min-height:0; height:1px; line-height:1px; font-size:1px; overflow:hidden; margin:0 2px; background:silver; /* border-top:1px solid #fefefe; */ padding:0; } ';
		$.vakata.css.add_sheet({ str : css_string, title : "vakata" });
		$.vakata.context.cnt
			.delegate("a","click", function (e) { e.preventDefault(); })
			.delegate("a","mouseup", function (e) {
				if(!$(this).parent().hasClass("jstree-contextmenu-disabled") && $.vakata.context.exec($(this).attr("rel"))) {
					$.vakata.context.hide();
				}
				else { $(this).blur(); }
			})
			.delegate("a","mouseover", function () {
				$.vakata.context.cnt.find(".vakata-hover").removeClass("vakata-hover");
			})
			.appendTo("body");
		$(document).bind("mousedown", function (e) { if($.vakata.context.vis && !$.contains($.vakata.context.cnt[0], e.target)) { $.vakata.context.hide(); } });
		if(typeof $.hotkeys !== "undefined") {
			$(document)
				.bind("keydown", "up", function (e) { 
					if($.vakata.context.vis) { 
						var o = $.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").prevAll("li:not(.vakata-separator)").first();
						if(!o.length) { o = $.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").last(); }
						o.addClass("vakata-hover");
						e.stopImmediatePropagation(); 
						e.preventDefault();
					} 
				})
				.bind("keydown", "down", function (e) { 
					if($.vakata.context.vis) { 
						var o = $.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").nextAll("li:not(.vakata-separator)").first();
						if(!o.length) { o = $.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").first(); }
						o.addClass("vakata-hover");
						e.stopImmediatePropagation(); 
						e.preventDefault();
					} 
				})
				.bind("keydown", "right", function (e) { 
					if($.vakata.context.vis) { 
						$.vakata.context.cnt.find(".vakata-hover").children("ul").show().children("li:not(.vakata-separator)").removeClass("vakata-hover").first().addClass("vakata-hover");
						e.stopImmediatePropagation(); 
						e.preventDefault();
					} 
				})
				.bind("keydown", "left", function (e) { 
					if($.vakata.context.vis) { 
						$.vakata.context.cnt.find(".vakata-hover").children("ul").hide().children(".vakata-separator").removeClass("vakata-hover");
						e.stopImmediatePropagation(); 
						e.preventDefault();
					} 
				})
				.bind("keydown", "esc", function (e) { 
					$.vakata.context.hide(); 
					e.preventDefault();
				})
				.bind("keydown", "space", function (e) { 
					$.vakata.context.cnt.find(".vakata-hover").last().children("a").click();
					e.preventDefault();
				});
		}
	});

	$.jstree.plugin("contextmenu", {
		__init : function () {
			this.get_container()
				.delegate("a", "contextmenu.jstree", $.proxy(function (e) {
						e.preventDefault();
						if(!$(e.currentTarget).hasClass("jstree-loading")) {
							this.show_contextmenu(e.currentTarget, e.pageX, e.pageY);
						}
					}, this))
				.delegate("a", "click.jstree", $.proxy(function (e) {
						if(this.data.contextmenu) {
							$.vakata.context.hide();
						}
					}, this))
				.bind("destroy.jstree", $.proxy(function () {
						// TODO: move this to descruct method
						if(this.data.contextmenu) {
							$.vakata.context.hide();
						}
					}, this));
			$(document).bind("context_hide.vakata", $.proxy(function () { this.data.contextmenu = false; }, this));
		},
		defaults : { 
			select_node : false, // requires UI plugin
			show_at_node : true,
			items : { // Could be a function that should return an object like this one
				"create" : {
					"separator_before"	: false,
					"separator_after"	: true,
					"label"				: "Create",
					"action"			: function (obj) { this.create(obj); }
				},
				"rename" : {
					"separator_before"	: false,
					"separator_after"	: false,
					"label"				: "Rename",
					"action"			: function (obj) { this.rename(obj); }
				},
				"remove" : {
					"separator_before"	: false,
					"icon"				: false,
					"separator_after"	: false,
					"label"				: "Delete",
					"action"			: function (obj) { if(this.is_selected(obj)) { this.remove(); } else { this.remove(obj); } }
				},
				"ccp" : {
					"separator_before"	: true,
					"icon"				: false,
					"separator_after"	: false,
					"label"				: "Edit",
					"action"			: false,
					"submenu" : { 
						"cut" : {
							"separator_before"	: false,
							"separator_after"	: false,
							"label"				: "Cut",
							"action"			: function (obj) { this.cut(obj); }
						},
						"copy" : {
							"separator_before"	: false,
							"icon"				: false,
							"separator_after"	: false,
							"label"				: "Copy",
							"action"			: function (obj) { this.copy(obj); }
						},
						"paste" : {
							"separator_before"	: false,
							"icon"				: false,
							"separator_after"	: false,
							"label"				: "Paste",
							"action"			: function (obj) { this.paste(obj); }
						}
					}
				}
			}
		},
		_fn : {
			show_contextmenu : function (obj, x, y) {
				obj = this._get_node(obj);
				var s = this.get_settings().contextmenu,
					a = obj.children("a:visible:eq(0)"),
					o = false,
					i = false;
				if(s.select_node && this.data.ui && !this.is_selected(obj)) {
					this.deselect_all();
					this.select_node(obj, true);
				}
				if(s.show_at_node || typeof x === "undefined" || typeof y === "undefined") {
					o = a.offset();
					x = o.left;
					y = o.top + this.data.core.li_height;
				}
				i = obj.data("jstree") && obj.data("jstree").contextmenu ? obj.data("jstree").contextmenu : s.items;
				if($.isFunction(i)) { i = i.call(this, obj); }
				this.data.contextmenu = true;
				$.vakata.context.show(i, a, x, y, this, obj, this._get_settings().core.rtl);
				if(this.data.themes) { $.vakata.context.cnt.attr("class", "jstree-" + this.data.themes.theme + "-context"); }
			}
		}
	});
})(jQuery);
//*/

/* 
 * jsTree types plugin
 * Adds support types of nodes
 * You can set an attribute on each li node, that represents its type.
 * According to the type setting the node may get custom icon/validation rules
 */
(function ($) {
	$.jstree.plugin("types", {
		__init : function () {
			var s = this._get_settings().types;
			this.data.types.attach_to = [];
			this.get_container()
				.bind("init.jstree", $.proxy(function () { 
						var types = s.types, 
							attr  = s.type_attr, 
							icons_css = "", 
							_this = this;

						$.each(types, function (i, tp) {
							$.each(tp, function (k, v) { 
								if(!/^(max_depth|max_children|icon|valid_children)$/.test(k)) { _this.data.types.attach_to.push(k); }
							});
							if(!tp.icon) { return true; }
							if( tp.icon.image || tp.icon.position) {
								if(i == "default")	{ icons_css += '.jstree-' + _this.get_index() + ' a > .jstree-icon { '; }
								else				{ icons_css += '.jstree-' + _this.get_index() + ' li[' + attr + '="' + i + '"] > a > .jstree-icon { '; }
								if(tp.icon.image)	{ icons_css += ' background-image:url(' + tp.icon.image + '); '; }
								if(tp.icon.position){ icons_css += ' background-position:' + tp.icon.position + '; '; }
								else				{ icons_css += ' background-position:0 0; '; }
								icons_css += '} ';
							}
						});
						if(icons_css !== "") { $.vakata.css.add_sheet({ 'str' : icons_css, title : "jstree-types" }); }
					}, this))
				.bind("before.jstree", $.proxy(function (e, data) { 
						var s, t, 
							o = this._get_settings().types.use_data ? this._get_node(data.args[0]) : false, 
							d = o && o !== -1 && o.length ? o.data("jstree") : false;
						if(d && d.types && d.types[data.func] === false) { e.stopImmediatePropagation(); return false; }
						if($.inArray(data.func, this.data.types.attach_to) !== -1) {
							if(!data.args[0] || (!data.args[0].tagName && !data.args[0].jquery)) { return; }
							s = this._get_settings().types.types;
							t = this._get_type(data.args[0]);
							if(
								( 
									(s[t] && typeof s[t][data.func] !== "undefined") || 
									(s["default"] && typeof s["default"][data.func] !== "undefined") 
								) && this._check(data.func, data.args[0]) === false
							) {
								e.stopImmediatePropagation();
								return false;
							}
						}
					}, this));
			if(is_ie6) {
				this.get_container()
					.bind("load_node.jstree set_type.jstree", $.proxy(function (e, data) {
							var r = data && data.rslt && data.rslt.obj && data.rslt.obj !== -1 ? this._get_node(data.rslt.obj).parent() : this.get_container_ul(),
								c = false,
								s = this._get_settings().types;
							$.each(s.types, function (i, tp) {
								if(tp.icon && (tp.icon.image || tp.icon.position)) {
									c = i === "default" ? r.find("li > a > .jstree-icon") : r.find("li[" + s.type_attr + "='" + i + "'] > a > .jstree-icon");
									if(tp.icon.image) { c.css("backgroundImage","url(" + tp.icon.image + ")"); }
									c.css("backgroundPosition", tp.icon.position || "0 0");
								}
							});
						}, this));
			}
		},
		defaults : {
			// defines maximum number of root nodes (-1 means unlimited, -2 means disable max_children checking)
			max_children		: -1,
			// defines the maximum depth of the tree (-1 means unlimited, -2 means disable max_depth checking)
			max_depth			: -1,
			// defines valid node types for the root nodes
			valid_children		: "all",

			// whether to use $.data
			use_data : false, 
			// where is the type stores (the rel attribute of the LI element)
			type_attr : "rel",
			// a list of types
			types : {
				// the default type
				"default" : {
					"max_children"	: -1,
					"max_depth"		: -1,
					"valid_children": "all"

					// Bound functions - you can bind any other function here (using boolean or function)
					//"select_node"	: true
				}
			}
		},
		_fn : {
			_types_notify : function (n, data) {
				if(data.type && this._get_settings().types.use_data) {
					this.set_type(data.type, n);
				}
			},
			_get_type : function (obj) {
				obj = this._get_node(obj);
				return (!obj || !obj.length) ? false : obj.attr(this._get_settings().types.type_attr) || "default";
			},
			set_type : function (str, obj) {
				obj = this._get_node(obj);
				var ret = (!obj.length || !str) ? false : obj.attr(this._get_settings().types.type_attr, str);
				if(ret) { this.__callback({ obj : obj, type : str}); }
				return ret;
			},
			_check : function (rule, obj, opts) {
				obj = this._get_node(obj);
				var v = false, t = this._get_type(obj), d = 0, _this = this, s = this._get_settings().types, data = false;
				if(obj === -1) { 
					if(!!s[rule]) { v = s[rule]; }
					else { return; }
				}
				else {
					if(t === false) { return; }
					data = s.use_data ? obj.data("jstree") : false;
					if(data && data.types && typeof data.types[rule] !== "undefined") { v = data.types[rule]; }
					else if(!!s.types[t] && typeof s.types[t][rule] !== "undefined") { v = s.types[t][rule]; }
					else if(!!s.types["default"] && typeof s.types["default"][rule] !== "undefined") { v = s.types["default"][rule]; }
				}
				if($.isFunction(v)) { v = v.call(this, obj); }
				if(rule === "max_depth" && obj !== -1 && opts !== false && s.max_depth !== -2 && v !== 0) {
					// also include the node itself - otherwise if root node it is not checked
					obj.children("a:eq(0)").parentsUntil(".jstree","li").each(function (i) {
						// check if current depth already exceeds global tree depth
						if(s.max_depth !== -1 && s.max_depth - (i + 1) <= 0) { v = 0; return false; }
						d = (i === 0) ? v : _this._check(rule, this, false);
						// check if current node max depth is already matched or exceeded
						if(d !== -1 && d - (i + 1) <= 0) { v = 0; return false; }
						// otherwise - set the max depth to the current value minus current depth
						if(d >= 0 && (d - (i + 1) < v || v < 0) ) { v = d - (i + 1); }
						// if the global tree depth exists and it minus the nodes calculated so far is less than `v` or `v` is unlimited
						if(s.max_depth >= 0 && (s.max_depth - (i + 1) < v || v < 0) ) { v = s.max_depth - (i + 1); }
					});
				}
				return v;
			},
			check_move : function () {
				if(!this.__call_old()) { return false; }
				var m  = this._get_move(),
					s  = m.rt._get_settings().types,
					mc = m.rt._check("max_children", m.cr),
					md = m.rt._check("max_depth", m.cr),
					vc = m.rt._check("valid_children", m.cr),
					ch = 0, d = 1, t;

				if(vc === "none") { return false; } 
				if($.isArray(vc) && m.ot && m.ot._get_type) {
					m.o.each(function () {
						if($.inArray(m.ot._get_type(this), vc) === -1) { d = false; return false; }
					});
					if(d === false) { return false; }
				}
				if(s.max_children !== -2 && mc !== -1) {
					ch = m.cr === -1 ? this.get_container().find("> ul > li").not(m.o).length : m.cr.find("> ul > li").not(m.o).length;
					if(ch + m.o.length > mc) { return false; }
				}
				if(s.max_depth !== -2 && md !== -1) {
					d = 0;
					if(md === 0) { return false; }
					if(typeof m.o.d === "undefined") {
						// TODO: deal with progressive rendering and async when checking max_depth (how to know the depth of the moved node)
						t = m.o;
						while(t.length > 0) {
							t = t.find("> ul > li");
							d ++;
						}
						m.o.d = d;
					}
					if(md - m.o.d < 0) { return false; }
				}
				return true;
			},
			create_node : function (obj, position, js, callback, is_loaded, skip_check) {
				if(!skip_check && (is_loaded || this._is_loaded(obj))) {
					var p  = (typeof position == "string" && position.match(/^before|after$/i) && obj !== -1) ? this._get_parent(obj) : this._get_node(obj),
						s  = this._get_settings().types,
						mc = this._check("max_children", p),
						md = this._check("max_depth", p),
						vc = this._check("valid_children", p),
						ch;
					if(typeof js === "string") { js = { data : js }; }
					if(!js) { js = {}; }
					if(vc === "none") { return false; } 
					if($.isArray(vc)) {
						if(!js.attr || !js.attr[s.type_attr]) { 
							if(!js.attr) { js.attr = {}; }
							js.attr[s.type_attr] = vc[0]; 
						}
						else {
							if($.inArray(js.attr[s.type_attr], vc) === -1) { return false; }
						}
					}
					if(s.max_children !== -2 && mc !== -1) {
						ch = p === -1 ? this.get_container().find("> ul > li").length : p.find("> ul > li").length;
						if(ch + 1 > mc) { return false; }
					}
					if(s.max_depth !== -2 && md !== -1 && (md - 1) < 0) { return false; }
				}
				return this.__call_old(true, obj, position, js, callback, is_loaded, skip_check);
			}
		}
	});
})(jQuery);
//*/

/* 
 * jsTree HTML plugin
 * The HTML data store. Datastores are build by replacing the `load_node` and `_is_loaded` functions.
 */
(function ($) {
	$.jstree.plugin("html_data", {
		__init : function () { 
			// this used to use html() and clean the whitespace, but this way any attached data was lost
			this.data.html_data.original_container_html = this.get_container().find(" > ul > li").clone(true);
			// remove white space from LI node - otherwise nodes appear a bit to the right
			this.data.html_data.original_container_html.find("li").andSelf().contents().filter(function() { return this.nodeType == 3; }).remove();
		},
		defaults : { 
			data : false,
			ajax : false,
			correct_state : true
		},
		_fn : {
			load_node : function (obj, s_call, e_call) { var _this = this; this.load_node_html(obj, function () { _this.__callback({ "obj" : _this._get_node(obj) }); s_call.call(this); }, e_call); },
			_is_loaded : function (obj) { 
				obj = this._get_node(obj); 
				return obj == -1 || !obj || (!this._get_settings().html_data.ajax && !$.isFunction(this._get_settings().html_data.data)) || obj.is(".jstree-open, .jstree-leaf") || obj.children("ul").children("li").size() > 0;
			},
			load_node_html : function (obj, s_call, e_call) {
				var d,
					s = this.get_settings().html_data,
					error_func = function () {},
					success_func = function () {};
				obj = this._get_node(obj);
				if(obj && obj !== -1) {
					if(obj.data("jstree_is_loading")) { return; }
					else { obj.data("jstree_is_loading",true); }
				}
				switch(!0) {
					case ($.isFunction(s.data)):
						s.data.call(this, obj, $.proxy(function (d) {
							if(d && d !== "" && d.toString && d.toString().replace(/^[\s\n]+$/,"") !== "") {
								d = $(d);
								if(!d.is("ul")) { d = $("<ul />").append(d); }
								if(obj == -1 || !obj) { this.get_container().children("ul").empty().append(d.children()).find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); }
								else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d).children("ul").find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); obj.removeData("jstree_is_loading"); }
								this.clean_node(obj);
								if(s_call) { s_call.call(this); }
							}
							else {
								if(obj && obj !== -1) {
									obj.children("a.jstree-loading").removeClass("jstree-loading");
									obj.removeData("jstree_is_loading");
									if(s.correct_state) { 
										this.correct_state(obj);
										if(s_call) { s_call.call(this); } 
									}
								}
								else {
									if(s.correct_state) { 
										this.get_container().children("ul").empty();
										if(s_call) { s_call.call(this); } 
									}
								}
							}
						}, this));
						break;
					case (!s.data && !s.ajax):
						if(!obj || obj == -1) {
							this.get_container()
								.children("ul").empty()
								.append(this.data.html_data.original_container_html)
								.find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end()
								.filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
							this.clean_node();
						}
						if(s_call) { s_call.call(this); }
						break;
					case (!!s.data && !s.ajax) || (!!s.data && !!s.ajax && (!obj || obj === -1)):
						if(!obj || obj == -1) {
							d = $(s.data);
							if(!d.is("ul")) { d = $("<ul />").append(d); }
							this.get_container()
								.children("ul").empty().append(d.children())
								.find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end()
								.filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
							this.clean_node();
						}
						if(s_call) { s_call.call(this); }
						break;
					case (!s.data && !!s.ajax) || (!!s.data && !!s.ajax && obj && obj !== -1):
						obj = this._get_node(obj);
						error_func = function (x, t, e) {
							var ef = this.get_settings().html_data.ajax.error; 
							if(ef) { ef.call(this, x, t, e); }
							if(obj != -1 && obj.length) {
								obj.children("a.jstree-loading").removeClass("jstree-loading");
								obj.removeData("jstree_is_loading");
								if(t === "success" && s.correct_state) { this.correct_state(obj); }
							}
							else {
								if(t === "success" && s.correct_state) { this.get_container().children("ul").empty(); }
							}
							if(e_call) { e_call.call(this); }
						};
						success_func = function (d, t, x) {
							var sf = this.get_settings().html_data.ajax.success; 
							if(sf) { d = sf.call(this,d,t,x) || d; }
							if(d === "" || (d && d.toString && d.toString().replace(/^[\s\n]+$/,"") === "")) {
								return error_func.call(this, x, t, "");
							}
							if(d) {
								d = $(d);
								if(!d.is("ul")) { d = $("<ul />").append(d); }
								if(obj == -1 || !obj) { this.get_container().children("ul").empty().append(d.children()).find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); }
								else { obj.children("a.jstree-loading").removeClass("jstree-loading"); obj.append(d).children("ul").find("li, a").filter(function () { return !this.firstChild || !this.firstChild.tagName || this.firstChild.tagName !== "INS"; }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon"); obj.removeData("jstree_is_loading"); }
								this.clean_node(obj);
								if(s_call) { s_call.call(this); }
							}
							else {
								if(obj && obj !== -1) {
									obj.children("a.jstree-loading").removeClass("jstree-loading");
									obj.removeData("jstree_is_loading");
									if(s.correct_state) { 
										this.correct_state(obj);
										if(s_call) { s_call.call(this); } 
									}
								}
								else {
									if(s.correct_state) { 
										this.get_container().children("ul").empty();
										if(s_call) { s_call.call(this); } 
									}
								}
							}
						};
						s.ajax.context = this;
						s.ajax.error = error_func;
						s.ajax.success = success_func;
						if(!s.ajax.dataType) { s.ajax.dataType = "html"; }
						if($.isFunction(s.ajax.url)) { s.ajax.url = s.ajax.url.call(this, obj); }
						if($.isFunction(s.ajax.data)) { s.ajax.data = s.ajax.data.call(this, obj); }
						$.ajax(s.ajax);
						break;
				}
			}
		}
	});
	// include the HTML data plugin by default
	$.jstree.defaults.plugins.push("html_data");
})(jQuery);
//*/

/* 
 * jsTree themeroller plugin
 * Adds support for jQuery UI themes. Include this at the end of your plugins list, also make sure "themes" is not included.
 */
(function ($) {
	$.jstree.plugin("themeroller", {
		__init : function () {
			var s = this._get_settings().themeroller;
			this.get_container()
				.addClass("ui-widget-content")
				.addClass("jstree-themeroller")
				.delegate("a","mouseenter.jstree", function (e) {
					if(!$(e.currentTarget).hasClass("jstree-loading")) {
						$(this).addClass(s.item_h);
					}
				})
				.delegate("a","mouseleave.jstree", function () {
					$(this).removeClass(s.item_h);
				})
				.bind("init.jstree", $.proxy(function (e, data) { 
						data.inst.get_container().find("> ul > li > .jstree-loading > ins").addClass("ui-icon-refresh");
						this._themeroller(data.inst.get_container().find("> ul > li"));
					}, this))
				.bind("open_node.jstree create_node.jstree", $.proxy(function (e, data) { 
						this._themeroller(data.rslt.obj);
					}, this))
				.bind("loaded.jstree refresh.jstree", $.proxy(function (e) {
						this._themeroller();
					}, this))
				.bind("close_node.jstree", $.proxy(function (e, data) {
						this._themeroller(data.rslt.obj);
					}, this))
				.bind("delete_node.jstree", $.proxy(function (e, data) {
						this._themeroller(data.rslt.parent);
					}, this))
				.bind("correct_state.jstree", $.proxy(function (e, data) {
						data.rslt.obj
							.children("ins.jstree-icon").removeClass(s.opened + " " + s.closed + " ui-icon").end()
							.find("> a > ins.ui-icon")
								.filter(function() { 
									return this.className.toString()
										.replace(s.item_clsd,"").replace(s.item_open,"").replace(s.item_leaf,"")
										.indexOf("ui-icon-") === -1; 
								}).removeClass(s.item_open + " " + s.item_clsd).addClass(s.item_leaf || "jstree-no-icon");
					}, this))
				.bind("select_node.jstree", $.proxy(function (e, data) {
						data.rslt.obj.children("a").addClass(s.item_a);
					}, this))
				.bind("deselect_node.jstree deselect_all.jstree", $.proxy(function (e, data) {
						this.get_container()
							.find("a." + s.item_a).removeClass(s.item_a).end()
							.find("a.jstree-clicked").addClass(s.item_a);
					}, this))
				.bind("dehover_node.jstree", $.proxy(function (e, data) {
						data.rslt.obj.children("a").removeClass(s.item_h);
					}, this))
				.bind("hover_node.jstree", $.proxy(function (e, data) {
						this.get_container()
							.find("a." + s.item_h).not(data.rslt.obj).removeClass(s.item_h);
						data.rslt.obj.children("a").addClass(s.item_h);
					}, this))
				.bind("move_node.jstree", $.proxy(function (e, data) {
						this._themeroller(data.rslt.o);
						this._themeroller(data.rslt.op);
					}, this));
		},
		__destroy : function () {
			var s = this._get_settings().themeroller,
				c = [ "ui-icon" ];
			$.each(s, function (i, v) {
				v = v.split(" ");
				if(v.length) { c = c.concat(v); }
			});
			this.get_container()
				.removeClass("ui-widget-content")
				.find("." + c.join(", .")).removeClass(c.join(" "));
		},
		_fn : {
			_themeroller : function (obj) {
				var s = this._get_settings().themeroller;
				obj = (!obj || obj == -1) ? this.get_container_ul() : this._get_node(obj);
				obj = (!obj || obj == -1) ? this.get_container_ul() : obj.parent();
				obj
					.find("li.jstree-closed")
						.children("ins.jstree-icon").removeClass(s.opened).addClass("ui-icon " + s.closed).end()
						.children("a").addClass(s.item)
							.children("ins.jstree-icon").addClass("ui-icon")
								.filter(function() { 
									return this.className.toString()
										.replace(s.item_clsd,"").replace(s.item_open,"").replace(s.item_leaf,"")
										.indexOf("ui-icon-") === -1; 
								}).removeClass(s.item_leaf + " " + s.item_open).addClass(s.item_clsd || "jstree-no-icon")
								.end()
							.end()
						.end()
					.end()
					.find("li.jstree-open")
						.children("ins.jstree-icon").removeClass(s.closed).addClass("ui-icon " + s.opened).end()
						.children("a").addClass(s.item)
							.children("ins.jstree-icon").addClass("ui-icon")
								.filter(function() { 
									return this.className.toString()
										.replace(s.item_clsd,"").replace(s.item_open,"").replace(s.item_leaf,"")
										.indexOf("ui-icon-") === -1; 
								}).removeClass(s.item_leaf + " " + s.item_clsd).addClass(s.item_open || "jstree-no-icon")
								.end()
							.end()
						.end()
					.end()
					.find("li.jstree-leaf")
						.children("ins.jstree-icon").removeClass(s.closed + " ui-icon " + s.opened).end()
						.children("a").addClass(s.item)
							.children("ins.jstree-icon").addClass("ui-icon")
								.filter(function() { 
									return this.className.toString()
										.replace(s.item_clsd,"").replace(s.item_open,"").replace(s.item_leaf,"")
										.indexOf("ui-icon-") === -1; 
								}).removeClass(s.item_clsd + " " + s.item_open).addClass(s.item_leaf || "jstree-no-icon");
			}
		},
		defaults : {
			"opened"	: "ui-icon-triangle-1-se",
			"closed"	: "ui-icon-triangle-1-e",
			"item"		: "ui-state-default",
			"item_h"	: "ui-state-hover",
			"item_a"	: "ui-state-active",
			"item_open"	: "ui-icon-folder-open",
			"item_clsd"	: "ui-icon-folder-collapsed",
			"item_leaf"	: "ui-icon-document"
		}
	});
	$(function() {
		var css_string = '' + 
			'.jstree-themeroller .ui-icon { overflow:visible; } ' + 
			'.jstree-themeroller a { padding:0 2px; } ' + 
			'.jstree-themeroller .jstree-no-icon { display:none; }';
		$.vakata.css.add_sheet({ str : css_string, title : "jstree" });
	});
})(jQuery);
//*/

/* 
 * jsTree unique plugin
 * Forces different names amongst siblings (still a bit experimental)
 * NOTE: does not check language versions (it will not be possible to have nodes with the same title, even in different languages)
 */
(function ($) {
	$.jstree.plugin("unique", {
		__init : function () {
			this.get_container()
				.bind("before.jstree", $.proxy(function (e, data) { 
						var nms = [], res = true, p, t;
						if(data.func == "move_node") {
							// obj, ref, position, is_copy, is_prepared, skip_check
							if(data.args[4] === true) {
								if(data.args[0].o && data.args[0].o.length) {
									data.args[0].o.children("a").each(function () { nms.push($(this).text().replace(/^\s+/g,"")); });
									res = this._check_unique(nms, data.args[0].np.find("> ul > li").not(data.args[0].o), "move_node");
								}
							}
						}
						if(data.func == "create_node") {
							// obj, position, js, callback, is_loaded
							if(data.args[4] || this._is_loaded(data.args[0])) {
								p = this._get_node(data.args[0]);
								if(data.args[1] && (data.args[1] === "before" || data.args[1] === "after")) {
									p = this._get_parent(data.args[0]);
									if(!p || p === -1) { p = this.get_container(); }
								}
								if(typeof data.args[2] === "string") { nms.push(data.args[2]); }
								else if(!data.args[2] || !data.args[2].data) { nms.push(this._get_string("new_node")); }
								else { nms.push(data.args[2].data); }
								res = this._check_unique(nms, p.find("> ul > li"), "create_node");
							}
						}
						if(data.func == "rename_node") {
							// obj, val
							nms.push(data.args[1]);
							t = this._get_node(data.args[0]);
							p = this._get_parent(t);
							if(!p || p === -1) { p = this.get_container(); }
							res = this._check_unique(nms, p.find("> ul > li").not(t), "rename_node");
						}
						if(!res) {
							e.stopPropagation();
							return false;
						}
					}, this));
		},
		defaults : { 
			error_callback : $.noop
		},
		_fn : { 
			_check_unique : function (nms, p, func) {
				var cnms = [], ok = true;
				p.children("a").each(function () { cnms.push($(this).text().replace(/^\s+/g,"")); });
				if(!cnms.length || !nms.length) { return true; }
				$.each(nms, function (i, v) {
					if($.inArray(v, cnms) !== -1) {
						ok = false;
						return false;
					}
				});
				if(!ok) {
					this._get_settings().unique.error_callback.call(null, nms, p, func);
				}
				return ok;
			},
			check_move : function () {
				if(!this.__call_old()) { return false; }
				var p = this._get_move(), nms = [];
				if(p.o && p.o.length) {
					p.o.children("a").each(function () { nms.push($(this).text().replace(/^\s+/g,"")); });
					return this._check_unique(nms, p.np.find("> ul > li").not(p.o), "check_move");
				}
				return true;
			}
		}
	});
})(jQuery);
//*/

/*
 * jsTree wholerow plugin
 * Makes select and hover work on the entire width of the node
 * MAY BE HEAVY IN LARGE DOM
 */
(function ($) {
	$.jstree.plugin("wholerow", {
		__init : function () {
			if(!this.data.ui) { throw "jsTree wholerow: jsTree UI plugin not included."; }
			this.data.wholerow.html = false;
			this.data.wholerow.to = false;
			this.get_container()
				.bind("init.jstree", $.proxy(function (e, data) { 
						this._get_settings().core.animation = 0;
					}, this))
				.bind("open_node.jstree create_node.jstree clean_node.jstree loaded.jstree", $.proxy(function (e, data) { 
						this._prepare_wholerow_span( data && data.rslt && data.rslt.obj ? data.rslt.obj : -1 );
					}, this))
				.bind("search.jstree clear_search.jstree reopen.jstree after_open.jstree after_close.jstree create_node.jstree delete_node.jstree clean_node.jstree", $.proxy(function (e, data) { 
						if(this.data.to) { clearTimeout(this.data.to); }
						this.data.to = setTimeout( (function (t, o) { return function() { t._prepare_wholerow_ul(o); }; })(this,  data && data.rslt && data.rslt.obj ? data.rslt.obj : -1), 0);
					}, this))
				.bind("deselect_all.jstree", $.proxy(function (e, data) { 
						this.get_container().find(" > .jstree-wholerow .jstree-clicked").removeClass("jstree-clicked " + (this.data.themeroller ? this._get_settings().themeroller.item_a : "" ));
					}, this))
				.bind("select_node.jstree deselect_node.jstree ", $.proxy(function (e, data) { 
						data.rslt.obj.each(function () { 
							var ref = data.inst.get_container().find(" > .jstree-wholerow li:visible:eq(" + ( parseInt((($(this).offset().top - data.inst.get_container().offset().top + data.inst.get_container()[0].scrollTop) / data.inst.data.core.li_height),10)) + ")");
							// ref.children("a")[e.type === "select_node" ? "addClass" : "removeClass"]("jstree-clicked");
							ref.children("a").attr("class",data.rslt.obj.children("a").attr("class"));
						});
					}, this))
				.bind("hover_node.jstree dehover_node.jstree", $.proxy(function (e, data) { 
						this.get_container().find(" > .jstree-wholerow .jstree-hovered").removeClass("jstree-hovered " + (this.data.themeroller ? this._get_settings().themeroller.item_h : "" ));
						if(e.type === "hover_node") {
							var ref = this.get_container().find(" > .jstree-wholerow li:visible:eq(" + ( parseInt(((data.rslt.obj.offset().top - this.get_container().offset().top + this.get_container()[0].scrollTop) / this.data.core.li_height),10)) + ")");
							// ref.children("a").addClass("jstree-hovered");
							ref.children("a").attr("class",data.rslt.obj.children(".jstree-hovered").attr("class"));
						}
					}, this))
				.delegate(".jstree-wholerow-span, ins.jstree-icon, li", "click.jstree", function (e) {
						var n = $(e.currentTarget);
						if(e.target.tagName === "A" || (e.target.tagName === "INS" && n.closest("li").is(".jstree-open, .jstree-closed"))) { return; }
						n.closest("li").children("a:visible:eq(0)").click();
						e.stopImmediatePropagation();
					})
				.delegate("li", "mouseover.jstree", $.proxy(function (e) {
						e.stopImmediatePropagation();
						if($(e.currentTarget).children(".jstree-hovered, .jstree-clicked").length) { return false; }
						this.hover_node(e.currentTarget);
						return false;
					}, this))
				.delegate("li", "mouseleave.jstree", $.proxy(function (e) {
						if($(e.currentTarget).children("a").hasClass("jstree-hovered").length) { return; }
						this.dehover_node(e.currentTarget);
					}, this));
			if(is_ie7 || is_ie6) {
				$.vakata.css.add_sheet({ str : ".jstree-" + this.get_index() + " { position:relative; } ", title : "jstree" });
			}
		},
		defaults : {
		},
		__destroy : function () {
			this.get_container().children(".jstree-wholerow").remove();
			this.get_container().find(".jstree-wholerow-span").remove();
		},
		_fn : {
			_prepare_wholerow_span : function (obj) {
				obj = !obj || obj == -1 ? this.get_container().find("> ul > li") : this._get_node(obj);
				if(obj === false) { return; } // added for removing root nodes
				obj.each(function () {
					$(this).find("li").andSelf().each(function () {
						var $t = $(this);
						if($t.children(".jstree-wholerow-span").length) { return true; }
						$t.prepend("<span class='jstree-wholerow-span' style='width:" + ($t.parentsUntil(".jstree","li").length * 18) + "px;'>&#160;</span>");
					});
				});
			},
			_prepare_wholerow_ul : function () {
				var o = this.get_container().children("ul").eq(0), h = o.html();
				o.addClass("jstree-wholerow-real");
				if(this.data.wholerow.last_html !== h) {
					this.data.wholerow.last_html = h;
					this.get_container().children(".jstree-wholerow").remove();
					this.get_container().append(
						o.clone().removeClass("jstree-wholerow-real")
							.wrapAll("<div class='jstree-wholerow' />").parent()
							.width(o.parent()[0].scrollWidth)
							.css("top", (o.height() + ( is_ie7 ? 5 : 0)) * -1 )
							.find("li[id]").each(function () { this.removeAttribute("id"); }).end()
					);
				}
			}
		}
	});
	$(function() {
		var css_string = '' + 
			'.jstree .jstree-wholerow-real { position:relative; z-index:1; } ' + 
			'.jstree .jstree-wholerow-real li { cursor:pointer; } ' + 
			'.jstree .jstree-wholerow-real a { border-left-color:transparent !important; border-right-color:transparent !important; } ' + 
			'.jstree .jstree-wholerow { position:relative; z-index:0; height:0; } ' + 
			'.jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { width:100%; } ' + 
			'.jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li, .jstree .jstree-wholerow a { margin:0 !important; padding:0 !important; } ' + 
			'.jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { background:transparent !important; }' + 
			'.jstree .jstree-wholerow ins, .jstree .jstree-wholerow span, .jstree .jstree-wholerow input { display:none !important; }' + 
			'.jstree .jstree-wholerow a, .jstree .jstree-wholerow a:hover { text-indent:-9999px; !important; width:100%; padding:0 !important; border-right-width:0px !important; border-left-width:0px !important; } ' + 
			'.jstree .jstree-wholerow-span { position:absolute; left:0; margin:0px; padding:0; height:18px; border-width:0; padding:0; z-index:0; }';
		if(is_ff2) {
			css_string += '' + 
				'.jstree .jstree-wholerow a { display:block; height:18px; margin:0; padding:0; border:0; } ' + 
				'.jstree .jstree-wholerow-real a { border-color:transparent !important; } ';
		}
		if(is_ie7 || is_ie6) {
			css_string += '' + 
				'.jstree .jstree-wholerow, .jstree .jstree-wholerow li, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow a { margin:0; padding:0; line-height:18px; } ' + 
				'.jstree .jstree-wholerow a { display:block; height:18px; line-height:18px; overflow:hidden; } ';
		}
		$.vakata.css.add_sheet({ str : css_string, title : "jstree" });
	});
})(jQuery);
//*/

/*
* jsTree model plugin
* This plugin gets jstree to use a class model to retrieve data, creating great dynamism
*/
(function ($) {
	var nodeInterface = ["getChildren","getChildrenCount","getAttr","getName","getProps"],
		validateInterface = function(obj, inter) {
			var valid = true;
			obj = obj || {};
			inter = [].concat(inter);
			$.each(inter, function (i, v) {
				if(!$.isFunction(obj[v])) { valid = false; return false; }
			});
			return valid;
		};
	$.jstree.plugin("model", {
		__init : function () {
			if(!this.data.json_data) { throw "jsTree model: jsTree json_data plugin not included."; }
			this._get_settings().json_data.data = function (n, b) {
				var obj = (n == -1) ? this._get_settings().model.object : n.data("jstree_model");
				if(!validateInterface(obj, nodeInterface)) { return b.call(null, false); }
				if(this._get_settings().model.async) {
					obj.getChildren($.proxy(function (data) {
						this.model_done(data, b);
					}, this));
				}
				else {
					this.model_done(obj.getChildren(), b);
				}
			};
		},
		defaults : {
			object : false,
			id_prefix : false,
			async : false
		},
		_fn : {
			model_done : function (data, callback) {
				var ret = [], 
					s = this._get_settings(),
					_this = this;

				if(!$.isArray(data)) { data = [data]; }
				$.each(data, function (i, nd) {
					var r = nd.getProps() || {};
					r.attr = nd.getAttr() || {};
					if(nd.getChildrenCount()) { r.state = "closed"; }
					r.data = nd.getName();
					if(!$.isArray(r.data)) { r.data = [r.data]; }
					if(_this.data.types && $.isFunction(nd.getType)) {
						r.attr[s.types.type_attr] = nd.getType();
					}
					if(r.attr.id && s.model.id_prefix) { r.attr.id = s.model.id_prefix + r.attr.id; }
					if(!r.metadata) { r.metadata = { }; }
					r.metadata.jstree_model = nd;
					ret.push(r);
				});
				callback.call(null, ret);
			}
		}
	});
})(jQuery);
//*/

})();

define("jquery.jstree-patched", ["jquery"], function(){});

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );
define("jquery.hotkeys", ["jquery"], function(){});



// A CSLEDIT_SmartTree does the following
//
// - Presents a tree to the user representing a subset of the CSL tree in CSLEDIT_data
//     - Uses jsTree plugin to draw the tree
//
// - Allows the user to perform the following actions:
//     - Drag and drop
//     - Delete node (pressing delete on keyboard)
//
// - Implements macroLinks
//     - These make each macro instance node behave like a symlink to the
//       corresponding macro definition
//     - Supports nested macros within macros for any depth
//     - Infinite loops are detected and the offending node is given a
//       data-error="Infinite Loop" attribute
//
// - Allows incremental changes to the tree:
//   (_The code here is quite complicated,
//     especially since the addition of the macro-links, so any
//     changes should be accompanied by unit tests_)
//     - addNode
//     - deleteNode
//     - amendNode
// 

define('src/SmartTree',[	'src/uiConfig',
			'src/CslNode',
			'src/options',
			'src/dataInstance',
			'src/urlUtils',
			'src/notificationBar',
			'src/debug',
			'jquery.jstree-patched',
			'jquery.hotkeys'
		], function (
			CSLEDIT_uiConfig,
			CSLEDIT_CslNode,
			CSLEDIT_options,
			CSLEDIT_data,
			CSLEDIT_urlUtils,
			CSLEDIT_notificationBar,
			debug,
			jstree
		) {
	// Creates a SmartTree object
	//
	// Note: need to also call setCallbacks() and createTree() to create a working smartTree
	var CSLEDIT_SmartTree = function (treeElement, nodePaths, options) {
		var ranges,
			macroLinks, // like symlinks for macros
						// [{ instanceCslId: ?, macroRange: ?}]
			callbacks,
			verifyAllChanges = false, // does a complete check against CSLEDIT_data after
									  // every change for debugging
			oldSelectedNode = -1,
			leafNodes = [];

		if (options && options.data) {
			CSLEDIT_data = options.data;
		}
		if (options && options.leafNodes) {
			leafNodes = options.leafNodes;
		}

		// Set the callbacks to be used after certain actions
		var setCallbacks = function (_callbacks) {
			callbacks = _callbacks;
		};
		
		var pathContainsLeafNode = function (nodePath) {
			// NOTE: this doesn't use the parent element, so "contributor/name" and "names/name"
			//       would *both* be leaf nodes if "name" is given
			var result = false,
				path = nodePath.split("/");
			$.each(leafNodes, function (i, leafNode) {
				if (path.indexOf(leafNode) !== -1) {
					result = true;
					return false;
				}
			});
			return result;
		};

		// Check the tree matches the data - for testing and debugging
		var verifyTree = function () {
			var cslData = CSLEDIT_data.get();

			if (verifyAllChanges) {
				debug.time("verifyTree");
				// Check for inconsistencies with CSLEDIT_data
				treeElement.find('li[cslid]').each(function () {
					var $this = $(this),
						cslId;

					cslId = parseInt($this.attr('cslid'), 10);
					debug.assertEqual(CSLEDIT_data.getNode(cslId, cslData).name, $this.attr('rel'));
				});

				// Can't have non-macrolink nodes as children of a text node
				debug.assertEqual(treeElement.find('li[cslid][rel=text] li[macrolink!=true]').length, 0);
				debug.timeEnd("verifyTree");
			}
		};
		
		// Create the tree view using the jstree jQuery plugin
		var createTree = function () {
			var jsTreeData,
				nodeTypes;

			jsTreeData = jsTreeDataFromCslData(nodePaths);

			treeElement.on("loaded.jstree", function () {
				// set up range root nodes
				$.each(ranges, function (index, range) {
					range.rootNode = treeElement.children('ul').children(
						'li[cslid=' + range.first + ']');
					debug.assertEqual(range.rootNode.length, 1);
				});
				callbacks.loaded();

				verifyTree();
			});
			treeElement.on("select_node.jstree", function (event, ui) {
				treeElement.jstree("set_focus");

				if (selectedNode() === oldSelectedNode) {
					treeElement.jstree("toggle_node", ui.rslt.obj);
				} else {
					treeElement.jstree("open_node", ui.rslt.obj);
				}
				oldSelectedNode = selectedNode();

				callbacks.selectNode(event, ui);
			});
			
			// build the node types from the uiConfig data		
			nodeTypes = {};
			$.each(CSLEDIT_uiConfig.nodeIcons, function (type, icon) {
				nodeTypes[type] = { icon : { image : CSLEDIT_urlUtils.getResourceUrl(icon) } };
			});

			treeElement.jstree({
				"json_data" : { data : jsTreeData },
				"types" : { types : nodeTypes },
				"plugins" : ["themes", "json_data", "ui", "crrm", "dnd", /*"contextmenu",*/
					"types", "hotkeys"],
				//"core" : { "initially_open" : [ "node1" ] },
				"core" : { "animation" : 200 },
				"ui" : { /*"initially_select" : [ "cslTreeNode0" ],*/ "select_limit" : 1 },
				"dnd" : {
					"open_timeout" : 800,
					"move_requested" : callbacks.moveNode
				},
				"crrm" : {
					"move" : {
						// only allow re-ordering, not moving to different nodes
						"check_move" : function (move) {
							return callbacks.checkMove(
								parseInt(move.o.attr("cslid"), 10),
								parseInt(move.r.attr("cslid"), 10), move.p);
						}
					}
				},
				"hotkeys" : {
					"del" : callbacks.deleteNode,
					"f2" : false
				},
				"theme" : {
					url : CSLEDIT_urlUtils.getResourceUrl("external/jstree/themes/default/style.css")
				}				
			});
		};
		
		var jsTreeDataFromCslData = function (nodePaths) {
			var cslNodes = [],
				jsTreeData = [],
				cslData = CSLEDIT_data.get();

			ranges = [];
			macroLinks = [];

			$.each(nodePaths, function (i, path) {
				var nodes = CSLEDIT_data.getNodesFromPath(path, cslData);
				cslNodes = cslNodes.concat(nodes);
			});

			$.each(cslNodes, function (i, node) {
				var lastCslId = [ -1 ],
					firstCslId = node.cslId;
				jsTreeData.push(jsTreeDataFromCslData_inner(node, lastCslId));
				ranges.push({
					first : firstCslId,
					last : lastCslId[0]
				});
			});

			return jsTreeData;
		};

		var jsTreeDataFromCslData_inner = function (cslData, lastCslId, macroLink, parentMacros) {
			var index,
				children = [],
				cslNodes = [],
				thisCslNode,
				rel;

			if (typeof cslData.cslId === "undefined") {
				cslData.cslId = -1;
			}
			cslData.children = cslData.children || [];

			if (cslData.cslId > lastCslId[0]) {
				lastCslId[0] = cslData.cslId;
			}

			if (!pathContainsLeafNode(cslData.name)) {
				for (index = 0; index < cslData.children.length; index++) {
					children.push(jsTreeDataFromCslData_inner(
						cslData.children[index], lastCslId, macroLink, parentMacros));
				}
			}

			var jsTreeData = {
				data : CSLEDIT_uiConfig.displayNameFromNode(cslData),
				attr : {
					rel : cslData.name,
					cslid : cslData.cslId
				},
				children : children
			};

			if (cslData.name === "text") {
				thisCslNode = new CSLEDIT_CslNode(cslData);
				if (thisCslNode.hasAttr("macro")) {
					jsTreeData.attr["data-mode"] = "macro";
				}
			}

			if (typeof macroLink !== "undefined") {
				jsTreeData.attr.macrolink = macroLink;
			}

			if (options && options.enableMacroLinks) {
				// Add 'symlink' to Macro
				if (cslData.name === "text" && jsTreeData.attr["data-mode"] === "macro") {
					addMacro(jsTreeData, cslData, thisCslNode.getAttr("macro"), parentMacros);
				}
			}

			return jsTreeData;
		};

		var addMacro = function (jsTreeData, cslNode, macroName, parentMacros) {
			var macroNodes,
				macroNode,
				lastCslId,
				index,
				treeElements;

			if (typeof(parentMacros) === "undefined") {
			   parentMacros = [];
			} else {
				parentMacros = JSON.parse(JSON.stringify(parentMacros));
			}

			if (parentMacros.indexOf(macroName) === -1) {
				debug.assertEqual(macroName, new CSLEDIT_CslNode(cslNode).getAttr("macro"));
				parentMacros.push(macroName);
			} else {
				CSLEDIT_notificationBar.showMessage("Infinite loop detected in macro: " + macroName);
				debug.log("infinite loop macro parent: " + JSON.stringify(parentMacros));
				jsTreeData.attr["data-error"] = "Infinite loop";
				return;
			}

			// delete any existing macroLinks
			for (index = 0; index < macroLinks.length; index++) {
				if (macroLinks[index].instanceCslId === cslNode.cslId) {
					macroLinks.splice(index, 1);
					index--;
				}
			}

			// find the macro node:
			macroNodes = CSLEDIT_data.getNodesFromPath("style/macro");

			$.each(macroNodes, function (i, node) {
				if (new CSLEDIT_CslNode(node).getAttr("name") === macroName) {
					macroNode = node;
					return false;
				}
			});

			if (typeof macroNode === "undefined") {
				debug.log('WARNING: macro "' + macroName + '" doesn\'t exist');
				return;
			}
			
			lastCslId = [macroNode.cslId];
			
			// add the macro's children to this node
			$.each(macroNode.children, function (i, childNode) {
				jsTreeData.children.push(
					jsTreeDataFromCslData_inner(childNode, lastCslId, true, parentMacros));
			});

			macroLinks.push({
				instanceCslId : cslNode.cslId, 
				first: macroNode.cslId,
				last: lastCslId[0]
			});
		};

		// Return the cslId of the selected node
		var selectedNode = function () {
			var selected,
				cslId;

			selected = treeElement.jstree('get_selected'),
			cslId = parseInt(selected.attr("cslid"), 10);
			return cslId;
		};

		// Expands the jsTree node associated with the given cslId
		var expandNode = function (cslId) {
			treeElement.jstree("open_node", 'li[cslid=' + cslId + ']');
		};

		var rangeIndex = function (id) {
			var result = -1,
				index = 0;	

			$.each(ranges, function (i, range) {
				if (id >= range.first && id <= range.last) {
					result = index;
					return false; // to jump out of the $.each() loop
				}
				index++;
			});

			return result;
		};

		var macroLinksShiftCslIds = function (id, nodesAdded) {
			treeElement.find('li[cslid][macrolink="true"]').each(function () {
				var $this = $(this),
					cslId;
				
				cslId = parseInt($this.attr('cslid'), 10);
				if (cslId >= id) {
					$this.attr('cslid', cslId + nodesAdded);
				}
			});

			$.each(macroLinks, function (i, macroLink) {
				if (macroLink.first >= id) {
					macroLink.first += nodesAdded;
				}
				if (macroLink.last >= id) {
					macroLink.last += nodesAdded;
				}
			});
		};
			
		var macroLinksAddNode = function (parentId, position, newNode, nodesAdded) {
			var id = newNode.cslId,
				parentNodes;

			// Shift references to the macro definition
			macroLinksShiftCslIds(id, nodesAdded);

			parentNodes = treeElement.find('li[cslid=' + parentId + '][macrolink="true"]');

			// shift references to the instance cslIds
			$.each(macroLinks, function (i, macroLink) {
				if (macroLink.instanceCslId >= id) {
					macroLink.instanceCslId += nodesAdded;
				}
			});

			// Add macro node children to all instances
			$.each(macroLinks, function (i, macroLink) {
				if (macroLink.first === parentId) {
					parentNodes = parentNodes.add(
						treeElement.find('li[cslid=' + macroLink.instanceCslId + ']'));
					debug.assert(parentNodes.length > 0);
				}
			});
			
			parentNodes.each(function () {
				createSubTree($(this), position,
					jsTreeDataFromCslData_inner(newNode, [id], true));
			});
		};

		var macroLinksDeleteNode = function (nodeId, nodesDeleted) {
			var index,
				macroLink;
			
			treeElement.find('li[cslid=' + nodeId + '][macrolink="true"]').each(function () {
				treeElement.jstree('remove', $(this));
			});

			// Delete macro node children from all instances
			for (index = 0; index < macroLinks.length; index++) {
				macroLink = macroLinks[index];

				if (macroLink.instanceCslId === nodeId) {
					macroLinks.splice(index, 1);
					break;
				}
				if (macroLink.first === nodeId) {
					debug.log("WARNING: macro deleted, leaving broken instance links");
					// remove all children
					treeElement.find('li[cslid=' + macroLink.instanceCslId + '][macrolink!=true]').each(
						function () {
							$.jstree._reference(treeElement)._get_children($(this)).each(function () {
								treeElement.jstree('remove', $(this));
							});
						});

					// clean up macroLinks array:
					macroLinks.splice(index, 1);
					index--;
				}
			}
			
			macroLinksShiftCslIds(nodeId + nodesDeleted, -nodesDeleted);
			// shift references to the instance cslIds
			$.each(macroLinks, function (i, macroLink) {
				if (macroLink.instanceCslId >= nodeId + nodesDeleted + 1) {
					macroLink.instanceCslId -= nodesDeleted;
				}
			});
		};

		var macroLinksUpdateNode = function (id, _amendedNode) {
			var amendedNode = new CSLEDIT_CslNode(_amendedNode),
				macroName,
				jsTreeData = {children: [], attr: [], data: ""},
				removeChildren = false,
				updateNode = false;

			if (amendedNode.name !== "text") {
				return;
			}
			
			macroName = amendedNode.getAttr("macro");
			if (macroName === "") {
				removeChildren = true;
			} else if (amendedNode.name === "text") {
				addMacro(jsTreeData, amendedNode, macroName);
				removeChildren = true;
				updateNode = true;
			}

			if (removeChildren || updateNode) {
				treeElement.find('[cslid=' + amendedNode.cslId + ']').each(function () {
					var $this = $(this);
					if (removeChildren) {
						$.jstree._reference(treeElement)._get_children($this).each(function () {
							treeElement.jstree('remove', $(this));
						});
					}
					if (updateNode) {
						// update attributes
						if ("data-error" in jsTreeData.attr) {
							$this.attr("data-error", jsTreeData.attr["data-error"]);
						} else {
							$this.removeAttr("data-error");
						}

						$.each(jsTreeData.children, function (i, child) {
							createSubTree($this, i, child);
						});
					}
				});
			}
		};

		// Responds to an addNode event
		var addNode = function (parentId, position, newNode, nodesAdded) {
			var id,	parentNode,	thisRangeIndex,	currentCslId, range,
				matchingCslNodes, newTreeNode;

			id = newNode.cslId;

			// note: no two ranges are expected to have the same parent id
			thisRangeIndex = rangeIndex(parentId);

			// shift ranges
			$.each(ranges, function (index, range) {
				shiftCslIds(range, id, nodesAdded);
				
				// if adding to the end of a range, expand the range
				if (thisRangeIndex === index && id > range.last) {
					range.last += nodesAdded;
				}
			});

			if (options && options.enableMacroLinks) {
				macroLinksAddNode(parentId, position, newNode, nodesAdded);
			}

			if (thisRangeIndex === -1) {
				matchingCslNodes = [];
				// check if the new node belongs to this smartTree
				$.each(nodePaths, function (i, path) {
					matchingCslNodes = matchingCslNodes.concat(CSLEDIT_data.getNodesFromPath(path));
				});

				$.each(matchingCslNodes, function (i, node) {
					var lastCslId = [-1];
					if (node.cslId >= newNode.cslId && node.cslId < newNode.cslId + nodesAdded) {
						var newJsTreeNode;
						newJsTreeNode = jsTreeDataFromCslData_inner(node, lastCslId);
						createSubTree(-1, "last", newJsTreeNode);
						
						var newTreeNode = treeElement.find('li[cslid="' + node.cslId + '"]');
						ranges.push({
							first : node.cslId,
							last : node.cslId + CSLEDIT_data.numNodes(node) - 1,
							rootNode : newTreeNode
						});
						
						return false;
					}
				});

				return;
			}
			range = ranges[thisRangeIndex];

			if (!pathContainsLeafNode(CSLEDIT_data.getNodePath(newNode.cslId))) {
				parentNode = treeElement.find('li[cslid="' + parentId + '"][macrolink!="true"]');
				debug.assertEqual(parentNode.length, 1);
				createSubTree(parentNode, position, jsTreeDataFromCslData_inner(newNode, [id]));
				macroLinksUpdateNode(newNode.cslId, newNode);
			}
			verifyTree();
		};

		var totalCreateNodeTime = 0;

		// needed because "create_node" doesn't allow adding nodes with children
		var createSubTree = function (parentNode, position, jsTreeData) {
			var newNode;

			newNode = treeElement.jstree('create_node', parentNode, position, 
				{
					data : jsTreeData.data
					// attr : jsTreeData.attr
					// Don't know why, but 'create_node' fails if including a
					// 'ref' attribute on a root node. It works to just add the
					// attribute later though
				});
			newNode.attr(jsTreeData.attr);

			$.each(jsTreeData.children, function (i, child) {
				createSubTree(newNode, i, child);
			});
		};

		var shiftCslIds = function (range, fromId, amount) {
			var cslId;

			if (range.first >= fromId) {
				range.rootNode.attr("cslid", parseInt(range.rootNode.attr("cslid"), 10) + amount);
				range.rootNode.find('li[cslid][macroLink!="true"]').each(function () {
					cslId = parseInt($(this).attr("cslid"), 10);
					debug.assert(cslId <= range.last);
					if (cslId >= range.first) {
						$(this).attr("cslid", cslId + amount);
					}
				});
				
				range.first += amount;
				range.last += amount;
			} else if (range.last >= fromId) {
				range.rootNode.find('li[cslid][macroLink!="true"]').each(function () {
					cslId = parseInt($(this).attr("cslid"), 10);
					debug.assert(cslId <= range.last);
					if (cslId >= fromId) {
						$(this).attr("cslid", cslId + amount);
					}
				});
				range.last += amount;
			}
		};

		var removeTreesWithin = function (firstId, lastId) {
			var rangesToRemove = {};
			
			// TODO: write unit test for this
			$.each(ranges, function (index, range) {
				if (range.first >= firstId && range.first <= lastId) {
					rangesToRemove[index] = range;
				}
			});
			
			$.each(rangesToRemove, function (index, range) {
				debug.log("deleting range " + index);
				ranges.splice(index, 1);
				treeElement.jstree("remove", range.rootNode);
			});
		};

		// Responds to a deleteNode event
		var deleteNode = function (id, nodesDeleted) {
			var node,
				thisRangeIndex,
				allNodes,
				currentCslId,
				range;

			debug.log("delete node " + id + ", amount = " + nodesDeleted);

			removeTreesWithin(id, id + nodesDeleted - 1);
		
			thisRangeIndex = rangeIndex(id),

			// shift ranges, except for ones containing the deleted node
			$.each(ranges, function (index, range) {
				if (thisRangeIndex !== index) {
					shiftCslIds(range, id + nodesDeleted, -nodesDeleted);
				}
			});

			if (options && options.enableMacroLinks) {
				macroLinksDeleteNode(id, nodesDeleted);
			}

			if (thisRangeIndex === -1) {

				return;
			}
			range = ranges[thisRangeIndex];

			if (id === range.first) {
				ranges.splice(thisRangeIndex, 1);

				treeElement.jstree("remove", range.rootNode);

			} else { // update range
				node = treeElement.find('li[cslid="' + id + '"][macrolink!="true"]');
				debug.assert(node.length > 0);
				debug.assert(id !== 0);

				treeElement.jstree("remove", node);

				// shift this range
				shiftCslIds(range, id, -nodesDeleted);
			}

			verifyTree();
		};

		// Responds to an amendNode event
		var amendNode = function (id, amendedNode) {
			var thisRangeIndex = rangeIndex(id),
				nodes = treeElement.find('li[cslid="' + id + '"]');

			nodes.each(function () {
				treeElement.jstree('rename_node', $(this), CSLEDIT_uiConfig.displayNameFromNode(amendedNode));
			});

			if (nodes.length === 0) {
				return;
			}

			if (options && options.enableMacroLinks) {
				macroLinksUpdateNode(amendedNode.cslId, amendedNode);
			}
			
			verifyTree();
		};

		// Returns a list of the currently selected node stack cslIds,
		// or an empty list if no node in this tree is selected
		var getSelectedNodePath = function () {
			var selectedNodes = [],
				treeNode,
				cslId;

			treeNode = treeElement.jstree('get_selected'),
			cslId = treeNode.attr("cslid");

			while (typeof cslId !== "undefined") {
				selectedNodes.splice(0, 0, parseInt(cslId, 10));
				
				treeNode = treeNode.parent().parent();
				cslId = treeNode.attr("cslid");
			}

			return selectedNodes;
		};

		// Deselect any selected nodes
		var deselectAll = function () {
			treeElement.jstree("deselect_all");
		};

		// Collapse all expanded nodes in this tree
		var collapseAll = function () {
			treeElement.jstree("close_all");
		};

		return {
			createTree : createTree,
			deselectAll : deselectAll,
			selectedNode : selectedNode,
			expandNode : expandNode,
			addNode : addNode,
			deleteNode : deleteNode,
			amendNode : amendNode,

			setCallbacks : setCallbacks,

			collapseAll : collapseAll,

			getSelectedNodePath : getSelectedNodePath,

			// Verifies every node in this tree against
			// the CSLEDIT_data tree after every change
			// (used in the unit tests, or for debugging)
			_setVerifyAllChanges : function (verify) {
				verifyAllChanges = verify;
			},

			// Used for testing & debugging
			_getRanges : function () {
				return ranges;
			},
			_getMacroLinks : function () {
				return macroLinks;
			}
		};
	};

	return CSLEDIT_SmartTree;
});



// Heading for a smart tree
//
// Can use a NodeWatcher to associate the heading with a specific CSL node path

define('src/SmartTreeHeading',
		[	'src/NodeWatcher',
			'src/dataInstance',
			'src/debug'
		],
		function (
			CSLEDIT_NodeWatcher,
			CSLEDIT_data,
			debug
		) {
	var CSLEDIT_SmartTreeHeading = function (element, nodePath, title, possibleChildren, showPropertyPanel) {
		var that = this;
			
		this.element = element;
		this.title = title;

		this.possibleChildren = possibleChildren;
		this.showPropertyPanel = showPropertyPanel;

		if (typeof(nodePath) === "undefined" || nodePath === "") {
			this._updateHtml(false);
		} else {
			this.nodeWatcher = new CSLEDIT_NodeWatcher(nodePath, CSLEDIT_data, function (nodeData) {
				that._updateHtml(true, nodeData);
			});

			this.addNode = function (id, position, nodeData, numNodes) {
				that.nodeWatcher.addNode(id, position, nodeData, numNodes);
			};
			this.deleteNode = function (id, numNodes) {
				that.nodeWatcher.deleteNode(id, numNodes);
			};
			this.amendNode = function (id, nodeData) {
				that.nodeWatcher.amendNode(id, nodeData);
			};

			this.element.click(function () {
				if (that.nodeWatcher.nodeData === null) {
					that.element.find('span').addClass('selected');
					that.callbacks.selectNode(-1, [], that.nodeWatcher.nodePath);
				} else {
					that.callbacks.selectNode(that.nodeWatcher.nodeData.cslId);
				}
			});
		}
	};

	// Deselect this SmartTreeHeading
	CSLEDIT_SmartTreeHeading.prototype.deselectAll = function () {
		this.element.find('span').removeClass('selected');
	};

	CSLEDIT_SmartTreeHeading.prototype._updateHtml = function (dynamicNode, nodeData) {
		var that = this,
			cslidAttribute,
			span;

		span = $('<span/>').html(this.title);

		if (dynamicNode) {
			if (nodeData === null) {
				span.addClass('missingNode').removeAttr('cslid');
			} else {
				span.removeClass('missingNode').attr('cslid', nodeData.cslId);
			}
		}

		this.element.html('');
		this.element.append($('<h3 class="smartTreeHeading"/>').append(span));

		debug.log("updated smart tree to " + this.element.html());
	};

	CSLEDIT_SmartTreeHeading.prototype.setCallbacks = function (callbacks) {
		this.callbacks = callbacks;
	};

	// Returns the cslId of the node associated with this SmartTreeHeading
	CSLEDIT_SmartTreeHeading.prototype.selectedNode = function () {
		if (this.nodeWatcher.nodeData !== null) {
			return this.nodeWatcher.nodeData.cslId;
		} else {
			return -1;
		}
	};

	// Only call if this SmartTreeHeading is associated with a node path
	// not currently in the CSL tree
	//
	// Returns the full node path as a '/' separated string
	CSLEDIT_SmartTreeHeading.prototype.getMissingNodePath = function () {
		debug.assertEqual(this.nodeWatcher.nodeData, null);
		return this.nodeWatcher.nodePath;
	};

	// Returns a list of cslIds representing the path/stack associated with this
	// SmartTreeHeading
	CSLEDIT_SmartTreeHeading.prototype.getSelectedNodePath = function () {
		var splitNodePath = this.nodeWatcher.nodePath.split("/"),
			nodePath = [],
			cslIdPath = [],
			nodes;

		if (this.nodeWatcher.nodeData === null) {
			return [];
		}

		while (splitNodePath.length > 0) {
			nodePath.push(splitNodePath.splice(0, 1));
			nodes = CSLEDIT_data.getNodesFromPath(nodePath.join("/"));
			debug.assertEqual(nodes.length, 1);
			cslIdPath.push(nodes[0].cslId);
		}

		return cslIdPath;
	};

	return CSLEDIT_SmartTreeHeading;
});



// This creates a fieldset which can be switched between different pages of
// content using the typeSelect control.

define('src/MultiPanel',[],function () {
	// Creates a MultiPanel
	var CSLEDIT_MultiPanel = function (id) {
		var that = this;

		this.element = $('<fieldset class="multiPanel"/>').attr('id', id);
		this.typeLegend = $('<legend class="typeLegend">Type:</legend>');
		this.typeSelect = $('<select class="typeSelect"/>');
		this.typeLegend.append(this.typeSelect);

		this.currentContentPanel = $('<div class="contentPanel"/>');
		this.element.append(this.typeLegend);
		this.element.append(this.currentContentPanel);
		this.contentPanels = [];

		this.typeSelect.on('change', function () {
			that.update.apply(that);
		});
	};

	// Sets the callback which is called every time the user switches
	// to a different panel
	CSLEDIT_MultiPanel.prototype.onChange = function (callback) {
		this.onChangeCallback = callback;
	};

	// Add a new panel with the given name
	CSLEDIT_MultiPanel.prototype.addPanel = function (name) {
		var that = this,
			newPanel;

		this.typeSelect.append($('<option/>').text(name));

		newPanel = $('<div/>').css({display: "none"});
		this.contentPanels.push(newPanel);
		this.currentContentPanel.append(newPanel);
	};

	// Display the appropriate panel given the current state of
	// the this.typeSelect dropdown
	CSLEDIT_MultiPanel.prototype.update = function () {
		var that = this,
			selectedIndex = this.typeSelect.find('option').index(
				this.typeSelect.find('option:selected'));

		// display the correct panel
		$.each(that.contentPanels, function (i, panel) {
			if (i === selectedIndex) {
				panel.css({display: ""});
			} else {
				panel.css({display: "none"});
			}
		});

		if (typeof that.onChangeCallback === "function") {
			that.onChangeCallback(selectedIndex);
		}
	};

	// Select the panel with the given index
	CSLEDIT_MultiPanel.prototype.select = function (index) {
		this.typeSelect.val(this.typeSelect.find('option').eq(index).html());
		this.update();
	};

	return CSLEDIT_MultiPanel;
});



// Allows provides a way to edit space-delimited list of stings,
// each of which must be one of the supplied values

define('src/MultiComboBox',['src/debug'], function (debug) {
	// Constructs a MultiComboBox
	var CSLEDIT_MultiComboBox = function (element, possibleValues, onChange, unique) {
		var that = this;
		this._element = element;
		this._values = [];
		this._onChange = onChange;
		this._unique = unique;
		this._possibleValues = possibleValues;

		debug.assert(possibleValues.length > 0);
		
		this._refresh(true);
	};

	// Returns the jQuery element this MultiComboBox is drawn within
	CSLEDIT_MultiComboBox.prototype.getElement = function () {
		return this._element;
	};

	// Set the tooltip for this MultiComboBox
	CSLEDIT_MultiComboBox.prototype.setTooltip = function (tooltip) {
		this._element.attr("title", tooltip);
	};

	// Get or set the value of this MultiComboBox depending on whether the
	// val argument is present
	CSLEDIT_MultiComboBox.prototype.val = function (val, suppressOnChange) {
		if (typeof val === "undefined") {
			this._readValues();
			return this._values.join(" ");
		} else {
			if (val === "") {
				this._values = [];
			} else {
				this._values = val.split(" ");
			}
			if (typeof suppressOnChange === "undefined") {
				suppressOnChange = false;
			}
			this._refresh(suppressOnChange);
		}
	};

	CSLEDIT_MultiComboBox.prototype._readValues = function () {
		var that = this;
		// repopulate _values from current combo box values
		that._values = [];
		this._element.find('select').each(function () {
			that._values.push($(this).val());
		});
	};

	CSLEDIT_MultiComboBox.prototype._refresh = function (suppressOnChange) {
		var that = this,
			table = $('<table/>'),
			addButton;

		this._element.html('');
		
		$.each(this._values, function (i, value) {
			var row = $('<tr/>'),
				select = $('<select/>').css({"margin-right": 0}),
				deleteButton = $('<button class="delete"> - </button>')
					.attr("data-index", i)
					.css({"margin-left": 0});

			$.each(that._possibleValues, function (i, possibleValue) {
				select.append($('<option/>').text(possibleValue));
			});
			select.val(value);

			row.append($('<td></td>').append(select));
			row.append($('<td></td>').append(deleteButton));
			table.append(row);
		});

		addButton = $('<button class="add">+</button>');
		table.append($('<tr/>').append($('<td/>').append(addButton)));

		this._element.append(table);

		this._element.find('button.delete').on('click', function (event) {
			var index = $(event.target).attr("data-index");
			that._readValues();
			that._values.splice(index, 1);
			that._refresh();
		});

		this._element.find('button.add').on('click', function (event) {
			that._readValues();
			that._values.push('');
			that._refresh();
		});

		this._element.find('select').on('change', function (event) {
			that._changed();
		});

		if (!suppressOnChange) {
			that._changed();
		}
	};

	CSLEDIT_MultiComboBox.prototype._changed = function () {
		if (typeof this._onChange !== "undefined") {
			this._readValues();
			this._onChange(this._values.join(' '));
		}
	};
	return CSLEDIT_MultiComboBox;
});

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

var Mustache;

(function (exports) {
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = exports; // CommonJS
  } else if (typeof define === "function") {
    define('external/mustache',[],exports); // AMD
  } else {
    Mustache = exports; // <script>
  }
}((function () {
  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.5.2";
  exports.tags = ["{{", "}}"];

  exports.parse = parse;
  exports.clearCache = clearCache;
  exports.compile = compile;
  exports.compilePartial = compilePartial;
  exports.render = render;

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Renderer = Renderer;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  // OSWASP Guidelines: escape all non alphanumeric characters in ASCII space.
  var jsCharsRe = /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;

  function quote(text) {
    var escaped = text.replace(jsCharsRe, function (c) {
      return "\\u" + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    });

    return '"' + escaped + '"';
  }

  function escapeRe(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export these utility functions.
  exports.isWhitespace = isWhitespace;
  exports.isArray = isArray;
  exports.quote = quote;
  exports.escapeRe = escapeRe;
  exports.escapeHtml = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  function Renderer() {
    this.clearCache();
  }

  Renderer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Renderer.prototype.compile = function (tokens, tags) {
    if (typeof tokens === "string") {
      tokens = parse(tokens, tags);
    }

    var fn = compileTokens(tokens),
        self = this;

    return function (view) {
      return fn(Context.make(view), self);
    };
  };

  Renderer.prototype.compilePartial = function (name, tokens, tags) {
    this._partialCache[name] = this.compile(tokens, tags);
    return this._partialCache[name];
  };

  Renderer.prototype.render = function (template, view) {
    var fn = this._cache[template];

    if (!fn) {
      fn = this.compile(template);
      this._cache[template] = fn;
    }

    return fn(view);
  };

  Renderer.prototype._section = function (name, context, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(context.push(value[i]), this);
        }

        return buffer;
      }

      return value ? callback(context.push(value), this) : "";
    case "function":
      // TODO: The text should be passed to the callback plain, not rendered.
      var sectionText = callback(context, this),
          self = this;

      var scopedRender = function (template) {
        return self.render(template, context);
      };

      return value.call(context.view, sectionText, scopedRender) || "";
    default:
      if (value) {
        return callback(context, this);
      }
    }

    return "";
  };

  Renderer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // From the spec: inverted sections may render text once based on the
    // inverse value of the key. That is, they will be rendered if the key
    // doesn't exist, is false, or is an empty list.
    if (value == null || value === false || (isArray(value) && value.length === 0)) {
      return callback(context, this);
    }

    return "";
  };

  Renderer.prototype._partial = function (name, context) {
    var fn = this._partialCache[name];

    if (fn) {
      return fn(context);
    }

    return "";
  };

  Renderer.prototype._name = function (name, context, escape) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    var string = (value == null) ? "" : String(value);

    if (escape) {
      return escapeHtml(string);
    }

    return string;
  };

  /**
   * Low-level function that compiles the given `tokens` into a
   * function that accepts two arguments: a Context and a
   * Renderer. Returns the body of the function as a string if
   * `returnBody` is true.
   */
  function compileTokens(tokens, returnBody) {
    var body = ['""'];
    var token, method, escape;

    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token.type) {
      case "#":
      case "^":
        method = (token.type === "#") ? "_section" : "_inverted";
        body.push("r." + method + "(" + quote(token.value) + ", c, function (c, r) {\n" +
          "  " + compileTokens(token.tokens, true) + "\n" +
          "})");
        break;
      case "{":
      case "&":
      case "name":
        escape = token.type === "name" ? "true" : "false";
        body.push("r._name(" + quote(token.value) + ", c, " + escape + ")");
        break;
      case ">":
        body.push("r._partial(" + quote(token.value) + ", c)");
        break;
      case "text":
        body.push(quote(token.value));
        break;
      }
    }

    // Convert to a string body.
    body = "return " + body.join(" + ") + ";";

    // Good for debugging.
    // console.log(body);

    if (returnBody) {
      return body;
    }

    // For great evil!
    return new Function("c, r", body);
  }

  function escapeTags(tags) {
    if (tags.length === 2) {
      return [
        new RegExp(escapeRe(tags[0]) + "\\s*"),
        new RegExp("\\s*" + escapeRe(tags[1]))
      ];
    }

    throw new Error("Invalid tags: " + tags.join(" "));
  }

  /**
   * Forms the given linear array of `tokens` into a nested tree structure
   * where tokens that represent a section have a "tokens" array property
   * that contains all tokens that are in that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];
    var token, section;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      switch (token.type) {
      case "#":
      case "^":
        token.tokens = [];
        sections.push(token);
        collector.push(token);
        collector = token.tokens;
        break;
      case "/":
        if (sections.length === 0) {
          throw new Error("Unopened section: " + token.value);
        }

        section = sections.pop();

        if (section.value !== token.value) {
          throw new Error("Unclosed section: " + section.value);
        }

        if (sections.length > 0) {
          collector = sections[sections.length - 1].tokens;
        } else {
          collector = tree;
        }
        break;
      default:
        collector.push(token);
      }
    }

    // Make sure there were no open sections when we're done.
    section = sections.pop();

    if (section) {
      throw new Error("Unclosed section: " + section.value);
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var lastToken;

    for (var i = 0; i < tokens.length; ++i) {
      var token = tokens[i];

      if (lastToken && lastToken.type === "text" && token.type === "text") {
        lastToken.value += token.value;
        tokens.splice(i--, 1); // Remove this token from the array.
      } else {
        lastToken = token;
      }
    }
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parse(template, tags) {
    tags = tags || exports.tags;

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var tokens = [],      // Buffer to hold the tokens
        spaces = [],      // Indices of whitespace tokens on the current line
        hasTag = false,   // Is there a {{tag}} on the current line?
        nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    var stripSpace = function () {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var type, value, chr;

    while (!scanner.eos()) {
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push({type: "text", value: chr});

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      tokens.push({type: type, value: value});

      if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      }

      // Set the tags for the next time around.
      if (type === "=") {
        tags = value.split(spaceRe);
        tagRes = escapeTags(tags);
      }
    }

    squashTokens(tokens);

    return nestTokens(tokens);
  }

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default renderer.
  var _renderer = new Renderer();

  /**
   * Clears all cached templates and partials.
   */
  function clearCache() {
    _renderer.clearCache();
  }

  /**
   * High-level API for compiling the given `tokens` down to a reusable
   * function. If `tokens` is a string it will be parsed using the given `tags`
   * before it is compiled.
   */
  function compile(tokens, tags) {
    return _renderer.compile(tokens, tags);
  }

  /**
   * High-level API for compiling the `tokens` for the partial with the given
   * `name` down to a reusable function. If `tokens` is a string it will be
   * parsed using the given `tags` before it is compiled.
   */
  function compilePartial(name, tokens, tags) {
    return _renderer.compilePartial(name, tokens, tags);
  }

  /**
   * High-level API for rendering the `template` using the given `view`. The
   * optional `partials` object may be given here for convenience, but note that
   * it will cause all partials to be re-compiled, thus hurting performance. Of
   * course, this only matters if you're going to render the same template more
   * than once. If so, it is best to call `compilePartial` before calling this
   * function and to leave the `partials` argument blank.
   */
  function render(template, view, partials) {
    if (partials) {
      for (var name in partials) {
        compilePartial(name, partials[name]);
      }
    }

    return _renderer.render(template, view);
  }

  return exports;
}())));



// A property panel that for editing *any* arbitrary CSL node
//
// setupPanel() presents all the information within the CSL node, except it's children
//
// It uses the lists in CSLEDIT_uiConfig.attributeGroups to group attributes into fieldsets
//
// If the node contains choices (I use 'choices' and 'modes' interchangably) then a
// CSLEDIT_MultiPanel is created which allows switching between them and contains all
// the attribute editors specific to the current mode.
//
// Note: Some of HTML here may be nice to generate using mustache, but the dynamic nature
//       makes it difficult to do unless it's refactored to redraw the entire panel
//       whenever the HTML needs changing.

define('src/genericPropertyPanel',[	'src/MultiPanel',
			'src/MultiComboBox',
			'src/uiConfig',
			'src/CslNode',
			'src/dataInstance',
			'src/xmlUtility',
			'src/debug',
			'jquery.ui',
			'external/mustache'
		], function (
			CSLEDIT_MultiPanel,
			CSLEDIT_MultiComboBox,
			CSLEDIT_uiConfig,
			CSLEDIT_CslNode,
			CSLEDIT_data,
			CSLEDIT_xmlUtility,
			debug,
			jquery_ui,
			Mustache
		) {
	var onChangeTimeout,
		multiInputs,
		nodeData,
		newAttributes,
		toolbar,
		panel,
		toolbarButtonIndex,
		toolbarButtons,
		toolbarButtonSchema = {
			'font-weight' : {
				'normal' : 'default',
				'bold' : { html : '<strong>B</strong>' }
				// 'light' not supported
			},
			'font-style' : {
				'italic' : { html : '<i>I</i>' },
				'normal' : 'default'
				// "oblique" not supported
			},
			'text-decoration' : {
				'none' : 'default',
				'underline' : { html : '<u>U</u>' }
			},
			'font-variant' : {
				'small-caps' : {
					html : '<span style="font-variant: small-caps;">Small Caps</span>'
				},
				'normal' : 'default'
			},
			'vertical-align' : {
				'baseline' : 'default',
				'sup' : { html : 'x<sup>s</sup>' },
				'sub' : { html : 'x<sub>s</sub>' }
			},
			'quotes' : {
				'false' : 'default',
				'true' : { html : '&#8220;&#8221;' }
			},
			'strip-periods' : {
				'false' : 'default',
				'true' : { html : 'Strip Periods' }
			}
		},
		choicePanel,
		schemaChoices,
		schemaChoiceIndexes,
		schemaAttributes,
		executeCommand,
		fieldsets,
		selectedChoice;

	var addCustomClasses = function (element, attributeName) {
		var classes = CSLEDIT_uiConfig.attributeClasses[attributeName];
		if (typeof(classes) !== "undefined") {
			element.addClass(classes);
		}
	};

	var inputAttributeRow = function (index, attributeName, schemaAttribute, enabled) {
		var row, textInput;

		row = $('<tr/>');
		row.append($('<td align="right" />').append(label(index, attributeName)));

		textInput = $('<input class="propertyInput" />');
		textInput.attr('id', inputId(index));
		addCustomClasses(textInput, attributeName);

		if (schemaAttribute.documentation !== "") {
			textInput.attr('title', schemaAttribute.documentation);
		}

		if (!enabled && !schemaAttribute.hasOwnProperty("defaultValue")) {
			textInput.attr('disabled', true);
		}

		row.append($('<td/>').append(textInput));

		return row;
	};

	var label = function (index, attribute) {
		var element = $('<label class="propertyLabel" />');
		element.attr('for', inputId(index));
		element.attr('id', labelId(index));
		element.html(attribute);

		return element;
	};

	var indexOfAttribute = function (attributeName, attributes) {
		var index;
		for (index = 0; index < attributes.length; index++) {
			if (attributes[index].key === attributeName) {
				return index;
			}
		}
		// couldn't find
		return -1;
	};

	var indexesOfAttribute = function (attributeName, attributes) {
		var indexes = [],
			index;
		for (index = 0; index < attributes.length; index++) {
			if (attributes[index].key === attributeName) {
				indexes.push(index);
			}
		}
		return indexes;
	};

	var positionInSchema = function (attributeName) {
		var index = 0,
			position = -1;

		$.each(toolbarButtonSchema, function (key, value) {
			if (key === attributeName) {
				position = index;
				return false;
			}
			index++;
		});

		return position;
	};

	var isValidValue = function (value, schemaAttribute) {
		var containsValueType = false,
			isValid = false;

		$.each(schemaAttribute.values, function (i, schemaValue) {
			if (schemaValue.type === "value") {
				containsValueType = true;
				return false;
			}
		});

		if (containsValueType) {
			if (schemaAttribute.list) {
				// Note: doesn't check validity of list contents at present
				isValid = true;
			} else {
				$.each(schemaAttribute.values, function (i, schemaValue) {
					if (value === schemaValue.value) {
						isValid = true;
						return false;
					}
				});
			}
		} else {
			isValid = true;
		}

		return isValid;
	};

	var toolbarButtonClicked = function (event) {
		var target = $(event.target).closest('a'),
			attribute = target.attr('data-attribute'),
			value,
			index = indexOfAttribute(attribute, nodeData.attributes),
			siblingControls = $(event.target).siblings('[data-attribute="' + attribute + '"]');
		
		// disable any other buttons for this attribute
		siblingControls.removeClass('selected');

		target.toggleClass('selected');

		if (target.hasClass('selected')) {
			value = target.attr('data-value');
		} else {
			value = defaultValueForToolbarButton(attribute);
		}

		nodeData.attributes[index] = {
			key : attribute,
			value : value,
			enabled : true
		};

		nodeChanged();

		event.preventDefault();
	};

	var stripChildren = function (nodeData) {
		return {
			name : nodeData.name,
			cslId : nodeData.cslId,
			attributes : nodeData.attributes,
			textValue : nodeData.textValue
		};
	};
	
	var nodeChanged = function () {
		// read user data
		$('[id^="nodeAttributeLabel"]').each(function () {
			var $this = $(this), key, value, index, enabled, attributes;
			index = $this.attr("id").replace(/^nodeAttributeLabel/, "");
			key = $this.html();

			if (!$this.is(":visible")) {
				return true;
			}

			if ($("#nodeAttribute" + index).length > 0) {
				value = $("#nodeAttribute" + index).val();
			} else {
				debug.assert(index in multiInputs);
				value = multiInputs[index].val();
			}

			if (selectedChoice !== null && key in schemaChoices[selectedChoice].attributes) {
				attributes = schemaChoices[selectedChoice].attributes;
			} else {
				attributes = schemaAttributes;
			}

			if (attributes.hasOwnProperty(key) && attributes[key].alwaysOutput === true) {
				enabled = true;
			} else if (key in attributes && "defaultValue" in attributes[key]) {
				enabled = (value !== attributes[key].defaultValue);
			} else {
				enabled = nodeData.attributes[index].enabled;
			}

			nodeData.attributes[index] = {
				key : key,
				value : value,
				enabled : enabled
			};
		});
		nodeData.textValue = $('#textNodeInput').val();
		executeCommand("amendNode", [nodeData.cslId, stripChildren(nodeData)]);
	};

	var labelId = function (index) {
		return 'nodeAttributeLabel' + index;
	};

	var inputId = function (index) {
		return 'nodeAttribute' + index;
	};

	var defaultValueForToolbarButton = function (attributeName) {
		var defaultValue;
		$.each(toolbarButtonSchema[attributeName], function (value, control) {
			if (control === 'default') {
				defaultValue = value;
				return false;
			}
		});
		return defaultValue;
	};

	var createButton = function (attributeName, cslSchemaAttribute, index, attribute) {
		debug.assert(typeof defaultValueForToolbarButton(attributeName) !== "undefined");

		$.each(toolbarButtonSchema[attributeName], function (attributeValue, control) {
			var button, buttonLabel;

			if (control !== 'default') {
				button = $('<a/>')
					.attr('href', '#')
					.attr('data-attribute', attributeName)
					.attr('data-value', attributeValue)
					.addClass('toolbarButton')
					.html(control.html);

				if (cslSchemaAttribute.documentation !== "") {
					button.attr("title", cslSchemaAttribute.documentation);
				}

				toolbarButtons.push({
					position : positionInSchema(attributeName),
					control : button
				});

				if (attribute.value === attributeValue) {
					button.addClass('selected');
				}
			}
		});
	};

	var createAttributeEditor = function (attributeName, schemaAttribute, index) {
		var attribute,
			schemaValues,
			dropdownValues,
			dropdownDocumentation,
			valueIndex,
			thisRow,
			multiInput,
			intValue,
			value;

		attribute = null;

		$.each(nodeData.attributes, function (i, thisAttribute) {
			var existingAttributeIndex;
			
			if (thisAttribute.key === attributeName &&
				isValidValue(thisAttribute.value, schemaAttribute)) {

				// do deep copy if one already exists
				existingAttributeIndex = indexOfAttribute(attributeName, newAttributes);
				if (existingAttributeIndex !== -1) {
					attribute = {
						key : thisAttribute.key,
						value : thisAttribute.value,
						enabled : thisAttribute.enabled
					};
				} else {
					attribute = thisAttribute;
				}
				
				if (!("enabled" in attribute)) {
					attribute["enabled"] = true;
				}
			}
		});
		if (attribute === null) {
			if (!schemaAttribute.hasOwnProperty("defaultValue")) {
				value = "";
			} else {
				value = schemaAttribute.defaultValue;
			}
			// create attribute if it doesn't exist
			attribute = { key : attributeName, value : value, enabled : false };
		}

		newAttributes.push(attribute);

		if (typeof toolbarButtonSchema[attributeName] !== "undefined") {
			createButton(attributeName, schemaAttribute, index, attribute);
			return;
		}

		schemaValues = schemaAttribute.values;
		dropdownValues = [];
		dropdownDocumentation = {};

		// add macro dropdown values, they aren't in the schema
		if (attributeName === "macro") {
			$.each(CSLEDIT_data.getNodesFromPath("style/macro"), function (i, node) {
				var cslNode = new CSLEDIT_CslNode(node);
				if (cslNode.hasAttr("name")) {
					dropdownValues.push(cslNode.getAttr("name"));
				}
			});
		}

		if (schemaValues.length > 0) {
			for (valueIndex = 0; valueIndex < schemaValues.length; valueIndex++) {
				switch (schemaValues[valueIndex].type) {
				case "novalue":
					dropdownValues.push(schemaValues[valueIndex].value);
					dropdownDocumentation[schemaValues[valueIndex].value] =
						schemaValues[valueIndex].documentation;
					break;
				case "value":
					dropdownValues.push(schemaValues[valueIndex].value);
					if (schemaValues[valueIndex].documention !== "") {
						dropdownDocumentation[schemaValues[valueIndex].value] =
							schemaValues[valueIndex].documentation;
					}
					break;
				case "data":
					switch (schemaValues[valueIndex].value) {
					case "boolean":
						dropdownValues.push("true");
						dropdownValues.push("false");
						break;
					case "integer":
						for (intValue = 0; intValue < 20; intValue++) {
							dropdownValues.push(intValue);
						}
						break;
					case "language":
						// TODO: restrict input to language codes
						break;
					default:
						debug.log("WARNING: data type not recognised: " + 
							schemaValues[valueIndex].type);
					}
					break;
				default:
					debug.assert(false, "attribute value type not recognised");
				}
			}
		}

		if (dropdownValues.length === 1 && dropdownValues[0] !== "") {
			// if only 1 one value is possible, put it in a label
			thisRow = $('<tr/>');
			thisRow.append($('<td align="right"/>').append(label(index, attributeName)));
			thisRow.append($('<td/>').append(
				$('<label/>').attr('id', "nodeAttribute" + index).text(dropdownValues[0])));
		} else if (dropdownValues.length > 1) {
			thisRow = $('<tr/>');
			thisRow.append($('<td align="right" />').append(label(index, attributeName)));
			if (schemaAttribute.list) {
				multiInput = new CSLEDIT_MultiComboBox(
						$('<td class="input" />'), dropdownValues, function () {nodeChanged(); });
				multiInput.val(attribute.value, true);
				
				if (!attribute.enabled && !schemaAttribute.hasOwnProperty("defaultValue")) {
					multiInput.getElement().attr("disabled", true);
				}
				thisRow.append(multiInput.getElement());
				multiInputs[index] = multiInput;
			} else {
				thisRow.append((function () {
					var select, cell;
					select = $('<select class="propertySelect" />')
						.attr('id', inputId(index))
						.attr('attr', index);
					addCustomClasses(select, attributeName);
					
					$.each(dropdownValues, function (i, value) {
						var option = $($("<option/>").text(value));
						if (value in dropdownDocumentation) {
							option.attr("title", dropdownDocumentation[value]);
						}
						select.append(option);
					});

					cell = $('<td class="input" />').append(select);
					if (!attribute.enabled && !schemaAttribute.hasOwnProperty("defaultValue")) {
						cell.attr('disabled', true);
					}
					
					return cell;
				}()));
			}
		} else {
			thisRow = inputAttributeRow(index, attributeName, schemaAttribute, attribute.enabled);
		}

		var toggleButton;

		if (!schemaAttribute.hasOwnProperty("defaultValue")) {
			toggleButton = $('<button class="toggleAttrButton" />').attr('attrIndex', index);
			if (attribute.enabled) {
				toggleButton.text('Disable');
			} else {
				toggleButton.text('Enable');
			}
			thisRow.append($('<td/>').append(toggleButton));
		}
		thisRow.find("#" + inputId(index)).val(attribute.value);
			
		if (schemaAttribute.documentation !== "") {
			thisRow.attr('title', schemaAttribute.documentation);
		}

		return thisRow;
	};

	var setupChoiceTabs = function () {
		var possibleSelectedChoices = [], // choices with some attributes enabled
			definiteSelectedChoice,       // the best choice with all attributes enabled
			mostMatchingAttributes = 0; // the highest number of matching attributes from all the choices

		if (typeof choicePanel === "undefined" || choicePanel === null) {
			return;
		}

		// select the enabled mode
		$.each(schemaChoices, function (choiceIndex, choice) {
			// check against the first attribute in each schemaChoice list to determine 
			// which mode we are in
			var definitelySelected = false,
				possiblySelected = false,
				numMatchingAttributes = 0;
			
			$.each(choice.attributes, function (attributeName, attribute) {
				definitelySelected = true;
				return false;
			});

			$.each(choice.attributes, function (attributeName, schemaAttribute) {
				var attributeIndexes = indexesOfAttribute(attributeName, nodeData.attributes),
					thisAttribute;
				
				$.each(attributeIndexes, function (i, attributeIndex) {
					if (nodeData.attributes[attributeIndex].enabled &&
							isValidValue(nodeData.attributes[attributeIndex].value, schemaAttribute)) {
						thisAttribute = nodeData.attributes[attributeIndex];
						return false;
					}
				});

				if (typeof thisAttribute !== "undefined" && thisAttribute.enabled) {
					numMatchingAttributes++;
					possiblySelected = true;
				} else {
					definitelySelected = false;
				}
			});

			if (definitelySelected) {
				if (numMatchingAttributes > mostMatchingAttributes) {
					mostMatchingAttributes = numMatchingAttributes;
					definiteSelectedChoice = choiceIndex;
				}
			}
			if (possiblySelected) {
				possibleSelectedChoices.push(choiceIndex);
			}
		});

		if (typeof(definiteSelectedChoice) !== "undefined") {
			choicePanel.select(definiteSelectedChoice);
			enableControlsInTab(definiteSelectedChoice);
		} else if (possibleSelectedChoices.length > 0) {
			if (possibleSelectedChoices.length > 1) {
				debug.log('WARNING: not clear which mode this node is in');
			}
			choicePanel.select(possibleSelectedChoices[0]);
			enableControlsInTab(possibleSelectedChoices[0]);
		} else {
			// just select the first one
			choicePanel.select(0);
			enableControlsInTab(0);
		}
		
		choicePanel.onChange(function (index) {
			enableControlsInTab(index);
			nodeChanged();
		});
	};

	var enableControlsInTab = function (index) {
		// enable all controls in selected tab and disable the rest
		$.each(schemaChoiceIndexes, function (choiceIndex, choice) {
			$.each(choice, function (i, attributeIndex) {
				nodeData.attributes[attributeIndex].enabled = (choiceIndex === index);
				panel.find('#' + inputId(attributeIndex)).val(nodeData.attributes[attributeIndex].value);
			});
		});

		selectedChoice = index;
	};

	var drawFieldsets = function (attributeEditors) {
		var groupTables = {},
			fieldsets = [],
			miscTable = $('<table/>'),
			miscFieldset = $('<fieldset class="float" />').append(
				$('<legend/>').text(CSLEDIT_uiConfig.displayNameFromNode(nodeData)));

		$.each(CSLEDIT_uiConfig.attributeGroups, function (name, attributes) {
			var fieldset;

			groupTables[name] = $('<table/>');
			fieldset = $('<fieldset class="float" />').append(
				$('<legend/>').text(name));

			if (attributes.indexOf("fontFormattingControls") !== -1) {
				fieldset.append(toolbar);
			}
			fieldset.append(groupTables[name]);

			fieldsets.push(fieldset);
		});

		miscTable = $('<table/>');
		
		$.each(attributeEditors, function (attributeName, editor) {
			var foundGroup = false;
			$.each(CSLEDIT_uiConfig.attributeGroups, function (groupName, attributes) {
				if (attributes.indexOf(attributeName) !== -1) {
					groupTables[groupName].append(editor);
					foundGroup = true;
				}
			});
			if (!foundGroup) {
				miscTable.append(editor);
			}
		});

		// only display fieldsets with non-empty tables
		$.each(fieldsets, function (i, fieldset) {
			if (fieldset.find('tr').length > 0 || fieldset.find('input').length > 0 ||
					fieldset.find('.toolbar a').length > 0) {
				panel.append(fieldset);
			}
		});

		if (miscTable.find('tr').length > 0) {
			miscFieldset.append(miscTable);
			panel.append(miscFieldset);
		}
	};

	// Sets up a generic property panel
	//
	// - _panel - the jQuery element to create the panel within
	// - _nodeData - the CSL node to create the panel for
	// - dataType - the data type of this CSL node, e.g. "text" if it contains text.
	//              (all CSL nodes that contain child nodes have dataType null)
	// - _schemaAttributes - map of attributes for this CSL node
	// - _schemaChoices - list of choices (mutually exclusive modes) that the node can
	//                    be in, each choice has a list of attributes
	// - _executeCommand - the function to call to issue commands (e.g. CSLEDIT_controller.exec)
	var setupPanel = function (_panel, _nodeData, dataType, _schemaAttributes, _schemaChoices,
			_executeCommand) {
		var table,
			attrIndex,
			attributeEditors = {};
		
		schemaChoices = _schemaChoices;
		schemaAttributes = _schemaAttributes;
		executeCommand = _executeCommand;

		panel = _panel;
		nodeData = _nodeData;

		selectedChoice = null; // will be set to >= 0 if the node contains choices

		// remove child nodes
		panel.children().remove();

		toolbar = $('<div class="toolbar" />');

		// TODO: data validation
		switch (dataType) {
		case null:
			// ignore - no data type
			break;
		case "anyURI":
			// text input with uri validation
			break;
		default:
			// no validation
		}

		toolbarButtons = [];
		newAttributes = [];
		multiInputs = {};
		schemaChoiceIndexes = [];

		toolbarButtonIndex = 0;

		choicePanel = null;

		// start with attribute editors in choice tabs
		attrIndex = -1;
		if (schemaChoices.length > 0) {

			choicePanel = new CSLEDIT_MultiPanel('multiPanel');
			choicePanel.element.addClass("float");
			panel.append(choicePanel.element);

			$.each(schemaChoices, function (choiceIndex, choice) {
				var addedToTab = false,
					table = $('<table/>');
				schemaChoiceIndexes[choiceIndex] = [];

				$.each(choice.attributes, function (attributeName, attribute) {
					var editor;
					if (!addedToTab) {
						// exceptions for some nodes
						// TODO: put these in uiConfig, or better yet, embed in schema somehow
						if (nodeData.name === "date-part") {
							choicePanel.addPanel(attribute.values[attribute.values.length - 1].value);
						} else if (nodeData.name === "term") {
							// Warning: this depends on the order in the schema which may change in future
							choicePanel.addPanel(
								["normal", "ordinals", "long ordinals", "gender assignable"][choiceIndex]);
						} else {
							choicePanel.addPanel(attributeName);
						}
						addedToTab = true;
					}
					
					attrIndex++;
					editor = createAttributeEditor(attributeName, attribute, attrIndex);
					schemaChoiceIndexes[choiceIndex].push(attrIndex);

					editor.find('button.toggleAttrButton').remove();
					editor.find('*').removeAttr('disabled');
					table.append(editor);
				});

				if (addedToTab) {
					choicePanel.contentPanels[choiceIndex].append(table);
				} else {
					choicePanel.addPanel("No attributes for this option");
				}
			});
		}

		table = $('<table/>');
		// create value editor (if a text or data element)
		if (dataType !== null) {
			$(Mustache.to_html(
				'<tr><td align="right"><label for="textNodeInput" id="textNodeInputLabel" class="propertyLabel">' +
				'{{dataType}} value</label></td>' + 
				'<td class="input"><input id="textNodeInput" class="propertyInput"></input></td></tr>',
				{ dataType : dataType })
			).appendTo(panel);
		
			$("#textNodeInput").val(nodeData.textValue);
		}

		// other attribute editors
		$.each(schemaAttributes, function (attributeName, schemaAttribute) {
			attrIndex++;
			attributeEditors[attributeName] = createAttributeEditor(attributeName, schemaAttribute, attrIndex);
		});

		toolbarButtons.sort(function (a, b) {
			return a.position - b.position;
		});

		$.each(toolbarButtons, function (i, control) {
			if (control.hasOwnProperty('control')) {
				toolbar.append(control.control);
			}
		});

		drawFieldsets(attributeEditors);

		nodeData.attributes = newAttributes;

		$(".propertyInput").on("input", function () {
			clearTimeout(onChangeTimeout);
			onChangeTimeout = setTimeout(function () { nodeChanged(); }, 500);
		});

		$(".propertySelect").on("change", function () { nodeChanged(); });

		$('.toggleAttrButton').click(function (buttonEvent) {
			var index = $(buttonEvent.target).attr("attrIndex");

			if (nodeData.attributes[index].enabled) {
				nodeData.attributes[index].enabled = false;
				$("#nodeAttribute" + index).attr("disabled", "disabled");
			} else {
				nodeData.attributes[index].enabled = true;
				$("#nodeAttribute" + index).removeAttr("disabled");
			}

			setupPanel(panel, nodeData, dataType, schemaAttributes, schemaChoices,
				executeCommand);
			clearTimeout(onChangeTimeout);
			onChangeTimeout = setTimeout(function () { nodeChanged(); }, 10);
		});

		toolbar.find('a.toolbarButton').on('click', toolbarButtonClicked);

		setupChoiceTabs();
	};
	
	return {
		setupPanel : setupPanel
	};
});



// Custom property panel for 'choose/if' and 'choose/else-if' nodes

define('src/ConditionalPropertyPanel',['src/CslNode', 'src/debug'], function (CSLEDIT_CslNode, debug) {

	// Creates a conditional propery panel in the given element
	var CSLEDIT_ConditionalPropertyPanel = function (element, node, executeCommand) {
		var that = this;

		this.element = element;
		this.node = new CSLEDIT_CslNode(node);
		this.node.children = []; // not interested in the children
		this.executeCommand = executeCommand;

		this.conditions = []; // the 'model' for this view

		// any / none / all selector
		this.matchSelect = $('<select/>');
		$.each(CSLEDIT_schema.attributes('choose/if').match.values, function (i, value) {
			that.matchSelect.append($('<option>').text(value.value));
		});

		// generate mainOptions from the schema
		this.mainOptions = {};
		$.each(this._attributeUI, function (attribute, ui) {
			var mainOptionProperties = that.mainOptions[ui.mainOption] || [];
			
			mainOptionProperties.push({
				attribute: attribute,
				subOption: ui.subOption
			});
			that.mainOptions[ui.mainOption] = mainOptionProperties;
		});

		this._setup();
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._attributeValue = function (attribute) {
		var that = this,
			values = [];

		$.each(that.conditions, function (i, condition) {
			if (condition.attribute === attribute) {
				values.push(condition.value);
			}
		});

		return values.join(" ");
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._removeDuplicateOptions = function () {
		var that = this;

		$.each(that.node.attributes, function (attrIndex, attribute) {
			var selectedValues = that._attributeValue(attribute.key).split(" "),
				processedValues = [],
				availableValues;

			if (attribute.key !== "match") {
				// remove currently selcted values from availableValues
				availableValues = that._possibleValues(attribute.key);
				$.each(selectedValues, function (i, value) {
					var index = availableValues.indexOf(value);
					if (index !== -1) {
						availableValues.splice(index, 1);
					}
				});

				// remove duplicate values
				$.each(that.valueControls, function (i, valueControl) {
					if (that.conditions[i].attribute === attribute.key) {
						var $this = $(this),
							value = $this.val();

						// check if it's a duplicate
						if (processedValues.indexOf(value) !== -1) {
							if (availableValues.length === 0) {
								// no more available values, set processedValues and setup again
								that.node.setAttr(attribute.key, processedValues.join(" "));
								that.executeCommand('amendNode', [that.node.cslId, that.node]);
								that._setup();
								return;
							} else {
								// give it a new value
								value = availableValues.pop();
								$this.val(value);
								selectedValues.push(value);
							}
						}
						processedValues.push(value);
					}
				});

				// remove currently selected values from other controls options
				$.each(that.valueControls, function (i, valueControl) {
					if (that.conditions[i].attribute === attribute.key) {
						var $this = $(this);

						// remove all except current val
						$this.find('option[value!="' + $this.val() + '"]').remove();

						// add back the other available options
						$.each(availableValues, function (i, option) {
							$this.append($('<option/>').text(option));
						});
					}
				});
			}
		});
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._attributeUI = {
		"type" : {
			mainOption: "The document type is"
		},
		"disambiguate" : {
			mainOption: "Citations are disambiguated"
		},
		"variable" : {
			mainOption: "The variable",
			subOption: "is present"
		},
		"is-numeric" : {
			mainOption: "The variable",
			subOption: "is a number"
		},
		"is-uncertain-date" : {
			mainOption: "The date",
			subOption: "is uncertain"
		},
		"locator" : {
			mainOption: "The locator subtype",
			subOption: "is present"
		},
		"position" : {
			mainOption: "The position is"
		}	
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._possibleValues = function (attribute) {
		// get possible values from schema
		var possibleValues = [];
		$.each(CSLEDIT_schema.choices("choose/if"), function (i, choice) {
			if (choice.attributes.hasOwnProperty(attribute)) {
				$.each(choice.attributes[attribute].values, function (i2, possibleValue) {
					if (possibleValue.type === "value") {
						possibleValues.push(possibleValue.value);
					}
				});
				return false;
			}
		});

		// for MLZ schema which doesn't put the values in choices
		if (possibleValues.length === 0 && attribute in CSLEDIT_schema.attributes("choose/if")) {
			$.each(CSLEDIT_schema.attributes("choose/if")[attribute].values, function (i, possibleValue) {
				if (possibleValue.type === "value") {
					possibleValues.push(possibleValue.value);
				}
			});
		}

		return possibleValues;
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._availableValues = function (attribute) {
		var availableValues = this._possibleValues(attribute),
			selectedValues = this._attributeValue();

		// remove currently selcted values from availableValues
		$.each(this._attributeValue(attribute).split(" "), function (i, value) {
			var index = availableValues.indexOf(value);
			if (index !== -1) {
				availableValues.splice(index, 1);
			}
		});
		return availableValues;
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._createConditionControls = function (i, condition) {
		var that = this,
			mainOption,
			mainOptionControl,
			valueControl,
			subOptionControl;

		// create mainOption
		mainOptionControl = $('<select class="mainOptionSelect" />').attr('data-index', i);
		$.each(that.mainOptions, function (mainOption, properties) {
			mainOptionControl.append($('<option/>').text(mainOption));
		});
		mainOption = that._attributeUI[condition.attribute].mainOption;
		mainOptionControl.val(mainOption);
		that.mainOptionControls[i] = mainOptionControl;

		// create subOptionControl
		if (that.mainOptions[mainOption].length > 1) {
			subOptionControl = $('<select class="subOptionSelect" />').attr('data-index', i);
			$.each(that.mainOptions[mainOption], function (i, properties) {
				subOptionControl.append($('<option/>').text(properties.subOption));
				if (condition.attribute === properties.attribute) {
					subOptionControl.val(properties.subOption);
				}
			});
		} else {
			subOptionControl = $('<span/>');
			$.each(that.mainOptions[mainOption], function (i, properties) {
				subOptionControl.append(properties.subOption);
			});
		}
		that.subOptionControls[i] = subOptionControl;
		
		// create value control
		if (that._possibleValues(condition.attribute).length > 1) {
			valueControl = $('<select class="valueSelect" />').attr('data-index', i);
		
			$.each(that._possibleValues(condition.attribute), function (i, possibleValue) {
				valueControl.append($('<option/>').text(possibleValue));
			});
			valueControl.val(condition.value);
		} else {
			valueControl = $(); // empty
		}

		that.valueControls[i] = valueControl;
	};

	// for adding or amending
	CSLEDIT_ConditionalPropertyPanel.prototype._setCondition = function (index, newCondition) {
		var that = this,
			oldCondition = that.conditions[index],
			value;

		// set condition
		that.conditions[index] = newCondition;	

		// update view
		that._createConditionControls(index, newCondition);
		that._refresh();

		if (typeof(oldCondition) !== "undefined") {
			// update old attribute value
			value = that._attributeValue(oldCondition.attribute);
			if (value === "") {
				that.node.setAttrEnabled(oldCondition.attribute, false);
			} else {
				that.node.setAttr(oldCondition.attribute, value);
			}
		}

		// update new attribute value
		that.node.setAttr(newCondition.attribute, that._attributeValue(newCondition.attribute));
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._removeCondition = function (index) {
		var that = this,
			attribute = that.conditions[index].attribute,
			i;

		// update conditions
		that.conditions.splice(index, 1);

		// update view
		that.mainOptionControls.length = that.conditions.length;
		that.subOptionControls.length = that.conditions.length;
		that.valueControls.length = that.conditions.length;

		for (i = index; i < that.conditions.length; i++) {
			that._createConditionControls(i, that.conditions[i]);
		}

		that._refresh();

		// update value
		if (that._attributeValue(attribute) === "") {
			that.node.setAttrEnabled(attribute, false);
		} else {
			that.node.setAttr(attribute, that._attributeValue(attribute));
		}
		that.executeCommand('amendNode', [that.node.cslId, that.node]);
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._setupEventHandlers = function () {
		var that = this;

		// event handlers
		this.element.find('select.mainOptionSelect').on('change', function () {
			var $this = $(this),
				index = $this.attr('data-index'),
				optionProperties = that.mainOptions[$this.val()][0],
				attribute = optionProperties.attribute,
				newCondition = {};

			newCondition.attribute = attribute;
			newCondition.value = that._availableValues(attribute)[0];
			if (typeof(newCondition.value) === "undefined") {
				alert("No more available values for this condition type");
				return;
			}
			that._setCondition(index, newCondition);
		});

		this.element.find('select.subOptionSelect').on('change', function () {
			var $this = $(this),
				index = $this.attr('data-index'),
				subOption = $this.val(),
				optionProperties = that.mainOptions[
					that.element.find('select.mainOptionSelect').eq(index).val()],
				attribute,
				newCondition = {},
				oldValue = that.conditions[index].value;

			$.each(optionProperties, function (i, properties) {
				if (properties.subOption === subOption) {
					attribute = properties.attribute;
					return false;
				}
			});

			debug.assert(typeof(attribute) !== "undefined");

			newCondition.attribute = attribute;

			if (that._availableValues(attribute).indexOf(oldValue) !== -1) {
				newCondition.value = oldValue;
			} else {
				newCondition.value = that._availableValues(attribute)[0];
			}

			if (typeof(newCondition.value) === "undefined") {
				alert("No more available values for this condition type");
				return;
			}
			that._setCondition(index, newCondition);
		});

		this.element.find('select.valueSelect').on('change', function () {
			var $this = $(this),
				index = $this.attr('data-index'),
				newCondition = {};

			newCondition.attribute = that.conditions[index].attribute;
			newCondition.value = $this.val();

			that._setCondition(index, newCondition);
		});

		this.element.find('button.addValue').on('click', function () {
			var newCondition = {};

			$.each(that._attributeUI, function (attribute) {
				var values = that._availableValues(attribute);

				if (values.length > 0) {
					newCondition.attribute = attribute;
					newCondition.value = values[0];
					return false;
				}
			});

			if (!newCondition.hasOwnProperty("attribute")) {
				alert("No more available conditions");
				return;
			}

			that._setCondition(that.conditions.length, newCondition);
		});

		this.element.find('button.deleteValue').on('click', function (event) {
			var index = that.element.find('button.deleteValue').index(event.target);

			that._removeCondition(index);
		});
		
		this.matchSelect.on('change', function () {
			// update data
			that.node.setAttr('match', that.matchSelect.val());
			that.executeCommand('amendNode', [that.node.cslId, that.node]);

			// update view
			that._refresh();
		});
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._setup = function () {
		var that = this;

		this.conditions = [];

		$.each(this.node.attributes, function (i, attribute) {
			if (attribute.key !== "match" && attribute.enabled) {
				$.each(attribute.value.split(" "), function (i, value) {
					that.conditions.push({
						attribute : attribute.key,
						value : value
					});
				});
			}
		});
		
		// set matchSelect value
		this.matchSelect.val(this.node.getAttr('match') || 
				CSLEDIT_schema.attributes("choose/if").match.defaultValue);

		if (this.conditions.length === 0) {
			// should show at least one attribute value, so create one
			// NOTE: this is slightly strange behaviour for a view
			//       but should never happen - only after loading an
			//       invalid style

			this.node.setAttr("type", "article");
			this.node.setAttr("match", "any");
			that.executeCommand('amendNode', [this.node.cslId, this.node]);
			this._setup();
			return;
		}

		this.mainOptionControls = [];
		this.valueControls = [];
		this.subOptionControls = [];
		$.each(that.conditions, function (i, condition) {
			that._createConditionControls(i, condition);
		});

		this._refresh();
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._refresh = function () {
		this._drawControls();
		this._removeDuplicateOptions();
		this._setupEventHandlers();
	};

	CSLEDIT_ConditionalPropertyPanel.prototype._drawControls = function () {
		var that = this,
			table = $('<table class="conditional"><col class="c1" /><col class="c2" />' + 
					'<col class="c3" /><col class="c4" /><col class="c5" /></table>'),
			valueSeparator,
			matchValue = this.node.getAttr('match') ||
				CSLEDIT_schema.attributes("choose/if").match.defaultValue;
		
		this.element.children().remove();

		this.element.append($('<p/>').text(this.node.name)
			.append(' ')
			.append(this.matchSelect)
			.append(' of the following conditions are met'));

		if (matchValue === "all") {
			valueSeparator = '<span class="weak">and</span>';
		} else {
			valueSeparator = '<span class="weak">or</span>';
		}

		$.each(this.valueControls, function (i, valueControl) {
			var row = $('<tr/>');

			row.append($('<td class="mainOption" />').append(that.mainOptionControls[i]));
			row.append($('<td/>').append(valueControl));

			row.append($('<td/>').append(that.subOptionControls[i]));
			if (i === that.valueControls.length - 1) {
				row.append($('<td/>'));
			} else {
				row.append($('<td/>').html(valueSeparator));
			}

			row.append('<td class="delete"><button class="deleteValue">-</button></td>');
			if (that.valueControls.length === 1) {
				row.find('button.deleteValue').css({visibility: "hidden"});
			}

			if (i === that.valueControls.length - 1) {
				row.append('<td class="add"><button class="addValue">+</button></td>');
			} else {
				row.append('<td class="add" />');
			}

			table.append(row);
		});
		
		this.element.append(table);
	};
	return CSLEDIT_ConditionalPropertyPanel;
});



// A custom property panel for the 'style/info' node
//
// This could do with a redesign (see long standing minor bug #129)
//
// Migrating to use mustache for most of the HTML generation may help

define('src/infoPropertyPanel',
		[	'src/CslNode',
			'src/dataInstance',
			'src/options',
			'src/debug'
		], function (
			CSLEDIT_CslNode,
			CSLEDIT_data,
			CSLEDIT_options,
			debug
		) {
	var panel, infoNode, inputTimeout, executeCommand;

	var layout = [
		{ name : "Title", node : "title" },
		{ name : "Title (short)", node : "title-short" },
		{ name : "ID", node : "id" },
		{ name : "Summary", node : "summary" },
		{ name : "Rights", node : "rights" },
		{ name : "Published", node : "published" },
		{ name : "ISSNL", node : "issnl" },
		{ name : "eISSN", node : "eissn" },
		{ name : "ISSN", node : "issn" },
		// hiding "Updated" for now
		// if it goes back, it needs updating on each change
		// { name : "Updated", node : "updated" },
		{ name : "Link", node : "link" },
		{ name : "Author", node : "author" },
		{ name : "Contributor", node : "contributor" },
		{ name : "Category", node : "category" }
	];

	var pluralise = function (noun) {
		if (noun[noun.length - 1] === "y") {
			return noun.replace(/y$/, "ies");
		} else {
			return noun + "s";
		}
	};

	// TODO: could probably get some of this info from the schema
	var multipleNodes = ["link", "author", "contributor", "category", "issn"];
	var attributeNodes = ["link", "category"];
	var nameNodes = ["author", "contributor"];

	var attributeEditorRow = function (item, node, schemaAttributes) {
		var thisRow = $('<div/>');
		$.each(schemaAttributes, function (name) {
			var input, attributeValue;
			thisRow.append(' ').append($('<label/>').text(name));

			attributeValue = new CSLEDIT_CslNode(node).getAttr(name);

			input = createInput(item.node, node, name, attributeValue);
			thisRow.append(input);
		});
		return thisRow;
	};

	var createInput = function (nodeName, node, type, value, parentCslId) {
		var input = $('<input/>');
		if (typeof node === "undefined" || node === null) {
			if (typeof parentCslId === "undefined") {
				input.attr("parentcslid", infoNode.cslId);
			} else {
				input.attr("parentcslid", parentCslId);
			}
		} else {
			input.attr("cslid", node.cslId);
		}
		input.attr("type", type);
		input.attr("nodename", nodeName);
		input.val(value);
		input.on('input', onInput);

		return input;
	};

	var onInput = function () {
		var $this = $(this);

		clearTimeout(inputTimeout);
		inputTimeout = setTimeout(function () {
			var cslId,
				parentId,
				type,
				nodeName,
				thisNode,
				index,
				parentNode,
				numChildNodes;

			cslId = parseInt($this.attr("cslid"), 10);
			parentId = parseInt($this.attr("parentcslid"), 10);
			type = $this.attr("type");
			nodeName = $this.attr("nodename");

			thisNode = new CSLEDIT_CslNode(nodeName);
			if (!isNaN(cslId)) {
				thisNode = new CSLEDIT_CslNode(CSLEDIT_data.getNode(cslId));
			}

			if (type === "textValue") {
				thisNode.textValue = $this.val();
				if (thisNode.textValue === "") {
					// TODO: deleting in this way redraws the whole panel, losing the
					//       cursor position, which would be nice to retain.
					deleteNode(cslId);
					return;
				}
			} else {
				thisNode.setAttr(type, $this.val());
				thisNode.setAttrEnabled(type, $this.val() !== "");
			}

			if (isNaN(cslId)) {
				CSLEDIT_viewController.setSuppressSelectNode(true);
				executeCommand('addNode', [parentId, "last", thisNode]);
				CSLEDIT_viewController.setSuppressSelectNode(false);
				parentNode = CSLEDIT_data.getNode(parentId);
				numChildNodes = CSLEDIT_data.numNodes(parentNode) - 1;

				// update all cslids
				$.each(["cslid", "parentcslid"], function (i, attribute) {
					panel.find('input[' + attribute + ']').each(function () {
						var $this = $(this),
							cslId;
					
						cslId = parseInt($this.attr(attribute), 10);

						if (cslId >= parentId + numChildNodes) {
							$this.attr(attribute, cslId + 1);
						}
					});
				});

				// set added node cslid
				$this.removeAttr("parentcslid");
				$this.attr("cslid", parentId + numChildNodes);
			} else {
				executeCommand('amendNode', [cslId, thisNode]);
			}
		}, 500);
	};

	var textValueEditorRow = function (item, node) {
		var thisRow, value = "";

		thisRow = $('<div/>');
		thisRow.append(' ').append($('<label/>').text(item.name)).append(' '); 
		if (typeof node !== "undefined") {
			value = node.textValue;
		}
		thisRow.append(createInput(item.node, node, "textValue", value));
		return thisRow;
	};

	var nameEditorRow = function (item, cslNode) {
		var thisRow, children, input, cslChildren;
	   
		thisRow = $('<div/>');
		children = CSLEDIT_schema.childElements("info/author");

		cslChildren = {};
		$.each(cslNode.children, function (i, actualChild) {
			cslChildren[actualChild.name] = actualChild;
		});

		$.each(children, function (child, unused) {
			var value = "";

			thisRow.append(' ').append($('<label/>').text(child)).append(' ');

			if (child in cslChildren) {
				value = cslChildren[child].textValue;
			}
			input = createInput(child, cslChildren[child], "textValue", value, cslNode.cslId);
			thisRow.append(input);
		});
		return thisRow;
	};

	var editorRow = function (item, node, schemaAttributes) {
		var row;
		if (attributeNodes.indexOf(item.node) >= 0) {
			return attributeEditorRow(item, node, schemaAttributes);
		} else if (nameNodes.indexOf(item.node) >= 0) {
			return nameEditorRow(item, node);
		} else {
			row = textValueEditorRow(item, node);
			row.find("input").css({width:"400px"});
			return row;
		}
	};

	// deletes a child node of style/info
	var deleteNode = function (cslId) {
		CSLEDIT_viewController.setSuppressSelectNode(true);
		executeCommand("deleteNode", [cslId]);
		CSLEDIT_viewController.setSuppressSelectNode(false);
		CSLEDIT_viewController.selectNode(infoNode.cslId);
	};

	// Set up a property panel for the style/info node
	//
	// - _panel - the jQuery element to create the panel within
	// - _executeCommand - the function to call to issue commands (e.g. CSLEDIT_controller.exec)
	var setupPanel = function (_panel, _executeCommand) {
		var simpleTextNodesTable = $('<table/>');
		
		panel = _panel;
		executeCommand = _executeCommand;
		infoNode = CSLEDIT_data.getNodesFromPath("style/info");
		debug.assertEqual(infoNode.length, 1); // fail in error.log
		infoNode = infoNode[0];

		panel.children().remove();

		panel.append(simpleTextNodesTable);

		$.each(layout, function (i, item) {
			var nodes = CSLEDIT_data.getNodesFromPath("info/" + item.node, infoNode),
				schemaAttributes, deleteButton, addButton, value, thisRow,
				table,
				titleRow, inputRow;
			
			if (multipleNodes.indexOf(item.node) >= 0) {
				schemaAttributes = {};
				$.each(CSLEDIT_schema.attributes("info/" + item.node), function (attrName, attr) {
					schemaAttributes[attrName] = attr;
				});
				
				// add choices to attributes
				// TODO: correct this to treat choices as mutaully exclusive
				//       as they should be
				$.each(CSLEDIT_schema.choices("info/" + item.node), function (i, choice) {
					$.each(choice.attributes, function (attrName, attr) {
						schemaAttributes[attrName] = attr;
					});
				});

				panel.append($('<h4/>').text(pluralise(item.name)));
				table = $("<table/>");
				$.each(nodes, function (i, node) {
					thisRow = editorRow(item, node, schemaAttributes);

					// convert 1st thisRow into table title
					if (typeof titleRow === "undefined") {
						titleRow = $('<tr/>');
						thisRow.find('label').each(function () {
							titleRow.append($('<td/>').append($(this)));
						});
						table.append(titleRow);
					}
					
					// convert thisRow into table row
					inputRow = $('<tr/>');
					thisRow.find('input').each(function () {
						inputRow.append($('<td/>').append($(this)));
					});

					deleteButton = $('<button>Delete</button>');
					deleteButton.on('click', function () {
						deleteNode(node.cslId);
					});

					inputRow.append($('<td/>').append(deleteButton));
					table.append(inputRow);
				});

				panel.append(table);
				
				addButton = $('<button/>').text('Add ' + item.name);
				panel.append(addButton);

				addButton.on('click', function () {
					CSLEDIT_viewController.setSuppressSelectNode(true);
					executeCommand("addNode",
						[infoNode.cslId, "last", new CSLEDIT_CslNode(item.node)]);
					CSLEDIT_viewController.setSuppressSelectNode(false);
					setupPanel(panel, executeCommand);
				});
				panel.append('<br /><br />');
			} else {
				debug.assert(nodes.length < 2);
				thisRow = editorRow(item, nodes[0], null);

				panel.append(thisRow);

				var configuration = CSLEDIT_options.get('propertyPanelOptions');
				var description = '';

				if (typeof(configuration) !== 'undefined' && typeof(configuration[item.node]) !== 'undefined') {
					description = $('<div/>').html(configuration[item.node].description);
					
					if (configuration[item.node].readonly) {
						thisRow.children('input').attr('readonly','readonly');
					}
				}
				simpleTextNodesTable.append($('<tr/>')
					.append($('<td/>').append(thisRow.children('label')))
					.append($('<td/>').append(thisRow.children('input')).append(description)));
			}
		});

	};

	return {
		setupPanel : setupPanel
	};
});



// A custom property panel for the 'sort' node and its child 'key' nodes
//
// NOTE: This is currently disabled due to two bugs
//
// 1. re-ordering the sort keys can cause crash
// 2. no ascending/descending option for the sort keys
//
// Additionally, the HTML generation should not use string concatenation
//
// Currently there's some help text being displayed in src/propertyPanel.js instead,
// because otherwise the node contains no controls

define('src/sortPropertyPanel',['src/CslNode', 'src/dataInstance', 'src/debug'], function (CSLEDIT_CslNode, CSLEDIT_data, debug) {
	var onChangeTimeout, setupPanel, list, nodeData, panel, executeCommand,
		namesAttributeNames = [
			"names-min",
			"names-use-first",
			"names-use-last"
		];
	
	// TODO: put into a common place - copied from src/smartTree.js
	var getAttr = function (attribute, attributes) {
		var index;

		for (index = 0; index < attributes.length; index++) {
			if (attributes[index].enabled && attributes[index].key === attribute) {
				return attributes[index].value;
			}
		}
		return "";
	};

	var sortableListUpdated = function () {
		// iterate through nodeData and the UI element noting the changes
		
		var index = 0,
			dragDirection = "unknown", // the direction the user dragged
			fromId,
			toPosition;

		list.children().each(function () {
			var variable, macro, childNode, visibleKey;

			if (index >= nodeData.children.length) {
			debug.assertEqual(dragDirection, "down");
				toPosition = nodeData.children.length - 1;
				return false;
			}

			visibleKey = $(this).find('select.sortKey').val();
			childNode = nodeData.children[index];
		debug.assertEqual(childNode.name, "key");

			if (visibleFieldName(
					getAttr("macro", childNode.attributes),
					getAttr("variable", childNode.attributes)) !==
				visibleKey) {

				if (dragDirection === "up") {
					fromId = childNode.cslId;
					return false;
				} else if (dragDirection === "down") {
					toPosition = index - 1;
					return false;
				} else if (visibleFieldName(
					getAttr("macro", nodeData.children[index + 1].attributes),
					getAttr("variable", nodeData.children[index + 1].attributes)) ===
					visibleKey)
				{
					// The next data element matches, so this is an deletion,
					// and the user dragged down.
					dragDirection = "down";
					fromId = childNode.cslId;
					index++;
				} else {
					// The next data element doesn't match, so this is an addition,
					// and the user dragged up.
					dragDirection = "up";
					toPosition = index;
					index--;
				}
			}
		
			index++;
		});

		if (dragDirection === "up" && typeof fromId === "undefined") {
			fromId = nodeData.children[index].cslId;
		}

		CSLEDIT_viewController.setSuppressSelectNode(true);
		executeCommand("moveNode", [fromId, nodeData.cslId, toPosition]);
		CSLEDIT_viewController.setSuppressSelectNode(false);
		nodeData = CSLEDIT_data.getNode(nodeData.cslId);
	};

	var visibleFieldName = function (macro, variable) {
		if (macro !== "" && typeof macro !== "undefined") {
			return "Macro: " + macro;
		} else {
			return variable;
		}
	};

	var attributesFromVisibleFieldName = function (visibleName) {
		var attributes = [];

		if (visibleName.indexOf("Macro: ") === 0) {
			attributes.push({
				key : "macro",
				value : visibleName.slice("Macro: ".length),
				enabled : true
			});
		} else {
			attributes.push({
				key : "variable",
				value : visibleName,
				enabled : true
			});
		}

		return attributes;
	};

	var getNamesAttributes = function () {
		var attributes = [];

		$.each(namesAttributeNames, function (i, name) {
			var val = panel.find("select." + name).val();

			if (val !== "0") {
				attributes.push({
					key : name,
					value : val,
					enabled : true
				});
			}
		});

		return attributes;
	};

	var getKeyNodeData = function (index) {
		var keyNode = new CSLEDIT_CslNode("key");

		keyNode.attributes = attributesFromVisibleFieldName(
			list.find('select.sortKey').eq(index).val());

		keyNode.attributes = keyNode.attributes.concat(getNamesAttributes());
		return keyNode;
	};

	var onInput = function () {
		var listElements = list.find('li'),
			childIndex,
			keyNode;
	
		childIndex = listElements.index($(this).parent());
		keyNode = nodeData.children[childIndex];
	debug.assertEqual(keyNode.name, "key");

		executeCommand("amendNode", [keyNode.cslId, 
			getKeyNodeData(childIndex)]);
	};

	var onDelete = function () {
		var listElements = list.find('li'),
			childIndex,
			cslId;
		
		childIndex = listElements.index($(this).parent());

		cslId = CSLEDIT_data.getNode(nodeData.cslId).children[childIndex].cslId;
		listElements.eq(childIndex).remove();
		executeCommand('deleteNode', [cslId]);
	};

	// Set up the sort property panel
	//
	// - _panel          - the jQuery element to create the panel within
	// - _nodeData       - the CSL node to create the panel for
	// - _executeCommand - the execute command function (e.g. CSLEDIT_controller.exec)
	setupPanel = function (_panel, _nodeData, _executeCommand) {
		var table, macros, variables, index, addKeyButton, sortKeyHtml;

		panel = _panel;
		nodeData = _nodeData;
		executeCommand = _executeCommand;

		// clear panel 
		panel.children().remove();

		// sortable list
		list = $('<ul class="sortKeys"></ul>');
		list.appendTo(panel);
		list.sortable({
			update : sortableListUpdated
		});

		variables = [];
		$.each(CSLEDIT_schema.choices("sort/key")[0].attributes.variable.values, function (i, variable) {
			variables.push(variable.value);
		});

		macros = [];
		$.each(CSLEDIT_data.getNodesFromPath("style/macro"), function (i, node) {
		debug.assertEqual(node.attributes[0].key, "name");
			macros.push(node.attributes[0].value);
		});

		sortKeyHtml = '<li class="ui-state-default">';
		sortKeyHtml += '<span class="ui-icon ui-icon-arrowthick-2-n-s"></span> ';
		sortKeyHtml += '<select class="sortKey">';
		$.each(macros, function (i, macro) {
			sortKeyHtml += '<option macro="' + macro + '">Macro: ' + macro + '</option>';
		});
		$.each(variables, function (i, variable) {
			sortKeyHtml += '<option variable="' + variable + '">' + variable + '</option>';
		});
		sortKeyHtml += '</select>';
		sortKeyHtml += ' <button class="deleteSortKey">Delete</button>';
		sortKeyHtml += '</li>';

		$.each(nodeData.children, function (i, child) {
			var row = $(sortKeyHtml),
				select,
				macro,
				variable;
			
			select = row.find("select.sortKey");
		debug.assertEqual(select.length, 1);

			select.val(visibleFieldName(
				getAttr("macro", child.attributes),
				getAttr("variable", child.attributes)));

			list.append(row);
		});

		list.find('button.deleteSortKey').on('click', onDelete);

		list.find('select').on('change', onInput /*function () {
			var listElements = list.find('li'),
				childIndex,
				keyNode;
		
			childIndex = listElements.index($(this).parent());
			keyNode = nodeData.children[childIndex];
		debug.assertEqual(keyNode.name, "key");

			executeCommand("amendNode", [keyNode.cslId, 
				getKeyNodeData(childIndex)]);
		}*/);

		addKeyButton = $('<button>Add key</button>');
		addKeyButton.on('click', function () {
			var selectNodes;

			CSLEDIT_viewController.setSuppressSelectNode(true);
			executeCommand('addNode', [nodeData.cslId, "last",
				new CSLEDIT_CslNode('key', [
					{
						key : "variable",
						value : "author",
						enabled : true
					}
				])]);
			CSLEDIT_viewController.setSuppressSelectNode(false);

			nodeData = CSLEDIT_data.getNode(nodeData.cslId);

			list.append(sortKeyHtml);
			selectNodes = list.find('select');
			selectNodes.on('change', onInput);
			selectNodes.last().val("author");

			list.find('button.deleteSortKey').last().on('click', onDelete);
		});
		panel.append(addKeyButton);
		panel.append('<br /><br />');

		(function () {
			var select;

			// TODO: only enable if sort keys contain a names element
			select = $('<select class="names-min"></select>');
			for (index = 0; index < 20; index++) {
				$('<option>' + index + '</option>').appendTo(select);
			}
			$('<label>Names-min: </label>').appendTo(panel);
			select.appendTo(panel);
			panel.append(' ');

			select = $('<select class="names-use-first"></select>');
			for (index = 0; index < 20; index++) {
				$('<option>' + index + '</option>').appendTo(select);
			}
			$('<label>Names-use-first: </label>').appendTo(panel);
			select.appendTo(panel);
			panel.append(' ');
			
			select = $('<select class="names-use-last"></select>');
			for (index = 0; index < 20; index++) {
				$('<option>' + index + '</option>').appendTo(select);
			}
			$('<label>Names-use-last: </label>').appendTo(panel);
			select.appendTo(panel);

			panel.find('select[class^="names"]').on('change', function () {
				// update all keys with names attrs
				// TODO: only add names attrs to keys containing names
				var namesAttributes = getNamesAttributes(),
					index;

				for (index = 0; index < nodeData.children.length; index++) {

				}

				$.each(nodeData.children, function (index, keyNode) {
				debug.assertEqual(keyNode.name, "key");
					executeCommand("amendNode", [keyNode.cslId, getKeyNodeData(index)]);
				});
			});
		}());
	};

	return {
		setupPanel : setupPanel
	};
});



// This fetches and caches the mustache templates, and
// runs mustache on them

define('src/mustache',
		[	'src/urlUtils',
			'src/debug',
			'external/mustache'
		],
		function (
			CSLEDIT_urlUtils,
			debug,
			Mustache
		) {

	// map of filename (minus .mustache extension) to contents
	var templateCache = {};

	var toHtml = function (templateName, data) {
		if (!(templateName in templateCache)) {
			$.ajax({
				url : CSLEDIT_urlUtils.getResourceUrl("html/" + templateName + ".mustache"),
				dataType : "text",
				success : function (data) {
					templateCache[templateName] = data;
				},
				error : function () {
					debug.assert(false, "Couldn't fetch mustache template: " + templateName);
				},
				async: false
			});
		}

		return Mustache.to_html(templateCache[templateName], data);
	};

	return {
		toHtml : toHtml
	};
});



// Creates property panels, chooses which property panel module to use for each node

define('src/propertyPanel',
		[	'src/genericPropertyPanel',
			'src/ConditionalPropertyPanel',
			'src/infoPropertyPanel',
			'src/sortPropertyPanel',
			'src/controller',
			'src/mustache'
		],
		function (
			CSLEDIT_genericPropertyPanel,
			CSLEDIT_ConditionalPropertyPanel,
			CSLEDIT_infoPropertyPanel,
			CSLEDIT_sortPropertyPanel,
			CSLEDIT_controller,
			CSLEDIT_mustache
		) {
	var suppressUpdates = false; // used to prevent panel updates triggered the panel itself

	// property panels should use this instead of calling CSLEDIT_controller.exec
	// directly to prevent updates to the panel
	var executeCommand = function (command, args) {
		suppressUpdates = true;
		CSLEDIT_controller.exec(command, args);
		suppressUpdates = false;
	};

	// Creates the appropriate property panel, based on the given CSL node
	//
	// - propertyPanelElement - the jQuery element to create the panel within
	// - node                 - the CSL node to create the panel for
	// - elementString        - the string identifier for the CSL node used to look
	//                          it up on CSLEDIT_schema
	var setup = function (propertyPanelElement, node, elementString) {
		var dataType,
			schemaAttributes;

		if (suppressUpdates) {
			return;
		}

		// show appropriate property panel
		switch (node.name) {
		case "sort":
			propertyPanelElement.html(CSLEDIT_mustache.toHtml("sortPropertyPanel"));

			/* TODO: Re-enable sort property panel if:
			 *         1. bug is fixed where re-ordering the sort keys causes crash
			 *         2. ascending/descending option is added for each sort key
			 *
				CSLEDIT_sortPropertyPanel.setupPanel(propertyPanelElement, node, executeCommand);
			*/
			break;
		case "info":
			CSLEDIT_infoPropertyPanel.setupPanel(propertyPanelElement, executeCommand);
			break;
		case "if":
		case "else-if":
			new CSLEDIT_ConditionalPropertyPanel(propertyPanelElement, node, executeCommand);
			break;
		case "choose":
			propertyPanelElement.html(CSLEDIT_mustache.toHtml("choosePropertyPanel"));
			break;
		default:
			dataType = CSLEDIT_schema.elementDataType(elementString);
			schemaAttributes = CSLEDIT_schema.attributes(elementString);

			CSLEDIT_genericPropertyPanel.setupPanel(
				propertyPanelElement, node, dataType, schemaAttributes,
				CSLEDIT_schema.choices(elementString), executeCommand);
		}
	};

	return {
		setup : setup
	};
});



// The breadcrumb UI used in the Visual Editor

define('src/NodePathView',
		[	'src/dataInstance',
			'src/uiConfig',
			'src/xmlUtility',
			'external/mustache'
		],
		function (
			CSLEDIT_data,
			CSLEDIT_uiConfig,
			CSLEDIT_xmlUtility,
			Mustache
		) {
	// Create a NodePathView in the given jQuery element
	var CSLEDIT_NodePathView = function (element, callbacks) {
		this.element = element;
		this.callbacks = callbacks;
	};

	// Display the given missingNodePath which doesn't actually exist in the current CSL style
	CSLEDIT_NodePathView.prototype.nodeMissing = function (missingNodePath) {
		this.element.html(missingNodePath.replace(/\//g, " > "));
	};

	// Display the given nodePath
	CSLEDIT_NodePathView.prototype.selectNode = function (nodePath) {
		var that = this,
			cslData = CSLEDIT_data.get(),
			mustacheData = { nodes: [] };

		$.each(nodePath, function (i, cslId) {
			var node = CSLEDIT_data.getNode(cslId, cslData);

			mustacheData.nodes.push({
				cslId : node.cslId,
				displayName : CSLEDIT_uiConfig.displayNameFromNode(node)
			});
		});

		if (mustacheData.nodes.length > 0) {
			mustacheData.nodes[0].first = true;
		}

		this.element.html(Mustache.to_html(
			'{{#nodes}}{{^first}} > {{/first}}<span cslid="{{cslId}}">{{displayName}}</span>{{/nodes}}',
			mustacheData));

		this.element.find('span[cslid]').css({"cursor" : "pointer"});
		this.element.find('span[cslid]').off('click');
		this.element.find('span[cslid]').on('click', function(event) {
			var thisNodePath = [],
				thisCslId = parseInt($(event.target).attr("cslid"));

			$.each(nodePath, function (i, cslId) {
				thisNodePath.push(cslId);
				if (cslId === thisCslId) {
					return false;
				}
			});
			
			that.callbacks.selectNodeFromPath(thisNodePath);
		});
	};
	return CSLEDIT_NodePathView;
});

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
define("jquery.scrollTo", ["jquery"], function(){});



// An CSLEDIT_ViewController instance ensures that all the views are notified
// whenever one of the following functions is called:
//  
//   addNode
//   deleteNode
//   amendNode
//   newStyle

define('src/ViewController',
		[	'src/Titlebar',
			'src/SmartTree',
			'src/SmartTreeHeading',
			'src/propertyPanel',
			'src/NodePathView',
			'src/notificationBar',
			'src/CslNode',
			'src/Iterator',
			'src/dataInstance',
			'src/uiConfig',
			'external/mustache',
			'src/debug',
			'jquery.scrollTo'
		],
		function (
			CSLEDIT_Titlebar,
			CSLEDIT_SmartTree,
			CSLEDIT_SmartTreeHeading,
			CSLEDIT_propertyPanel,
			CSLEDIT_NodePathView,
			CSLEDIT_notificationBar,
			CSLEDIT_CslNode,
			CSLEDIT_Iterator,
			CSLEDIT_data,
			CSLEDIT_uiConfig,
			Mustache,
			debug,
			jquery_scrollTo
		) {
	// Creates a ViewController responsible for adding and maintaining the content
	// in all the given jQuery elements
	var CSLEDIT_ViewController = function ( 
		treeView, titlebarElement, propertyPanelElement, nodePathElement,
		syntaxHighlighter) {
	
		var views = [],
			treesLoaded,
			treesToLoad,
			callbacks,
			selectedView = null,
			selectedNodeId = -1,
			recentlyEditedMacro = -1,
			nodePathView,
			suppressSelectNode = false;

		// Called every time one of the jsTrees have finished loading
		var treeLoaded = function () {
			treesLoaded++;

			if (treesLoaded === treesToLoad) {
				if (selectedNode() === -1) {
					selectNode(CSLEDIT_data.getNodesFromPath('style/info')[0].cslId);
				}
				propagateErrors();
				callbacks.formatCitations();
				callbacks.viewInitialised();
			}
		};

		// Sets up all the views, including:
		//
		// - SmartTree views
		// - SmartTreeHeading views
		// - TitleBar
		// - NodePathView
		var init = function (cslData, _callbacks) {
			var eventName,
				jsTreeData,
				citationNodeId,
				citationNodeData,
				citationTree,
				cslId,
				nodes,
				row;

			treesLoaded = 0;
			treesToLoad = 0;

			selectedNodeId = -1;
			views = [];

			views.push(new CSLEDIT_Titlebar(titlebarElement));

			callbacks = _callbacks;

			treeView.html('');
			$.each(CSLEDIT_uiConfig.smartTreeSchema, function (index, value) {
				row = $('');
				row = $('<div id="%1"><div class="heading"/><div class="tree"/></div>'.replace(
					'%1', value.id));
				row.appendTo(treeView);
				treeView.append($('<div class=spacer />'));
			});

			$.each(CSLEDIT_uiConfig.smartTreeSchema, function (index, value) {
				var tree, heading;
				treesToLoad++;
				
				heading = new CSLEDIT_SmartTreeHeading(
					treeView.find('#' + value.id + ' .heading'), value.headingNodePath,
					value.name, value.headingNodePossibleChildren, value.headingNodeShowPropertyPanel);
				heading.setCallbacks({
					selectNode : selectNodeInView(heading)
				});
				views.push(heading);
				syntaxHighlighter.addHighlightableElements(heading.element);

				tree = new CSLEDIT_SmartTree(treeView.find('#' + value.id + ' .tree'), value.nodePaths, 
					{
						enableMacroLinks : value.macroLinks,
						leafNodes : value.leafNodes
					});

				// Use this for debugging if you're not sure the view accurately reflects the data
				//tree._setVerifyAllChanges(true);
				tree.setCallbacks({
					loaded : treeLoaded,
					selectNode : selectNodeInView(tree),
					moveNode : callbacks.moveNode,
					deleteNode : callbacks.deleteNode,
					checkMove : callbacks.checkMove
				});
				tree.createTree();
				views.push(tree);
			});

			nodePathView = new CSLEDIT_NodePathView(nodePathElement, {
				selectNodeFromPath : selectNodeFromPath
			});
			syntaxHighlighter.addHighlightableElements(nodePathElement);
		};
		
		// Called after selecting a node
		var selectedNodeChanged = function () {
			var nodeAndParent,
				node,
				parentNode,
				parentNodeName,
				possibleElements,
				element,
				possibleChildNodesDropdown,
				schemaAttributes,
				dataType,
				translatedCslId,
				translatedNodeInfo,
				translatedParentName;

			if (selectedView !== null &&
					selectedNode() === -1 && "getMissingNodePath" in selectedView) {
				propertyPanelElement.html(Mustache.to_html(
					'<h3>The {{missingNode}} node doesn\'t exist</h3>' +
					'<p>Use the "+" Add Node button at the top left to add it.</p>',
					{ missingNode : selectedView.getMissingNodePath() }
				));
				nodePathView.nodeMissing(selectedView.getMissingNodePath());
				syntaxHighlighter.selectedNodeChanged(selectedNode());		
				return;
			}

			nodeAndParent = CSLEDIT_data.getNodeAndParent(selectedNode());
			node = nodeAndParent.node;
			parentNode = nodeAndParent.parent;

			// hack to stop parent of style being style
			if (node.name === "style") {
				parentNodeName = "root";
			} else if (parentNode !== false) {
				parentNodeName = parentNode.name;
			} else {
				parentNodeName = "root";
			}

			nodePathView.selectNode(getSelectedNodePath());

			if (selectedViewProperty("showPropertyPanel") === false) {
				propertyPanelElement.children().remove();
			} else {
				CSLEDIT_propertyPanel.setup(propertyPanelElement, node, parentNodeName + '/' + node.name);
			}

			syntaxHighlighter.selectedNodeChanged(node.cslId);		
		};

		// Returns a function to select a node in the given view
		var selectNodeInView = function (thisView) {
			return function (event, ui) {
				// deselect nodes in other views
				$.each(views, function (i, view) {
					if (view !== thisView) {
						if ("deselectAll" in view) {
							view.deselectAll();
						}
					}
				});

				selectedView = thisView;
				selectedNodeId = parseInt(thisView.selectedNode(), 10);

				if (/"/.test(thisView.selectedNode())) {
					debug.log("WARNING!!!!! view: " + JSON.stringify(Object.keys(thisView)) +
							" returned cslId with quotes");
				}
		
				selectedNodeChanged();
			};
		};

		// Returns a list of the currently selected node stack cslIds,
		// or "no selected tree" if no view is currently selected
		var getSelectedNodePath = function () {
			if (selectedView === null) {
				return "no selected tree";
			}

			return selectedView.getSelectedNodePath();
		};

		var macroEditNotification = function (id) {
			var nodeStack = CSLEDIT_data.getNodeStack(id),
				node,
				iter,
				next,
				macroName,
				timesUsed;

			while (nodeStack.length > 0) {
				node = nodeStack.pop();
				if (node.name === "macro" && recentlyEditedMacro !== node.cslId) {
					macroName = new CSLEDIT_CslNode(node).getAttr("name");
					if (macroName === "") {
						return;
					}

					// check how many places this macro is used
					iter = new CSLEDIT_Iterator(CSLEDIT_data.get());
					timesUsed = 0;

					while (iter.hasNext()) {
						next = new CSLEDIT_CslNode(iter.next());

						if (next.name === "text" && next.getAttr("macro") === macroName) {
							timesUsed++;

							if (timesUsed > 1) {
								recentlyEditedMacro = node.cslId;
								CSLEDIT_notificationBar.showMessage(
									'You just edited a macro which is used in multiple places');
							}
						}
					}
				}
			}
		};

		// If suppress is true, an addNode event won't change the selection
		// If suppress is false, an addNode event select the newly added node
		var setSuppressSelectNode = function (suppress) {
			suppressSelectNode = suppress;
		};

		// Responds to an addNode event
		var addNode = function (id, position, newNode, nodesAdded) {
			macroEditNotification(id);	
			$.each(views, function (i, view) {
				if ("addNode" in view) {
					view.addNode(id, position, newNode, nodesAdded);
				}
			});
			if (!suppressSelectNode) {
				selectNode(newNode.cslId);
			}
		};

		// Responds to a deleteNode event
		var deleteNode = function (id, nodesDeleted) {
			propertyPanelElement.html('');
			nodePathView.selectNode([]);

			macroEditNotification(id - 1);
			$.each(views, function (i, view) {
				if ("deleteNode" in view) {
					view.deleteNode(id, nodesDeleted);
				}
			});
		};

		// Responds to an amendNode event
		var amendNode = function (id, amendedNode) {
			macroEditNotification(id);
			$.each(views, function (i, view) {
				if ("amendNode" in view) {
					view.amendNode(id, amendedNode);
				}
			});
			debug.log("amendNode - calling selectedNodeChanged");
			selectedNodeChanged();
		};

		// Responds to an updateFinished event
		var updateFinished = function () {
			propagateErrors();
			callbacks.formatCitations();
		};

		// Responds to the newStyle event,
		// Uses the nuclear option and re-builds everything
		var newStyle = function () {
			init(CSLEDIT_data.get(), callbacks);
		};

		// Select the given cslId node from within the given highlighted nodes
		var selectNode = function (
				cslId,
				highlightedNodes,
				missingNodePath // optional: if selection represents a missing node
				) {
			var treeNode,
				headingNode;

			// ensure it's a number
			cslId = parseInt(cslId, 10);

			if (cslId === -1) {
				selectedNodeId = cslId;
				selectedNodeChanged(missingNodePath);
				return;
			}

			headingNode = treeView.find('span[cslid=' + cslId + ']');

			if (typeof(highlightedNodes) === "undefined") {
				treeNode = treeView.find('li[cslid=' + cslId + '] > a');
			} else {
				treeNode = highlightedNodes.filter('li[cslid=' + cslId + ']').children('a');
			}

			if (headingNode.length === 0 && treeNode.length > 0) {
				clickNode(treeNode.first());
			} else {
				selectedNodeId = cslId;
				selectedNodeChanged();
			}
		};

		// Selects the first occurance of the given nodePath
		// within the tree view
		var selectNodeFromPath = function (nodePath) {
			var treeNode = treeView,
				cslId;

			debug.log("select node from path");
			$.each(nodePath, function (i, cslId) {
				treeNode = treeNode.find('li[cslId="' + cslId + '"]');
			});

			treeNode = treeNode.children('a');

			if (treeNode.length > 0) {
				clickNode(treeNode.first());
			}
		};

		var clickNode = function (node) {
			node.click();

			treeView.scrollTo(node, 200, {
				offset: {left: -treeView.width() + 80, top: -treeView.height() * 0.4}
			});
		};

		// Returns the cslId of the currently selected node
		var selectedNode = function () {
			return selectedNodeId;
		};

		// Returns the given member variable of the currently selected view,
		// or null if it doesn't exist
		var selectedViewProperty = function (property) {
			if (selectedView === null) {
				return null;
			}
			if (property in selectedView) {
				return selectedView[property];
			}
			return null;
		};

		// Expand the node with the given cslId if it exists in a tree view
		var expandNode = function (cslId) {
			$.each(views, function (i, view) {
				if ('expandNode' in view) {
					view.expandNode(cslId);
				}
			});
		};

		// Will execute the CSLEDIT_ViewController member function with name 'command'
		// and pass it the given arguments
		var styleChanged = function (command, args) {
			args = args || [];
			debug.log("executing view update: " + command + "(" + args.join(", ") + ")");
			this[command].apply(null, args);
		};
		
		// Collapses all collapsable views
		var collapseAll = function () {
			$.each(views, function (i, view) {
				if ('collapseAll' in view) {
					view.collapseAll();
				}
			});
		};

		// For tree 'li' elements nodes with attr 'data-error',
		// add an errorParent class to all 'li' parents
		var propagateErrors = function () {
			// propagate data-error to parent elements
			treeView.find('li.errorParent').removeClass('errorParent');
			treeView.find('li[data-error]').each(function (i, element) {
				var parents = $(element).parents('li');
				parents.addClass('errorParent');
			});
		};

		// Returns the node path ('/' separated list of node names) of a node
		// which is currently selected in the view, but doesn't exist in the
		// current CSL style
		//
		// (e.g. after clicking on the "Bibliography" SmartTreeHeading for a style
		// without a bibliography)
		var selectedMissingNodePath = function () {
			if (selectedView !== null && "getMissingNodePath" in selectedView) {
				return selectedView.getMissingNodePath();
			}
		};

		// public:
		return {
			init : init,

			addNode : addNode,
			deleteNode : deleteNode,
			amendNode : amendNode,
			newStyle : newStyle,
			updateFinished : updateFinished,

			selectNode : selectNode,
			selectedNode : selectedNode,
			selectedMissingNodePath : selectedMissingNodePath,

			expandNode : expandNode,
			collapseAll : collapseAll,
				
			styleChanged : styleChanged,
			getSelectedNodePath : getSelectedNodePath,
			selectNodeFromPath : selectNodeFromPath,
			setSuppressSelectNode : setSuppressSelectNode,
			selectedViewProperty : selectedViewProperty
		};
	};

	return CSLEDIT_ViewController;
});




// Implements:
//
// - Syntax highlighting when hovering over a) the tree view and b) the example output
//
// - Reverse selecting of the relevant CSL node when clicking on the example output

define('src/SyntaxHighlighter',['src/CslNode', 'src/dataInstance', 'src/debug'], function (CSLEDIT_CslNode, CSLEDIT_data, debug) {
	return function (highlightableElements, treeView) {
		var selectedCslId = -1,
			hoveredNodeStack = [],
			highlightedCss,
			selectedCss,
			unHighlightedCss,
			highlightedTreeNodes = $(),
			highlightTimeout;

		// Returns all spans and divs with the given cslId, and optionally
		// with the given className
		var spansAndDivs = function (cslId, className) {
			var attribute;
			if (typeof(cslId) === "undefined" || cslId === null) {
				attribute = "[cslid]";
			} else {
				attribute = "[cslid=" + cslId + "]";
			}
			if (typeof(className) !== "undefined" && className !== null) {
				attribute += "." + className;
			}

			return highlightableElements.find('div' + attribute + ', ' + 'span' + attribute);
		};

		// Called after every time the selected node changes
		var selectedNodeChanged = function (newSelectedCslId) {
			selectedCslId = newSelectedCslId;

			spansAndDivs(null, 'highlighted').removeClass("highlighted");
			spansAndDivs(null, 'selected').removeClass("selected");

			spansAndDivs(selectedCslId)
				.removeClass("highlighted")
				.addClass("selected");
		};

		// build stack starting at the innermost node (the last in the hoveredNodeStack list)
		// and successively prepending the outer nodes to the start of the list with unshift()
		var addToHoveredNodeStack = function (target) {
			var parentNode;
			
			if (typeof target.attr("cslid") !== "undefined") {
				hoveredNodeStack.unshift(target.attr("cslid"));
			}

			parentNode = target.parent();
			if (parentNode.length > 0) {
				addToHoveredNodeStack(parentNode);
			}
		};

		// Pop one node from the hoveredNodeStack
		// Or, if removeAll is true, empty the hoveredNodeStack
		//
		// Un-highlight all popped nodes which are found within the cslIdElements jQuery selection
		var removeFromHoveredNodeStack = function (cslIdElements, removeAll /* optional */) {
			var poppedNode;

			if (hoveredNodeStack.length > 0) {
				poppedNode = hoveredNodeStack.pop();
				unHighlightNode(poppedNode, cslIdElements);

				if (removeAll) {
					removeFromHoveredNodeStack(cslIdElements, removeAll);
				}
			}
		};

		// Add highlighting to the top node in the nodeStack
		var highlightNode = function (nodeStack) {
			var cslId = nodeStack[nodeStack.length - 1];

			highlightOutput(cslId);

			// undo previous highlighting
			clearTimeout(highlightTimeout);
			highlightTimeout = setTimeout(function () {
				unHighlightTree();
				highlightTree(nodeStack, null, 0);
			}, 100);
		};

		// Add highlighting to the cslId node
		var highlightOutput = function (cslId)
		{
			var node = spansAndDivs(cslId);

			if (node.hasClass("selected"))
			{
				// leave alone - selection takes precedence
			} else {
				node.addClass("highlighted");
			}
		};

		// Selects the node which the user is currently hovered over
		//
		// (called reverseSelect because it maps from the output representation to the 
		// node in the original CSL tree)
		var reverseSelectNode = function (clickedCslId) {
			var index,
				cslId = parseInt(hoveredNodeStack[hoveredNodeStack.length - 1], 10),
				selectedNode;

			if (hoveredNodeStack.length === 0) {
				cslId = clickedCslId;
			} else {
				selectedNode = CSLEDIT_data.getNode(cslId);
				if (selectedNode.name === "macro") {
					if (hoveredNodeStack.length > 1) {
						// Skip the macro definition nodes, jump to the referencing 'text' node instead
						cslId = hoveredNodeStack[hoveredNodeStack.length - 2];
					} else {
						// The macro node is the outermost one, this happens in the
						// NodePathView when selecting a Macro definition within the
						// 'Macros' tree
						cslId = clickedCslId;
					}
				}
			}

			if (selectedCslId !== cslId) {
				CSLEDIT_viewController.selectNode(cslId, highlightedTreeNodes);
			}
		};

		// Un-highlight all tree nodes
		var unHighlightTree = function () {
			var node;

			clearTimeout(highlightTimeout);
			highlightedTreeNodes.children('a').removeClass("highlighted");
		};

		// Un-highlight any tree node which isn't a descendent of the
		// instanceNode jQuery element
		var unHighlightIfNotDescendentOf = function (instanceNode) {
			var index, nodes;

			$.each(highlightedTreeNodes, function () {
				var $this = $(this);
				if (instanceNode.find($this).length === 0) {
					$this.children('a').removeClass("highlighted");
					highlightedTreeNodes = highlightedTreeNodes.not($this);
				}
			});
		};

		// highlight node and all parents, stopping at the "style" node
		var highlightTree = function (nodeStack, node, depth) {
			var nodeIndex, parentNode, parentIndex, highlightedNode;

			if (node === null) {
				nodeIndex = nodeStack.pop();
				if (typeof nodeIndex === "undefined") {
					return;
				}
				node = treeView.find('li[cslid="' + nodeIndex + '"]');
			}

			depth++;
			debug.assert(depth < 150, "stack overflow!");

			if (node.is('li')) {
				highlightedNode = node.children('a');
				highlightedTreeNodes = highlightedTreeNodes.add(node);
				highlightedNode.addClass("highlighted");
			}

			parentNode = node.parent().closest("li[cslid]");

			if (parentNode.length !== 0) {
				parentIndex = parentNode.attr("cslid");
				if (nodeStack[nodeStack.length - 1] === parentIndex) {
					nodeStack.pop();
				}
				highlightTree(nodeStack, parentNode, depth);
			} else {
				if (nodeStack.length > 1) {
					// Look for a possible macro instance "text" node in the nodeStack,
					// if found, clear the highlighting for all macros not within this
					// instance or the definition
					var instanceNode;
					instanceNode = new CSLEDIT_CslNode(
						CSLEDIT_data.getNode(parseInt(nodeStack[nodeStack.length - 2], 10)));
					if (instanceNode.name === "text" && instanceNode.getAttr("macro") !== "") {
						unHighlightIfNotDescendentOf(treeView.find('li[cslid=' + instanceNode.cslId + ']'));
					}
				}
				// highlight any remaining nodes in the call stack
				// (e.g. if a macro was called)
				highlightTree(nodeStack, null, depth);
			}
		};

		// Un-highlight the node with the given cslId
		var unHighlightNode = function (cslId, cslIdElements) {
			var	node;
			if (typeof(cslIdElements) === "undefined") {
				node = spansAndDivs(cslId);
			} else {
				node = cslIdElements.filter('[cslid="' + cslId + '"]');
			}

			if (node.hasClass("selected"))
			{
				// leave alone - selection takes precedence
			} else {
				node.removeClass("highlighted");
			}
		};

		// Respond to hover event in the example output spans
		var hover = function (event) {
			var cslIdElements = spansAndDivs(),
				target = $(event.target).closest("[cslid]");
			
			// remove all
			removeFromHoveredNodeStack(cslIdElements, true);

			// populate hovered node stack
			addToHoveredNodeStack(target);

			var lastNode = hoveredNodeStack[hoveredNodeStack.length - 1];
			debug.assertEqual(lastNode, target.attr("cslid"), "applySyntax");

			if (hoveredNodeStack.length > 0) {
				highlightNode(hoveredNodeStack.slice());
			}
		};

		// Respond to unhover event in the example output spans
		var unhover = function () {
			var cslIdElements = spansAndDivs();

			removeFromHoveredNodeStack(cslIdElements);
			
			if (hoveredNodeStack.length > 0) {
				highlightNode(hoveredNodeStack.slice());
			} else {
				unHighlightTree();
			}
		};

		// Setup event handlers for
		// - Hovering over example output
		// - Clicking example output
		// - Hovering over tree view
		var setupEventHandlers = function () {
			spansAndDivs().hover(hover, unhover);

			// set up click handling
			spansAndDivs().click(function (event) {
				var target = $(event.target).closest("[cslid]"),
					cslId = parseInt(target.attr('cslId'), 10);
				reverseSelectNode(cslId);
			});

			// set up hovering over tree nodes
			treeView.find('li[cslid] > a').unbind('mouseenter mouseleave');
			treeView.find('li[cslid] > a').hover(
				function (event) {
					var target = $(event.target).closest("li[cslid]"),
						cslId = parseInt(target.attr('cslId'), 10);
					highlightOutput(cslId);
				},
				function (event) {
					var target = $(event.target).closest("li[cslid]"),
						cslId = parseInt(target.attr('cslId'), 10);
					unHighlightNode(cslId);
				}
			);
			treeView.find('li[cslid] > a').hover(
				function (event) {
					var target = $(event.target),
						liElement = target.closest("li[cslid]"),
						cslId = parseInt(liElement.attr('cslId'), 10),
						nodeAndParent = CSLEDIT_data.getNodeAndParent(cslId),
						documentation;
					
					if (nodeAndParent.parent === null) {
						documentation = CSLEDIT_schema.documentation('root/' + nodeAndParent.node.name);
					} else {
						documentation = CSLEDIT_schema.documentation(
							nodeAndParent.parent.name + '/' + nodeAndParent.node.name);
					}

					if (documentation !== "") {
						target.attr("title", nodeAndParent.node.name + "\n\n" + documentation);
					}
				},
				function (event) { /* no-op */ }
			);
		};

		// Setup event handlers and other initialisation
		var setupSyntaxHighlighting = function () {
			// clear the hovered node stack
			hoveredNodeStack.length = 0;
			selectedCslId = -1;

			setupEventHandlers();

			// highlight the selected node if there is one
			if (CSLEDIT_viewController.selectedNode() !== -1) {
				spansAndDivs(CSLEDIT_viewController.selectedNode()).addClass('selected');
			}
		};
		
		// Add elements to the jQuery selection of elements to apply syntax highlighting
		//
		// The elements must contain span[cslid] and/or div[cslid] descendent elements
		// for this to work
		var addHighlightableElements = function (newElements) {
			highlightableElements = highlightableElements.add(newElements);
		}

		return {
			selectedNodeChanged : selectedNodeChanged,
			setupSyntaxHighlighting : setupSyntaxHighlighting,
			hover : hover,
			unhover : unhover,
			reverseSelectNode : reverseSelectNode,
			addHighlightableElements : addHighlightableElements
		};
	};
});



// Allows getting and setting
//
// - metadata for the example references
// - example inline citations (citation clusters as citeproc-js calls them)
define('src/exampleCitations',
		[	'jquery',
			'src/storage',
			'src/options',
			'src/exampleData'
		],
		function (
			$,
			CSLEDIT_storage,
			CSLEDIT_options,
			CSLEDIT_exampleData
		) {
	var suppressUpdate = false;

	// Returns a new empty citation cluster
	var newCluster = function (citationIndex) {
		return {
			citationId: "CITATION-" + citationIndex,
			citationItems: [],
			properties: {noteIndex: 0},
			schema: "https://github.com/citation-style-language/schema/raw/master/csl-citation.json"
		};
	};

	// Returns a list of citation clusters as used by citeproc
	var getCitations = function () {
		var citations;
		if (CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitations') === null) {

			// create empty reference lists for each citation
			citations = [];
			$.each(CSLEDIT_options.get("exampleCitations"), function (citation) {
				citations.push(newCluster(citation));
			});
			setCitations(citations);

			// populate the reference lists
			$.each(CSLEDIT_options.get("exampleCitations"), function (citation, referenceList) {
				setReferenceIndexesForCitation(citation, referenceList);
			});
		}
		return CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitations');
	};

	// Set the list of citation clusters, each cluster should be in the
	// form required by the citeproc-js appendCitationCluster() function
	var setCitations = function (citations) {
		applyCitationOptions(citations, getCitationOptions());
		CSLEDIT_storage.setItem('CSLEDIT_exampleCitations', JSON.stringify(citations));
		update();
	};
	
	// Gets the index of any options for each reference in each inline citation.
	//
	// e.g.
	//     {
	//         "0":  // inline citation 0
	//             {
	//                 "0": 1,  // reference 0 has option 1
	//                 "1": 0,  // reference 1 has option 0
	//                 "5": 2   // reference 5 has option 2
	//             }
	//     }
	//
	// If a reference is not included in the return object,
	// it's assumed it is option 0, which is a normal citation
	// with no additional options.
	//
	// The options are defined in CSLEDIT_exampleData.additionalOptions
	var getCitationOptions = function () {
		if (CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitationOptions') === null) {
			return {};
		}
		return CSLEDIT_storage.getItemJson('CSLEDIT_exampleCitationOptions');
	};

	// This sets the citationOptions
	//
	// citationOptions is the same format as the getCitationOptions() return value
	var setCitationOptions = function (citationOptions) {
		var citations = getCitations();
		CSLEDIT_storage.setItem('CSLEDIT_exampleCitationOptions', JSON.stringify(citationOptions));
		
		applyCitationOptions(citations, citationOptions);
		setCitations(citations);
	};

	var applyCitationOptions = function (citations, citationOptions) {
		// apply options
		$.each(citations, function (citationIndex, citation) {
			var index;
			for (index = 0; index < citation.citationItems.length; index++) {
				var citationItem = citation.citationItems[index],
					referenceIndex = parseInt(citationItem.id.replace("ITEM-", ""), 10) - 1,
					optionIndex = getOption(citationIndex, referenceIndex),
					options = CSLEDIT_exampleData.additionalOptions[optionIndex];
			
				// replace all options
				citationItem = { id : citationItem.id };
				$.each(options.options, function (key, value) {
					citationItem[key] = value;
				});
				citation.citationItems[index] = citationItem;
			}
		});
	};

	// Sets the option for the given reference in the given inline citation
	//
	// option is the index of the citation option to apply, see
	// CSLEDIT_exampleData.additionalOptions for a definition of these options
	var setOption = function (citation, reference, option) {
		var options = getCitationOptions();
		if (option >= CSLEDIT_exampleData.additionalOptions.length) {
			option = 0;
		}
		options[citation] = options[citation] || {};
		options[citation][reference] = option;
		setCitationOptions(options);
	};

	// Returns the index of the option for the given reference in the given inline citation
	//
	// See CSLEDIT_exampleData.additionalOptions for definitions of these options
	var getOption = function (citation, reference) {
		var options = getCitationOptions(),
			option;
		if (!options.hasOwnProperty(citation)) {
			return 0;
		}
		if (!options[citation].hasOwnProperty(reference)) {
			return 0;
		}
		option = options[citation][reference];
		if (option >= CSLEDIT_exampleData.additionalOptions.length) {
			option = 0;
		}
		return option;
	};

	// Returns an object containing metadata for all the references
	// ready to pass to citeproc
	//
	// Very similar to getReferences but returns an object with keys
	// in the form "ITEM-1", "ITEM-2", etc. instead of a list, and
	// each item in the list is given a corresponding id value,
	// e.g. "ITEM-2"
	var getCiteprocReferences = function (references /* optional */) {
		var citeprocReferences = {};

		references = references || getReferences();

		$.each(references, function (i, reference) {
			var itemString = "ITEM-" + (i + 1);
			reference.id = itemString;
			citeprocReferences[itemString] = reference;
		});

		return citeprocReferences;
	};		

	// Returns a list of csl-data.json references
	var getReferences = function () {
		// TODO: At the moment, if CSLEDIT_exampleData.jsonDocumentList is updated between
		//       releases, it will only get used in the Visual Editor if the user resets all
		//       citations in the citation editor dialog, or clears their localSettings.
		//       Should be fixed.
		if (CSLEDIT_storage.getItemJson('CSLEDIT_exampleReferences') === null) {
			setReferences(CSLEDIT_options.get('exampleReferences'));
		}
		return CSLEDIT_storage.getItemJson('CSLEDIT_exampleReferences');
	};

	// Set the list of csl-data.json references, used to
	// build up the inline citation clusters
	var setReferences = function (referenceList) {
		CSLEDIT_storage.setItem('CSLEDIT_exampleReferences', JSON.stringify(referenceList));

		suppressUpdate = true;
		$.each(getCitations(), function (i, citation) {
			limitReferenceIndexesForCitation(i);
		});
		suppressUpdate = false;

		update();
	};

	// remove out of range indexes
	var limitReferenceIndexesForCitation = function (citationIndex) {
		var newReferenceList = [],
			references = getReferences();

		$.each(getReferenceIndexesForCitation(citationIndex), function (i, referenceIndex) {
			if (referenceIndex < references.length) {
				newReferenceList.push(referenceIndex);
			}
		});
		setReferenceIndexesForCitation(citationIndex, newReferenceList);
	};

	// Returns the list of reference indexes using in the given citation
	var getReferenceIndexesForCitation = function (citationIndex) {
		var indexes = [],
			citations = getCitations();

		if (citationIndex >= citations.length) {
			return [];
		}

		$.each(citations[citationIndex].citationItems, function (i, citationItem) {
			indexes.push(parseInt(citationItem.id.replace("ITEM-", ""), 10) - 1);
		});

		return indexes;
	};
	
	// Sets the list of reference indexes used in the given citation.
	//
	// e.g. This will set citation 1 (the 2nd citation) to use references 2 and 4
	//      (reference index 2 corresponds to "ITEM-3" and index 4 to "ITEM-5")
	//
	//      setReferenceIndexesForCitation(1, [2, 4]);
	var setReferenceIndexesForCitation = function (citationIndex, references) {
		var citations = getCitations();
		
		citations[citationIndex] = citations[citationIndex] || newCluster(citationIndex);
		citations[citationIndex].citationItems = [];

		$.each(references, function (i, referenceIndex) {
			citations[citationIndex].citationItems.push({
				id : "ITEM-" + (referenceIndex + 1)
			});
		});

		setCitations(citations);
	};
	
	// Append the given csl-data.json reference to the list of references,
	// and optionally append it to the given inline citation
	var addReference = function (referenceData, citationToAddTo /* optional */ ) {
		var references = getReferences(),
			citations;
		references.push(referenceData);
		setReferences(references);

		if (typeof citationToAddTo !== "undefined") {
			citations = getCitations();
			citations[citationToAddTo].citationItems.push({
				id : "ITEM-" + references.length
			});
			setCitations(citations);
		}
	};

	// Trigger a CSLEDIT_viewController updateFinished event,
	// which will re-generate the citations
	var update = function () {
		if (!suppressUpdate && typeof(CSLEDIT_viewController) !== "undefined") {
			CSLEDIT_viewController.styleChanged("updateFinished");
		}
	};

	// static function
	var createCitationCluster = function (referenceIndexList) {
		var cluster = newCluster();
		
		$.each(referenceIndexList, function (i, referenceIndex) {
			cluster.citationItems.push({
				id : "ITEM-" + (referenceIndex + 1)
			});
		});

		return cluster;
	};

	// Remove any customization of the example citations and use the hard-coded
	// ones instead
	var resetToDefault = function () {
		CSLEDIT_storage.removeItem("CSLEDIT_exampleCitations");
		CSLEDIT_storage.removeItem("CSLEDIT_exampleReferences");
		CSLEDIT_storage.removeItem("CSLEDIT_exampleCitationOptions");
		update();
	};

	return {
		getCitations : getCitations,
		setCitations : setCitations,

		getOption : getOption,
		setOption : setOption,

		getReferences : getReferences,
		setReferences : setReferences,

		getCiteprocReferences : getCiteprocReferences,

		getReferenceIndexesForCitation : getReferenceIndexesForCitation,
		setReferenceIndexesForCitation : setReferenceIndexesForCitation,

		addReference : addReference,

		resetToDefault : resetToDefault,

		createCitationCluster : createCitationCluster
	};
});



// A dialog allowing the user to customise the in-line citations

define('src/citationEditor',
		[	'src/exampleCitations',
			'src/exampleData',
			'src/debug',
			'jquery.ui'
		],
		function (
			CSLEDIT_exampleCitations,
			CSLEDIT_exampleData,
			debug,
			jquery_ui
		) {
	var dialog = $('<div/>'),
		advanced = $('<div/>', {id: "accordion"}).css({"padding-top": "10px", width: "100%"}),
		advancedContents = $('<div/>'),
		referencePanel = $('<div class="refrenceList" />'),
		newReferenceInput = $('<textarea class="addReference" /><br />').css({width: "100%", height: "100px"}),
		addReferenceButton = $('<button>Add new reference</button>'),
		resetReferencesButton = $('<button>Reset <strong>all</strong> citations to default</button>'),
		citation,
		initialised = false;

	dialog.append(referencePanel);
	dialog.append(resetReferencesButton);
	dialog.append(advanced);

	advanced.append('<h3><a href="#">Advanced</a></h3>');
	advanced.append(advancedContents);

	advancedContents.append("<h3>Add new reference</h3>");
	advancedContents.append("<p>Input csl-data.json here and click \"Add new Reference\"</p>");
	advancedContents.append(newReferenceInput);
	advancedContents.append(addReferenceButton);

	resetReferencesButton.on('click', function () {
		CSLEDIT_exampleCitations.resetToDefault();
		updateReferenceList();
	});

	addReferenceButton.on('click', function () {
		var jsonData,
			referenceList;
	   
		try {
			jsonData = JSON.parse(newReferenceInput.val());
		} catch (e) {
			alert("Error: Not valid JSON");
			return;
		}

		// will accept individual references or a list
		referenceList = [].concat(jsonData);
		$.each(referenceList, function (i, reference) {
			CSLEDIT_exampleCitations.addReference(reference, citation);
		});

		updateReferenceList();
		newReferenceInput.val("");
	});

	var updateReferenceList = function () {
		var table = $('<table/>');

		referencePanel.children().remove();

		$.each(CSLEDIT_exampleCitations.getReferences(), function (i, reference) {
			var row = $('<tr/>'),
				input,
				label1,
				label2,
				select;

			input = $('<input/>', {
					type : "checkbox",
					id : "citationEditorReference" + i
				});
			label1 = $('<label/>', {
					for : "citationEditorReference" + i
				}).append($('<strong/>').text(reference.type));
			label2 = $('<label/>', {
					for : "citationEditorReference" + i
				}).text(reference.title);
			select = $('<select/>');
			$.each(CSLEDIT_exampleData.additionalOptions, function (i, option) {
				select.append($('<option/>').text(option.description));
			});

			var description;
			description = CSLEDIT_exampleData.additionalOptions[
				CSLEDIT_exampleCitations.getOption(citation, i)].description;
			debug.log(description);
			select.val(description);

			row.append($('<td/>').append(input));
			row.append($('<td/>').append(label1));
			row.append($('<td/>').append(label2));
			row.append($('<td/>').append(select));
			table.append(row);
		});
		referencePanel.append(table);

		table.find('td').css({"padding-right": "8px"});

		debug.log("checked = " +
				JSON.stringify(CSLEDIT_exampleCitations.getReferenceIndexesForCitation(citation)));

		$.each(CSLEDIT_exampleCitations.getReferenceIndexesForCitation(citation), function (i, refIndex) {
			referencePanel.find('input[type=checkbox]').eq(refIndex).attr('checked', true);
		});
		referencePanel.find('input[type=checkbox]').on('change', function () {
			updateCitations();
		});
		referencePanel.find('select').on('change', function () {
			var reference = referencePanel.find('select').index($(this)),
				optionIndex = $(this).children('option').index(
					$(this).children('option[value="' + $(this).val() + '"]'));

			CSLEDIT_exampleCitations.setOption(citation, reference, optionIndex);
		});
	};

	var updateCitations = function () {
		var citationItem,
			citationItems = [],
			checked = [],
			additionalOptions;

		referencePanel.find('input').each(function (index) {
			if ($(this).is(':checked')) {
				checked.push(index);
			}
		});
		
		debug.log("setting " + citation + " to " + JSON.stringify(checked));

		CSLEDIT_exampleCitations.setReferenceIndexesForCitation(citation, checked);
	};

	// Presents a dialog allowing customisation of the given inline citation
	//
	// - _citation - the integer index of the citation to edit
	var editCitation = function (_citation) {
		citation = _citation;
		updateReferenceList();

		// list references
		dialog.dialog({
			title : 'Edit Citation ' + (citation + 1),
			width : 700,
			resizable: false
		});

		if (!initialised) {
			advanced.accordion({
				collapsible : true,
				active : false
			});
			initialised = true;
		}
		
		if (dialog.height() > $(window).height() - 50) {
			dialog.height($(window).height() - 50);
		}

		// Give the dialog has a fixed height so that it doesn't expand beyond the bottom
		// of the page when the "Advanced" accoridion is expanded
		dialog.dialog('option', 'height', dialog.height() + 55);

		if (dialog.offset().top < 80) {
			dialog.dialog("option", "position", [dialog.offset().left, 80]);
		}
	};

	return {
		editCitation : editCitation 
	};
});

// Responsible for parsing a .rng file
// The file must be in XML form, not the compact notation (.rnc)
//
// _It's only been tested with the CSL schema
// (version 1.0.1 and to a lesser extent the MLZ variant)_
//
// It generates properties for each element type:
//
// - data type if applicable (e.g. text, anyURI)
// - list of attributes, and thier possible values
// - list of child elements
// - list of mutually exclusive choices that the node can be in, each choice
//   contains it's own list of attributes
// 
// It assumes that an element can be uniquely identified by its name + parent's name



define('src/Schema',['src/options', 'src/storage', 'src/debug'], function (CSLEDIT_options, CSLEDIT_storage, debug) {
	// Create a schema with the given schema options
	var CSLEDIT_Schema = function (
			schemaOptions /* used to apply modifications appropriate to Visual Editor */ ) {
		var mainSchemaData,
			schemas = [],
			nodesParsed = 0,
			nodeProperties = {}, // The possible child elements and attributes for each
								 // node name
			defineProperties = {},
			urlsGot = 0,
			callback = null,
			initialised = false,
			refParents = {},
			lastAttributeValue = null, // needed because the documentation for an attribute value
									   // comes after, instead of within, and attribute
			mainSchemaURL = CSLEDIT_options.get("cslSchema_mainURL"),
			includeSchemaURLs = CSLEDIT_options.get("cslSchema_childURLs");

		var readSchemaFromStorage = function () {
			var mainSchema = JSON.parse(CSLEDIT_storage.getItem("CSLEDIT_mainSchema")),
				subSchemas = JSON.parse(CSLEDIT_storage.getItem("CSLEDIT_subSchemas"));

			if (mainSchema !== null) {
				$.each(mainSchema, function (name, data) {
					debug.log("WARNING: Using custom schema: " + name);
					mainSchemaData = data;
				});

				if (subSchemas !== null) {
					$.each(subSchemas, function (name, data) {
						debug.log("Adding custom sub schema: " + name);
						schemas.push(data);
					});
				}
			}
		};

		var NodeProperties = function (copySource) {
			if (typeof(copySource) === "undefined") {
				return {
					elements : {},
					attributes : {},
					refs : [],
					refQuantifiers : {},
					attributeValues : [],
					textNode : false,
					list : false,
					choices : [],
					documentation : ""
				};
			} else {
				// deep copy
				return JSON.parse(JSON.stringify(copySource));
			}
		};

		var init = function () {
			// parse the schema element by element
			var parser = new DOMParser(),
				xmlDoc;

			xmlDoc = parser.parseFromString(mainSchemaData, "application/xml");

			// This is the root node for the grammar
			nodeProperties["root"] = parseChildren(xmlDoc);

			$.each(schemas, function (i, schemaData) {
				xmlDoc = parser.parseFromString(schemaData, "application/xml");
			
				// Parse schema
				parseChildren(xmlDoc);
			});

			// Simplify schema (replace each refs with the corresponding define)
			simplify();

			if (schemaOptions && 'processNodeProperties' in schemaOptions) {
				schemaOptions.processNodeProperties(nodeProperties);
			}

			initialised = true;
			if (callback !== null) {
				callback();
			}
		};

		var simplify = function () {
			var node, defRegExp, match, originalNodes = [], newNodeName;

			for (node in nodeProperties) {
				simplifyNode(node, nodeProperties[node]);
			}

			// replace all def: references in node names with the appropriate child nodes, expanding
			// out the as neccessary
			defRegExp = new RegExp("def:([\\w-\\.]+)/(.*)$");

			for (node in nodeProperties) {
				originalNodes.push(node);
			}

			$.each(originalNodes, function (i, node) {
				match = defRegExp.exec(node);
				if (match !== null) {
					$.each(refParents[match[1]], function (i2, refParent) {
						newNodeName = refParent + "/" + match[2];
						if (newNodeName in nodeProperties) {
							joinProperties(nodeProperties[newNodeName], nodeProperties[node]);
						} else {
							nodeProperties[newNodeName] = nodeProperties[node];
						}
					});

					delete nodeProperties[node];
				}
			});
		};

		var elementName = function (elementStackString) {
			return elementStackString.replace(/^.*\//, "");
		};

		var simplifyNode = function (nodeName, node) {
			var define,
				ref,
				refQuantifier,
				attributeName,
				nodeLocalName,
				element;

			ref = node.refs.pop();
			refQuantifier = node.refQuantifiers[ref];

			if (typeof ref === "undefined") {
				for (attributeName in node.attributes) {
					// already mostly simplified, just need to dereference the attr. values
					simplifyAttributeValues(node.attributes, attributeName);
				}
				simplifyChoices(node);

				// remove general attribute if it's also a choice attribute
				// TODO: check with CSL guys if there's a bug in the schema
				//       which makes this necessary for cs:date and cs:date-part
				$.each(node.choices, function (i, choice) {
					var index;

					$.each(choice.attributes, function (attributeName) {
						if (attributeName in node.attributes) {
							debug.log("WARNING: " + attributeName +
								" in choice and general attributes for node " + nodeName);
							debug.log("Deleting the general attribute");
							delete node.attributes[attributeName];
							index--;
						}
					});
				});

				// remove refs array
				delete node.refs;
				return;
			}
			
			if (ref.name in defineProperties) {
				// deep copy so that original define won't change
				define = new NodeProperties(defineProperties[ref.name]);

				// set quantifier to all child elements within the define
				if (typeof(refQuantifier) !== "undefined") {
					for (element in define.elements) {
						define.elements[element] = refQuantifier;
					}

					// move choices to general attrs.
					removeChoices(define);
				}

				if ("defaultValue" in ref && ref.defaultValue !== null) {
					$.each(define.attributes, function (name, attribute) {
						attribute.defaultValue = ref.defaultValue;
					});
				}
				joinProperties(node, define);
				simplifyNode(nodeName, node);
			
			debug.assert(elementName(nodeName).indexOf("def:") === -1, "define parent");

				if (ref.name in refParents) {
					if (refParents[ref.name].indexOf(elementName(nodeName)) === -1) {
						refParents[ref.name].push(elementName(nodeName));
					}
				} else {
					refParents[ref.name] = [ elementName(nodeName) ];
				}
			} else {
			debug.assert(false, "Couldn't find define: " + ref.name);
			}
		};

		var simplifyAttributeValues = function (attributes, attributeName) {
			var ref,
				define;

			// note: refs may already be deleted because
			// this attribute may have referenced in a different element,
			// and it's already been simplified
			if (typeof attributes[attributeName].refs === "undefined") {
				return;
			}

			ref = attributes[attributeName].refs.pop();

			if (typeof ref === "undefined") {
				// simplified
				
				// note, that refs may already be deleted because
				// it may have been referenced somewhere else
				if (typeof attributes[attributeName].refs !== "undefined") {
					delete attributes[attributeName].refs;
				}
				return;
			}

			if (ref.name in defineProperties) {
				define = defineProperties[ref.name];
				
				arrayMerge(attributes[attributeName].values,
					define.attributeValues);
				arrayMerge(attributes[attributeName].refs,
					define.refs);

				simplifyAttributeValues(attributes, attributeName);
			} else {
			debug.assert(false, "Couldn't find attr value define: " + ref.name);
			}
		};

		var attributeNamesFromRef = function (ref) {
			var define = defineProperties[ref.name],
				attributeNames = [];

		debug.assert(typeof define !== 'undefined');

			$.each(define.refs, function (i, ref) {
				attributeNames = attributeNames.concat(attributeNamesFromRef(ref));
			});

			$.each(define.attributes, function (name, attribute) {
				attributeNames.push(name);
			});

			return attributeNames;
		};

		var simplifyChoices = function (node) {
			var index;

			$.each(node.choices, function (i, choice) {
				$.each(choice.refs, function (i2, ref) {
					var define = defineProperties[ref.name];
					attributesMerge(choice.attributes, define.attributes);
				});
				//delete choice.refs;
			});
			$.each(node.choices, function (i, choice) {
				var attributeName;
				for (attributeName in choice.attributes) {
					// already mostly simplified, just need to dereference the attr. values
					simplifyAttributeValues(choice.attributes, attributeName);
				}
			});

			// remove any choices with no attributes
			for (index = 0; index < node.choices.length; index++) {
				if (Object.keys(node.choices[index].attributes).length === 0) {
					node.choices.splice(index, 1);
					index--;
				}
			}
		};

		var arrayContains = function (array, element, equalityFunction) {
			if (typeof equalityFunction === "undefined") {
				equalityFunction = function (a, b) {return a === b; };
			}

			var index;
			for (index = 0; index < array.length; index++) {
				if (equalityFunction(array[index], element)) {
					return true;
				}
			}
			return false;
		};
		
		// merge the two arrays putting result in arrayA
		var arrayMerge = function (arrayA, arrayB, equalityFunction) {
			if (typeof arrayB === "undefined") {
				return;
			}

			$.each(arrayB, function (i, eleB) {
				if (!arrayContains(arrayA, eleB, equalityFunction)) {
					arrayA.push(eleB);
				}
			});
		};

		var parseChildren = function (node, applyToEachChild) {
			var index,
				parser,
				childNode,
				nodeProperties = new NodeProperties(),
				childResult;

			if (node.nodeName !== null) {
				nodesParsed++;
			}

			// add child results to the result list
			$.each(node.childNodes, function (i, childNode) {
				if (childNode.nodeName !== '#text') {
					if (childNode.nodeName in nodeParsers) {
						childResult = nodeParsers[childNode.nodeName](childNode);

						if (childResult !== null) {
							if (typeof applyToEachChild === "function") {
								applyToEachChild(childResult);
							}

							joinProperties(nodeProperties, childResult);
						}
					} else {
						// couldn't parse
					}
				}
			});

			return nodeProperties;
		};

		var attributeValueEquality = function (a, b) {
			return (a.type === b.type && a.value === b.value);
		};

		var attributesMerge = function (attributesA, attributesB) {
			var attribute;

			for (attribute in attributesB) {
				if (!(attribute in attributesA)) {
					attributesA[attribute] = attributesB[attribute];
				} else {
					arrayMerge(attributesA[attribute].values,
						attributesB[attribute].values, attributeValueEquality);
				
					arrayMerge(attributesA[attribute].refs,
						attributesB[attribute].refs);
				}
			}
		};

		var joinProperties = function (propertiesA, propertiesB) {
			var element,
				documentation = [];

			$.each(propertiesB.elements, function (element, quantifier) {
				if (!(element in propertiesA.elements) || propertiesA.elements[element] === "") {
					propertiesA.elements[element] = propertiesB.elements[element];
				} else {
					// propertiesA.elements[element] is not empty, so keep it
				}
			});
			attributesMerge(propertiesA.attributes, propertiesB.attributes);

			arrayMerge(propertiesA.choices, propertiesB.choices, function (a, b) {
				// TODO: if this fails, should check again if a equals b using
				//       guaranteed deterministic alternative to JSON.stringify
				return JSON.stringify(a) === JSON.stringify(b);
			});

			arrayMerge(propertiesA.refs, propertiesB.refs);

			$.each(propertiesB.refQuantifiers, function (ref, quantifier) {
				if (!(ref in propertiesA.refQuantifiers) || propertiesA.refQuantifiers[ref] === "") {
					propertiesA.refQuantifiers[ref] = quantifier;
				}
			});

			arrayMerge(propertiesA.attributeValues, propertiesB.attributeValues, attributeValueEquality);

			propertiesA.textNode = propertiesA.textNode | propertiesB.textNode;
			propertiesA.list = propertiesA.list | propertiesB.list;
			
			if (propertiesA.documentation !== "") {
				documentation.push(propertiesA.documentation);
			}
			if (propertiesB.documentation !== "") {
				documentation.push(propertiesB.documentation);
			}

			propertiesA.documentation = documentation.join("\n");
		};

		var elementStack = [];
		var elementStackString = function () {
			var topTwoElements = [],
				index = elementStack.length - 1;

			while (index >= 0 && topTwoElements.length < 2) {
				topTwoElements.splice(0, 0, elementStack[index]);
				index--;
			}

			return topTwoElements.join("/");
		};

		var applyQuantifierToChildren = function (quantifier) {
			return function (childNodeProperties) {
				var newElements = {},
					index;

				childNodeProperties.quantity = quantifier;
				$.each(childNodeProperties.elements, function (elementName, quantity) {
					newElements[elementName] = quantifier;
				});
				$.each(childNodeProperties.refs, function (i, ref) {
					childNodeProperties.refQuantifiers[ref] = quantifier;
				});
				childNodeProperties.elements = newElements;
			};
		};

		// moves the choice refs and attributes to the general node refs and attributes
		var removeChoices = function (nodeProperties) {
			$.each(nodeProperties.choices, function (i, choice) {
				attributesMerge(nodeProperties.attributes, choice.attributes);
				arrayMerge(nodeProperties.refs, choice.refs);
			});
			nodeProperties.choices = [];
		};

		// a list of functions which attempt to parse a node
		// return true if parsed, false if not
		var nodeParsers = {
			element : function (node) {
				var thisNodeProperties = new NodeProperties(),
					thisElementName = node.attributes.item("name").nodeValue,
					newProperties;

				// only want elements starting with cs:
				if ((/^cs:/).test(thisElementName)) {
					thisElementName = thisElementName.replace(/^cs:/, "");

					elementStack.push(thisElementName);
					thisNodeProperties.elements[thisElementName] = "one";

					newProperties = parseChildren(node);

					if (elementStackString() in nodeProperties) {
						joinProperties(nodeProperties[elementStackString()], newProperties);
					} else {
						nodeProperties[elementStackString()] = newProperties;
					}

					elementStack.pop();
					return thisNodeProperties;
				} else {
					// ignore non cs: elements/
				debug.assert(false);
					return null;
				}
			},
			attribute : function (node) {
				var thisNodeProperties = new NodeProperties(),
					attributeName = node.attributes.item("name").nodeValue,
					defaultValue = node.attributes.getNamedItem("a:defaultValue"),
					values;

				lastAttributeValue = null;

				values = parseChildren(node);

				if (values.textNode) {
					// Will accept any free-form text
					thisNodeProperties.attributes[attributeName] = {
						values : [],
						refs : [],
						list : values.list,
						documentation : values.documentation
					};
				} else {
					thisNodeProperties.attributes[attributeName] = {
						values : values.attributeValues,
						refs : values.refs,
						list : values.list,
						documentation : values.documentation
					};
					if (values.attributeValues.length > 0 &&
							(values.attributeValues[0].type === "value" ||
							 values.attributeValues[0].type === "data") &&
							schemaOptions && 'defaultDefaultAttribute' in schemaOptions) {
						// add an empty string if no default value is present
						if (defaultValue === null) {
							defaultValue = {
								value: schemaOptions.defaultDefaultAttribute.value
							};
						
							if (thisNodeProperties.attributes[attributeName].values.length > 0) {
								thisNodeProperties.attributes[attributeName].values.splice(
										0, 0, schemaOptions.defaultDefaultAttribute);
							}
						}
					}
				}

				if (defaultValue !== null) {
					thisNodeProperties.attributes[attributeName].defaultValue = defaultValue.value;
				}

				return thisNodeProperties;
			},
			group : function (node) {
				return parseChildren(node);
			},
			interleave : function (node) {
				return parseChildren(node);
			},
			choice : function (node) {
				var choices = [],
					thisNodeProperties,
					applyToEachChild = function (childNodeProperties) {
						var choice = {
								attributes : {},
								refs : []
							},
							containsChoice = false;

						// nested choices not supported
					debug.assertEqual(childNodeProperties.choices.length, 0);

						$.each(childNodeProperties.refs, function (i, choiceRef) {
							choice.refs.push(choiceRef);
							containsChoice = true;
						});

						$.each(childNodeProperties.attributes, function (attributeName, attribute) {
							choice.attributes[attributeName] = attribute;
							containsChoice = true;
						});

						if (containsChoice) {
							choices.push(choice);
						}

						childNodeProperties.attributes = {};
					};

				thisNodeProperties = parseChildren(node, applyToEachChild);
				thisNodeProperties.choices = choices;

				return thisNodeProperties;
			},
			optional : function (node) {
				return parseChildren(node, applyQuantifierToChildren("optional"));
			},
			zeroOrMore : function (node) {
				var thisNodeProperties = parseChildren(node, applyQuantifierToChildren("zeroOrMore"));

				// choices are no longer mutually exclusive
				removeChoices(thisNodeProperties);

				return thisNodeProperties;
			},
			oneOrMore : function (node) {
				var thisNodeProperties = parseChildren(node, applyQuantifierToChildren("oneOrMore"));

				// choices are no longer mutually exclusive
				removeChoices(thisNodeProperties);

				return thisNodeProperties;
			},
			list : function (node) {
				var thisNodeProperties = parseChildren(node);
				thisNodeProperties.list = true;

				return thisNodeProperties;
			},
			mixed : function (node) {
				return parseChildren(node);
			},
			ref : function (node) {
				var thisNodeProperties = new NodeProperties(),
					nodeName = node.attributes.item("name").nodeValue,
					defaultValue = node.attributes.getNamedItem("a:defaultValue"),
					ref = {};

				ref.name = nodeName;
				if (defaultValue !== null) {
					ref.defaultValue = defaultValue.value;
				}

				thisNodeProperties.refs.push(ref);
				return thisNodeProperties;
			},
			parentRef : function (node) {
				// not used in the CSL schema
			debug.assert(false, "parentRef not supported");
				return null;
			},
			empty : function (node) {
				return null;
			},
			text : function (node) {
				var thisNodeProperties = new NodeProperties();
				thisNodeProperties.textNode = true;
				return thisNodeProperties;
			},
			value : function (node) {
				var thisNodeProperties = new NodeProperties(),
					childNodes = parseChildren(node);

				lastAttributeValue = {
					type : "value",
					value : node.textContent,
					documentation : ""
				};
				thisNodeProperties.attributeValues = [lastAttributeValue];
				return thisNodeProperties;
			},
			data : function (node) {
				var thisNodeProperties = new NodeProperties();
				thisNodeProperties.attributeValues = [{
					type : "data",
					value : node.attributes.item("type").nodeValue
				}];
				return thisNodeProperties;
			},
			notAllowed : function (node) {
				// not sure what this does
				return null;
			},
			grammar : function (node) {
				return parseChildren(node);
			},
			param : function (node) {
				return null;
			},
			div : function (node) {
				// divs can be ignored for now, they are only used to group documentation nodes
				return parseChildren(node);
			},
			include : function (node) {
				// TODO!
				return null;
			},
			start : function (node) {
				return parseChildren(node);
			},
			define : function (node) {
				// create new define
				var defineName;
				defineName = node.attributes.item("name").nodeValue;
				
				elementStack.push("def:" + defineName);
				defineProperties[defineName] = parseChildren(node);
				elementStack.pop();
				return null;
			},
			"a:documentation" : function (node) {
				var thisNodeProperties,
					documentation;

				if (schemaOptions && 'documentationFilter' in schemaOptions) {
					documentation = schemaOptions.documentationFilter(node.textContent);
				}

				if (lastAttributeValue === null) {
					thisNodeProperties = new NodeProperties();
					thisNodeProperties.documentation = documentation;
					return thisNodeProperties;				
				} else {
					lastAttributeValue.documentation = documentation;
					lastAttributeValue = null;
					return null;
				}
			}
		};

		// -- initialisation code --
		
		// schema set in localStorage overrides the URLs
		readSchemaFromStorage();

		if (typeof(mainSchemaData) === "undefined") {
			$.ajax({
				url : mainSchemaURL, 
				success : function (data) {
					mainSchemaData = data;
					urlsGot++;
					if (urlsGot === includeSchemaURLs.length + 1) {
						init();
					}
				},
				error : function () {
					throw new Error("Couldn't fetch main schema from: " + mainSchemaURL);
				},
				dataType : "text"
			});

			$.each(includeSchemaURLs, function (i, url) {
				$.ajax({
					url : url,
					success : function (data) {
						schemas.push(data);
						urlsGot++;
						if (urlsGot === includeSchemaURLs.length + 1) {
							init();
						}
					},
					error : function () {
						throw new Error("Couldn't fetch sub schema from: " + url);
					},
					dataType : "text"
				});
			});
		} else {
			init();
		}

		return {
			// All the 'element' arguments below must be a string in the following format
			//
			//     $PARENT_NAME/$NODE_NAME
			//
			// e.g. 'root/style', 'style/info', 'info/title'
			
 			// Return the attributes of the given element, where element is a
			// string containing the node and it's parent
			attributes : function (element) {
				return nodeProperties[element].attributes;
			},

			// Returns an object containing a member for each of the possible child elements:
			// - key   - child element name. e.g. 'text', 'date', 'date-part'
			// - value - the quantifier (WARNING: ignore this for now since it's broken)
			childElements : function (element) {
				return nodeProperties[element].elements;
			},

			// For child-less nodes, this returns the type of the data that is stored within them
			// e.g. style/info/title is a "text" node
			//      style/info/contributor/uri is a "anyURI" node
			elementDataType : function (element) {
				var node = nodeProperties[element];

				if (nodeProperties[element].textNode) {
					return "text";
				}
				debug.assert(node.attributeValues.length < 2);
				if (node.attributeValues.length === 0 || node.attributeValues[0].type !== "data") {
					return null;
				} else {
					return node.attributeValues[0].value;
				}
			},

			// Returns the possible mutually exclusive modes the node can be in
			choices : function (element) {
				return nodeProperties[element].choices;
			},

			// Returns the documentation (if any) for this node in the schema
			documentation : function (element) {
				return nodeProperties[element].documentation;
			},

			// Returns all the nodeProperties, usefull for debugging
			allData : function () {
				return nodeProperties;
			},

			// Calls newCallback as soon as the schema is initialised,
			// or immediately if it's already been initialised
			callWhenReady : function (newCallback) {
				if (initialised) {
					newCallback();
				} else {
					callback = newCallback;
				}
			}
		};
	};

	return CSLEDIT_Schema;
});



// Options for altering the output of src/Schema for use in the CSL Editor

define('src/schemaOptions',{
	// If no default value is specified in the schema, use this
	defaultDefaultAttribute : {
		documentation: "No value",
		type: "novalue",
		value: ""
	},
	
	// All documentation strings are passed through this filter
	documentationFilter : function (documentation) {
		return documentation
			.replace(/\n/g, " ")
			.replace(/The font-formatting attributes are based on those of CSS and XSL-FO\./g, "");
	},

	// Do some processing of nodeProperties after CSLEDIT_Schema has generated it
	processNodeProperties : function (nodeProperties) {
		// add an xmlns attribute to the style node
		nodeProperties["root/style"].attributes["xmlns"] = {
			defaultValue : "http://purl.org/net/xbiblio/csl",
			documentation : "",
			list : 0,
			values : [{
				documentation : "",
				type : "value",
				value : "http://purl.org/net/xbiblio/csl"
			}],
			alwaysOutput : true
		};

		nodeProperties["root/style"].attributes["version"].alwaysOutput = true;

		// remove empty default values from date-part choice elements
		$.each(nodeProperties["date/date-part"].choices, function (i, choice) {
			$.each(choice.attributes, function (attributeName, attribute) {
				if (attribute.values.length === 2 && attribute.values[0].type === "novalue") {
					attribute.values.splice(0, 1);
					attribute.defaultValue = attribute.values[0].value;
					attribute.alwaysOutput = true;
				}
			});
		});
		
		// change style node description
		nodeProperties["root/style"].documentation = "Set global formatting options";
		
		// add default for all delimiter attributes
		$.each(nodeProperties, function (i, node) {
			if ("delimiter" in node.attributes) {
				if (!("defaultValue" in node.attributes.delimiter)) {
					node.attributes.delimiter.defaultValue = ""; 
				}
			}
		});
	}
});

(function(){function diff_match_patch(){this.Diff_Timeout=1;this.Diff_EditCost=4;this.Match_Threshold=0.5;this.Match_Distance=1E3;this.Patch_DeleteThreshold=0.5;this.Patch_Margin=4;this.Match_MaxBits=32}
diff_match_patch.prototype.diff_main=function(a,b,c,d){"undefined"==typeof d&&(d=0>=this.Diff_Timeout?Number.MAX_VALUE:(new Date).getTime()+1E3*this.Diff_Timeout);if(null==a||null==b)throw Error("Null input. (diff_main)");if(a==b)return a?[[0,a]]:[];"undefined"==typeof c&&(c=!0);var e=c,f=this.diff_commonPrefix(a,b),c=a.substring(0,f),a=a.substring(f),b=b.substring(f),f=this.diff_commonSuffix(a,b),g=a.substring(a.length-f),a=a.substring(0,a.length-f),b=b.substring(0,b.length-f),a=this.diff_compute_(a,
b,e,d);c&&a.unshift([0,c]);g&&a.push([0,g]);this.diff_cleanupMerge(a);return a};
diff_match_patch.prototype.diff_compute_=function(a,b,c,d){if(!a)return[[1,b]];if(!b)return[[-1,a]];var e=a.length>b.length?a:b,f=a.length>b.length?b:a,g=e.indexOf(f);if(-1!=g)return c=[[1,e.substring(0,g)],[0,f],[1,e.substring(g+f.length)]],a.length>b.length&&(c[0][0]=c[2][0]=-1),c;if(1==f.length)return[[-1,a],[1,b]];return(e=this.diff_halfMatch_(a,b))?(f=e[0],a=e[1],g=e[2],b=e[3],e=e[4],f=this.diff_main(f,g,c,d),c=this.diff_main(a,b,c,d),f.concat([[0,e]],c)):c&&100<a.length&&100<b.length?this.diff_lineMode_(a,
b,d):this.diff_bisect_(a,b,d)};
diff_match_patch.prototype.diff_lineMode_=function(a,b,c){var d=this.diff_linesToChars_(a,b),a=d.chars1,b=d.chars2,d=d.lineArray,a=this.diff_main(a,b,!1,c);this.diff_charsToLines_(a,d);this.diff_cleanupSemantic(a);a.push([0,""]);for(var e=d=b=0,f="",g="";b<a.length;){switch(a[b][0]){case 1:e++;g+=a[b][1];break;case -1:d++;f+=a[b][1];break;case 0:if(1<=d&&1<=e){a.splice(b-d-e,d+e);b=b-d-e;d=this.diff_main(f,g,!1,c);for(e=d.length-1;0<=e;e--)a.splice(b,0,d[e]);b+=d.length}d=e=0;g=f=""}b++}a.pop();return a};
diff_match_patch.prototype.diff_bisect_=function(a,b,c){for(var d=a.length,e=b.length,f=Math.ceil((d+e)/2),g=f,h=2*f,j=Array(h),i=Array(h),k=0;k<h;k++)j[k]=-1,i[k]=-1;j[g+1]=0;i[g+1]=0;for(var k=d-e,p=0!=k%2,q=0,s=0,o=0,v=0,u=0;u<f&&!((new Date).getTime()>c);u++){for(var n=-u+q;n<=u-s;n+=2){var l=g+n,m;m=n==-u||n!=u&&j[l-1]<j[l+1]?j[l+1]:j[l-1]+1;for(var r=m-n;m<d&&r<e&&a.charAt(m)==b.charAt(r);)m++,r++;j[l]=m;if(m>d)s+=2;else if(r>e)q+=2;else if(p&&(l=g+k-n,0<=l&&l<h&&-1!=i[l])){var t=d-i[l];if(m>=
t)return this.diff_bisectSplit_(a,b,m,r,c)}}for(n=-u+o;n<=u-v;n+=2){l=g+n;t=n==-u||n!=u&&i[l-1]<i[l+1]?i[l+1]:i[l-1]+1;for(m=t-n;t<d&&m<e&&a.charAt(d-t-1)==b.charAt(e-m-1);)t++,m++;i[l]=t;if(t>d)v+=2;else if(m>e)o+=2;else if(!p&&(l=g+k-n,0<=l&&l<h&&-1!=j[l]&&(m=j[l],r=g+m-l,t=d-t,m>=t)))return this.diff_bisectSplit_(a,b,m,r,c)}}return[[-1,a],[1,b]]};
diff_match_patch.prototype.diff_bisectSplit_=function(a,b,c,d,e){var f=a.substring(0,c),g=b.substring(0,d),a=a.substring(c),b=b.substring(d),f=this.diff_main(f,g,!1,e),e=this.diff_main(a,b,!1,e);return f.concat(e)};
diff_match_patch.prototype.diff_linesToChars_=function(a,b){function c(a){for(var b="",c=0,f=-1,g=d.length;f<a.length-1;){f=a.indexOf("\n",c);-1==f&&(f=a.length-1);var q=a.substring(c,f+1),c=f+1;(e.hasOwnProperty?e.hasOwnProperty(q):void 0!==e[q])?b+=String.fromCharCode(e[q]):(b+=String.fromCharCode(g),e[q]=g,d[g++]=q)}return b}var d=[],e={};d[0]="";var f=c(a),g=c(b);return{chars1:f,chars2:g,lineArray:d}};
diff_match_patch.prototype.diff_charsToLines_=function(a,b){for(var c=0;c<a.length;c++){for(var d=a[c][1],e=[],f=0;f<d.length;f++)e[f]=b[d.charCodeAt(f)];a[c][1]=e.join("")}};diff_match_patch.prototype.diff_commonPrefix=function(a,b){if(!a||!b||a.charAt(0)!=b.charAt(0))return 0;for(var c=0,d=Math.min(a.length,b.length),e=d,f=0;c<e;)a.substring(f,e)==b.substring(f,e)?f=c=e:d=e,e=Math.floor((d-c)/2+c);return e};
diff_match_patch.prototype.diff_commonSuffix=function(a,b){if(!a||!b||a.charAt(a.length-1)!=b.charAt(b.length-1))return 0;for(var c=0,d=Math.min(a.length,b.length),e=d,f=0;c<e;)a.substring(a.length-e,a.length-f)==b.substring(b.length-e,b.length-f)?f=c=e:d=e,e=Math.floor((d-c)/2+c);return e};
diff_match_patch.prototype.diff_commonOverlap_=function(a,b){var c=a.length,d=b.length;if(0==c||0==d)return 0;c>d?a=a.substring(c-d):c<d&&(b=b.substring(0,c));c=Math.min(c,d);if(a==b)return c;for(var d=0,e=1;;){var f=a.substring(c-e),f=b.indexOf(f);if(-1==f)return d;e+=f;if(0==f||a.substring(c-e)==b.substring(0,e))d=e,e++}};
diff_match_patch.prototype.diff_halfMatch_=function(a,b){function c(a,b,c){for(var d=a.substring(c,c+Math.floor(a.length/4)),e=-1,g="",h,j,n,l;-1!=(e=b.indexOf(d,e+1));){var m=f.diff_commonPrefix(a.substring(c),b.substring(e)),r=f.diff_commonSuffix(a.substring(0,c),b.substring(0,e));g.length<r+m&&(g=b.substring(e-r,e)+b.substring(e,e+m),h=a.substring(0,c-r),j=a.substring(c+m),n=b.substring(0,e-r),l=b.substring(e+m))}return 2*g.length>=a.length?[h,j,n,l,g]:null}if(0>=this.Diff_Timeout)return null;
var d=a.length>b.length?a:b,e=a.length>b.length?b:a;if(4>d.length||2*e.length<d.length)return null;var f=this,g=c(d,e,Math.ceil(d.length/4)),d=c(d,e,Math.ceil(d.length/2)),h;if(!g&&!d)return null;h=d?g?g[4].length>d[4].length?g:d:d:g;var j;a.length>b.length?(g=h[0],d=h[1],e=h[2],j=h[3]):(e=h[0],j=h[1],g=h[2],d=h[3]);h=h[4];return[g,d,e,j,h]};
diff_match_patch.prototype.diff_cleanupSemantic=function(a){for(var b=!1,c=[],d=0,e=null,f=0,g=0,h=0,j=0,i=0;f<a.length;)0==a[f][0]?(c[d++]=f,g=j,h=i,i=j=0,e=a[f][1]):(1==a[f][0]?j+=a[f][1].length:i+=a[f][1].length,e&&e.length<=Math.max(g,h)&&e.length<=Math.max(j,i)&&(a.splice(c[d-1],0,[-1,e]),a[c[d-1]+1][0]=1,d--,d--,f=0<d?c[d-1]:-1,i=j=h=g=0,e=null,b=!0)),f++;b&&this.diff_cleanupMerge(a);this.diff_cleanupSemanticLossless(a);for(f=1;f<a.length;){if(-1==a[f-1][0]&&1==a[f][0]){b=a[f-1][1];c=a[f][1];
d=this.diff_commonOverlap_(b,c);e=this.diff_commonOverlap_(c,b);if(d>=e){if(d>=b.length/2||d>=c.length/2)a.splice(f,0,[0,c.substring(0,d)]),a[f-1][1]=b.substring(0,b.length-d),a[f+1][1]=c.substring(d),f++}else if(e>=b.length/2||e>=c.length/2)a.splice(f,0,[0,b.substring(0,e)]),a[f-1][0]=1,a[f-1][1]=c.substring(0,c.length-e),a[f+1][0]=-1,a[f+1][1]=b.substring(e),f++;f++}f++}};
diff_match_patch.prototype.diff_cleanupSemanticLossless=function(a){function b(a,b){if(!a||!b)return 6;var c=a.charAt(a.length-1),d=b.charAt(0),e=c.match(diff_match_patch.nonAlphaNumericRegex_),f=d.match(diff_match_patch.nonAlphaNumericRegex_),g=e&&c.match(diff_match_patch.whitespaceRegex_),h=f&&d.match(diff_match_patch.whitespaceRegex_),c=g&&c.match(diff_match_patch.linebreakRegex_),d=h&&d.match(diff_match_patch.linebreakRegex_),i=c&&a.match(diff_match_patch.blanklineEndRegex_),j=d&&b.match(diff_match_patch.blanklineStartRegex_);
return i||j?5:c||d?4:e&&!g&&h?3:g||h?2:e||f?1:0}for(var c=1;c<a.length-1;){if(0==a[c-1][0]&&0==a[c+1][0]){var d=a[c-1][1],e=a[c][1],f=a[c+1][1],g=this.diff_commonSuffix(d,e);if(g)var h=e.substring(e.length-g),d=d.substring(0,d.length-g),e=h+e.substring(0,e.length-g),f=h+f;for(var g=d,h=e,j=f,i=b(d,e)+b(e,f);e.charAt(0)===f.charAt(0);){var d=d+e.charAt(0),e=e.substring(1)+f.charAt(0),f=f.substring(1),k=b(d,e)+b(e,f);k>=i&&(i=k,g=d,h=e,j=f)}a[c-1][1]!=g&&(g?a[c-1][1]=g:(a.splice(c-1,1),c--),a[c][1]=
h,j?a[c+1][1]=j:(a.splice(c+1,1),c--))}c++}};diff_match_patch.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;diff_match_patch.whitespaceRegex_=/\s/;diff_match_patch.linebreakRegex_=/[\r\n]/;diff_match_patch.blanklineEndRegex_=/\n\r?\n$/;diff_match_patch.blanklineStartRegex_=/^\r?\n\r?\n/;
diff_match_patch.prototype.diff_cleanupEfficiency=function(a){for(var b=!1,c=[],d=0,e=null,f=0,g=!1,h=!1,j=!1,i=!1;f<a.length;){if(0==a[f][0])a[f][1].length<this.Diff_EditCost&&(j||i)?(c[d++]=f,g=j,h=i,e=a[f][1]):(d=0,e=null),j=i=!1;else if(-1==a[f][0]?i=!0:j=!0,e&&(g&&h&&j&&i||e.length<this.Diff_EditCost/2&&3==g+h+j+i))a.splice(c[d-1],0,[-1,e]),a[c[d-1]+1][0]=1,d--,e=null,g&&h?(j=i=!0,d=0):(d--,f=0<d?c[d-1]:-1,j=i=!1),b=!0;f++}b&&this.diff_cleanupMerge(a)};
diff_match_patch.prototype.diff_cleanupMerge=function(a){a.push([0,""]);for(var b=0,c=0,d=0,e="",f="",g;b<a.length;)switch(a[b][0]){case 1:d++;f+=a[b][1];b++;break;case -1:c++;e+=a[b][1];b++;break;case 0:1<c+d?(0!==c&&0!==d&&(g=this.diff_commonPrefix(f,e),0!==g&&(0<b-c-d&&0==a[b-c-d-1][0]?a[b-c-d-1][1]+=f.substring(0,g):(a.splice(0,0,[0,f.substring(0,g)]),b++),f=f.substring(g),e=e.substring(g)),g=this.diff_commonSuffix(f,e),0!==g&&(a[b][1]=f.substring(f.length-g)+a[b][1],f=f.substring(0,f.length-
g),e=e.substring(0,e.length-g))),0===c?a.splice(b-d,c+d,[1,f]):0===d?a.splice(b-c,c+d,[-1,e]):a.splice(b-c-d,c+d,[-1,e],[1,f]),b=b-c-d+(c?1:0)+(d?1:0)+1):0!==b&&0==a[b-1][0]?(a[b-1][1]+=a[b][1],a.splice(b,1)):b++,c=d=0,f=e=""}""===a[a.length-1][1]&&a.pop();c=!1;for(b=1;b<a.length-1;)0==a[b-1][0]&&0==a[b+1][0]&&(a[b][1].substring(a[b][1].length-a[b-1][1].length)==a[b-1][1]?(a[b][1]=a[b-1][1]+a[b][1].substring(0,a[b][1].length-a[b-1][1].length),a[b+1][1]=a[b-1][1]+a[b+1][1],a.splice(b-1,1),c=!0):a[b][1].substring(0,
a[b+1][1].length)==a[b+1][1]&&(a[b-1][1]+=a[b+1][1],a[b][1]=a[b][1].substring(a[b+1][1].length)+a[b+1][1],a.splice(b+1,1),c=!0)),b++;c&&this.diff_cleanupMerge(a)};diff_match_patch.prototype.diff_xIndex=function(a,b){var c=0,d=0,e=0,f=0,g;for(g=0;g<a.length;g++){1!==a[g][0]&&(c+=a[g][1].length);-1!==a[g][0]&&(d+=a[g][1].length);if(c>b)break;e=c;f=d}return a.length!=g&&-1===a[g][0]?f:f+(b-e)};
diff_match_patch.prototype.diff_prettyHtml=function(a){for(var b=[],c=/&/g,d=/</g,e=/>/g,f=/\n/g,g=0;g<a.length;g++){var h=a[g][0],j=a[g][1],j=j.replace(c,"&amp;").replace(d,"&lt;").replace(e,"&gt;").replace(f,"&para;<br>");switch(h){case 1:b[g]='<ins style="background:#e6ffe6;">'+j+"</ins>";break;case -1:b[g]='<del style="background:#ffe6e6;">'+j+"</del>";break;case 0:b[g]="<span>"+j+"</span>"}}return b.join("")};
diff_match_patch.prototype.diff_text1=function(a){for(var b=[],c=0;c<a.length;c++)1!==a[c][0]&&(b[c]=a[c][1]);return b.join("")};diff_match_patch.prototype.diff_text2=function(a){for(var b=[],c=0;c<a.length;c++)-1!==a[c][0]&&(b[c]=a[c][1]);return b.join("")};diff_match_patch.prototype.diff_levenshtein=function(a){for(var b=0,c=0,d=0,e=0;e<a.length;e++){var f=a[e][0],g=a[e][1];switch(f){case 1:c+=g.length;break;case -1:d+=g.length;break;case 0:b+=Math.max(c,d),d=c=0}}return b+=Math.max(c,d)};
diff_match_patch.prototype.diff_toDelta=function(a){for(var b=[],c=0;c<a.length;c++)switch(a[c][0]){case 1:b[c]="+"+encodeURI(a[c][1]);break;case -1:b[c]="-"+a[c][1].length;break;case 0:b[c]="="+a[c][1].length}return b.join("\t").replace(/%20/g," ")};
diff_match_patch.prototype.diff_fromDelta=function(a,b){for(var c=[],d=0,e=0,f=b.split(/\t/g),g=0;g<f.length;g++){var h=f[g].substring(1);switch(f[g].charAt(0)){case "+":try{c[d++]=[1,decodeURI(h)]}catch(j){throw Error("Illegal escape in diff_fromDelta: "+h);}break;case "-":case "=":var i=parseInt(h,10);if(isNaN(i)||0>i)throw Error("Invalid number in diff_fromDelta: "+h);h=a.substring(e,e+=i);"="==f[g].charAt(0)?c[d++]=[0,h]:c[d++]=[-1,h];break;default:if(f[g])throw Error("Invalid diff operation in diff_fromDelta: "+
f[g]);}}if(e!=a.length)throw Error("Delta length ("+e+") does not equal source text length ("+a.length+").");return c};diff_match_patch.prototype.match_main=function(a,b,c){if(null==a||null==b||null==c)throw Error("Null input. (match_main)");c=Math.max(0,Math.min(c,a.length));return a==b?0:a.length?a.substring(c,c+b.length)==b?c:this.match_bitap_(a,b,c):-1};
diff_match_patch.prototype.match_bitap_=function(a,b,c){function d(a,d){var e=a/b.length,g=Math.abs(c-d);return!f.Match_Distance?g?1:e:e+g/f.Match_Distance}if(b.length>this.Match_MaxBits)throw Error("Pattern too long for this browser.");var e=this.match_alphabet_(b),f=this,g=this.Match_Threshold,h=a.indexOf(b,c);-1!=h&&(g=Math.min(d(0,h),g),h=a.lastIndexOf(b,c+b.length),-1!=h&&(g=Math.min(d(0,h),g)));for(var j=1<<b.length-1,h=-1,i,k,p=b.length+a.length,q,s=0;s<b.length;s++){i=0;for(k=p;i<k;)d(s,c+
k)<=g?i=k:p=k,k=Math.floor((p-i)/2+i);p=k;i=Math.max(1,c-k+1);var o=Math.min(c+k,a.length)+b.length;k=Array(o+2);for(k[o+1]=(1<<s)-1;o>=i;o--){var v=e[a.charAt(o-1)];k[o]=0===s?(k[o+1]<<1|1)&v:(k[o+1]<<1|1)&v|(q[o+1]|q[o])<<1|1|q[o+1];if(k[o]&j&&(v=d(s,o-1),v<=g))if(g=v,h=o-1,h>c)i=Math.max(1,2*c-h);else break}if(d(s+1,c)>g)break;q=k}return h};
diff_match_patch.prototype.match_alphabet_=function(a){for(var b={},c=0;c<a.length;c++)b[a.charAt(c)]=0;for(c=0;c<a.length;c++)b[a.charAt(c)]|=1<<a.length-c-1;return b};
diff_match_patch.prototype.patch_addContext_=function(a,b){if(0!=b.length){for(var c=b.substring(a.start2,a.start2+a.length1),d=0;b.indexOf(c)!=b.lastIndexOf(c)&&c.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)d+=this.Patch_Margin,c=b.substring(a.start2-d,a.start2+a.length1+d);d+=this.Patch_Margin;(c=b.substring(a.start2-d,a.start2))&&a.diffs.unshift([0,c]);(d=b.substring(a.start2+a.length1,a.start2+a.length1+d))&&a.diffs.push([0,d]);a.start1-=c.length;a.start2-=c.length;a.length1+=
c.length+d.length;a.length2+=c.length+d.length}};
diff_match_patch.prototype.patch_make=function(a,b,c){var d;if("string"==typeof a&&"string"==typeof b&&"undefined"==typeof c)d=a,b=this.diff_main(d,b,!0),2<b.length&&(this.diff_cleanupSemantic(b),this.diff_cleanupEfficiency(b));else if(a&&"object"==typeof a&&"undefined"==typeof b&&"undefined"==typeof c)b=a,d=this.diff_text1(b);else if("string"==typeof a&&b&&"object"==typeof b&&"undefined"==typeof c)d=a;else if("string"==typeof a&&"string"==typeof b&&c&&"object"==typeof c)d=a,b=c;else throw Error("Unknown call format to patch_make.");
if(0===b.length)return[];for(var c=[],a=new diff_match_patch.patch_obj,e=0,f=0,g=0,h=d,j=0;j<b.length;j++){var i=b[j][0],k=b[j][1];if(!e&&0!==i)a.start1=f,a.start2=g;switch(i){case 1:a.diffs[e++]=b[j];a.length2+=k.length;d=d.substring(0,g)+k+d.substring(g);break;case -1:a.length1+=k.length;a.diffs[e++]=b[j];d=d.substring(0,g)+d.substring(g+k.length);break;case 0:k.length<=2*this.Patch_Margin&&e&&b.length!=j+1?(a.diffs[e++]=b[j],a.length1+=k.length,a.length2+=k.length):k.length>=2*this.Patch_Margin&&
e&&(this.patch_addContext_(a,h),c.push(a),a=new diff_match_patch.patch_obj,e=0,h=d,f=g)}1!==i&&(f+=k.length);-1!==i&&(g+=k.length)}e&&(this.patch_addContext_(a,h),c.push(a));return c};diff_match_patch.prototype.patch_deepCopy=function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c],e=new diff_match_patch.patch_obj;e.diffs=[];for(var f=0;f<d.diffs.length;f++)e.diffs[f]=d.diffs[f].slice();e.start1=d.start1;e.start2=d.start2;e.length1=d.length1;e.length2=d.length2;b[c]=e}return b};
diff_match_patch.prototype.patch_apply=function(a,b){if(0==a.length)return[b,[]];var a=this.patch_deepCopy(a),c=this.patch_addPadding(a),b=c+b+c;this.patch_splitMax(a);for(var d=0,e=[],f=0;f<a.length;f++){var g=a[f].start2+d,h=this.diff_text1(a[f].diffs),j,i=-1;if(h.length>this.Match_MaxBits){if(j=this.match_main(b,h.substring(0,this.Match_MaxBits),g),-1!=j&&(i=this.match_main(b,h.substring(h.length-this.Match_MaxBits),g+h.length-this.Match_MaxBits),-1==i||j>=i))j=-1}else j=this.match_main(b,h,g);
if(-1==j)e[f]=!1,d-=a[f].length2-a[f].length1;else if(e[f]=!0,d=j-g,g=-1==i?b.substring(j,j+h.length):b.substring(j,i+this.Match_MaxBits),h==g)b=b.substring(0,j)+this.diff_text2(a[f].diffs)+b.substring(j+h.length);else if(g=this.diff_main(h,g,!1),h.length>this.Match_MaxBits&&this.diff_levenshtein(g)/h.length>this.Patch_DeleteThreshold)e[f]=!1;else{this.diff_cleanupSemanticLossless(g);for(var h=0,k,i=0;i<a[f].diffs.length;i++){var p=a[f].diffs[i];0!==p[0]&&(k=this.diff_xIndex(g,h));1===p[0]?b=b.substring(0,
j+k)+p[1]+b.substring(j+k):-1===p[0]&&(b=b.substring(0,j+k)+b.substring(j+this.diff_xIndex(g,h+p[1].length)));-1!==p[0]&&(h+=p[1].length)}}}b=b.substring(c.length,b.length-c.length);return[b,e]};
diff_match_patch.prototype.patch_addPadding=function(a){for(var b=this.Patch_Margin,c="",d=1;d<=b;d++)c+=String.fromCharCode(d);for(d=0;d<a.length;d++)a[d].start1+=b,a[d].start2+=b;var d=a[0],e=d.diffs;if(0==e.length||0!=e[0][0])e.unshift([0,c]),d.start1-=b,d.start2-=b,d.length1+=b,d.length2+=b;else if(b>e[0][1].length){var f=b-e[0][1].length;e[0][1]=c.substring(e[0][1].length)+e[0][1];d.start1-=f;d.start2-=f;d.length1+=f;d.length2+=f}d=a[a.length-1];e=d.diffs;0==e.length||0!=e[e.length-1][0]?(e.push([0,
c]),d.length1+=b,d.length2+=b):b>e[e.length-1][1].length&&(f=b-e[e.length-1][1].length,e[e.length-1][1]+=c.substring(0,f),d.length1+=f,d.length2+=f);return c};
diff_match_patch.prototype.patch_splitMax=function(a){for(var b=this.Match_MaxBits,c=0;c<a.length;c++)if(!(a[c].length1<=b)){var d=a[c];a.splice(c--,1);for(var e=d.start1,f=d.start2,g="";0!==d.diffs.length;){var h=new diff_match_patch.patch_obj,j=!0;h.start1=e-g.length;h.start2=f-g.length;if(""!==g)h.length1=h.length2=g.length,h.diffs.push([0,g]);for(;0!==d.diffs.length&&h.length1<b-this.Patch_Margin;){var g=d.diffs[0][0],i=d.diffs[0][1];1===g?(h.length2+=i.length,f+=i.length,h.diffs.push(d.diffs.shift()),
j=!1):-1===g&&1==h.diffs.length&&0==h.diffs[0][0]&&i.length>2*b?(h.length1+=i.length,e+=i.length,j=!1,h.diffs.push([g,i]),d.diffs.shift()):(i=i.substring(0,b-h.length1-this.Patch_Margin),h.length1+=i.length,e+=i.length,0===g?(h.length2+=i.length,f+=i.length):j=!1,h.diffs.push([g,i]),i==d.diffs[0][1]?d.diffs.shift():d.diffs[0][1]=d.diffs[0][1].substring(i.length))}g=this.diff_text2(h.diffs);g=g.substring(g.length-this.Patch_Margin);i=this.diff_text1(d.diffs).substring(0,this.Patch_Margin);""!==i&&
(h.length1+=i.length,h.length2+=i.length,0!==h.diffs.length&&0===h.diffs[h.diffs.length-1][0]?h.diffs[h.diffs.length-1][1]+=i:h.diffs.push([0,i]));j||a.splice(++c,0,h)}}};diff_match_patch.prototype.patch_toText=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=a[c];return b.join("")};
diff_match_patch.prototype.patch_fromText=function(a){var b=[];if(!a)return b;for(var a=a.split("\n"),c=0,d=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;c<a.length;){var e=a[c].match(d);if(!e)throw Error("Invalid patch string: "+a[c]);var f=new diff_match_patch.patch_obj;b.push(f);f.start1=parseInt(e[1],10);""===e[2]?(f.start1--,f.length1=1):"0"==e[2]?f.length1=0:(f.start1--,f.length1=parseInt(e[2],10));f.start2=parseInt(e[3],10);""===e[4]?(f.start2--,f.length2=1):"0"==e[4]?f.length2=0:(f.start2--,f.length2=
parseInt(e[4],10));for(c++;c<a.length;){e=a[c].charAt(0);try{var g=decodeURI(a[c].substring(1))}catch(h){throw Error("Illegal escape in patch_fromText: "+g);}if("-"==e)f.diffs.push([-1,g]);else if("+"==e)f.diffs.push([1,g]);else if(" "==e)f.diffs.push([0,g]);else if("@"==e)break;else if(""!==e)throw Error('Invalid patch mode "'+e+'" in: '+g);c++}}return b};diff_match_patch.patch_obj=function(){this.diffs=[];this.start2=this.start1=null;this.length2=this.length1=0};
diff_match_patch.patch_obj.prototype.toString=function(){var a,b;a=0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1;b=0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2;a=["@@ -"+a+" +"+b+" @@\n"];var c;for(b=0;b<this.diffs.length;b++){switch(this.diffs[b][0]){case 1:c="+";break;case -1:c="-";break;case 0:c=" "}a[b+1]=c+encodeURI(this.diffs[b][1])+"\n"}return a.join("").replace(/%20/g," ")};
this.diff_match_patch=diff_match_patch;this.DIFF_DELETE=-1;this.DIFF_INSERT=1;this.DIFF_EQUAL=0;})()
;
define("external/diff-match-patch/diff_match_patch", (function (global) {
    return function () {
        return global.diff_match_patch;
    }
}(this)));



/*global diff_match_patch:true, DIFF_INSERT:true, DIFF_DELETE:true, DIFF_EQUAL:true */
/*jshint newcap:false */

// This wraps the diff-match-patch library to provide diffs and edit distances

define('src/diff',['external/diff-match-patch/diff_match_patch'], function (diff_match_patch) {
	var dmp = new diff_match_patch();

	dmp.Diff_Timeout = 0.003; // Very low, increase if too inaccurate.
	                          // Unfortunately I couldn't find a way
	                          // to do this which was determinitic,
	                          // this method could produce different
	                          // results depending on the machine speed.
	
	/**
	 * Modified version of the diff-match-patch function which
	 * doesn't escape the original HTML tags
	 * (There's a risk now of mangling the tags)
	 *  
	 * Convert a diff array into a pretty HTML report.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} HTML representation.
	 */
	var prettyHtml = function (diffs) {
		var html = [];
		var pattern_amp = /&/g;
		var pattern_lt = /</g;
		var pattern_gt = />/g;
		var pattern_para = /\n/g;
		var x = 0;

		for (x = 0; x < diffs.length; x++) {
			var op = diffs[x][0];    // Operation (insert, delete, equal)
			var data = diffs[x][1];  // Text of change.
			var text = data;//.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
			switch (op) {
			case DIFF_INSERT:
				html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
				break;
			case DIFF_DELETE:
				html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
				break;
			case DIFF_EQUAL:
				html[x] = '<span>' + text + '</span>';
				break;
			}
		}
		return html.join('');
	};

	// Returns a pretty formatted HTML diff of the given strings
	var prettyHtmlDiff = function (oldString, newString) {
		var diffs = dmp.diff_main(oldString, newString);
		dmp.diff_cleanupSemantic(diffs);
		return prettyHtml(diffs);
	};

	// Returns the edit distance between the given strings
	var editDistance = function (oldString, newString) {
		var diffs;
		diffs = dmp.diff_main(oldString, newString);
		return dmp.diff_levenshtein(diffs);
	};

	// Human friendly value from 0 to 100 to use as a match percentage
	//
	// Based on the edit distance between oldString and newString
	//
	// 0 means no characters match
	// 100 means all characters match
	var matchQuality = function (oldString, newString) {
		var thisEditDistance = editDistance(oldString, newString),
			matchQuality = Math.max(0, Math.floor(100 * (1.0 - thisEditDistance /
				Math.max(oldString.length, newString.length))));

		return matchQuality;
	};

	return {
		prettyHtml : prettyHtml,
		prettyHtmlDiff : prettyHtmlDiff,
		matchQuality : matchQuality
	};
});



// Creates the Sys object required by citeproc-js
// 
// Provides citeproc with:
//
// - Metadata for all the JSON references used in the citation clusters
// - Locale data
// - Abbreviation data

define('src/citeprocLoadSys',[	'src/urlUtils',
			'src/debug'
		],
		function (
			CSLEDIT_urlUtils,
			debug
		) {

	// Sys constructor
	var Sys = function () {
		this.locale = {}; // lazily fetched from server
		this.abbreviations = {}; // no journal abbreviations at the moment
								// see demo/loadabbres.js in citeproc-js repo for an example
	};

	// Fetches and returns the locale for the given language,
	// or falls back to "en-US" if not available
	Sys.prototype.retrieveLocale = function (lang) {
		var that = this,
			locale = this.locale[lang],
			localePath;

		if (typeof(locale) === "undefined") {
			localePath = CSLEDIT_urlUtils.getResourceUrl("external/locales/locales-" + lang + ".xml");

			// try to fetch from server
			$.ajax({
				url : localePath,
				success : function (data) {
					debug.log("fetched locale data for " + lang);
					that.locale[lang] = data;
					locale = data;
				},
				error : function (jqXHR, textStatus) {
					debug.log("ERROR retrieving locale data for " + lang);
					debug.log("Falling back to en-US");

					locale = that.retrieveLocale("en-US");
				},
				dataType : "text",
				async : false
			});
		}
		
		return locale;
	};

	// Set the list of abbreviations
	Sys.prototype.setAbbreviations = function (abbreviations) {
		this.abbreviations = abbreviations;
	};

	// Set the list of JSON documents (all the references used in the citation clusters)
	Sys.prototype.setJsonDocuments = function (jsonDocuments) {
		this.jsonDocuments = jsonDocuments;
	};

	// Returns the JSON document at the given index
	Sys.prototype.retrieveItem = function (index) {
		return this.jsonDocuments[index];
	};

	// Returns the appropriate abbreviation
	Sys.prototype.getAbbreviations = function (name, vartype) {
		return this.abbreviations[name][vartype];
	};

	return new Sys();
});

/*
 * Copyright (c) 2009, 2010 and 2011 Frank G. Bennett, Jr. All Rights
 * Reserved.
 *
 * The contents of this file are subject to the Common Public
 * Attribution License Version 1.0 (the “License”); you may not use
 * this file except in compliance with the License. You may obtain a
 * copy of the License at:
 *
 * http://bitbucket.org/fbennett/citeproc-js/src/tip/LICENSE.
 *
 * The License is based on the Mozilla Public License Version 1.1 but
 * Sections 14 and 15 have been added to cover use of software over a
 * computer network and provide for limited attribution for the
 * Original Developer. In addition, Exhibit A has been modified to be
 * consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an “AS IS”
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is the citation formatting software known as
 * "citeproc-js" (an implementation of the Citation Style Language
 * [CSL]), including the original test fixtures and software located
 * under the ./std subdirectory of the distribution archive.
 *
 * The Original Developer is not the Initial Developer and is
 * __________. If left blank, the Original Developer is the Initial
 * Developer.
 *
 * The Initial Developer of the Original Code is Frank G. Bennett,
 * Jr. All portions of the code written by Frank G. Bennett, Jr. are
 * Copyright (c) 2009, 2010 and 2011 Frank G. Bennett, Jr. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the
 * terms of the GNU Affero General Public License (the [AGPLv3]
 * License), in which case the provisions of [AGPLv3] License are
 * applicable instead of those above. If you wish to allow use of your
 * version of this file only under the terms of the [AGPLv3] License
 * and not to allow others to use your version of this file under the
 * CPAL, indicate your decision by deleting the provisions above and
 * replace them with the notice and other provisions required by the
 * [AGPLv3] License. If you do not delete the provisions above, a
 * recipient may use your version of this file under either the CPAL
 * or the [AGPLv3] License.”
 */
var CSL_IS_IE;
var CSL_CHROME = function () {
    if ("undefined" == typeof DOMParser || CSL_IS_IE) {
        CSL_IS_IE = true;
        DOMParser = function() {};
        DOMParser.prototype.parseFromString = function(str, contentType) {
            if ("undefined" != typeof ActiveXObject) {
                var xmldata = new ActiveXObject('MSXML.DomDocument');
                xmldata.async = false;
                xmldata.loadXML(str);
                return xmldata;
            } else if ("undefined" != typeof XMLHttpRequest) {
                var xmldata = new XMLHttpRequest;
                if (!contentType) {
                    contentType = 'text/xml';
                }
                xmldata.open('GET', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(str), false);
                if(xmldata.overrideMimeType) {
                    xmldata.overrideMimeType(contentType);
                }
                xmldata.send(null);
                return xmldata.responseXML;
            }
        };
        this.hasAttributes = function (node) {
            var ret;
            if (node.attributes && node.attributes.length) {
                ret = true;
            } else {
                ret = false;
            }
            return ret;
        };
    } else {
        this.hasAttributes = function (node) {
            var ret;
            if (node.attributes && node.attributes.length) {
                ret = true;
            } else {
                ret = false;
            }
            return ret;
        };
    }
    this.importNode = function (doc, srcElement) {
        if ("undefined" == typeof doc.importNode) {
            var ret = this._importNode(doc, srcElement, true);
        } else {
            var ret = doc.importNode(srcElement, true);
        }
        return ret;
    };
    this._importNode = function(doc, node, allChildren) {
        switch (node.nodeType) {
            case 1:
                var newNode = doc.createElement(node.nodeName);
                if (node.attributes && node.attributes.length > 0)
                    for (var i = 0, il = node.attributes.length; i < il;)
                        newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i++].nodeName));
                    if (allChildren && node.childNodes && node.childNodes.length > 0)
                        for (var i = 0, il = node.childNodes.length; i < il;)
                            newNode.appendChild(this._importNode(doc, node.childNodes[i++], allChildren));
                return newNode;
                break;
            case 3:
            case 4:
            case 8:
        }
    };
    this.parser = new DOMParser();
    var str = "<docco><institution institution-parts=\"long\" delimiter=\", \" substitute-use-first=\"1\" use-last=\"1\"><institution-part name=\"long\"/></institution></docco>";
    var inst_doc = this.parser.parseFromString(str, "text/xml");
    var inst_node = inst_doc.getElementsByTagName("institution");
    this.institution = inst_node.item(0);
    var inst_part_node = inst_doc.getElementsByTagName("institution-part");
    this.institutionpart = inst_part_node.item(0);
    this.ns = "http://purl.org/net/xbiblio/csl";
};
CSL_CHROME.prototype.clean = function (xml) {
    xml = xml.replace(/<\?[^?]+\?>/g, "");
    xml = xml.replace(/<![^>]+>/g, "");
    xml = xml.replace(/^\s+/, "");
    xml = xml.replace(/\s+$/, "");
    xml = xml.replace(/^\n*/, "");
    return xml;
};
CSL_CHROME.prototype.getStyleId = function (myxml) {
    var text = "";
    var node = myxml.getElementsByTagName("id");
    if (node && node.length) {
        node = node.item(0);
    }
    if (node) {
        text = node.textContent;
    }
    if (!text) {
        text = node.innerText;
    }
    if (!text) {
        text = node.innerHTML;
    }
    return text;
};
CSL_CHROME.prototype.children = function (myxml) {
    var children, pos, len, ret;
    if (myxml) {
        ret = [];
        children = myxml.childNodes;
        for (pos = 0, len = children.length; pos < len; pos += 1) {
            if (children[pos].nodeName != "#text") {
                ret.push(children[pos]);
            }
        }
        return ret;
    } else {
        return [];
    }
};
CSL_CHROME.prototype.nodename = function (myxml) {
    var ret = myxml.nodeName;
    return ret;
};
CSL_CHROME.prototype.attributes = function (myxml) {
    var ret, attrs, attr, key, xml, pos, len;
    ret = new Object();
    if (myxml && this.hasAttributes(myxml)) {
        attrs = myxml.attributes;
        for (pos = 0, len=attrs.length; pos < len; pos += 1) {
            attr = attrs[pos];
            ret["@" + attr.name] = attr.value;
        }
    }
    return ret;
};
CSL_CHROME.prototype.content = function (myxml) {
    var ret;
    if ("undefined" != typeof myxml.textContent) {
        ret = myxml.textContent;
    } else if ("undefined" != typeof myxml.innerText) {
        ret = myxml.innerText;
    } else {
        ret = myxml.txt;
    }
    return ret;
};
CSL_CHROME.prototype.namespace = {
    "xml":"http://www.w3.org/XML/1998/namespace"
}
CSL_CHROME.prototype.numberofnodes = function (myxml) {
    if (myxml) {
        return myxml.length;
    } else {
        return 0;
    }
};
CSL_CHROME.prototype.getAttributeName = function (attr) {
    var ret = attr.name;
    return ret;
}
CSL_CHROME.prototype.getAttributeValue = function (myxml,name,namespace) {
    var ret = "";
    if (myxml && this.hasAttributes(myxml) && myxml.getAttribute(name)) {
        ret = myxml.getAttribute(name);
    }
    return ret;
}
CSL_CHROME.prototype.getNodeValue = function (myxml,name) {
    var ret = "";
    if (name){
        var vals = myxml.getElementsByTagName(name);
        if (vals.length > 0) {
            if ("undefined" != typeof vals[0].textContent) {
                ret = vals[0].textContent;
            } else if ("undefined" != typeof vals[0].innerText) {
                ret = vals[0].innerText;
            } else {
                ret = vals[0].text;
            }
        }
    } else {
        ret = myxml;
    }
    if (ret && ret.childNodes && (ret.childNodes.length == 0 || (ret.childNodes.length == 1 && ret.firstChild.nodeName == "#text"))) {
        if ("undefined" != typeof ret.textContent) {
            ret = ret.textContent;
        } else if ("undefined" != typeof ret.innerText) {
            ret = ret.innerText;
        } else {
            ret = ret.text;
        }
    }
    return ret;
}
CSL_CHROME.prototype.setAttributeOnNodeIdentifiedByNameAttribute = function (myxml,nodename,partname,attrname,val) {
    var pos, len, xml, nodes, node;
    if (attrname.slice(0,1) === '@'){
        attrname = attrname.slice(1);
    }
    nodes = myxml.getElementsByTagName(nodename);
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        node = nodes[pos];
        if (node.getAttribute("name") != partname) {
            continue;
        }
        node.setAttribute(attrname, val);
    }
}
CSL_CHROME.prototype.deleteNodeByNameAttribute = function (myxml,val) {
    var pos, len, node, nodes;
    nodes = myxml.childNodes;
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        node = nodes[pos];
        if (!node || node.nodeType == node.TEXT_NODE) {
            continue;
        }
        if (this.hasAttributes(node) && node.getAttribute("name") == val) {
            myxml.removeChild(nodes[pos]);
        }
    }
}
CSL_CHROME.prototype.deleteAttribute = function (myxml,attr) {
    myxml.removeAttribute(attr);
}
CSL_CHROME.prototype.setAttribute = function (myxml,attr,val) {
    var attribute;
    if (!myxml.ownerDocument) {
        myxml = myxml.firstChild;
    }
    attribute = myxml.ownerDocument.createAttribute(attr);
    myxml.setAttribute(attr, val);
    return false;
}
CSL_CHROME.prototype.nodeCopy = function (myxml) {
    var cloned_node = myxml.cloneNode(true);
    return cloned_node;
}
CSL_CHROME.prototype.getNodesByName = function (myxml,name,nameattrval) {
    var ret, nodes, node, pos, len;
    ret = [];
    nodes = myxml.getElementsByTagName(name);
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        node = nodes.item(pos);
        if (nameattrval && !(this.hasAttributes(node) && node.getAttribute("name") == nameattrval)) {
            continue;
        }
        ret.push(node);
    }
    return ret;
}
CSL_CHROME.prototype.nodeNameIs = function (myxml,name) {
    if (name == myxml.nodeName) {
        return true;
    }
    return false;
}
CSL_CHROME.prototype.makeXml = function (myxml) {
    var ret, topnode;
    if (!myxml) {
        myxml = "<docco><bogus/></docco>";
    }
    myxml = myxml.replace(/\s*<\?[^>]*\?>\s*\n*/g, "");
    var nodetree = this.parser.parseFromString(myxml, "application/xml");
    return nodetree.firstChild;
};
CSL_CHROME.prototype.insertChildNodeAfter = function (parent,node,pos,datexml) {
    var myxml, xml;
    myxml = this.importNode(node.ownerDocument, datexml);
    parent.replaceChild(myxml, node);
     return parent;
};
CSL_CHROME.prototype.insertPublisherAndPlace = function(myxml) {
    var group = myxml.getElementsByTagName("group");
    for (var i = 0, ilen = group.length; i < ilen; i += 1) {
        var node = group.item(i);
        var skippers = [];
        for (var j = 0, jlen = node.childNodes.length; j < jlen; j += 1) {
            if (node.childNodes.item(j).nodeType !== 1) {
                skippers.push(j);
            }
        }
        if (node.childNodes.length - skippers.length === 2) {
            var twovars = [];
            for (var j = 0, jlen = 2; j < jlen; j += 1) {
                if (skippers.indexOf(j) > -1) {
                    continue;
                }
                var child = node.childNodes.item(j);                    
                var subskippers = [];
                for (var k = 0, klen = child.childNodes.length; k < klen; k += 1) {
                    if (child.childNodes.item(k).nodeType !== 1) {
                        subskippers.push(k);
                    }
                }
                if (child.childNodes.length - subskippers.length === 0) {
                    twovars.push(child.getAttribute('variable'));
                    if (child.getAttribute('suffix')
                        || child.getAttribute('prefix')) {
                        twovars = [];
                        break;
                    }
                }
            }
            if (twovars.indexOf("publisher") > -1 && twovars.indexOf("publisher-place") > -1) {
                node.setAttribute('has-publisher-and-publisher-place', true);
            }
        }
    }
};
CSL_CHROME.prototype.addMissingNameNodes = function(myxml) {
    var nameslist = myxml.getElementsByTagName("names");
    for (var i = 0, ilen = nameslist.length; i < ilen; i += 1) {
        var names = nameslist.item(i);
        var namelist = names.getElementsByTagName("name");
        if ((!namelist || namelist.length === 0)
            && names.parentNode.tagName.toLowerCase() !== "substitute") {
            var doc = names.ownerDocument;
            var name = doc.createElement("name");
            names.appendChild(name);
        }
    }
};
CSL_CHROME.prototype.addInstitutionNodes = function(myxml) {
    var names, thenames, institution, theinstitution, name, thename, xml, pos, len;
    names = myxml.getElementsByTagName("names");
    for (pos = 0, len = names.length; pos < len; pos += 1) {
        thenames = names.item(pos);
        name = thenames.getElementsByTagName("name");
        if (name.length == 0) {
            continue;
        }
        institution = thenames.getElementsByTagName("institution");
        if (institution.length == 0) {
            theinstitution = this.importNode(myxml.ownerDocument, this.institution);
            theinstitutionpart = theinstitution.getElementsByTagName("institution-part").item(0);
            thename = name.item(0);
            thenames.insertBefore(theinstitution, thename.nextSibling);
            for (var j = 0, jlen = CSL.INSTITUTION_KEYS.length; j < jlen; j += 1) {
                var attrname = CSL.INSTITUTION_KEYS[j];
                var attrval = thename.getAttribute(attrname);
                if (attrval) {
                    theinstitutionpart.setAttribute(attrname, attrval);
                }
            }
            var nameparts = thename.getElementsByTagName("name-part");
            for (var j = 0, jlen = nameparts.length; j < jlen; j += 1) {
                if ('family' === nameparts[j].getAttribute('name')) {
                    for (var k = 0, klen = CSL.INSTITUTION_KEYS.length; k < klen; k += 1) {
                        var attrname = CSL.INSTITUTION_KEYS[k];
                        var attrval = nameparts[j].getAttribute(attrname);
                        if (attrval) {
                            theinstitutionpart.setAttribute(attrname, attrval);
                        }
                    }
                }
            }
        }
    }
};
CSL_CHROME.prototype.flagDateMacros = function(myxml) {
    var pos, len, thenode, thedate;
    nodes = myxml.getElementsByTagName("macro");
    for (pos = 0, len = nodes.length; pos < len; pos += 1) {
        thenode = nodes.item(pos);
        thedate = thenode.getElementsByTagName("date");
        if (thedate.length) {
            thenode.setAttribute('macro-has-date', 'true');
        }
    }
};

this.CSL_CHROME = CSL_CHROME;

define("external/citeproc/xmldom", (function (global) {
    return function () {
        return global.CSL_CHROME;
    }
}(this)));



// Uses citeproc-js to generate example citaitons

define('src/citationEngine',[	'src/options',
			'src/exampleCitations',
			'src/diff',
			'src/debug',
			'src/citeprocLoadSys',
			'external/citeproc/citeproc',
			'jquery'
		],
		function (
			CSLEDIT_options,
			CSLEDIT_exampleCitations,
			CSLEDIT_diff,
			debug,
			citeprocSys,
			CSL,
			$
		) {
	var oldFormattedCitation = "",
		newFormattedCitation = "",
		oldFormattedBibliography = "",
		newFormattedBibliography = "",
		diffTimeout,
		dmp = null, // for diff_match_patch object
		previousStyle = "", // to skip initializing citeproc when using the same style
		citeproc;

	// Remove the tags with the given tagName from the given html and return the result
	//
	// The contents of the removed tags are retained
	var stripTags = function (html, tagName) {
		var stripRegExp = new RegExp("<" + tagName + ".*?>|</\\s*" + tagName + "\\s*?>", "g");

		// creating new string because of bug where some html from generateExampleCitations.js
		// was type object instead of string and didn't have the replace() function
		var stripped = html.toString();
		stripped = stripped.replace(stripRegExp, "");
		return stripped;
	};

	// Formats the given citationClusters, containing the given documents, in the given
	// style
	//
	// If taggedOutput is true, the output will contain <span cslid=???> tags where the cslid
	// attribute points to the input CSL node responsible for that part of the output
	//
	// Returns a result containing the following properties:
	//
	// - statusMessage - used for errors, if everything went well, this will be an empty string
	// - formattedCitations - a list of formatted inline citation strings
	// - formattedBibliography - the formatted bibliography string
	var formatCitations = function (style, documents, citationClusters, taggedOutput) {
		var bibliography,
			result,
			citations,
			inLineCitations,
			inLineCitationArray,
			pos,
			makeBibliographyArgument,
			enumerateCitations;

		citeprocSys.setJsonDocuments(documents);
		citeprocSys.csl_reverse_lookup_support = true;

		result = { "statusMessage": "", "formattedCitations": [], "formattedBibliography": [] };
		result.statusMessage = "";
		if (style !== previousStyle) {
			try {
				citeproc = new CSL.Engine(citeprocSys, style);
				previousStyle = style;
			}
			catch (err) {
				result.statusMessage = "Citeproc initialisation exception: " + err;
				return result;
			}
		} else {
			citeproc.restoreProcessorState([]);
		}
		
		inLineCitations = "";
		inLineCitationArray = [];
		
		$.each(citationClusters, function (clusterIndex, cluster) {
			if (cluster.citationItems.length === 0) {
				return;
			}
			try {
				citations = citeproc.appendCitationCluster(cluster, false);
			}
			catch (err) {
				result.statusMessage = "Citeproc exception: " + err;
				return false;
			}
			
			$.each(citations, function (i, citation) {
				pos = citation[0];
				
				if (inLineCitations !== "")
				{
					inLineCitations += "<br>";
				}
				
				if (taggedOutput !== true) {
					citation[1] = stripTags(citation[1], "span");
				}

				inLineCitations += citation[1];

				if (citation[1] !== "") {
					inLineCitationArray.push(citation[1]);
				}
			});
		});
		if (result.statusMessage !== "") {
			return result;
		}
		result.formattedCitations = inLineCitationArray;
		
		enumerateCitations = true;
		if (enumerateCitations === true) {
			makeBibliographyArgument = undefined;
		}
		else {
			makeBibliographyArgument = "citation-number";
		}
		
		try {
			bibliography = citeproc.makeBibliography(makeBibliographyArgument);
		}
		catch (err) {
			result.statusMessage = "Citeproc exception: " + err;
			return result;
		}

		if (bibliography !== false) {
			if ("hangingindent" in bibliography[0]) {
				result.hangingIndent = bibliography[0].hangingindent;
			}
			bibliography = bibliography[1];
		}
		else {
			bibliography = [[(citations[0][1])]];
		}

		if (taggedOutput !== true) {
			$.each(bibliography, function (i, entry) {
				bibliography[i] = stripTags(entry, "span");
			});
		}

		result.formattedBibliography = bibliography;
		return result;
	};

	// This function formats the current style in CSLEDIT_data and populates
	// the given elements with the output
	//
	// Note on diffs:
	//   There is currently unused code to show a diff for a second after each change.
	//   This can be enabled by adding 'showDiffOnChange' to the CSLEDIT_options via the
	//   CSLEDIT_VisualEditor or CSLEDIT_CodeEditor contructors.
	//
	//   It hasn't worked so well since adding the reverse lookup <span cslid=??> tags to
	//   the citeproc output.
	//
	//   Could be good to fix for use in the Code Editor, but not so essential for the Visual Editor.
	var runCiteprocAndDisplayOutput = function (
			data, statusOut, citationsOut, bibliographyOut, callback,
			exampleReferences, exampleCitations) {

		debug.time("runCiteprocAndDisplayOutput");

		var style = data.getCslCode(),
			inLineCitations = "",
			citations = [],
			formattedResult,
			citationTagStart = "",
			citationTagEnd = "",
			bibliographyTagStart = "",
			bibliographyTagEnd = "",
			startTime,
			citationDiffs,
			bibliographyDiffs,
			diffFormattedCitation,
			diffFormattedBibliography,
			cslData = data.get(),
			citationNode = data.getNodesFromPath("style/citation/layout", cslData),
			bibliographyNode = data.getNodesFromPath("style/bibliography/layout", cslData);

		statusOut.html("<i>Re-formatting citations...</i>");
	
		debug.time("formatCitations");

		exampleReferences = exampleReferences || CSLEDIT_exampleCitations.getCiteprocReferences();
		exampleCitations = exampleCitations || CSLEDIT_exampleCitations.getCitations();

		formattedResult = formatCitations(style, exampleReferences, exampleCitations, true);
		
		debug.timeEnd("formatCitations");

		statusOut.html(formattedResult.statusMessage);

		// add syntax highlighting at highest level
		if (citationNode.length > 0) {
			// wrap in outer div since the .inline-csl-entry one is an inline-block
			citationTagStart = 
				'<div class="csl-entry-container">' +
				'<div class="inline-csl-entry" cslid="' + citationNode[0].cslId + '">';
			citationTagEnd = '</div></div>';
		}
		if (bibliographyNode.length > 0) {
			bibliographyTagStart =
				'<div class="csl-entry-container">' +
				'<div class="bibliography-csl-entry" cslid="' + bibliographyNode[0].cslId + '">';
			bibliographyTagEnd = '</div></div>';
		}

		oldFormattedCitation = newFormattedCitation;
		newFormattedCitation = citationTagStart;
		newFormattedCitation += formattedResult.formattedCitations.join(
			citationTagEnd + citationTagStart);
		newFormattedCitation += citationTagEnd;

		oldFormattedBibliography = newFormattedBibliography;
		newFormattedBibliography = bibliographyTagStart;
		newFormattedBibliography += formattedResult.formattedBibliography.join(
			bibliographyTagEnd + bibliographyTagStart);
		newFormattedBibliography += bibliographyTagEnd;

		// lazy instantiation of diff_match_patch
		if (dmp === null) {
			dmp = new diff_match_patch();
		}

		citationDiffs =
			dmp.diff_main(stripTags(oldFormattedCitation, "span"), stripTags(newFormattedCitation, "span"));
		dmp.diff_cleanupSemantic(citationDiffs);
		diffFormattedCitation = unescape(CSLEDIT_diff.prettyHtml(citationDiffs));

		bibliographyDiffs =
			dmp.diff_main(stripTags(oldFormattedBibliography, "span"), stripTags(newFormattedBibliography, "span"));
		dmp.diff_cleanupSemantic(bibliographyDiffs);
		diffFormattedBibliography = unescape(CSLEDIT_diff.prettyHtml(bibliographyDiffs));

		if (dmp.diff_levenshtein(citationDiffs) === 0 && dmp.diff_levenshtein(bibliographyDiffs) === 0) {
			citationsOut.html(newFormattedCitation);
			bibliographyOut.html(newFormattedBibliography);
			if (typeof callback !== "undefined") {
				callback();
			}
		} else {
			if (CSLEDIT_options.get('showDiffOnChange') === true) {
				// display the diff
				citationsOut.html(diffFormattedCitation);
				bibliographyOut.html(diffFormattedBibliography);

				// display the new version in 1000ms
				clearTimeout(diffTimeout);
				diffTimeout = setTimeout(
					function () {
						citationsOut.html(newFormattedCitation);
						bibliographyOut.html(newFormattedBibliography);
						if (typeof callback !== "undefined") {
							callback();
						}
					},
				1000);
			} else {
				// display the real result
				citationsOut.html(newFormattedCitation);
				bibliographyOut.html(newFormattedBibliography);
				if (typeof callback !== "undefined") {
					callback();
				}
			}
		}

		if ("hangingIndent" in formattedResult) {
			bibliographyOut.find('.bibliography-csl-entry').css({
				"padding-left" : formattedResult.hangingIndent + "em",
				"text-indent" : "-" + formattedResult.hangingIndent + "em"
			});
		} else {
			bibliographyOut.find('.bibliography-csl-entry').css({
				"padding-left" : "0",
				"text-indent" : "0"
			});
		}
		
		debug.timeEnd("runCiteprocAndDisplayOutput");
	};

	// Public members:
	return {
		formatCitations : formatCitations,
		runCiteprocAndDisplayOutput : runCiteprocAndDisplayOutput
	};

});



// The add node dialog
//
// This allows the user to add from a list of possible child nodes
// to add to the currently selected element

define('src/addNodeDialog',
		[	'src/dataInstance',
			'src/uiConfig',
			'src/controller',
			'src/CslNode',
			'src/urlUtils',
			'src/mustache'
		],
		function (
			CSLEDIT_data,
			CSLEDIT_uiConfig,
			CSLEDIT_controller,
			CSLEDIT_CslNode,
			CSLEDIT_urlUtils,
			CSLEDIT_mustache
		) {	

	var show = function () {
		var node = CSLEDIT_data.getNode(CSLEDIT_viewController.selectedNode()),
			translatedCslId,
			translatedNodeInfo,
			translatedParentName,
			possibleElements,
			element,
			possibleElementsExist = false,
			dialogDiv,
			mustacheData = {};

		if (node === null) {
			alert("Please select a node in to create within first");
			return;
		}

		mustacheData.parentDisplayName = CSLEDIT_uiConfig.displayNameFromNode(node);

		// If the user is selecting a macro instance, add a node within
		// the corresponding macro definition
		translatedCslId = CSLEDIT_data.macroDefinitionIdFromInstanceId(node.cslId);
		translatedNodeInfo = CSLEDIT_data.getNodeAndParent(translatedCslId);

		if (translatedNodeInfo.parent === null) {
			translatedParentName = "root";
		} else {
			translatedParentName = translatedNodeInfo.parent.name;
		}

		// populate with possible child elements based on schema
		possibleElements = CSLEDIT_viewController.selectedViewProperty("possibleChildren");
		if (possibleElements === null) {
			possibleElements = {};

			$.each(CSLEDIT_schema.childElements(translatedParentName + "/" + translatedNodeInfo.node.name),
				function (element, quantifier) {
					possibleElements[element] = quantifier;
				}
			);
		}

		// hard-coded constraint for 'choose' node
		// TODO: generalise this to more nodes, using the schema if not too difficult
		if (translatedNodeInfo.node.name === "choose") {
			// better order than schema:
			possibleElements = {
				"if" : "one",
				"else-if" : "zeroOrMore",
				"else" : "optional"
			};

			// only allowed one 'if' and one 'else' node
			$.each(translatedNodeInfo.node.children, function (i, childNode) {
				if (childNode.name === "if" && "if" in possibleElements) {
					delete possibleElements["if"];
				} else if (childNode.name === "else" && "else" in possibleElements) {
					delete possibleElements["else"];
				}
			});

			// if doesn't yet contain 'if' node, only allow adding that
			if ("if" in possibleElements) {
				delete possibleElements["else-if"];
				delete possibleElements["else"];
			}
		}

		mustacheData.childNodes = [];
		$.each(possibleElements, function (element) {
			var documentation,
				nodeData = {
					nodeName: element,
					displayName: CSLEDIT_uiConfig.displayNameFromNode(new CSLEDIT_CslNode(element))
				};

			if (element in CSLEDIT_uiConfig.nodeIcons) {
				nodeData.imageUrl =
					CSLEDIT_urlUtils.getResourceUrl(CSLEDIT_uiConfig.nodeIcons[element]);
			}

			documentation = CSLEDIT_schema.documentation(translatedNodeInfo.node.name + "/" + element);
			if (typeof(documentation) !== "undefined") {
				nodeData.documentation = documentation;
			}
			mustacheData.childNodes.push(nodeData);
			possibleElementsExist = true;
		});

		if (!possibleElementsExist) {
			alert("You can't create nodes within " + CSLEDIT_uiConfig.displayNameFromNode(node) + ".");
			return;
		}

		dialogDiv = $(CSLEDIT_mustache.toHtml('addNodeDialog', mustacheData));
		dialogDiv.find('button.addNodeType').on('click', function (event) {
			var target = $(event.target),
				nodeName = target.attr('data-nodeName'),
				position,
				children = CSLEDIT_data.getNode(CSLEDIT_viewController.selectedNode()).children;

			dialogDiv.dialog('destroy');

			position = "last";

			// override position for certain nodes
			// TODO: generalise
			if (nodeName === 'if' || nodeName === 'sort') {
				position = "first";
			} else if (nodeName === 'else-if' && children[children.length - 1].name === "else") {
				position = children.length - 1;
			} else if (nodeName === 'macro') {
				position = "last";
				// put it before the citation node:
				$.each(children, function (i, child) {
					if (child.name === "citation") {
						position = i;
						return false;
					}
				});
			}

			CSLEDIT_controller.exec("addNode", [
				CSLEDIT_viewController.selectedNode(), position, { name : nodeName, attributes : []}
			]);
		});
		dialogDiv.dialog({
			modal : true,
			width : "650px"
		});
	};

	return {
		show : show
	};
});

/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
define("jquery.hoverIntent", ["jquery"], function(){});



// Creates a Visual CSL Editor

define('src/VisualEditor',
		[	'src/controller',
			'src/ViewController',
			'src/notificationBar',
			'src/SyntaxHighlighter',
			'src/citationEditor',
			'src/Schema',
			'src/schemaOptions',
			'src/CslNode',
			'src/citationEngine',
			'src/options',
			'src/storage',
			'src/dataInstance',
			'src/cslStyles',
			'src/urlUtils',
			'src/addNodeDialog',
			'src/debug',
			'jquery.hoverIntent',
			'jquery.layout'
		],
		function (
			CSLEDIT_controller,
			CSLEDIT_ViewController,
			CSLEDIT_notificationBar,
			CSLEDIT_SyntaxHighlighter,
			CSLEDIT_citationEditor,
			CSLEDIT_Schema,
			CSLEDIT_schemaOptions,
			CSLEDIT_CslNode,
			CSLEDIT_citationEngine,
			CSLEDIT_options,
			CSLEDIT_storage,
			CSLEDIT_data,
			CSLEDIT_cslStyles,
			CSLEDIT_urlUtils,
			CSLEDIT_addNodeDialog,
			debug,
			jquery_hoverIntent,
			jquery_layout
		) {
	// Sets up a Visual Editor within editorElement
	var CSLEDIT_VisualEditor = function (
			editorElement,       // the selector or jQuery element to create the editor within
			configurationOptions // see https://github.com/citation-style-editor/csl-editor/wiki/Visual-Editor
								 // for a full list of options
			) {
		var editTimeout,
			styleURL,
			syntaxHighlighter,
			nodePathView;

		$(document).ready(function () {
			CSLEDIT_options.setOptions(configurationOptions);
			editorElement = $(editorElement);

			$.ajax({
				url: CSLEDIT_urlUtils.getResourceUrl("html/visualEditor.html"),
				success : function (data) {
					editorElement.html(data);
					window.CSLEDIT_schema = new CSLEDIT_Schema(CSLEDIT_schemaOptions);
					CSLEDIT_schema.callWhenReady(init);
				},
				error : function (jaXHR, textStatus, errorThrown) {
					alert("Couldn't fetch page: " + textStatus);
				},
				cache : false
			});
		});

		var createTreeView = function () {
			var nodeIndex = { index : 0 };
			var cslData = CSLEDIT_data.get(); 

			CSLEDIT_viewController.init(cslData,
			{
				formatCitations : formatExampleCitations,
				deleteNode : function () {
					CSLEDIT_controller.exec("deleteNode", [CSLEDIT_viewController.selectedNode()]);
				},
				moveNode : function (move) {
					var temp,
						fromId,
						toId,
						toParentNode,
						index;

					fromId = parseInt(move.o.attr("cslid"), 10);
					toId = parseInt(move.r.attr("cslid"), 10);
					toParentNode = CSLEDIT_data.getNodeAndParent(toId).parent;

					if (move.last_pos !== false) {
						CSLEDIT_controller.exec("moveNode", [fromId, toId, move.last_pos]);
					}
				},
				checkMove : function (fromId, toId, position) {
					var fromNode = CSLEDIT_data.getNode(fromId),
						toNodeInfo = CSLEDIT_data.getNodeAndParent(toId),
						parentNodeName,
						result,
						toCslId;

					if (position === "before" || position === "after") {
						if (toNodeInfo.parent === null) {
							return false;
						}
						// go up a level
						toNodeInfo = CSLEDIT_data.getNodeAndParent(toNodeInfo.parent.cslId);
					}

					// for moving to a macro instance, note that if the move goes ahead,
					// this translation is done in CSLEDIT_data.addNode, so it's fine to
					// give the macro instance id to the addNode controller command
					toCslId = CSLEDIT_data.macroDefinitionIdFromInstanceId(toNodeInfo.node.cslId);
					if (toCslId !== toNodeInfo.node.cslId) {
						toNodeInfo = CSLEDIT_data.getNodeAndParent(toCslId);
					}

					if (toNodeInfo.parent === null) {
						parentNodeName = "root";
					} else {
						parentNodeName = toNodeInfo.parent.name;
					}
					result = (fromNode.name in 
						CSLEDIT_schema.childElements(parentNodeName + "/" + toNodeInfo.node.name));
					return result;
				},
				viewInitialised : function () {
					var loaded = CSLEDIT_options.get("onLoaded");
					if (typeof(loaded) !== "undefined") {
						loaded();
					}
				}
			});
		};

		var formatExampleCitations = function () {
			CSLEDIT_citationEngine.runCiteprocAndDisplayOutput(
				CSLEDIT_data,
				editorElement.find("#statusMessage"),
				editorElement.find("#formattedCitations"), editorElement.find("#formattedBibliography"),
				syntaxHighlighter.setupSyntaxHighlighting);
		};

		var reloadPageWithNewStyle = function (newURL) {
			var reloadURL = window.location.href;
			reloadURL = reloadURL.replace(/#/, "");
			reloadURL = reloadURL.replace(/\?.*$/, "");
			window.location.href = reloadURL + "?styleURL=" + newURL;
		};

		var addMissingNode = function (missingNodePath) {
			var rootPath,
				nodeName,
				rootNode,
				newNode;

			if (typeof(missingNodePath) === "undefined" || missingNodePath === null) {
				return;
			}
			
			rootPath = missingNodePath.replace(/\/[^\/]+$/, "");
			nodeName = missingNodePath.replace(rootPath + "/", "");

			rootNode = CSLEDIT_data.getNodesFromPath(rootPath);
			debug.assert(rootNode.length > 0);
			rootNode = rootNode[0];

			CSLEDIT_controller.exec('addNode', [rootNode.cslId, "last", { name: nodeName } ]);
		};

		var setupTreeEditorToolbar = function () {
			var toolbar = editorElement.find('#treeEditorToolbar'),
				addNodeButton = toolbar.find('a.add'),
				deleteNodeButton = toolbar.find('a.delete');

			debug.assertEqual(addNodeButton.length, 1);
			debug.assertEqual(deleteNodeButton.length, 1);

			addNodeButton.on('click', function (e) {
				if (CSLEDIT_viewController.selectedNode() === -1) {
					addMissingNode(CSLEDIT_viewController.selectedMissingNodePath());
				} else {
					CSLEDIT_addNodeDialog.show();
				}
				e.preventDefault();
			});

			deleteNodeButton.on('click', function (e) {
				if (CSLEDIT_viewController.selectedNode() === -1) {
					alert("No node selected to delete");
				} else {
					CSLEDIT_controller.exec("deleteNode", [CSLEDIT_viewController.selectedNode()]);
				}
				e.preventDefault();
			});
		};

		var setCustomMenuItem = function (element, name, onClick) {
			if (typeof(name) === "undefined" || name === "") {
				element.parent('li').remove();
			} else {
				element.text(name);
				element.click(onClick);
			}
		};

		var setupDropdownMenuHandler = function (selector) {
			var dropdown = $(selector),
				loadCsl;

			// Adds the options from the settings into the Style menu
			var styleMenu = CSLEDIT_options.get('styleMenu');
			var styleMenuUl = editorElement.find('#styleMenuUl');
			console.log(styleMenu);
			$.each(styleMenu, function(index, styleOption) {
				var menuOption = $('<li/>').append($('<a/>')
						.text(styleOption.label));

				if (typeof styleOption.name != 'undefined') {
					menuOption.attr('id',styleOption.name);
				}
				menuOption.click(styleOption.func);
				styleMenuUl.append(menuOption);
			});

			// If menuNewStyle id exists: will create a new style
			editorElement.find('#menuNewStyle').click(function () {
				// fetch the URL
				$.ajax({
					url : CSLEDIT_urlUtils.getResourceUrl("content/newStyle.csl"),
					dataType : "text",
					success : function (cslCode) {
						debug.log("csl code received: " + cslCode);
						CSLEDIT_controller.exec('setCslCode', [cslCode]);
					},
					error : function () {
						throw new Error("Couldn't fetch new style");
					},
					async : false
				});
			});

			editorElement.find('#menuUndo').click(function () {
				if (CSLEDIT_controller.commandHistory.length === 0) {
					alert("No commands to undo");
				} else {
					CSLEDIT_controller.undo();
				}
			});
			
			editorElement.find('#menuRedo').click(function () {
				if (CSLEDIT_controller.undoCommandHistory.length === 0) {
					alert("No commands to redo");
				} else {
					CSLEDIT_controller.redo();
				}
			});
			
			// Creates the Help menu if this menu exists. Populates
			// with links
			var helpLinks = CSLEDIT_options.get('helpLinks');
			if (typeof helpLinks !== 'undefined' && helpLinks.length != 0) {
				var visualEditorMenu = editorElement.find('#visualEditorMenu');

				visualEditorMenu.append($('<li/>').attr('id','helpMenuMain'));
				
				var helpMenuMain = editorElement.find('#helpMenuMain');
				var helpMenuLink = $('<a/>')
					.attr('id','helpMenu')
					.text('Help').
					append($('<span>').
						attr('class','disclosure').
						html('&#9662;'));

				helpMenuMain.append(helpMenuLink);

				helpMenuMain.append($('<ul/>')
						.attr('id','helpMenuUl')
						.attr('class','sub_menu'));

				var helpMenu = editorElement.find('#helpMenuUl');
				$.each(helpLinks, function(index, link) {
					helpMenu.append(($('<li/>').append($('<a/>')
							.attr('href', link.link)
							.attr('target','_blank')
							.text(link.label))));
				});
			}

			editorElement.find('#menuEditCitation1').click(function () {
				CSLEDIT_citationEditor.editCitation(0);
			});
			
			editorElement.find('#menuEditCitation2').click(function () {
				CSLEDIT_citationEditor.editCitation(1);
			});

			editorElement.find('#menuEditCitation3').click(function () {
				CSLEDIT_citationEditor.editCitation(2);
			});
		};

		var init = function () {
			var showingDataChangePrompt = false;

			CSLEDIT_notificationBar.init(editorElement.find('#notificationBar'));

			// set function which gets called if inconsistencies
			// are found between the localStorage data (shared between tabs) and this session
			// data
			CSLEDIT_storage.onDataInconsistency(function () {
				showingDataChangePrompt = true;
				if (confirm("Your style has changed in a different tab.\n" +
						"Do you want to load the new version into this tab?")) {
					// reload page
					window.location.reload();
				} else {
					// use existing data
					CSLEDIT_storage.recreateLocalStorage();
					showingDataChangePrompt = false;
				}
			});

			// check consistency of data on window focus
			// to detect changes in different tabs
			debug.log("window length = " + $(window).length);
			$(window).focus(function () {
				if (!showingDataChangePrompt) {
					CSLEDIT_data.get();
				}
			});

			$(function () {
				editorElement.find("ul.dropdown li").hoverIntent(function () {
					$(this).addClass("hover");
					$('ul:first', this).css('visibility', 'visible');
				}, function () {
					$(this).removeClass("hover");
					$('ul:first', this).css('visibility', 'hidden');
				});
				
				editorElement.find("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");
			});

			CSLEDIT_data.initPageStyle(function () {
				var userOnChangeCallback = CSLEDIT_options.get("onChange"),
					citationEditor1,
					citationEditor2;
				
				syntaxHighlighter = new CSLEDIT_SyntaxHighlighter(
					editorElement.find('#titlebar, #nodePathView, #exampleOutput'),
					editorElement.find('#treeEditor')
				);

				// TODO: refactor - remove this global
				window.CSLEDIT_viewController = new CSLEDIT_ViewController(
					editorElement.find("#treeEditor"),
					editorElement.find("#titlebar"),
					editorElement.find("#elementProperties"),
					editorElement.find("#nodePathView"),
					syntaxHighlighter);

				CSLEDIT_data.addViewController(CSLEDIT_viewController);

				if (typeof userOnChangeCallback === "function") {
					CSLEDIT_data.addViewController({
						styleChanged : function (command) {
							if (command === "updateFinished") {
								userOnChangeCallback();
							}
						}
					});
				}

				createTreeView();
			});

			setupTreeEditorToolbar();
			setupDropdownMenuHandler(".dropdown a");

			editorElement.find('#mainContainer').layout({
				closable : false,
				resizable : true,
				livePaneResizing : true,
				west__size : CSLEDIT_storage.getItem("CSLEDIT_geometry.leftPaneWidth") || 240,
				west__minSize : 200,
				onresize : function (paneName, paneElement, paneState) {
					if (paneState.edge === "west") {
						CSLEDIT_storage.setItem("CSLEDIT_geometry.leftPaneWidth", paneState.size);
					}
				}
			});

			// workaround for apparent bug where jquery.layout sets overflow to auto
			// TODO: investigate why
			editorElement.find('#mainContainer').css("overflow", "hidden");

			editorElement.find("#rightSplitterLayout").layout({
				closable : false,
				resizable : true,
				livePaneResizing : true,
				north__size : CSLEDIT_storage.getItem("CSLEDIT_geometry.topPaneWidth") || 300,
				onresize : function (paneName, paneElement, paneState) {
					if (paneState.edge === "north") {
						CSLEDIT_storage.setItem("CSLEDIT_geometry.topPaneWidth", paneState.size);
					}
				}
			});
			// undo layout setting a fixed width
			editorElement.find('#bottomRightContainer').css('width', '');
		};

		// Called when saving a style. It Checks that the style conforms to repository
		// conventions and prompts the user to change it if it doesn't
		//
		// Returns true to continue saving, false to cancel
		var conformStyleToRepoConventions = function () {
			var generatedStyleId,
				links,
				selfLinkNode,
				selfLink,
				styleName = getStyleName(),
				cancel = false;

			// check that the styleId and rel self link matches the schema conventions
			generatedStyleId = CSLEDIT_cslStyles.generateStyleId(getStyleName());
			links = CSLEDIT_data.getNodesFromPath("style/info/link");
			$.each(links, function (i, link) {
				link = new CSLEDIT_CslNode(link);

				if (link.getAttr("rel") === "self") {
					selfLinkNode = link;
					selfLink = link.getAttr("href");
				}
			});

			debug.log("generatedStyleId = " + generatedStyleId);
			$.each(CSLEDIT_cslStyles.styles().styleTitleFromId, function (id, name) {
				if (id === generatedStyleId || name === styleName) {
					if (!confirm('The style title matches one that already exists.\n\n' +
							'You should change it to avoid problems using this style ' +
							'in your reference manager.\n\n' +
							'Do you want to save anyway?')) {
						cancel = true;
						return false;
					}
				}
			});

			if (cancel) {
				return false;
			}

			if (selfLink !== generatedStyleId || getStyleId() !== generatedStyleId) {
				if (confirm('Change style ID and "self" link to the following?\n\n' +
						generatedStyleId + "\n\n(the CSL styles repository convention)")) {
					setStyleId(generatedStyleId);
					if (typeof(selfLinkNode) !== "undefined") {
						selfLinkNode.setAttr("href", generatedStyleId);
						CSLEDIT_controller.exec("amendNode", [selfLinkNode.cslId, selfLinkNode]);
					} else {
						CSLEDIT_controller.exec("addNode", [CSLEDIT_data.getNodesFromPath("style/info")[0].cslId, "last",
							new CSLEDIT_CslNode("link", [
								{key: "rel", value: "self", enabled: true},
								{key: "href", value: generatedStyleId, enabled: true}
							])]);
					}
				}
			}
			return true;
		};

		// Sets a new CSL style from the given cslCode string
		var setCslCode = function (cslCode) {
			return CSLEDIT_controller.exec('setCslCode', [cslCode]);
		};
	
		// Returns the current CSL style code as a string
		var getCslCode = function () {
			return CSLEDIT_data.getCslCode();
		};

		// Returns the current style name
		var getStyleName = function () {
			var styleNameNode = CSLEDIT_data.getNodesFromPath('style/info/title')[0];
			return styleNameNode.textValue;
		};

		// Returns the current style ID
		var getStyleId = function () {
			var styleIdNode = CSLEDIT_data.getNodesFromPath('style/info/id')[0];
			return styleIdNode.textValue;
		};
		
		// Sets the ID for the current style
		var setStyleId = function (styleId) {
			var styleIdNode = CSLEDIT_data.getNodesFromPath('style/info/id')[0];
			styleIdNode.textValue = styleId;
			CSLEDIT_controller.exec('amendNode', [styleIdNode.cslId, styleIdNode]);
		};

		// Public API
		//
		// Note: these are currently more of a set of convenience functions than a complete API
		//
		// There is nothing stopping you using the 'proper' internal API and this is the recommended
		// method at the moment.
		//
		// See https://github.com/citation-style-editor/csl-editor/wiki/Visual-Editor for some
		// examples
		return {
			setCslCode : setCslCode,
			getCslCode : getCslCode,
			getStyleName : getStyleName,
			getStyleId : getStyleId,
			setStyleId : setStyleId,
			conformStyleToRepoConventions : conformStyleToRepoConventions
		};
	};

	return CSLEDIT_VisualEditor;
});

