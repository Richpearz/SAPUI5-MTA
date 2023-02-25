// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("richpearz.projectfioriexp.controller.App", {
            onInit: function () {
                let oJSONModel = new sap.ui.model.json.JSONModel(),
                    oView = this.getView(),
                    oResourceBundle = oView.getModel("i18n").getResourceBundle();

                oJSONModel.loadData("../localService/mockdata/Employees.json");
                oView.setModel(oJSONModel, "richpearzEmployee");
            },

            onValidate : function(oEvent) {
                //console.log(oEvent.getParameters());

                let sValue = oEvent.getParameter("newValue"),
                    oInput = oEvent.getSource(); // = this.byId("inputEmployee");

                //console.log(oInput);

                /*
                if (sValue.length === oInput.getMaxLength()) {
                    oInput.setDescription("Ok");

                    this.getView().byId("labelCountry").setVisible(true);
                    this.getView().byId("selectCountry").setVisible(true);

                } else {
                    oInput.setDescription("Not Ok");

                    this.getView().byId("labelCountry").setVisible(false);
                    this.getView().byId("selectCountry").setVisible(false);

                } 
                */               
            },

            onFilter : function () {
                var oJSONModel = this.getView().getModel("richpearzEmployee").getData(),
                    aFilters = [];

                /*
                if (oJSONModel.employeeId  !== ""){
                    aFilters.push(new Filter("EmployeeID", FilterOperator.Contains, oJSONModel.employeeId));
                }
                */

                if (oJSONModel.employeeId  !== ""){
                    aFilters.push(new Filter({
                        filters:[
                            new Filter("EmployeeID", FilterOperator.Contains, oJSONModel.employeeId),
                            new Filter("FirstName", FilterOperator.Contains, oJSONModel.employeeId)
                        ],
                        and: false
                    }));
                }

                if (oJSONModel.countryKey !== ""){
                    aFilters.push(new Filter("Country", FilterOperator.EQ, oJSONModel.countryKey));
                }

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);

                var iAmount = oBinding.aIndices.length;
                this.getView().byId("tableEmployee").setHeaderText("Employees: ("+ iAmount +")");

            },

            onClearFilter () {
                let oModel = this.getView().getModel("richpearzEmployee");
                
                oModel.setProperty("richpearzEmployee>/employeeId");
                oModel.setProperty("richpearzEmployee>/countryKey");

                let oTable = this.getView().byId("tableEmployee"),                
                oBinding = oTable.getBinding("items");
                oBinding.filter([]);

                this.byId("inputEmployee").setValue("");
                this.byId("selectCountry").setValue("");
                
                this.getView().byId("tableEmployee").setHeaderText("Employees: (" + oModel.oData.Amount + ")");
            },

            onMessage (oEvent) {
                let oBindingContext = oEvent.getSource().getBindingContext("richpearzEmployee");

                console.log(oBindingContext.getObject()); 

                new sap.m.MessageToast.show(oBindingContext.getObject().PostalCode);
            }
        });
    });
