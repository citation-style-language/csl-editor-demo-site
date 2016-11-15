

// Functions to handle CSL styles which don't belong in cslEditorLib

define(
		[	'src/controller',
			'src/urlUtils',
			'src/cslStyles',
			'src/options',
			'src/debug',
			'../external/FileSaver.1.3.3.min',
			'jquery.ui'
		],
		function (
			CSLEDIT_controller,
			CSLEDIT_urlUtils,
			CSLEDIT_cslStyles,
			CSLEDIT_options,
			debug
		) {

	// Event handler for an 'Edit Style' action
	// e.g. when user clicks on an "Edit Style" button
	var editStyle = function (styleId, visualEditorUrl) {
		var styleURL = CSLEDIT_cslStyles.localURLFromZoteroId(styleId);
		CSLEDIT_cslStyles.fetchCslCode(
			styleURL,
			function (cslCode) {
				var result = CSLEDIT_controller.exec("setCslCode", [cslCode], true);
				if (!("error" in result)) {
					window.location.href = visualEditorUrl;
				}
			},
			function () {
				alert("Couldn't fetch style: " + styleURL);
			}
		);
	};

	// Event handler for a 'View Code' action
	// e.g. when user clicks on a "View Code" button
	var viewCode = function (styleId) {
		var styleInfoURL = CSLEDIT_options.get('styleInfoURL');
		if (typeof(styleInfoURL) === "undefined") {
			var styleURL = CSLEDIT_cslStyles.localURLFromZoteroId(styleId);
			window.location.href = styleURL;
		} else {
			window.location.href = styleInfoURL + "?styleId=" + encodeURIComponent(styleId);
		}
	};

	// Event handler for a 'Install Style' action
	// e.g. when user clicks on an "Install Style" button
	var installStyle = function (styleId) {
		CSLEDIT_cslStyles.fetchCslCode(
			styleId,
			function (cslCode) {
				saveCsl(cslCode, styleId);
			},
			function () {
				alert("Couldn't fetch style: " + styleId);
			}
		);
	};
	
	// Uses the FileSaver.js library for style downloads
	// @comment - optional, if comment is included @cslCodeOrData
	//            must be a CSLEDIT_Data instance
	var saveCsl = function (cslCodeOrData, styleId, comment) {
		var dialog = $('<div title="Save CSL Style">' +
				'<div id="download" style="padding-left: 300px"></div>' +
				'<div id="refManagerInstructions"></div>' +
				'</div>'),
			saveButton = dialog.find('#download'),
			filename,
			cslCode;
	
		$.ajax({
			url: CSLEDIT_urlUtils.getResourceUrl("../html/fileDialog.html"),
			success : function (data) {
				dialog.find('#refManagerInstructions').html(data);

				filename = styleId.replace(/.*\//g, "").replace(/[\\\/:"*?<>| ]+/g, "-") + '.csl';

				if (typeof(comment) !== "undefined") {
					// add comment to start
					cslCode = cslCodeOrData.getCslCode("This style was edited with the Visual CSL Editor (" +
						window.location.href + ")");
				} else {
					debug.assertEqual(typeof(cslCodeOrData), "string");
					cslCode = cslCodeOrData;
				}

				dialog.dialog({
					minWidth : 750,
					minHeight : 450,
					modal : true,
					open :  function () {
						dialog.find('#accordion').accordion({});
						saveButton.find('a').css({
							color : "blue",
							"text-decoration" : "underline"
						});

						saveButton.children().remove();
						
						saveButton.html('<button id="download-button">Download Style</button>');
						document.getElementById("download-button").addEventListener("click", function(){
							var blob = new Blob([cslCode], {
								type: "text/plain;charset=utf-8"
							});
							saveAs(blob, filename);
						});
					}
				});
			},
			error : function (jaXHR, textStatus, errorThrown) {
				alert("Couldn't fetch page: " + textStatus);
			}
		});	
	};

	return {
		editStyle : editStyle,
		installStyle : installStyle,
		viewCode : viewCode,
		saveCsl : saveCsl
	};
});
