"use strict";

// Show an error dialog on any error
//
// # Error logging
//
// If you want to add error logging, you may find the following link useful:
// 
// https://github.com/citation-style-editor/csl-editor-demo-site/commit/b77e0b7667ee3dc494b8934c3239643446f882e8
//
// This commit removed the PHP error logging which was used before migrating
// to a static Jekyll site.

define(
		[	'src/storage',
			'src/urlUtils',
			'src/debug',
			'jquery.ui'
		],
		function (
			CSLEDIT_storage,
			CSLEDIT_urlUtils,
			debug,
			jquery_ui
		) {

	$(document).ready(function () {
		window.onerror = function (err, url, line) {
			var dialog = $('<div title="An Error Occurred"></div>').css({overflow: "auto"}),
				errLines = err.split("\n"),
				refreshPage = $('<button>Refresh Page</button>'),
				resetButton = $('<button>Reset Everything</button>');

			if (
					!($.browser.chrome === true && $.browser.version.split(".")[0] >= 21) &&
					!($.browser.mozilla === true && $.browser.version.split(".")[0] >= 14)) {
				dialog.append($('<p>Please upgrade to the <strong>latest</strong> version of ' + 
					'<a href="http://www.google.com/chrome">Chrome</a> or ' + 
					'<a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> to ' +
					'reduce the likelihood of errors.</p>'));
			}

			dialog.append($('<p/>').append(refreshPage).append(" try this first"));
			refreshPage.on("click", function () {
				window.location.reload();
			});

			dialog.append($('<p/>').append(resetButton).append(" unsaved work will be lost"));
			resetButton.on("click", function () {
				CSLEDIT_storage.clear();
				window.location.reload();
			});

			dialog.append("<h3>" + errLines[0] + "</h3>");

			errLines.splice(0, 1);
			if (errLines.length > 0) {
				dialog.append("<pre>" + errLines.join("\n") + "</pre>");
			} else {
				dialog.append("<p>url: " + url + "</p>");
				dialog.append("<p>line: " + line + "</p>");
			}

			dialog.dialog({
				width: 650,
				height: 400
			});
		};
	});
});
