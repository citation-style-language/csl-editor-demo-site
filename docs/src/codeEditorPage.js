"use strict";

// Sets up the codeEditor/ page

define(
		[	'src/CodeEditor',
			'src/dataInstance',
			'../src/styleUtils',
			'../src/errorHandler',
			'jquery.ui'
		],
		function (
			CSLEDIT_CodeEditor,
			CSLEDIT_data,
			styleUtils,
			errorHandler
		) {
	var codeEditor;

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
				codeEditor.setCslCode(event.target.result);
			};
			reader.readAsText(file);
			dialog.dialog("destroy");
		});

		dialog.dialog({modal : true});
	};

	$(document).ready(function () {
		var styleMenuConfiguration = [];
		styleMenuConfiguration[0] = {
			'label' : 'New Style',
			'name' : 'menuNewStyle',
			'func' : function () {
				$.ajax({
					url : "../cslEditorLib/content/newStyle.csl",
					dataType : "text",
					success : function (cslCode) {
						codeEditor.setCslCode(cslCode);
					},
					error : function () {
						alert("Couldn't fetch new style template");
					}
				});
			}
		};
		styleMenuConfiguration[1] = {
			'label' : 'Load Style',
			'func' : loadCSL
		};
		styleMenuConfiguration[2] = {
			'label' : 'Save Style',
			'func' : function () {
				styleUtils.saveCsl(
					CSLEDIT_data,
					codeEditor.getStyleId(),
					"This style was edited with the CSL Code Editor (" + window.location.href + ")"
				);
			}
		};

		codeEditor = new CSLEDIT_CodeEditor('#codeEditorContainer', {
			styleMenu : styleMenuConfiguration
		});
	});
});
