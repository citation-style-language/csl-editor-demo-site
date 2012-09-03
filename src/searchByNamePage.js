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

		if ("pushState" in window.history) {
			window.history.pushState({}, document.title,
				CSLEDIT_urlUtils.removeQueryParam(window.location.href, 'style'));
		}

		var searchByName = new CSLEDIT_SearchByName($('#mainContainer'), {
			editStyle_func : function (styleURL) {
				styleUtils.editStyle(styleURL, "../visualEditor");
			},
			initialSearchQuery : styleQuery
		});
	});
});
