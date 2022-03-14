function ajustarPlanilhas() {
  // DADOS DO REQUERIMENTO
  var requerimentoDeProgressaoFormulario = {
    id: '1lWMD0rxbLQJ7H18jM-vVSfxlTaSTSiM9VVZK3tYyd74',
    sheetName: 'Respostas ao formulário 1',
    data: null
  }

  requerimentoDeProgressaoFormulario.data = pegaPlanilha(
    requerimentoDeProgressaoFormulario.id, requerimentoDeProgressaoFormulario.sheetName
  );

  // DADOS DA AVALIAÇÃO DO RH
  var dadosRHNotaAvaliacao = {
    id: '13ZXkWFZ6ESTAyNI26LIlcEHK00KRhvcpA3MHYEjDdC4',
    sheetName: 'nota-avaliacao',
    data: null
  }

  dadosRHNotaAvaliacao.data = pegaPlanilha(
    dadosRHNotaAvaliacao.id, dadosRHNotaAvaliacao.sheetName
  );


  // DADOS DOS FUNCIONARIOS DO RH
  var dadosRhDIFuncionarios = {
    id: '13ZXkWFZ6ESTAyNI26LIlcEHK00KRhvcpA3MHYEjDdC4',
    sheetName: 'licencas-dados-funcionarios',
    data: null
  }

  dadosRhDIFuncionarios.data = pegaPlanilha(
    dadosRhDIFuncionarios.id, dadosRhDIFuncionarios.sheetName
  );


  // DADOS Lecencas e afastamentos do RH 
  var dadosRhLicencasAfastamentos = {
    id: '13ZXkWFZ6ESTAyNI26LIlcEHK00KRhvcpA3MHYEjDdC4',
    sheetName: 'licenca-afastamento-fazenda',
    data: null
  }

  dadosRhLicencasAfastamentos.data = pegaPlanilha(
    dadosRhLicencasAfastamentos.id, dadosRhLicencasAfastamentos.sheetName
  );

  // COMPARAR LINHAS PARA ENCONTRAR MATRICULA DO FUNCIONARIO
  // for index no 1 para tirar o cabeçalho e convertemos o logo em string para evitar ,00
  // For para ler toda planilha do forms
  for (var i = 1; i <= requerimentoDeProgressaoFormulario.data.numRows - 1; i++) {
    var row = requerimentoDeProgressaoFormulario.data.values[i];
    var matriculaRequerimento = String(row[7]);

    //For para ler a planilha de avaliação dos funcionarios
    for (var j = 1; j <= dadosRHNotaAvaliacao.data.numRows - 1; j++) {

      var rowDadoAvaliacao = dadosRHNotaAvaliacao.data.values[j];
      var matriculaDadoAvaliacao = String(rowDadoAvaliacao[3]);
      var ultimaNotaDadoAvaliacao = String(rowDadoAvaliacao[2]);

      if (matriculaDadoAvaliacao == matriculaRequerimento) {
        if (ultimaNotaDadoAvaliacao.trim() != '' && ultimaNotaDadoAvaliacao != null) {
          SpreadsheetApp.getActiveSheet().getRange(("N" + (i + 1))).setValue(String(ultimaNotaDadoAvaliacao));
        }
      }
    }


    // For de informações dos funcioarios // pega data nascimento e da inicio do trablho
    for (var h = 1; h <= dadosRhDIFuncionarios.data.numRows - 1; h++) {
      var rowMatricula = dadosRhDIFuncionarios.data.values[h];
      var colMatricula = String(rowMatricula[1]);
      var colDtNascimento = String(rowMatricula[2]);
      var colDtEntrada = String(rowMatricula[3]);



      if (matriculaRequerimento == colMatricula) {
        if (colDtNascimento.trim() != '' && colDtNascimento != null) {
          SpreadsheetApp.getActiveSheet().getRange(("G" + (i + 1))).setValue(String(colDtNascimento));
          SpreadsheetApp.getActiveSheet().getRange(("R" + (i + 1))).setValue(String(colDtEntrada));
        }

      }
    }



    // for para pegar os numeros de licenças
    for (var x = 1; x <= dadosRhLicencasAfastamentos.data.numRows - 1; x++) {
      var licencaRow = dadosRhLicencasAfastamentos.data.values[x];

      //pega matriccula da segunda planinha
      var licencaMatricula = String(licencaRow[0]);
               
      //pega o atestado que esta na segunda planilha
      var diasAtestado = Number(licencaRow[3]);
      // Compara matricula da primeira planinha com o da segunda
      if (matriculaRequerimento == licencaMatricula) {
        Logger.log("Log primeiro if");
        Logger.log(licencaMatricula);
       if (diasAtestado != null && diasAtestado > 0) {
          var soma = Number(SpreadsheetApp.getActiveSheet().getRange(("Q" + (i + 1))).getValue())
            + Number(diasAtestado)

          Logger.log(soma);
          Logger.log("Log if");
          SpreadsheetApp.getActiveSheet().getRange(("Q" + (i + 1))).setValue(String(soma));
        } 
      }
    }





  }

}



function pegaPlanilha(id, sheetName) {
  Logger.log('pegaPlanilha');
  Logger.log(id);
  Logger.log(sheetName);
  var spreadsheet = SpreadsheetApp.openById(id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  return {
    values: values,
    numRows: numRows
  };
  /*
  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    Logger.log(row[6]);
  }
  */
}