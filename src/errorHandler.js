"use strict";

// On any error:
//
// 1. Show an error dialog
// 2. Log error on the server

define(
		[	'src/storage',
			'src/debug',
			'jquery.ui'
		],
		function (
			CSLEDIT_storage,
			debug,
			jquery_ui
		) {

	$(document).ready(function () {
		window.onerror = function (err, url, line) {
			var dialog = $('<div title="An Error Occurred"></div>').css({overflow: "auto"}),
				errLines = err.split("\n"),
				refreshPage = $('<button>Refresh Page</button>'),
				resetButton = $('<button>Reset Everything</button>');

			$.ajax({
				url : "../logError.php",
				type : "POST",
				data : {
					message : err + "\nBrowser: " + JSON.stringify($.browser) +
						"\nUrl: " + url + "\nLine: " + line
				},
				success : function (data) {
					debug.log("Logged error: " + data);
				},
				error : function () {
					debug.log("Failed to log error");
				}
			});


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
