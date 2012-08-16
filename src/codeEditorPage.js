define(['src/CodeEditor', 'jquery'], function (CSLEDIT_CodeEditor) {
	$(document).ready(function () {
		var codeEditor = new CSLEDIT_CodeEditor('#codeEditorContainer', {});
	});
});
