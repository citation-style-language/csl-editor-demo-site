"use strict";

define(
		[	'src/SearchByName',
			'src/urlUtils',
			'../src/styleUtils',
			'../src/errorHandler'
		],
		function (
			CSLEDIT_SearchByName,
			CSLEDIT_urlUtils,
			styleUtils,
			errorHandler
		) {
	$(document).ready(function () {
		var styleQuery = CSLEDIT_urlUtils.getUrlVar('style');

		if ("replaceState" in window.history) {
			window.history.replaceState({}, document.title,
				CSLEDIT_urlUtils.removeQueryParam(window.location.href, 'style'));
		}

		var searchByName = new CSLEDIT_SearchByName($('#mainContainer'), {
			editStyle_func : function (styleId) {
				styleUtils.editStyle(styleId, "../visualEditor");
			},
			viewCode_func : function (styleId) {
				styleUtils.viewCode(styleId);
			},
			installStyle_func : styleUtils.installStyle,
			initialSearchQuery : styleQuery,
			styleInfoURL : "../styleInfo/"
		});
	});
});
