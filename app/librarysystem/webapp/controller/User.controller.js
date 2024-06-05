sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.librarysystem.controller.User", {
        onInit: function() {
        const oRouter = this.getOwnerComponent().getRouter();
         oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);
        },
        onUserDetailsLoad: function (oEvent) {
          const { ID } = oEvent.getParameter("arguments");
          this.ID = ID;
          // const sRouterName = oEvent.getParameter("name");
          const oObjectPage = this.getView().byId("idUserListPage");
   
          oObjectPage.bindElement(`/Users(${ID})`);
        },
        AllBooks : function () {
          const userId=this.ID;
          const oRouter = this.getOwnerComponent().getRouter();
           oRouter.navTo("RouteAllBooks", {
            id:userId
           })
      }
      });
    }
  );