define(
		[	
			'src/controller',
			'src/urlUtils',
		],
		function (
			CSLEDIT_controller,
			CSLEDIT_urlUtils
		) {
	var editStyle = function (zoteroUrl, visualEditorUrl) {
		zoteroUrl = CSLEDIT_urlUtils.getResourceUrl(
			zoteroUrl.replace(/http:\/\/www.zotero.org\/styles\//, "external/csl-styles/") + ".csl");
		
		$.get(zoteroUrl, function (cslCode) {
			CSLEDIT_controller.exec("setCslCode", [cslCode]);
			window.location.href = visualEditorUrl;
		}, "text");
	};

	return {
		editStyle : editStyle
	};
});
