
//função valida se data final é menor que data inicial
jQuery.validator.addMethod("dateFinalMenorInicial", function(value, element) {   
	//contando chars
	//if(value.length != 10) 
	//	return false;  
	// converter data lida para formato yyyy-mm-dd
	var dt_inicial_lida = $(".data_7_dias_inicial").val();
	var dt_inicial_yyyymmdd = dt_inicial_lida.substring(6,10) + "-" + dt_inicial_lida.substring(3,5) + "-" + dt_inicial_lida.substring(0,2);
	var dt_final_yyyymmdd = value.substring(6,10) + "-" + value.substring(3,5) + "-" + value.substring(0,2);
	
	var data_inicial = new Date(dt_inicial_yyyymmdd);
	var data_final = new Date(dt_final_yyyymmdd);
	
	if (data_inicial > data_final)
		return false;
	return true;  
 }, "Data inicial deve ser menor ou igual a data final!");  // Mensagem padrão  

//função valida data se é maior ou igual a data atual
jQuery.validator.addMethod("dateMenorAtual", function(value, element) {   
	//contando chars
	//if(value.length != 10) 
	//	return false;  
	// converter data lida para formato yyyy-mm-dd
	var dt_yyyymmdd = value.substring(6,10) + "-" + value.substring(3,5) + "-" + value.substring(0,2);
	
	var data_lida = new Date(dt_yyyymmdd);
	var data_atual = new Date($("#data_atual").val());
	
	if (data_lida > data_atual)
		return false;
	return true;  
 }, "Data deve ser menor ou igual à data data atual!");  // Mensagem padrão  

// função valida data de devolução do produto com limite de 7 dias de uso
jQuery.validator.addMethod("date7DIAS", function(value, element) {  
	//contando chars  
	//if(value.length != 10) 
	//	return false;  
	// converter datas lidas para formato yyyy-mm-dd
	var dt_inicial_lida = $(".data_7_dias_inicial").val();
	var dt_inicial_yyyymmdd = dt_inicial_lida.substring(6,10) + "-" + dt_inicial_lida.substring(3,5) + "-" + dt_inicial_lida.substring(0,2);
	var dt_final_yyyymmdd = value.substring(6,10) + "-" + value.substring(3,5) + "-" + value.substring(0,2);
	
	var data_inicial = new Date(dt_inicial_yyyymmdd);
	var data_final = new Date(dt_final_yyyymmdd);
	var dias_uso = (data_final - data_inicial) * 1.1574074074074E-8;		// converter de milisegundos para dias
	
	if (dias_uso > 7)
		return false;
	return true;  
}, "Data de Devolução maior que 7 dias");  // Mensagem padrão  

//função valida tamanho do IMEI: 11, 14 ou 15 caracteres
jQuery.validator.addMethod("valida_imei_tamanho", function(value, element) {   
     //contando chars
     if(value.length != 15)
		return false;  
	 return true;  
 }, "IMEI inválido!");  // Mensagem padrão

//função valida tamanho do IMEI: 11, 14 ou 15 caracteres
jQuery.validator.addMethod("valida_imei", function(value, element) {   
     //contando chars
     var var_retorno = false;
     $.ajax({
        type: "POST",
        url: 'os_controle_acao.php',
        data: {acao_id: 'valida_imei', imei: value},
        async: false,
        success: function(data) {
        //alert(data);
        if (data == "1")
          var_retorno = true;
        }
      });
     //return true;
  return var_retorno;
     
 }, "IMEI inválido!");  // Mensagem padrão


//função valida tamanho do serial de até 20 caracteres alfanuméricos
jQuery.validator.addMethod("valida_serial_20_tamanho", function(value, element) {   
     //contando chars
     if(value.length < 1 || value.length > 20)
		return false;  
	 return true;  
 }, "Tamanho inválido!");  // Mensagem padrão

//função valida Data BR formato(dd/mm/aaaa).Obs.: Aceita campo data vazio.
jQuery.validator.addMethod("dateBRempty", function(value, element) {
     if((value=="__/__/____") || (value==""))
        return true;
     else{   
          //contando chars  
         if(value.length != 10) 
            return false;  
         // verificando data  
         var data        = value;  
         var dia         = data.substr(0,2);  
         var barra1      = data.substr(2,1);  
         var mes         = data.substr(3,2);  
         var barra2      = data.substr(5,1);  
         var ano         = data.substr(6,4);  
         if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12) return false;
         if((mes==4||mes==6||mes==9||mes==11) && dia==31) return false;  
         if(mes==2 && (dia>29||(dia==29 && ano%4!=0))) return false;  
         if(ano < 1900) return false; 
         return true;  
     }   
 }, "Informe uma data válida!");  // Mensagem padrão  
 
//função valida Data BR formato(dd/mm/aaaa)
jQuery.validator.addMethod("dateBR", function(value, element) {  
      //contando chars  
     if(value.length != 10) 
		return false;  
     // verificando data  
     var data        = value;  
     var dia         = data.substr(0,2);  
     var barra1      = data.substr(2,1);  
     var mes         = data.substr(3,2);  
     var barra2      = data.substr(5,1);  
     var ano         = data.substr(6,4);  
     if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12) return false;
     if((mes==4||mes==6||mes==9||mes==11) && dia==31) return false;  
     if(mes==2 && (dia>29||(dia==29 && ano%4!=0))) return false;  
     if(ano < 1900) return false; 
	 return true;  
 }, "Informe uma data válida");  // Mensagem padrão  
 
 //função valida DateTime formato(dd/mm/aaaa hh:mm)
 jQuery.validator.addMethod("dateTimeBR", function(value, element) {  
      //contando chars  
     if(value.length!=16) return false;  
      // dividindo data e hora  
     if(value.substr(10,1)!=' ') return false; // verificando se há espaço  
     var arrOpcoes = value.split(' ');  
     if(arrOpcoes.length!=2) return false; // verificando a divisão de data e hora  
     // verificando data  
     var data        = arrOpcoes[0];  
     var dia         = data.substr(0,2);  
     var barra1      = data.substr(2,1);  
     var mes         = data.substr(3,2);  
     var barra2      = data.substr(5,1);  
     var ano         = data.substr(6,4);  
     if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;  
     if ((mes==4||mes==6||mes==9||mes==11) && dia==31)return false;  
     if (mes==2 && (dia>29||(dia==29 && ano%4!=0)))return false;  
	 if(ano < 1900) return false; 
     // verificando hora  
     var horario     = arrOpcoes[1];  
     var hora        = horario.substr(0,2);  
     var doispontos  = horario.substr(2,1);  
     var minuto      = horario.substr(3,2);  
     if(horario.length!=5||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59||doispontos!=":")return false;  
     return true;  
 }, "Informe uma data e uma hora válida");   
 
 
 //função valida Time formato(hh:mm)
 jQuery.validator.addMethod("timeBR", function(value, element) {  
      //contando chars  
     if(value.length!=5) return false; 
     // verificando hora  
     var horario     = value;  
     var hora        = horario.substr(0,2);  
     var doispontos  = horario.substr(2,1);  
     var minuto      = horario.substr(3,2);  
     if(horario.length!=5||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59||doispontos!=":")return false;  
     return true;  
 }, "Informe uma hora válida");   
 

//função valida CNPJ
jQuery.validator.addMethod("valida_cnpj", function(cnpj, element) {
   // DEIXA APENAS OS NÚMEROS
   cnpj = cnpj.replace('/','');
   cnpj = cnpj.replace('.','');
   cnpj = cnpj.replace('.','');
   cnpj = cnpj.replace('-','');
 
   var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
   digitos_iguais = 1;
 
   if (cnpj.length < 14 && cnpj.length < 15){
      return false;
   }
   for (i = 0; i < cnpj.length - 1; i++){
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
         digitos_iguais = 0;
         break;
      }
   }
 
   if (!digitos_iguais){
      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0,tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
 
      for (i = tamanho; i >= 1; i--){
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2){
            pos = 9;
         }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)){
         return false;
      }
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--){
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2){
            pos = 9;
         }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)){
         return false;
      }
      return true;
   }else{
      return false;
   }
}, "CNPJ inválido."); // Mensagem padrão 

//função valida CPF
jQuery.validator.addMethod("valida_cpf", function(CPFcompleto, element) {
   // DEIXA APENAS OS NÚMEROS
   CPFcompleto = CPFcompleto.replace('/','');
   CPFcompleto = CPFcompleto.replace('.','');
   CPFcompleto = CPFcompleto.replace('.','');
   CPFcompleto = CPFcompleto.replace('-','');

   if( CPFcompleto == "NT"){
      return true;
   }

   // valida CNPJ
   if( CPFcompleto.length > 11 ){
      
      var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
       digitos_iguais = 1;
       var cnpj = CPFcompleto;
     
       if (cnpj.length < 14 && cnpj.length < 15){
          return false;
       }
       for (i = 0; i < cnpj.length - 1; i++){
          if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
             digitos_iguais = 0;
             break;
          }
       }
     
       if (!digitos_iguais){
          tamanho = cnpj.length - 2
          numeros = cnpj.substring(0,tamanho);
          digitos = cnpj.substring(tamanho);
          soma = 0;
          pos = tamanho - 7;
     
          for (i = tamanho; i >= 1; i--){
             soma += numeros.charAt(tamanho - i) * pos--;
             if (pos < 2){
                pos = 9;
             }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0)){
             return false;
          }
          tamanho = tamanho + 1;
          numeros = cnpj.substring(0,tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--){
             soma += numeros.charAt(tamanho - i) * pos--;
             if (pos < 2){
                pos = 9;
             }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1)){
             return false;
          }
          return true;
       }else{
          return false;
       }
  }
 
 	var Indx
	var Soma, Result, Pos
	var DigCPF, Dig1, Dig2
	
  if(CPFcompleto.length != 11)
   return false;
   
   var digitos_iguais = 1;
   for (i = 0; i < CPFcompleto.length - 1; i++){
      if (CPFcompleto.charAt(i) != CPFcompleto.charAt(i + 1)){
         digitos_iguais = 0;
         break;
      }
   }

   if (!digitos_iguais){
	  CPF       = CPFcompleto.substr(0,9);
	  CONTROLE  = CPFcompleto.substr(9,2)

	//	Verifica se o CPF esta no tamanho certo
		if( CPF.length != 9 )
		{
		//alert("Número Incorreto de caracteres  do cpf");
		return false;
		}
	//	Verifica se o Controle do CPF esta no tamanho certo
		if( CONTROLE.length != 2 )
		{
		  //alert("Número Incorreto de caracteres  do controle do cpf");
			return false;
	
	  }
	//	Calcula o Primeiro Digito do CPF
		Soma = 0
		for(Indx=0, Pos = 10; Indx<9 ;Indx++, Pos--)
			{
			DigCPF = CPF.substr(Indx,1);
			Result = DigCPF * Pos
			Soma = Soma + Result
			}
		Dig1 = Soma % 11;
		if (Dig1 < 2)
			Dig1 = 0;
		else
			Dig1 = 11 - Dig1;
	
	//	Verifica se o Primeiro Digito Informado é Valido
		if( Dig1 != CONTROLE.substr(0,1) )
		{
		//alert("Primeiro digito incorreto.");
		return false;
	  }
	//	Calcula o Segundo Digito do CPF
		Soma = 0
		for(Indx=0, Pos = 11; Indx<9 ;Indx++, Pos--)
			{
			DigCPF = CPF.substr(Indx,1);
			Result = DigCPF * Pos
			Soma = Soma + Result
			}
		Soma = Soma + (Dig1 * 2)
		Dig2 = Soma % 11;
		if (Dig2 < 2)
			Dig2 = 0;
		else
			Dig2 = 11 - Dig2;
	
	//	Verifica se o Segundo Digito Informado é Valido
		if( Dig2 != CONTROLE.substr(1,1) )
		{
		//alert("Segundo Digito Incorreto");
		return false;
	  }
	  else
			return true;
   }else{
      return false;
   }
}, "CPF ou CNPJ inválido."); // Mensagem padrão

// função para aceitar apenas número
jQuery.fn.apenasNumeros = function(){
    var $teclas = {8:'backspace',9:'tab',13:'enter',48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9};    
    $(this).keypress(function(e){
      var keyCode = e.keyCode?e.keyCode:e.which?e.which:e.charCode;
      if(keyCode in $teclas){
        return true;
      }else{
        return false;
      }
    });
    return $(this);
}

// função valida IE
jQuery.validator.addMethod("valida_ie", function(value, element) {
  var var_retorno = true;
  var ie = $(".os_solicitante_inscricao_estadual").val();
  var uf = $(".os_solicitante_uf").val().toUpperCase();
    //alert(ie + ' - ' + uf);
  if(ie != '' && uf != ''){
    var_retorno = validaIE(ie, uf);
  }
  return var_retorno;
}, "IE inválido! Digite IE válido ou ISENTO");  // Mensagem padrão


// função valida e-mail cadastrado
jQuery.validator.addMethod("email_cadastrado", function(value, element) {
	var var_retorno = false;
	$.ajax({
	  type: "POST",
	  url: 'valida_login.php',
	  data: {acao: 'email_cadastrado', email: value},
	  async: false,
	  success: function(data) {
		if (data == "")
			var_retorno = true;
	  }
	});
	return var_retorno;
}, "Email not registered!");  // Mensagem padrão

// função valida e-mail não cadastradado
jQuery.validator.addMethod("email_nao_cadastrado", function(value, element) {
	var usuario_id = $("#usuario_id").val();
	var var_retorno = false;
	$.ajax({
	  type: "POST",
	  url: 'valida_login.php',
	  data: {acao: 'email_nao_cadastrado', email: value, usuario_id: usuario_id},
	  async: false,
	  success: function(data) {
		if (data == "")
			var_retorno = true;
	  }
	});
	return var_retorno;
}, "Email already registered!");  // Mensagem padrão

jQuery.validator.addMethod("regra_senha_caracteres", function(value, element) {
  
  if (value.trim() != ''){
    var letra = /[a-z]/ig;
    var numero = /[0-9]/g;
    if ((letra.test(value)) && (numero.test(value))) return true;
    else return false;  
  }else
    return true;

}, "Password must contain letters and numbers");  // Mensagem padrão

jQuery.validator.addMethod("regra_senha_tamanho", function(value, element) {
  
  if (value.trim() != ''){
    var senha = value.trim().length;
    if ((senha >= 6) && (senha <= 20)) return true;
    else return false;  
  }else
    return true;

}, "Password must be between 6 and 20 characters");  // Mensagem padrão