sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.test.ravifirstsapui5.controller.myfirstview1", {
        onInit() {
        },
        clickb1: function () {
          this.getOwnerComponent().getRouter().navTo("Routemysecondview1");
        },
        onSubmit: function (){
            var name = this.getView().byId("idIpName").getValue();
            var msg = name + " first screen";
            // alert(msg);
            this.getView().byId("idTextFirst").setText(msg);
            this.getView().byId("idBtnsubmit").setType("Reject");
            this.getView().byId("idTextFirst").setTextAlign("Left");
            this.getView().byId("idLb1").setRequired(false);
            this.getView().byId("idIpName").setEnabled(false);
        }
    });
});