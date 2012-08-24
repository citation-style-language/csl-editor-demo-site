define(
		[	'src/controller',
			'src/urlUtils',
			'src/cslStyles'
		],
		function (
			CSLEDIT_controller,
			CSLEDIT_urlUtils,
			CSLEDIT_cslStyles
		) {
	var editStyle = function (zoteroUrl, visualEditorUrl) {
		var baseUrl = "external/csl-styles/";
		if (CSLEDIT_cslStyles.styles().masterIdFromId[zoteroUrl] !== zoteroUrl) {
			baseUrl += "dependent/";
		}

		var url = CSLEDIT_urlUtils.getResourceUrl(
			zoteroUrl.replace(/http:\/\/www.zotero.org\/styles\//, baseUrl) + ".csl");

		$.ajax({
			url: url,
			success: function (cslCode) {
				var result = CSLEDIT_controller.exec("setCslCode", [cslCode], true);
				if (!("error" in result)) {
					window.location.href = visualEditorUrl;
				}
			},
			error: function () {
				alert("Couldn't fetch style: " + url);
			},
			dataType: "text"
		});
	};

	return {
		editStyle : editStyle
	};
});
