function validarTipoDeProgressao(habilitado, tipo, capacitacao){
  if(habilitado == "Habilitado"){
    if(tipo == "Horizontal e Vertical"){
      if(capacitacao != ""){
        return "Valido para Horizontal e Vertical";
      
      }else if(capacitacao == ""){
        return "Valido para Horizontal";
      }
    } else if(tipo == "Vertical"){
      
       if(capacitacao != ""){
        return "Valido para Vertical";
      }

    }else{
      return "Valido para Horizontal";
    }
  }else {
    return "Não Habilitado";
  }

  
}

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

  if (params.tipoDeProgressao == "Vertical") {
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
    return 'Não habilitado, não inseriu capacitação';
  }

  var diasDeTrabalho = diasTrabalhados(dados.tempoDeCasa); // Alterar quando tivermos as novas planilhas
  
  if(diasDeTrabalho < 1095){
    return 'Não habilitado, possui menos de 3 anos de trabalho';
  }
  
  if(validarAtrasos(dados.atrasos) === false){
    return 'Não habilitado, possui mais de 20 atrasos';
  }

  if(validarFaltas(dados.faltas) === false){
    return 'Não habilitado, possui mais de 18 faltas';
  }


  return 'Habilitado';
}
