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
        },
        Dateformattercreate: function(date1) {
            console.log("Raw DOJ input:", date1);
        
            if (!date1) {
                return "";
            }
        
            // Parse "dd/MM/yyyy"
            var parts = date1.split("/");
            if (parts.length !== 3) {
                console.warn("Date format not recognized:", date1);
                return "";
            }
        
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10) - 1; // Month is 0-based in JS
            var year = parseInt(parts[2], 10);
        
            var oDate = new Date(year, month, day);
        
            if (isNaN(oDate.getTime())) {
                console.warn("Invalid parsed date:", date1);
                return "";
            }
        
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd'T'00:00:00"
            });
        
            var formatted = oDateFormat.format(oDate);
            console.log("Formatted DOJ:", formatted);
            return formatted;
        }
        

        };



});