function tratarDados(
    capacitacao,
    matricula,
    nota,
    tempoDeCasa,
    tipoDeProgressao,
    numeroDeFilhos,
    faltas,
    atrasos
  ) {
  
    let params = {}
  
    params.matricula = String(matricula);
    params.nota = Number(nota);
    params.tempoDeCasa = String(tempoDeCasa);
    params.capacitacao = String(capacitacao);
    params.tipoDeProgressao = String(tipoDeProgressao);
    params.numeroDeFilhos = Number(numeroDeFilhos);
    params.faltas = Number(faltas);
    params.atrasos = Number(atrasos);
  
    Logger.log(params);
    return params;
  }
  
  
  function validacaoCapacitacao(
    params = { tipoDeProgressao: '', capacitacao: '' }
  ) {
  
    if (params.tipoDeProgressao == "Vertical" || params.tipoDeProgressao == "Horizontal e Vertical") {
      if (params.capacitacao != "") {
        return true;
  
      } else {
        return false;
      }
    }
  
    return true;
  }
  
  function diasTrabalhados(dtInicioString) {
  
    try {
      /* Separa os valores com / */
      
      var dataString = dtInicioString.split("/");
  
      var dtInicio = new Date(dataString[2], dataString[1] - 1, dataString[0]);// Menos -1 posto para ajustar o mes no js
  
      var tempoAtual = new Date(); // Pega datatime
      var dataDiferenca = tempoAtual.getTime() - dtInicio.getTime();
      var tempoDeTrabalho = Math.trunc(dataDiferenca / (24 * 60 * 60 * 1000));
  
      return tempoDeTrabalho
    } catch (error) {
      
      return false;
    }
  
  
  }
  
  function validarAtrasos(qtdAtrasos){
    var atrasos = Number(qtdAtrasos);
    if(atrasos > 20){
      return false;
    }
    return true;
  }
  
  function validarFaltas(qtdFaltas){
    var faltas = Number(qtdFaltas);
    if(faltas > 18){
      return false;
    }
    return true;
  }
  
  function validacaoParaProgressao(
    matricula, nota, tempoDeCasa, tipoDeProgressao, capacitacao, numeroDeFilhos = 0, faltas, atrasos
  ) {
  
    const dados = tratarDados(
      capacitacao,
      matricula,
      nota,
      tempoDeCasa,
      tipoDeProgressao,
      numeroDeFilhos,
      faltas,
      atrasos
      )
  
    if (validacaoCapacitacao({ tipoDeProgressao: dados.tipoDeProgressao, capacitacao: dados.capacitacao }) == false) {
      return false;
    }
  
    diasTrabalhos = diasTrabalhados(dados.tempoDeCasa); // Alterar quando tivermos as novas planilhas
    
    if(diasTrabalhos < 1095){
      return false;
    }
    
    if(validarAtrasos(dados.atrasos) === false){
      return false;
    }
  
    if(validarFaltas(dados.faltas) === false){
      return false;
    }
  
  
    return true;
  }
  
  
  //console.log(validacaoParaProgressao(7288, 70, '02/02/2017', 'Horizontal', 'asf', 2, 1, 1));