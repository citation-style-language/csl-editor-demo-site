"use strict";

define(
		[
			'src/VisualEditor',
			'src/urlUtils',
			'src/storage',
			'src/dataInstance',
			'src/debug',
			'../src/errorHandler',
			'../external/downloadify/swfobject',
			'../external/downloadify/downloadify.min',
			'jquery.ui'
		],
		function (
			CSLEDIT_VisualEditor,
			CSLEDIT_urlUtils,
			CSLEDIT_storage,
			CSLEDIT_data,
			debug,
			errorHandler
		) {

	var cslEditor;

	// Use FileAPI to read files from local file system
	var loadCSL = function () {
		var dialog = $('<div title="Load CSL Style">' + 
				'<p>Choose a CSL file to load<\/p>' +
				'<input type="file" \/>' +
				'<\/div>');
		dialog.find('input[type=file]').change(function (event) {
			var file = event.target.files[0],
				reader = new FileReader();
			reader.onload = function (event) {
				cslEditor.setCslCode(event.target.result);
				dialog.dialog("destroy");
			};
			reader.readAsText(file);
		});

		dialog.dialog({modal : true});
	};

	// Use Flash based downloadify plugin to save files to local file system
	var saveCSL = function (cslCode) {
		var dialog = $('<div title="Save CSL Style">' + 
				'<div id="downloadify" style="padding-left: 300px"></div>' +
				'<div id="installFlash" style="padding-left:50px"></div>' +
				'<div id="refManagerInstructions"><\/div>' +
				'<\/div>'),
			saveButton = dialog.find('#downloadify'),
			filename,
			styleId = cslEditor.getStyleId();
		
		dialog.find('#refManagerInstructions').load("../html/fileDialog.html", function () {

			if (!cslEditor.conformStyleToRepoConventions()) {
				return;
			}

			filename = cslEditor.getStyleId().replace(/.*\//g, "").replace(/[\\\/:"*?<>| ]+/g, "-") + '.csl';

			// add comment to start
			cslCode = CSLEDIT_data.getCslCode("This style was edited with the Visual CSL Editor (" +
				window.location.href + ")");

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
							alert('Your CSL Style Has Been Saved!');
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
		});
	};

	var loadStyleFromUrl = function () {
		var styleURL = prompt("Please enter the URL of the style you want to load"),
			cslCode;

		if (typeof(styleURL) === "string" && styleURL !== "") {
			// fetch the URL
			$.ajax({
				url : CSLEDIT_urlUtils.getResourceUrl('../getFromOtherWebsite.php', {url : encodeURIComponent(styleURL)}),
				dataType : "text",
				success : function (newStyle) {
					cslCode = newStyle;
				},
				error : function () {
					debug.log("ajax error: style not loaded");
				},
				async : false
			});
		}

		return cslCode;
	};

	var initVisualEditorDemo = function () {
		$(document).ready(function () {
			cslEditor = new CSLEDIT_VisualEditor('#visualEditorContainer',	
				{
					loadCSLName : "Load Style",
					loadCSLFunc : loadCSL,

					saveCSLName : 'Save Style',
					saveCSLFunc : saveCSL,

					loadStyleFromUrlName : "Load Style From URL",
					loadStyleFromUrlFunc : loadStyleFromUrl
				});
		});
	};

	initVisualEditorDemo();

	return {
		cslEditor : cslEditor
	};
});
