

// Functions to handle CSL styles which don't belong in cslEditorLib

define(
		[	'src/controller',
			'src/urlUtils',
			'src/cslStyles',
			'src/options',
			'src/debug',
			'../external/downloadify/swfobject',
			'../external/downloadify/downloadify.min',
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
	
	// Uses the Flash based downloadify library to save files to the local file system
	var saveCsl = function (
			cslCodeOrData,
			styleId,
			comment // optional, if comment is included cslCodeOrData
			        // must be a CSLEDIT_Data instance
			) {
		var dialog = $('<div title="Save CSL Style">' +
				'<div id="downloadify" style="padding-left: 300px"></div>' +
				'<div id="installFlash" style="padding-left:50px"></div>' +
				'<div id="refManagerInstructions"><\/div>' +
				'<\/div>'),
			saveButton = dialog.find('#downloadify'),
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

						saveButton.downloadify({
							swf : '../external/downloadify/downloadify.swf',
							downloadImage : '../external/downloadify/download.png',
							width : 100,
							height : 30,
							filename : filename,
							data : cslCode,
							transparent : true,
							onComplete: function () {
								alert('Your CSL Style Has Been Saved');
								dialog.dialog('destroy');
							},
							onCancel: function () { },
							onError: function () { alert('Error saving file.'); }
						});

						// if it failed, show instructions to install flash player
						if (saveButton.find('object').length === 0) {
							dialog.find('#refManagerInstructions').css({display: "none"});
							dialog.find('#installFlash').html(
								'<h2>Flash Player not found</h2><br/>' + 
								'<h3>To save to disk, you need to:' +
								'<ul>' +
								'<li><a href="http://get.adobe.com/flashplayer/">Install Adobe Flash Player</a></li>' +
								'<li>Reload this page and try again</li>' + 
								'</ul></h3>');
						} else {
							dialog.find('#refManagerInstructions').css({display: "block"});
							dialog.find('#installFlash').html('');
						}
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
