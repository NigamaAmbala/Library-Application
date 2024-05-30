sap.ui.define(
    [
      "./BaseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/Token",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/Fragment",
        "sap/m/MessageBox"
    ],
    function(BaseController, Filter, FilterOperator, Token,JSONModel,Fragment,MessageBox) {
      "use strict";
  
      return BaseController.extend("com.app.librarysystem.controller.App", {
        onInit: function() {
            //Filter 
          var oView = this.getView();
                var oisbnFilter = oView.byId("idISBNFilterValue");
                var otitleFilter = oView.byId("idtitleFilterValue");
                var  oAuthorFilter = oView.byId("iAuthorFilterValue");
                var  obookidFilter = oView.byId("idbookidFilterValue");
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
           //json model for creating book
                const oLocalModel = new JSONModel({
                  ID : "",
                  title: "",
                  author: "",
                  ISBN: "",
                  genre: "",
                  stock: "",
                  quantityAvailable: "",
                  language:""
              });
              this.getView().setModel(oLocalModel, "localModel");
              this.getRouter().attachRoutePatternMatched(this.onBookListLoad, this);
          },
          onBookListLoad: function () {
              this.getView().byId("idBooksTable").getBinding("items").refresh();
          },
          //filter go
        onGoPress: function () {
          const oView = this.getView(),

              oisbnFilter = oView.byId("idISBNFilterValue"),
              sISBN = oisbnFilter.getTokens(),

              otitleFilter = oView.byId("idtitleFilterValue"),
              stitle = otitleFilter.getTokens(),

              oAuthorFilter = oView.byId("iAuthorFilterValue"),
              sAuthor = oAuthorFilter.getTokens(),

              obookidFilter = oView.byId("idbookidFilterValue"),
              sbookid = obookidFilter.getTokens(),



              oTable = oView.byId("idBooksTable"),
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
            // clear filter
            onClearFilterPress: function () {

              const oView = this.getView(),
              oClearFname = oView.byId("idISBNFilterValue").removeAllTokens(),
              oClearLname = oView.byId("idtitleFilterValue").removeAllTokens(),
              oClearPhone = oView.byId("iAuthorFilterValue").removeAllTokens(),
              oClearEmail = oView.byId("idbookidFilterValue").removeAllTokens();
            },
            // loading fragment for add button
            addButton: async function () {
              if (!this.oCreateBooksDialog) {
                  this.oCreateBooksDialog = await Fragment.load({
                      id: this.getView().getId(),
                      name: "com.app.librarysystem.Fragments.CreateBookDialog",
                      controller: this
                  });
                  this.getView().addDependent(this.oCreateBooksDialog);
              }

              this.oCreateBooksDialog.open();
          },
 
          onCloseDialog: function(){
              if(this.oCreateBooksDialog.isOpen()){
                  this.oCreateBooksDialog.close()
              }
          },   
          // for creating book 
          onCreateBook: async function () {
            const oPayload = this.getView().getModel("localModel").getProperty("/"),
                oModel = this.getView().getModel("ModelV2");
            try {
                await this.createData(oModel, oPayload, "/Books");
                this.getView().byId("idBooksTable").getBinding("items").refresh();
                this.oCreateBooksDialog.close();
            } catch (error) {
                this.oCreateBooksDialog.close();
                MessageBox.error("Some technical Issue");
            }
        },
       // deleting a book
        DeleteBook : async function(){
 
            var oSelected = this.byId("idBooksTable").getSelectedItem();
            if (oSelected) {
                var oID = oSelected.getBindingContext().getObject().ID;

                oSelected.getBindingContext().delete("$auto").then(function () {
                    // MessageToast.show(oID + " SuccessFully Deleted");
                },
                    function (oError) {
                        MessageToast.show("Deletion Error: ", oError);
                    });
                this.getView().byId("idBooksTable").getBinding("items").refresh();

            } else {
                MessageToast.show("Please Select a Row to Delete");
            }
        },
        // when you press Active lone it route to Activeloan page
        PressActiveloans: function () {
            const oRouter = this.getRouter();
             oRouter.navTo("RouteActiveLoans")
        }
      });
    }
  );