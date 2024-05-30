sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/Token"
    ],
    function(Controller, Filter, FilterOperator, Token) {
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
            }
      });
    }
  );