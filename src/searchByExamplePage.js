define(
		[	'src/SearchByExample',
			'../src/styleUtils',
			'../src/errorHandler'
		],
		function (
			CSLEDIT_SearchByExample,
			styleUtils,
			errorHandler
		) {
	$(document).ready(function () {
		var searchByExample = new CSLEDIT_SearchByExample($('#mainContainer'), {
			editStyle_func : function (styleURL) {
				styleUtils.editStyle(styleURL, "../visualEditor");
			}
		});
	});
});
