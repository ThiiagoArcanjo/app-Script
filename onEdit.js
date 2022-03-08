function classificacao(){
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var folha = planilha.getSheets()[0];
    var intervalo = folha.getRange('A2:S10');
    intervalo.sort([
      {column:13, ascending:false}, // Ordenar por nota
      {column:17, ascending:true}, // Ordenar por tempo de trabalho
      {column:15, ascending:false}, // ordenar por filhos
      {column:06, ascending:true} // ordenar por filhos
    ]);
  }
  
  function onOpen() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
      name : "Classificação",
      functionName : "classificacao"
    }];
    sheet.addMenu("scripts", entries);
  };