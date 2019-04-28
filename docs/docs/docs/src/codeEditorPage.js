"use strict";

// Sets up the codeEditor/ page

define(
		[	'src/CodeEditor',
			'../src/errorHandler'
		],
		function (
			CSLEDIT_CodeEditor,
			errorHandler
		) {
	$(document).ready(function () {
		var codeEditor = new CSLEDIT_CodeEditor('#codeEditorContainer', {});
	});
});
