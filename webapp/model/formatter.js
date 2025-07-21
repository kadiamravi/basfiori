sap.ui.define([], function () {
    "use strict";

    return {
        formatname :function(name){
            return "Mr " + name;
        },
        color:function(abc){
            if (abc === "10001"){
                return "Success";
            }else if(abc  === "10002"){
                return "Error";
            }else if (abc ==="Fresher"){
                return "Success";

            }else if (abc ==="expert"){
                return "Error";
                
            }
        },
        Fdate: function(date1) {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd/MM/YYYY"
            }, sap.ui.getCore().getConfiguration().getLocale());
        
            return oDateFormat.format(date1);
        },
        Dateformatter: function(date1) {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "yyyy-MM-dd"
            }, sap.ui.getCore().getConfiguration().getLocale());
        
            return oDateFormat.format(date1);
        }

        };



});