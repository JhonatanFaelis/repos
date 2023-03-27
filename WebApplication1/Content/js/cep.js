var cepSelf = null;

function limpa_formulario_cep() {
    let pane = $(cepSelf.parents(".tab-pane")[0]);
    pane.find('.txtEndereco').val("");
    pane.find('.txtBairro').val("");
    pane.find('.Ibge_MunicipioCodigo').val("");
    pane.find('.txtUf').val("");
}

function meu_callback(conteudo) {    
    let pane = $(cepSelf.parents(".tab-pane")[0]);    

    if (!("erro" in conteudo)) {       
        //Atualiza os campos com os valores.
        pane.find('.txtEndereco').val(conteudo.logradouro);
        pane.find('.txtBairro').val(conteudo.bairro);
        pane.find('.Ibge_MunicipioCodigo').val(conteudo.ibge);
        pane.find('.txtUf').val(conteudo.uf);        
        pane.find('.txtCidade').empty().append("<option value='" + conteudo.localidade + "' class='" + conteudo.ibge + "'>" + conteudo.localidade + "</option>"); 
    } else {
        limpa_formulario_cep();
        alert("CEP não encontrado.");
        pane.find('.cep').val("");
    }
}

function pesquisacep(self, valor) {
    if (valor != "") {
        cepSelf = $(self);
        var cep = valor.replace('-', '').replace(' ', '');
    } else {
        return alert("Atenção informe um CEP")
    }
    

    //Verifica se campo cep possui valor informado.
    if (cep !== "") {
        var validacep = /^[0-9]{8}$/; //Expressão regular para validar o CEP.

        if (validacep.test(cep)) {  // Preenche os campos com "..." enquanto consulta webservice.
            let pane = $(cepSelf.parents(".tab-pane")[0])
            pane.find('.txtEndereco').val("...");
            pane.find('.txtBairro').val("...");
            pane.find('.Ibge_MunicipioCodigo').val("...");
            pane.find('.txtUf').val("...");

            //Cria um elemento javascript.
            var script = document.createElement('script');
            script.src = '//viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulario_cep();
    }
}

function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i);

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
}

function idade() {
    var data = document.getElementById("dtnasc").value;
    var dia = data.substr(0, 2);
    var mes = data.substr(3, 2);
    var ano = data.substr(6, 4);
    var d = new Date();
    var ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate();

    ano = +ano,
        mes = +mes,
        dia = +dia;
    var idade = ano_atual - ano;

    if (mes_atual < mes || mes_atual == mes_aniversario && dia_atual < dia) {
        idade--;
    }
    return idade;
}


function exibe(i) {
    document.getElementById(i).readOnly = true;
}

function desabilita(i) {
    document.getElementById(i).disabled = true;
}

function habilita(i) {
    document.getElementById(i).disabled = false;
}

function showhide() {
    var div = document.getElementById("newpost");
    if (idade() >= 18) {
        div.style.display = "none";
    }
    else if (idade() < 18) {
        div.style.display = "inline";
    }
}



