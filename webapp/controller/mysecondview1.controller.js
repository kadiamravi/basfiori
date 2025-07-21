sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
    return Controller.extend("com.test.ravifirstsapui5.controller.mysecondview1", {
        onInit() {
        },
        clickb2: function () {
          history.go(-1);
        }
    });
});