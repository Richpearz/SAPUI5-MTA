sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("richpearz.projectfioriexp.controller.App", {
            onInit: function () {

            },

            onValidate : function(oEvent) {
                //console.log(oEvent.getParameters());

                let sValue = oEvent.getParameter("newValue"),
                    oInput = oEvent.getSource(); // = this.byId("inputEmployee");

                //console.log(oInput);

                if (sValue.length === oInput.getMaxLength()) {
                    oInput.setDescription("Ok");

                    this.getView().byId("labelCountry").setVisible(true);
                    this.getView().byId("selectCountry").setVisible(true);

                } else {
                    oInput.setDescription("Not Ok");

                    this.getView().byId("labelCountry").setVisible(false);
                    this.getView().byId("selectCountry").setVisible(false);

                }
            }
        });
    });
