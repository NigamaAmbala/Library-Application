sap.ui.define(
    [
      "./BaseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/Token",
        "sap/m/MessageBox",
        "sap/m/MessageToast"
    ],
    function(Controller, Filter, FilterOperator, Token, MessageBox, MessageToast) {
      "use strict";
  
      return Controller.extend("com.app.librarysystem.controller.AllBooks", {
        onInit: function() {
          var oView = this.getView();
                var oisbnFilter = oView.byId("idISBNFilterValue12");
                var otitleFilter = oView.byId("idtitleFilterValue12");
                var  oAuthorFilter = oView.byId("iAuthorFilterValue12");
                var  obookidFilter = oView.byId("idbookidFilterValue12");
                let validate = function (args) {
                    if (true) {
                        var text = args.text;
                        return new Token({key: text, text: text});
                    }
                }
                oisbnFilter.addValidator(validate);
                otitleFilter.addValidator(validate);
                oAuthorFilter.addValidator(validate);
                obookidFilter.addValidator(validate);

          const oRouter = this.getOwnerComponent().getRouter();
         oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);
        },
        onUserDetailsLoad: function (oEvent) {
          const { id } = oEvent.getParameter("arguments");
          this.ID = id;
          // const sRouterName = oEvent.getParameter("name");
          const oObjectPage = this.getView().byId("idUserListPage");
   
          oObjectPage.bindElement(`/Users(${id})`);
        },
        onGoPressAllBooks: function () {
          const oView = this.getView(),

              oisbnFilter = oView.byId("idISBNFilterValue12"),
              sISBN = oisbnFilter.getTokens(),

              otitleFilter = oView.byId("idtitleFilterValue12"),
              stitle = otitleFilter.getTokens(),

              oAuthorFilter = oView.byId("iAuthorFilterValue12"),
              sAuthor = oAuthorFilter.getTokens(),

              obookidFilter = oView.byId("idbookidFilterValue12"),
              sbookid = obookidFilter.getTokens(),



              oTable = oView.byId("idAllBooksTable"),
              aFilters = [];

              sISBN.filter((element) => {
                  element ? aFilters.push(new Filter("ISBN", FilterOperator.EQ, element.getKey())) : "";
              })

              stitle.filter((element) => {
                  element ? aFilters.push(new Filter("title", FilterOperator.EQ, element.getKey())) : "";
              })

              sAuthor.filter((element) => {
                  element ? aFilters.push(new Filter("author", FilterOperator.EQ, element.getKey())) : "";
              })   
              
              sbookid.filter((element) => {
                  element ? aFilters.push(new Filter("ID", FilterOperator.EQ, element.getKey())) : "";
              }) 
              oTable.getBinding("items").filter(aFilters);
            },
            onClearFilterPressAllbooks: function () {

              const oView = this.getView(),
              oClearFname = oView.byId("idISBNFilterValue12").removeAllTokens(),
              oClearLname = oView.byId("idtitleFilterValue12").removeAllTokens(),
              oClearPhone = oView.byId("iAuthorFilterValue12").removeAllTokens(),
              oClearEmail = oView.byId("idbookidFilterValue12").removeAllTokens();
            },
            // for reservation button in Allbooks page
            reservebutton : async function (oEvent) {
              var oSelectedItem = oEvent.getSource();
              
              console.log(this.ID)
              console.log(oEvent.getSource().getParent())
              var userId = this.ID
              if (this.byId("idAllBooksTable").getSelectedItems().length > 1) {
                MessageToast.show("Please Select only one Book");
                return
              }
              var oSelectedBook = this.byId("idAllBooksTable").getSelectedItem().getBindingContext().getObject()
              console.log(oSelectedBook)
       
              const userModel = new sap.ui.model.json.JSONModel({
                users_ID: userId,
                books_ID: oSelectedBook.ID,
                Reservationdate: new Date(),
              });
              this.getView().setModel(userModel, "userModel");
       
              const oPayload = this.getView().getModel("userModel").getProperty("/"),
                oModel = this.getView().getModel("ModelV2");
       
              try {
                await this.createData(oModel, oPayload, "/Reservation");
                MessageToast.show("Book Reserved");
              } catch (error) {
               
                MessageBox.error("Some technical Issue");
              }
            }
      });
    }
  );