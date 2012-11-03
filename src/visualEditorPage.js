"use strict";

define(
		[	'src/VisualEditor',
			'src/urlUtils',
			'src/storage',
			'src/dataInstance',
			'src/debug',
			'../src/styleUtils',
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
			styleUtils,
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

	var initVisualEditorDemo = function () {
		$(document).ready(function () {
			var styleMenuConfiguration = [];
			styleMenuConfiguration[0] = {
				'label' : 'New Style',
				'name' : 'menuNewStyle',
				'func' : undefined
				};
			styleMenuConfiguration[1] = {
				'label' : 'Load Style',
				'func' : loadCSL
				};
			styleMenuConfiguration[2] = {
				'label' : 'Save Style',
				'func' : function() {
					if (!cslEditor.conformStyleToRepoConventions()) {
						return;
					}
					styleUtils.saveCsl(
						CSLEDIT_data,
						cslEditor.getStyleId(),
						"This style was edited with the Visual CSL Editor (" + window.location.href + ")"
						);
					}
				}

			cslEditor = new CSLEDIT_VisualEditor('#visualEditorContainer',	
				{
					styleMenu : styleMenuConfiguration
				});
			});
	};

	initVisualEditorDemo();

	return {
		cslEditor : cslEditor
	};
});
