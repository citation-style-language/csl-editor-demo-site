"use strict";

define(['src/SearchByName', '../src/styleUtils'], function (CSLEDIT_SearchByName, styleUtils) {
	$(document).ready(function () {
		var searchByName = new CSLEDIT_SearchByName($('#mainContainer'), {
			editStyle_func : function (styleURL) {
				styleUtils.editStyle(styleURL, "../visualEditor");
			}
		});
	});
});
