sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/test/ravifirstsapui5/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/export/Spreadsheet",
    "sap/ui/model/Sorter"
], (Controller, formatter, Filter, Spreadsheet, Sorter) => {
    "use strict";

    return Controller.extend("com.test.ravifirstsapui5.controller.myfirstview1", {
        f: formatter,
        onInit() {
            this.Mgroupfunctions = {
                Designation: function (oContext) {
                    var designation = oContext.getProperty("Designation");
                    return {
                        key: designation,
                        text: designation

                    };
                },
                Salary: function (oContext) {
                    var sal = oContext.getProperty("Salary");
                    return {
                        key: sal,
                        text: sal

                    };
                },
                Rating: function (oContext) {
                    var rat = oContext.getProperty("Rating");
                    return {
                        key: rat,
                        text: rat

                    };
                }
            };
        },
        clickb1: function () {

            //   this.getOwnerComponent().getRouter().navTo("Routemysecondview1");
            var selBoxval = this.getView().byId("idSel").getSelectedKey();
            var selRbtn = this.getView().byId("idRad").getSelectedButton().getText();
        },
        onSubmit: function () {
            var name = this.getView().byId("idIpName").getValue();
            var msg = name + " first screen";
            // alert(msg);
            this.getView().byId("idTextFirst").setText(msg);
            this.getView().byId("idBtnsubmit").setType("Reject");
            this.getView().byId("idTextFirst").setTextAlign("Left");
            this.getView().byId("idLb1").setRequired(false);
            this.getView().byId("idIpName").setEnabled(false);
        },
        onpressvhelp: function () {
            if (!this.odailog) {
                this.odailog = sap.ui.xmlfragment(this.getView().getId(), "com.test.ravifirstsapui5.view.f4help", this);
                this.getView().addDependent(this.odailog);
            }


            this.odailog.open();
        },
        onCloseD: function () {
            this.odailog.close();
        },
        onpressf4: function (oEvent) {
            var empid = oEvent.getSource().getBindingContext("YY1_TESTINGDATA_CDS").getProperty("Empid");
            this.getView().byId("Idempid").setValue(empid);
            this.odailog.close();

        },
        Onbuttongo: function () {
            var afilter = [];
            var aSorters = [];
            var empid = this.getView().byId("Idempid").getValue();
            var desig = this.getView().byId("Iddesign").getSelectedKey();
            var salop = this.getView().byId("Idsalop").getSelectedKey();
            var sal = this.getView().byId("Idsal").getValue();
            var doj = this.getView().byId("Iddoj").getDateValue();
            doj = formatter.Dateformatter(doj);

            if (empid !== "") {

                afilter.push(new Filter("Empid", "EQ", empid));
            }
            if (desig !== "") {

                afilter.push(new Filter("Designation", "EQ", desig));
            }
            if (doj !== "") {

                afilter.push(new Filter("DOJ", "EQ", doj));
            }
            if (sal !== "") {

                afilter.push(new Filter("Salary", salop, sal));
            }

            this.getView().byId("Itable").getBinding("items").filter(afilter);
            //Grouping Logic
            var groupField = this.getView().byId("Idgroupby").getSelectedKey();
            var groupOrder = this.getView().byId("Idgrouporder").getSelectedIndex();

            if (groupField !== "" && groupOrder !== "") {
                var vGroup = this.Mgroupfunctions[groupField];
                groupOrder = (groupOrder === 0) ? false : true;
                aSorters.push(new Sorter(groupField, groupOrder, vGroup));
            }



            //Sorting Logic
            var sortField = this.getView().byId("Idsortby").getSelectedKey();
            var sortOrder = this.getView().byId("Idsortorder").getSelectedIndex();
            sortOrder = (sortOrder === 0) ? false : true;
            if (sortField !== "" && sortOrder !== "") {

                aSorters.push(new Sorter(sortField, sortOrder));
            }
            this.getView().byId("Itable").getBinding("items").sort(aSorters);

        },
        onbuttonreset: function () {
            this.getView().byId("Idempid").setValue("");
            this.getView().byId("Iddesign").setSelectedKey("");
            this.getView().byId("Idsalop").setSelectedKey("EQ");
            this.getView().byId("Idsal").setValue("");
            this.getView().byId("Iddoj").setValue("");
            this.getView().byId("Idsortby").setSelectedKey("");
            this.getView().byId("Idsortorder").setSelectedIndex(-1);
            this.getView().byId("Idgroupby").setSelectedKey("");
            this.getView().byId("Idgrouporder").setSelectedIndex(-1);
            this.getView().byId("Itable").getBinding("items").filter([]);
            this.getView().byId("Itable").getBinding("items").sort([]);
        },
        // onRowpress : function(oEvent){
        //     // var empid =oEvent.getSource().getBindingContext("YY1_TESTINGDATA_CDS").getProperty("Empid");
        //     // this.getView.byId("IdSf").bindElement("/YY1_TESTINGDATA/YY1_TESTINGDATA_CDS('"+empid+"')")
        //     this.getOwnerComponent().getRouter().navTo("Routeempdetview");
        // },
        onRowpress: function (oEvent) {
            var sUUID = oEvent.getSource().getBindingContext("YY1_TESTINGDATA_CDS").getProperty("SAP_UUID");
        
            this.getOwnerComponent().getRouter().navTo("Routeempdetview", {
                key: sUUID
            });
        },
        Oncreateemp: function(){
            this.getOwnerComponent().getRouter().navTo("Routeempdetview", {
                key: "newemp"
            });

        },
       
        
        onexcelpress: function () {
            var aCols, oRowBinding, oSetting, oSheet;
            oRowBinding = this.getView().byId("Itable").getBinding("items");
            //place the column here
            aCols = [{
                label: 'Employee id',
                property: 'Empid'
            }, {
                label: 'Employee Name',
                property: 'EmpName'
            }, {
                label: 'Designation',
                property: 'Designation'

            }, {
                label: 'Salary',
                property: 'Salary',
                type: 'Number',
                delimiter: true,
                scale: 2
            }, {
                label: 'Date of Joining',
                property: 'DOJ',
                type: 'Date',
                format: 'dd-MM-yyyy'


            }
            ];
            oSetting = {
                workbook: {
                    columns: aCols
                },
                dataSource: oRowBinding,
                filename: 'Text1.xlsx',
                worker: true
            };

            oSheet = new Spreadsheet(oSetting);
            oSheet.build().finally(function () {
                oSheet.destroy();
            }
            );
        },

    });
});