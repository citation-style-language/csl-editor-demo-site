"use strict";

define(
		[	'src/urlUtils',
			'src/cslStyles',
			'src/StyleInfo',
			'../src/styleUtils'
		],
		function (
			CSLEDIT_urlUtils,
			CSLEDIT_cslStyles,
			CSLEDIT_StyleInfo,
			styleUtils
		) {
	var styleInfo = new CSLEDIT_StyleInfo(
		$('#styleInfoContainer'),
		CSLEDIT_urlUtils.getUrlVar("styleId"),
		{
			editStyle_func : function (styleId) {
				styleUtils.editStyle(styleId, "../visualEditor");
			},
			installStyle_func : styleUtils.installStyle
		}
	);
});
