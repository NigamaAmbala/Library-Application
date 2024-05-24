sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("com.app.librarysystem.controller.Homeview", {
            onInit: function () {

            },
            onLoginCredentials: function () {
                var ousername = this.getView().byId("idusernameInput").getValue();
                var opassword = this.getView().byId("idPasswordInput").getValue();
                if (ousername === "admin" && opassword === "admin") {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteAdmin")
                }
                else {
                    alert("Invalid login Credentials")
                }
            },
            loginbutton: async function () {
                if (!this.ologinDailog) {
                    this.ologinDailog = await Fragment.load({
                        id: this.getView().getId(),
                        name: "com.app.librarysystem.Fragments.loginDialog",
                        controller: this
                    });
                    this.getView().addDependent(this.ologinDailog);
                }

                this.ologinDailog.open();
            },

            onCloseDialog: function () {
                if (this.ologinDailog.isOpen()) {
                    this.ologinDailog.close()
                }
            },
            Userloginbutton: async function () {
                if (!this.oUserloginDailog) {
                    this.oUserloginDailog = await Fragment.load({
                        id: this.getView().getId(),
                        name: "com.app.librarysystem.Fragments.UserloginDailog",
                        controller: this
                    });
                    this.getView().addDependent(this.oUserloginDailog);
                }

                this.oUserloginDailog.open();
            },

            onCloseUserDialog: function () {
                if (this.oUserloginDailog.isOpen()) {
                    this.oUserloginDailog.close()
                }
            },
            onUserLoginCredentials: function () {
                var ousername1 = this.getView().byId("idusernameInput1").getValue();
                var opassword1 = this.getView().byId("idPasswordInput1").getValue();
                if (ousername1 === "user" && opassword1 === "user") {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteUser")
                }
                else {
                    alert("Invalid login Credentials")
                }
            },
            
        });
    });
