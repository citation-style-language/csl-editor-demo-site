"use strict";

define([],function () {
	$(document).ready(function () {
		var queryInput = $('#styleNameQuery');
		queryInput.keypress(function (e) {
			if (e.which === 13 /* ENTER */) {
				window.location.href = "../searchByName/?style=" + queryInput.val();
				e.preventDefault();
			}
		});
	});
});
