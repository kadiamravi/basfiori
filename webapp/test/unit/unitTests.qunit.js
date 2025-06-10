/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/test/ravifirstsapui5/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
