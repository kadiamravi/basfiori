sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("com.test.ravifirstsapui5.controller.empdetview", {
    onInit() {
      this.getView().setModel(this.getOwnerComponent().getModel("YY1_TESTINGDATA_CDS"), "YY1_TESTINGDATA_CDS");
      this.getOwnerComponent().getRouter().getRoute("Routeempdetview")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      var sUUID = oEvent.getParameter("arguments").key;
      if (sUUID ==="newemp"){
        this.mode ="create"
        this.getView().unbindElement();
        this.getView().bindElement({
          path: "/YY1_TESTINGDATA(SAP_UUID=guid'" + sUUID + "')",
          model: "YY1_TESTINGDATA_CDS"
        });

      }
      else {
        this.mode ="display"
        this.getView().bindElement({
          path: "/YY1_TESTINGDATA(SAP_UUID=guid'" + sUUID + "')",
          model: "YY1_TESTINGDATA_CDS"
        });
  
      }
      var fragment = this.ldCF(sUUID);

      var oPanel = this.getView().byId("Idpanel");
      oPanel.removeAllContent(); // Clean previous content if any
      oPanel.addContent(fragment);
   
      
        
      
    },

    ldCF: function (sUUID) {
      if (sUUID === "newemp") {
       
        if (!this._oEditFragment) {
          
          this._oEditFragment = sap.ui.xmlfragment(this.getView().getId(), "com.test.ravifirstsapui5.view.empedit", this);
          this.getView().addDependent(this._oEditFragment);
        }
        return this._oEditFragment;
      } else {
       
        if (!this._oDisplayFragment) {
          this._oDisplayFragment = sap.ui.xmlfragment(this.getView().getId(), "com.test.ravifirstsapui5.view.empdisplay", this);
          this.getView().addDependent(this._oDisplayFragment);
        }
        return this._oDisplayFragment;
      }
    }

  });
});
