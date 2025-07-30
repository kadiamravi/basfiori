sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "com/test/ravifirstsapui5/model/formatter",
  "sap/m/MessageBox"
], (Controller,formatter,MessageBox) => {
  "use strict";

  return Controller.extend("com.test.ravifirstsapui5.controller.empdetview", {
    onInit() {
      this.getView().setModel(this.getOwnerComponent().getModel("YY1_TESTINGDATA_CDS"), "YY1_TESTINGDATA_CDS");
      this.getOwnerComponent().getRouter().getRoute("Routeempdetview")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      var sUUID = oEvent.getParameter("arguments").key;
      var oModel = this.getView().getModel("YY1_TESTINGDATA_CDS");
      this.getView().byId("Idpanel").removeAllContent();
      this.getView().unbindElement(); 
      
      if (sUUID ==="newemp"){
        this.mode ="create"
        this.handlebutton(this.mode);
        }
      
      else {
        this.mode ="display"
        
        this.getView().bindElement({
          path: "/YY1_TESTINGDATA(SAP_UUID=guid'" + sUUID + "')",
          model: "YY1_TESTINGDATA_CDS",
          parameters: {
            expand: "to_projectdetails"
          }

        });
        this.handlebutton(this.mode);
        
      }
      
      this.ldCF(this.mode);
      
    },

    ldCF: function (sUUID) {
      this.getView().byId("Idpanel").removeAllContent();
      if (sUUID === "create") {
        if (!this._oCreateFragment) {
          this._oCreateFragment = sap.ui.xmlfragment(this.getView().getId(), "com.test.ravifirstsapui5.view.empcreate", this);
          
        }
        this.getView().byId("Idpanel").addContent(this._oCreateFragment);

      }  else if (sUUID ==="edit"){
        if (!this._oEditFragment) {
          
          this._oEditFragment = sap.ui.xmlfragment(this.getView().getId(), "com.test.ravifirstsapui5.view.empedit", this);
          
        }
        
        this.getView().byId("Idpanel").addContent(this._oEditFragment);

      }else if (sUUID === "display"){
       
        if (!this._oDisplayFragment) {
          this._oDisplayFragment = sap.ui.xmlfragment(this.getView().getId(), "com.test.ravifirstsapui5.view.empdisplay", this);
          
        }
        this.getView().byId("Idpanel").addContent(this._oDisplayFragment);
      
      }
    },
    handlebutton : function(mode){
      this.getView().byId("Bidedit").setVisible(false);
      this.getView().byId("Biddelete").setVisible(false);
      this.getView().byId("Biddisplay").setVisible(false);
      this.getView().byId("Bidsave").setVisible(false);
      this.getView().byId("Bidcancel").setVisible(false);

      if (mode ==="create"){
       this.getView().byId("Bidsave").setVisible(true);
      this.getView().byId("Bidcancel").setVisible(true);


      }
      else if (mode ==="display"){
        this.getView().byId("Bidedit").setVisible(true);
        this.getView().byId("Biddelete").setVisible(true);
      }else if (mode ==="edit"){
        this.getView().byId("Bidedit").setVisible(false);
        this.getView().byId("Biddelete").setVisible(false);
        this.getView().byId("Bidsave").setVisible(true);
        this.getView().byId("Bidcancel").setVisible(true);  
      }

    },
    Onsavebutton : function(){
     if (this.mode === "create") {
      var empid = this.getView().byId("Idempid1").getValue();
      var empname = this.getView().byId("Idempname").getValue();
      var designation = this.getView().byId("Iddesignation").getValue();
      var salary = this.getView().byId("Idsalary").getValue();
      var doj = this.getView().byId("Iddojcre").getValue();
      doj = formatter.Dateformattercreate(doj);

      var data = {
        Empid : empid,
        EmpName : empname,
        Designation :  designation,
        Salary : salary,
        DOJ : doj
      };
      var oModel1 = this.getOwnerComponent().getModel();
      oModel1.create("/YY1_TESTINGDATA", data , {
        success : function(req, res){
          MessageBox.success("Employee created sucessfully");
        },
        error : function(oerror){
          MessageBox.error(JSON.parse(oerror.responseText).error.message.value);
        }
      });
    } else if (this.mode ==="edit"){
      var empid = this.getView().byId("Idempidedit").getValue();
      var empname = this.getView().byId("Idempnameedit").getValue();
      var designation = this.getView().byId("Iddesignationedit").getValue();
      var salary = this.getView().byId("Idsalaryedit").getValue();
      var doj = this.getView().byId("Iddojedit").getValue();
      doj = formatter.Dateformattercreate(doj);
      var sUUID = this.getView().byId("Idssuidedit").getText();

      var data = {
        Empid : empid,
        EmpName : empname,
        Designation :  designation,
        Salary : salary,
        DOJ : doj
      };
      var oModel1 = this.getOwnerComponent().getModel();
     
      oModel1.update( "/YY1_TESTINGDATA(SAP_UUID=guid'" + sUUID + "')", data , {
        success : function(res){
          MessageBox.success("Employee updated sucessfully");
        },
        error : function(oerror){
          MessageBox.error(JSON.parse(oerror.responseText).error.message.value);
        }
      });

    } 
    },
    Onpressedit : function(){
      this.mode = "edit";
      this.handlebutton(this.mode);
      this.ldCF(this.mode);
    },
    onNavBack :function(){
      history.go(-1);
  },

  });
});
