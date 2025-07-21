sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.test.ravifirstsapui5.controller.simpleform", {
        onInit() {
        },
        clickb1: function () {
          var empid = this.getView().byId("idEmpid").getValue();
          if(empid === ""){
            this.getView().byId("idEmpid").setValueState("Error");
            this.getView().byId("idEmpid").setValueStateText("Filed is mandetory");
          }
          else{
            this.getView().byId("idEmpid").setValueState("None");
            //var regexp =/^[a-zA-Z]+$/; for alphbet
            //var regexp =/^[0-9]+$/; for number
            var regexp =/^[a-zA-Z0-9]+$/;
            if(!empid.match(regexp)){
                this.getView().byId("idEmpid").setValueState("Error");
                this.getView().byId("idEmpid").setValueStateText("Valueshould be alphabet"); 
            }

          }

        //   if(empid.length !==10){
        //     this.getView().byId("idEmpid").setValueState("Error");
        //     this.getView().byId("idEmpid").setValueStateText("length should be 10");

        //   }
          
        }
        // onSubmit: function (){
        //     var name = this.getView().byId("idIpName").getValue();
        //     var msg = name + " first screen";
        //     // alert(msg);
        //     this.getView().byId("idTextFirst").setText(msg);
        //     this.getView().byId("idBtnsubmit").setType("Reject");
        //     this.getView().byId("idTextFirst").setTextAlign("Left");
        //     this.getView().byId("idLb1").setRequired(false);
        //     this.getView().byId("idIpName").setEnabled(false);
        // }
    });
});