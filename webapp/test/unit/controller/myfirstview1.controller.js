/*global QUnit*/

sap.ui.define([
	"com/test/ravifirstsapui5/controller/myfirstview1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("myfirstview1 Controller");

	QUnit.test("I should test the myfirstview1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
