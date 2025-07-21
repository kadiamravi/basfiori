sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/test/ravifirstsapui5/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.test.ravifirstsapui5.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
            
            var raviodmodel = this.getModel("YY1_TESTINGDATA_CDS"); //gives the odata model
            var ravijsonnmodel = this.getModel("ravijson"); //gives the json model
             raviodmodel.read("/YY1_TESTINGDATA",{
                success:function(data){
                    for(var i=0;i<data.results.length;i++){
                        data.results[i].Slno = i+1;

                    }
                    ravijsonnmodel.setData(data) ;
                },
                error:function(){

                }
             });
        }
    });
});