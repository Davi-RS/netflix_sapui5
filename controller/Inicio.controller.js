sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        
        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {
                
                //DADOS PARA O MODELO
               let menu = {
                primeiro: 'BEGINS',
                segundo: 'MOVIES',
                
               }

               
            
               
               //CRIAR MODELO E PREENCHER COM DADOS
               let menuModel = new JSONModel()
               menuModel.setData(menu)
                
               //ATRIBUIR MODELO NA TELA
               let tela = this.getView()
               tela.setModel(menuModel, 'ModeloMenu')

               let results = {
                title: []
               }

               let filmesModels = new JSONModel()
               filmesModels.setData(results)
               tela.setModel(filmesModels, 'APIFilmes')
            },
            onPressLinkInicio: function(){
                alert("Clicou em inicio")
            },
            onPressLinkSeries: function(){
                alert("Clicou em Séries")
            },
            onPressLinkFilmes: function(){
                alert("Clicou em Filmes")
            },
            onPressLinkDocumentarios: function(){
                alert("Clicou em Documentários")
            },
            
            onPressSearch: function(){
                //obter o valo no campo de busca
                let filtro = this.byId('inputSearch').getValue()
                //alert(query)
                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query=' + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '684c84c547msh28682c02bb93b6bp147839jsn243ab8392839',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    //RESGATA MODELO E ATUALIZAR DADOS
                    let view = this.getView()
                    let model = view.getModel('APIFilmes')
                    let data = model.getData()

                    //LIMPARA LISTA
                    data.title = []
                    data.titles = response.titles
                    model.refresh()
                }.bind(this));
            }
        });
    });
