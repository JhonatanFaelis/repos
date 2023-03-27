function FormataStringDataJSON(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];
    var data = ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    data = data.split("-")
    return new Date(data[0], data[1] - 1, data[2])
}


function KeyupManual() {
    var tabela = $(".input-search").attr('alt');
    if ($(".input-search").val() != "") {
        $("." + tabela + " tbody>tr").hide();
        $("." + tabela + " td:contains-ci('" + $(".input-search").val() + "')").parent("tr").show();
    } else {
        $("." + tabela + " tbody>tr").show();
    }
}


$.extend($.expr[":"], {
    "contains-ci": function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});


$(document).ready(function (e) {
    //Comando responsavel por adcionar a classe nas linhas das tabelas que poderão ter suas colunas movidas
    $(".dragColumns tr").addClass("dnd-moved")

    // PESQUISA EM TABELA (padrão)...
    $("#txtPesqJQ").keyup(function () {
        var valor = accentsTidy($(this).val());
        $("#tabela_pag tbody tr").hide();
        $("#tabela_pag tbody tr").each(function (index) {
            $linha = $(this);
            $nome = accentsTidy($linha.find("td:nth-child(2)").text());

            if ($nome.indexOf(valor) !== -1) {
                $linha.show();
            }
        });
    });


    $('.dropdown-toggle').click(function () {
        $('.dropdown-menu').hide();
        $(this).next('.dropdown-menu').show().css("visibility", "visible").css("opacity", "1");
    });

    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
            $('.dropdown-menu').hide();
        }
    });
});



//HABILITAR ENTER P/ PULAR CAMPOS...
function tabParaEnter() {
    /*
    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();            
        }
    });

    $('select').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });
    */
}

$(document).on('keypress', 'input,select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable').not("a").not(".pular_enter");
        var index = $canfocus.index(document.activeElement) + 1;
        $canfocus.eq(index).focus();
    }
});

$(window).load(function () {
    //$canfocus = $('input:focusable, select:focusable, button:focusable').not("a").not(".pular_enter");
});


// VERIFCIAR FORÇA DAS SENHA...
function verificaForcaSenha() {
    var numeros = /([0-9])/;
    var alfabeto = /([a-zA-Z])/;
    var chEspeciais = /([~,!,@@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if ($('#txtSenha').val().length < 6) {
        $('#txtSenha-status').html("<span style='color:red; font-size:10px'>Fraco, insira no mínimo 6 caracteres</span>");
    } else {
        if ($('#txtSenha').val().match(numeros) && $('#txtSenha').val().match(alfabeto) && $('#txtSenha').val().match(chEspeciais)) {
            $('#txtSenha-status').html("<span style='color:green; font-size:10px'><b>Forte</b></span>");
        } else {
            $('#txtSenha-status').html("<span style='color:orange; font-size:10px'>Médio, insira um caracter especial</span>");
        }
    }
}



//ABRIR BUSCA AVANÇADA DE CLIENTES (ao clicar botão lupa)...
function PesquisarCliente(vForm, vDestino) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("clienteSelecao", "Localizar Cliente", "/Entidade/Index?tipo=C&Pesq=ok&vForm=" + vForm + "&destino=" + vDestino);
    
}

function PesquisarVenda(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("vendaSelecao", "Localizar Venda", "/Venda/Index?tabela=V&tipo=C&Pesq=ok&vForm=" + vForm);
}

function PesquisaCartao(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("cartaoSelecao", "Localizar Cartão", "/Cartao/Index?tipo=C&Pesq=ok&vForm=" + vForm);
}

function PesquisarProcesso(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("processoSelecao", "Localizar Processo", "/OrdemProd_Processo/Index?tipo=C&Pesq=ok&vForm=" + vForm);
}

function PesquisarParametros(vForm, parametro) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    if (parametro == "F") {
        top.$('#mainFrameTabs').bTabsAdd("faseSelecao", "Localizar Fase", "/OrdemProd_Fase/Index?tp=F&vForm=" + vForm);
    }
    if (parametro == "T") {
        top.$('#mainFrameTabs').bTabsAdd("tipoSelecao", "Localizar Tipo", "/OrdemProd_Fase/Index?tp=T&vForm=" + vForm);
    }
    if (parametro == "J") {
        top.$('#mainFrameTabs').bTabsAdd("justificativaSelecao", "Localizar Justificativa", "/OrdemProd_Fase/Index?tp=J&vForm=" + vForm);
    }
}

function PesquisaSugestao_Compra(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("Sugestao_Compra", "Localizar Sugestão de Compra", "/Sugestao_Compra/Index?Pesq=ok&vForm=" + vForm);
}

function PesquisarFornecedor(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("fornSelecao", "Localizar Fornecedor", "/Entidade/Index?tipo=F&Pesq=ok&vForm=" + vForm);
}

function PesquisarTransportadora(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("transSelecao", "Localizar Transportadora", "/Entidade/Index?tipo=T&Pesq=ok&vForm=" + vForm);
}

function PesquisarMotorista(destino) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("motoSelecao", "Localizar Motorista", "/Entidade/Index?tipo=M&Pesq=ok&vForm=" + vForm + "&destino=" + destino);
}

function PesquisaRequisicao_Compra(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("Requisicao_Compra", "Localizar Requisição de Compra", "/REQUISICAO/Index?Pesq=ok&vForm=" + vForm);
}

function PesquisaCotacao_Compra(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("cotacao_Compra", "Localizar Cotação de Compra", "/Cotacao_Produtos/Index?Pesq=ok&vForm=" + vForm);
}


function PesquisaAlmoxarifado(id_chamada) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("pesq_almoxarifado", "Localizar Almoxarifado", "/Almoxarifado/Index?vForm=" + vForm + "&id_chamada=" + id_chamada);
}

//ABRIR BUSCA AVANÇADA DE PRODUTOS OU SERVIÇO (ao clicar botão lupa)...
function PesquisaProd_Serv(vTab, TabelaPreco) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    if (vTab == "Produto") {
        if (TabelaPreco) {
            top.$('#mainFrameTabs').bTabsAdd("produtoSelecao", "Localizar Produto", "/Produto/Index/?Pesq=ok&vForm=" + vForm + "&TabelaPreco=" + TabelaPreco);
        }
        else {
            top.$('#mainFrameTabs').bTabsAdd("produtoSelecao", "Localizar Produto", "/Produto/Index/?Pesq=ok&vForm=" + vForm);
        }
    }
    else {
        top.$('#mainFrameTabs').bTabsAdd("servicoSelecao", "Localizar Serviço", "/Servico/Index/?Pesq=ok&vForm=" + vForm);
    }
}

function PesquisaMateriaPrima() {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("produtoSelecao", "Localizar Produto", "/Produto/Index/?Pesq=ok&materiaprima=S&vForm=" + vForm);
}

function PesquisarVendedor(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("vendedorSelecao", "Localizar Vendedor", "/Vendedor/Index?tipo=C&Pesq=ok&vForm=" + vForm);
}

function PesquisarCRM(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("crmSelecao", "Localizar CRM", "/crm/Index?tipo=C&Pesq=ok&tipo=0&vForm=" + vForm);
}

function PesquisarCRM_AtendimentoVinculado(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("crmSelecao_AtendimentoVinculado", "Localizar CRM para Atendimento Vinculado", "/crm/Index?tipo_selecao=AtendimentoVinculado&vForm=" + vForm);
}

function PesquisarOS(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("osSelecao", "Localizar Ordem de Serviço", "/Ordem_Serv/Index?form=" + vForm);
}

function PesquisarBanco(destino) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("bancoSelecao", "Localizar Banco", "/Banco/Index?form=" + vForm + "&destino=" + destino);
}

function PesquisarFrota(vForm) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("frotaSelecao", "Localizar Frota", "/Frota/Index?tipo=C&Pesq=ok&tipo=0&vForm=" + vForm);
}

function PesquisarFuncionario(destino) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("funcionarioSelecao", "Localizar Colaborador", "/RH_FUNC/Index?tipo=C&Pesq=ok&tipo=0&destino=" + destino + "&vForm=" + vForm);
}

function PesquisarComunicado(vForm, vDestino) {
    var vForm = top.$('.nav-tabs.tabprincipal .active a').attr('href').replace('#', '');
    top.$('#mainFrameTabs').bTabsAdd("comunicadoSelecao", "Localizar Comunicado", "/Comunicado/Index?vForm=" + vForm);

}

//Abrir Pagina de historico da entidade
function Abrir_Pagina_Historico(id) {
    AbrirPagGuia('hist_cli', 'Histórico do Cliente', '/Entidade/Historico/?id=' + id);
}

function abrir_selecao_natureza(form) {
    AbrirPagGuia('cfop', 'Selecionar Natureza/CFOP', `/Fiscal_Natureza_Opera/Index/?vForm=${form}`);
}

//ABRIR PÁGINA EM NOVA GUIA/TAB...
function AbrirPagGuia(vAdd, vNome, url) {
    var aba = "#bTabs_" + vAdd;
    top.Fechar_tab(aba, "");
    top.$('#mainFrameTabs').bTabsAdd(vAdd, vNome, url);
    //top.$('#mainFrameTabs').bTabsAdd("servicoSelecao", "Localizar Serviço", "/Servico/Index/?Pesq=ok&vForm=" + vForm);
}


// IMPRIMIR PADRÃO DE TODAS PAGINAÇÕES...
function printDIV(html) {
    if (html) {
        var tela_impressao = window.open('about:blank');
        tela_impressao.document.write(html);
    }
    else {
        html = "";
        var conteudo = document.getElementById('yesprint').innerHTML;
        conteudo = "<html><head><title class='ttt'>Relatorio</title></head>" + conteudo + " <style>table{border-collapse:collapse !important}#subtotal{border-bottom:2px dotted black !important;}#printsubtitulo{display:block !important}select{-webkit-appearance: none;-moz-appearance: none; border:none}table tr {white-space: nowrap;} tfoot  tr  td {text-align: right !important; padding-top:5px!important} .texto_empresa {display:block!important}</style>" + "</html>";
        var tela_impressao = window.open('about:blank');
        tela_impressao.document.write(conteudo);
        //var tab = "de " + top.$(".nav-tabs .active a").html().replace(/\<.*/g, '');
        var tab = top.$(".nav-tabs .active a").html().replace(/\<.*/g, '');
        if (tela_impressao.document.getElementById("imprimirtitulo") != null) {
            //tela_impressao.document.getElementById("imprimirtitulo").innerHTML = " - Relatório " + (tab != "" ? tab : "");
            tela_impressao.document.getElementById("imprimirtitulo").innerHTML = " - " + (tab != "" ? tab : "");
        }
        //tela_impressao.document.getElementById("imprimirtitulo").innerHTML = " - Relatório " + (tab != "" ? tab : "" );        
    }
    Processo("normal");

    if (!html.includes("codigo=842")) {
        tela_impressao.print();
        tela_impressao.close();
    }

}


//MÉTODO NOVO DE IMPRESSÃO - FAZ FUNCIONAR LOGO E SCRIPTS NA PÁGINA
//DEPENDE DO CLOSEPRINT() SER CHAMADO NA PÁGINA DA IMPRESSÃO, NO $(window).load,
//PARA IMPRIMIR/ CANCELAR E FECHAR JANELA AUTOMATICAMENTE
//IMPORTAR A LIB FUNÇÕES NA PAGINA -- EXEMPLO ROMANEIO - IMPRESSAO
function ChamarImpressao(url) {
    var popup = window.open(url, ' null', ' width = 800, height = 800, toolbar = no , scrollbars = no , location = no, resizable = no ');
}
function ClosePrint() {
    setTimeout(function () { window.print(); window.close(); }, 500);
}

function verificarDataLicenca(data, form, tipo) {
    if (data) {
        top.frame = top.$(form).find("iframe");

        let data_venc_licenca = ConverteDataCSharp_Para_DataJs(data).split('-');
        let data_venc_string = ConverteDataCSharp_Para_DataJs(data);

        let date_now = new Date()
        date_now = date_now.toISOString().split('T')[0].split('-');

        var data_venc_obj = new Date(data_venc_licenca[0], (parseInt(data_venc_licenca[1]) -1), data_venc_licenca[2]); //Year, Month, Date
        var date_now_obj = new Date(date_now[0], (parseInt(date_now[1]) -1), date_now[2]);

        //cliente pediu para realizar a verificação 5 dias antes do vencimento.
        data_venc_obj.setDate(data_venc_obj.getDate() - 5);

        if (data_venc_obj <= date_now_obj) {
            top.frame.contents().find(".data_venc").find("#data_licenca").html(FormataDataHTMLparaDataPTBR(data_venc_string));
            top.frame.contents().find(".data_venc").css("display", "inline-block")

            let termo_entidade = "";
            if (tipo == "C") {
                top.frame.contents().find("#licenca_expirada_cli").val("S");
                termo_entidade = "Cliente";
            }
            else if (tipo == "T") {
                top.frame.contents().find("#licenca_expirada_transp").val("S");
                termo_entidade = "Transportadora";
            }

            top.frame.contents().find("#tipo_entidade_escrito").html(termo_entidade);

        }
        else {
            if (tipo == "C") {
                if (top.frame.contents().find("#licenca_expirada_transp").val() == "N") {
                    top.frame.contents().find(".data_venc").css("display", "none");
                }
                else {
                    GetDataLicenca(parseInt(top.frame.contents().find("#TransportadoraID").val()), form, "T");
                }

                top.frame.contents().find("#licenca_expirada_cli").val("N");
            }
            else if (tipo == "T") {
                if ((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc")) {
                    if (top.frame.contents().find("#licenca_expirada_cli").val() == "N") {
                        top.frame.contents().find(".data_venc").css("display", "none");
                    }
                    else {
                        GetDataLicenca(parseInt(top.frame.contents().find("#lblCodCli").html()), form, "C");
                    }

                    top.frame.contents().find("#licenca_expirada_transp").val("N");
                }
                else if (form == "#bTabs_rel_romaneio") {
                    top.frame.contents().find(".data_venc").css("display", "none");
                }
            }
        }
    }
    else {
        if (tipo == "C") {
            if (top.frame.contents().find("#licenca_expirada_transp").val() == "N") {
                top.frame.contents().find(".data_venc").css("display", "none");
            }
            else {
                GetDataLicenca(parseInt(top.frame.contents().find("#TransportadoraID").val()), form, "T");
            }

            top.frame.contents().find("#licenca_expirada_cli").val("N");
        }
        else if (tipo == "T") {
            if ((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc")) {
                if (top.frame.contents().find("#licenca_expirada_cli").val() == "N") {
                    top.frame.contents().find(".data_venc").css("display", "none");
                }
                else {
                    GetDataLicenca(parseInt(top.frame.contents().find("#lblCodCli").html()), form, "C");
                }

                top.frame.contents().find("#licenca_expirada_transp").val("N");
            }
            else if (form == "#bTabs_rel_romaneio") {
                top.frame.contents().find(".data_venc").css("display", "none");
            }

            
        }
    }
}

function GetDataLicenca(ID, form, tipo) {
    if (((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc") || (form == "#bTabs_rel_romaneio")) && (ID)) {
        $.ajax({
            async: false,
            dataType: "json",
            type: "POST",
            url: "/Entidade/GetDataLicenca",
            data: { "ID": ID },
            success: function (data_venc_licenca_compra) {
                verificarDataLicenca(data_venc_licenca_compra, form, tipo);
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }
}

function selecionaCliente(vCodigo, form, fechar_tab = "clienteSelecao", cod_cli_sistema = "0", destino, PGTO_CONFIG, PGTO_TIPO_CONFIG, VENDA_ENDENTREGA_AUTO) {
    var vInativo = false;
    var Obs = "";
    var OBSCADASTRAL, SEGMENTO = "";
    var BLOQUEAR_MOVI = "";
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Entidade/GetDados",
        data: { "Codigo": vCodigo },
        success: function (dados) {
            
            top.lblCodCli = "";
            top.lblCodCli2 = "";
            top.lblFantasia = "";
            top.txtEntidade = "";
            top.txtNome = "";
            top.txtEnde = "";
            top.txtEnde1 = "";
            top.txtBairro = "";
            top.lblCnpj = "";
            top.entidade_tabpreco = "";
            top.txtBairro1 = "";
            top.txtCidade = "";
            top.txtUF = "";
            top.txtCep = "";
            top.txtFone = "";
            top.txtCnpj = "";
            top.txtIE = "";
            top.txtEndeNum = "";
            top.txtPais = "";
            top.txtTipo_Trib = "";
            top.PGTO_LIMITE = "0";
            top.DEBITO_ATUAL = "0";
            top.FINANC_PLC_GRAU = "";
            top.FINANC_PLC_ID = "";
            top.txtDescoPorcentagem = "";
            top.tipo = '';
            top.VendedorID = '';
            top.PGTO_ALERTA_OPERADOR = '';
            top.PLACA = '';
            top.DATA_VENC_LICENCA_COMPRA = '';
            top.IMPOSTO_ISENTO_PISCOFINS = '';
            top.PRODUTOS = [];
            top.PGTO = "";
            top.PGTO_TIPO = "";
            top.CREDITO_CONTA_CORRENTE = "";
            top.BLOQ_FINANC_VENDA = "";
            top.EMPRESA = "";
            top.BANCO_BANCO = "";
            top.BANCO_AGENCIA = "";
            top.BANCO_CONTA = "";
            top.BANCO_FAVORECIDO = "";
            top.BANCO_CHAVE = "";
            top.DIA_MANU = "";
            
            var forma_pgto_origem = "cliente", tipo_pgto_origem = "cliente";
            $(dados).each(function (i) {

                if (cod_cli_sistema == "609") {
                    if (!top.frame.contents().find("#VendedorID").val()) {
                        top.frame.contents().find("#VendedorID").val(dados[i].VEND1);
                    } else {
                        if (dados[i].VEND1 != "") {
                            if ((top.frame.contents().find("#VendedorID").val() == dados[i].VEND1)) {
                                try {
                                    top.frame.contents().find("#VendedorID").val(dados[i].VEND1);
                                } catch (e) {

                                }
                            } else {
                                alert("Cliente escolhido não pertence ao vendedor selecionado!!!");
                                vInativo = true
                            }
                        }
                    }
                }
                if (form == "#bTabs_conta_receber") {
                    top.DIA_MANU = dados[i].PGTO_MANU_DIA?.toString().padStart(2, '0');
                }


                if (parseFloatPtBR(dados[i].TRANSP) > 0) {
                    if (form == "#bTabs_movi_venda") {
                        top.frame.contents().find("#TransportadoraID").val(dados[i].TRANSP);
                    }
                    if (form == "#bTabs_fis_nfe") {
                        top.frame.contents().find("#TRANSPORTADORA").val(dados[i].TRANSP);
                    }
                }
                
                top.lblCodCli = dados[i].Id;
                top.lblCodCli2 = dados[i].Id;
                if (dados[i].Fantasia != dados[i].Razao)
                    top.lblFantasia = dados[i].Fantasia;
                top.txtEntidade = dados[i].Id;
                //Giovani - 23/08/22 - Tratamento adicionado para casos de conversão
                //onde a entidade não tem uma razão definida e sim uma fantasia.
                if (dados[i].Razao != "") {
                    top.txtNome = dados[i].Razao;
                } else if (dados[i].Fantasia != "") {
                    top.txtNome = dados[i].Fantasia;
                }
                if (form == "#bTabs_CRM") {
                    top.txtNome = dados[i].Fantasia;
                    top.qtde_crm_aberto = dados[i].qtde_crm_aberto;
                }
                
                top.txtEnde = dados[i].Ende;
                top.txtEnde1 = dados[i].Ende1;
                top.txtBairro = dados[i].Bairro + " - " + dados[i].Cidade + " - " + dados[i].UF;
                top.txtBairro1 = dados[i].Bairro;
                top.txtCidade = dados[i].Cidade;
                top.txtUF = dados[i].UF;
                top.lblCnpj = dados[i].Cnpj;
                top.txtIbge = dados[i].Ibge;
                top.txtCep = dados[i].Cep;
                top.txtFone = dados[i].Fone;
                top.txtCnpj = dados[i].Cnpj;
                top.txtIE = dados[i].IE;
                top.txtPais = dados[i].Pais;
                top.txtEndeNum = dados[i].EndeNum;
                top.txtTipo_Trib = dados[i].Tipo_Trib;
                top.FINANC_PLC_GRAU = dados[i].FINANC_PLC_GRAU;
                top.FINANC_PLC_ID = dados[i].FINANC_PLC_ID;
                top.PLACA = dados[i].PLACA;
                top.PRODUTOS = dados[i].PRODUTOS;
                Obs = dados[i].Obs_Venda;
                OBSCADASTRAL = dados[i].OBSCADASTRAL;
                SEGMENTO = dados[i].SEGMENTO;

                top.BANCO_BANCO = dados[i].BANCO_NOME;
                top.BANCO_AGENCIA = dados[i].BANCO_AGENCIA;
                top.BANCO_CONTA = dados[i].BANCO_CONTA;
                top.BANCO_FAVORECIDO = dados[i].BANCO_FAVORECIDO;
                top.BANCO_CHAVE = dados[i].BANCO_CHAVE;

                if (VENDA_ENDENTREGA_AUTO == "S") {
                    top.frame.contents().find("#txtObs1").val(dados[i].Ende_ent);
                }

                top.BLOQ_FINANC_VENDA = dados[i].BLOQ_FINANC_VENDA


                if (dados[i].TabPreco != "") {
                    top.entidade_tabpreco = dados[i].TabPreco;
                } else {
                    top.entidade_tabpreco = "1";
                }

                top.PGTO_LIMITE = dados[i].PGTO_LIMITE;
                top.DEBITO_ATUAL = dados[i].DEBITO_ATUAL;
                top.CREDITO_CONTA_CORRENTE = dados[i].CREDITO_CONTA_CORRENTE;

                top.txtDescoPorcentagem = dados[i].PGTO_DESCO;
                top.txtEmail = dados[i].EMAIL;
                top.tipo = dados[i].TIPO;
                BLOQUEAR_MOVI = dados[i].BLOQUEAR_MOVI;
                top.PGTO_FIDC = dados[i].PGTO_FIDC;
                top.VendedorID = dados[i].VEND1;
                top.PGTO_ALERTA_OPERADOR = dados[i].PGTO_ALERTA_OPERADOR;
                
                if (parseFloatPtBR(dados[i].EMPRESA) > 0) {
                    top.EMPRESA = dados[i].EMPRESA;
                }
                
                top.DATA_VENC_LICENCA_COMPRA = dados[i].DATA_VENC_LICENCA_COMPRA;
                top.IMPOSTO_ISENTO_PISCOFINS = dados[i].IMPOSTO_ISENTO_PISCOFINS;

              
                if (dados[i].PGTO) {
                    top.PGTO = dados[i].PGTO;
                }
                else if (PGTO_CONFIG) {
                    top.PGTO = PGTO_CONFIG;
                    forma_pgto_origem = "config"
                }
                //PGTO_TIPO
                if (dados[i].PGTO_TIPO) {
                    top.PGTO_TIPO = dados[i].PGTO_TIPO;
                }
                else if (PGTO_CONFIG) {
                    top.PGTO_TIPO = PGTO_TIPO_CONFIG;
                    tipo_pgto_origem = "config"
                }


                if (dados[i].Inativo == "S") {
                    alert("Cliente Inativo! Não liberado para venda \n" + dados[i].Fantasia);
                    vInativo = true;
                }
            });

            let class_drop = "";
            if ((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc")) {
                class_drop = ".prod_entidade";

                top.frame = top.$(form).find("iframe");
                if (top.PGTO) {
                    top.frame.contents().find("#PagamentoID").val(top.PGTO);
                    if ((top.BLOQ_FINANC_VENDA == "S") && (forma_pgto_origem == "cliente")) {
                        top.frame.contents().find("#PagamentoID").attr("readonly", "readonly").css("pointer-events", "none").css("touch-action", "none").attr("tabindex", "-1")
                    } else {
                        top.frame.contents().find("#PagamentoID").removeAttr("readonly", "readonly").css("pointer-events", "").css("touch-action", "").removeAttr("tabindex", "-1")

                    }

                }


                if (top.PGTO_TIPO) {
                    top.frame.contents().find("#Pagamento_TipoID").val(top.PGTO_TIPO);
                    if ((top.BLOQ_FINANC_VENDA == "S") && tipo_pgto_origem == "cliente") {
                        top.frame.contents().find("#Pagamento_TipoID").attr("readonly", "readonly").css("pointer-events", "none").css("touch-action", "none").attr("tabindex", "-1")
                    } else {
                        top.frame.contents().find("#Pagamento_TipoID").removeAttr("readonly", "readonly").css("pointer-events", "").css("touch-action", "").removeAttr("tabindex", "-1")

                    }
                }

            }
            else if (form == "#bTabs_movi_consigna") {
                class_drop = ".prod_entidade_consig";
            }
            if (top.PRODUTOS.length > 0) {
                top.frame.contents().find(class_drop).css("display", "block");
            }
            else {
                top.frame.contents().find(class_drop).css("display", "none");
            }
            
            verificarDataLicenca(top.DATA_VENC_LICENCA_COMPRA, form, top.tipo);

            if (form == "#bTabs_CRM") {
                top.frame.contents().find("#txtObsCadastral").val(OBSCADASTRAL);
                if (SEGMENTO != "")
                    top.frame.contents().find("#SEGMENTO_ID").val(SEGMENTO);
                top.frame.contents().find("#qtde_crm_aberto").val(top.qtde_crm_aberto);
                top.frame[0].contentWindow.MostrarBotaoFicha();
            }

            if (form == "#bTabs_movi_pedcompra") {
                top.frame.contents().find("#lbl_banco").html(top.BANCO_BANCO);
                top.frame.contents().find("#lbl_agencia").html(top.BANCO_AGENCIA);
                top.frame.contents().find("#lbl_conta").html(top.BANCO_CONTA);
                top.frame.contents().find("#lbl_favorecido").html(top.BANCO_FAVORECIDO);
                top.frame.contents().find("#lbl_pix").html(top.BANCO_CHAVE);
            }

            if (form == "#bTabs_ct_e") {

                top.frame = top.$(form).find("iframe");

                if (destino == "remetente" || destino == "destinatario" || destino == "expedidor" || destino == "recebedor") {
                    let prefixo = "";
                    switch (destino) {
                        case "remetente": {
                            prefixo = "#REMETE_";
                            top.frame.contents().find("#PREST_ORIG_IBGE").val(top.txtIbge);
                            top.frame.contents().find("#PREST_ORIG_UF").val(top.txtUF);
                            CarregarCidades(top.frame.contents().find("#PREST_ORIG_LOCAL"), top.frame.contents().find("#PREST_ORIG_UF"), top.frame.contents().find("#PREST_ORIG_IBGE"), top.txtIbge, false);

                        } break;
                        case "destinatario": {
                            prefixo = "#DESTINA_";
                            top.frame.contents().find("#PREST_DEST_IBGE").val(top.txtIbge);
                            top.frame.contents().find("#PREST_DEST_UF").val(top.txtUF);
                            CarregarCidades(top.frame.contents().find("#PREST_DEST_LOCAL"), top.frame.contents().find("#PREST_DEST_UF"), top.frame.contents().find("#PREST_DEST_IBGE"), top.txtIbge, false);
                        } break;
                        case "expedidor": prefixo = "#EXPEDI_"; break;
                        case "recebedor": prefixo = "#RECEBE_"; break;
                    }

                    top.frame.contents().find(prefixo + "ENTIDADE").val(top.lblCodCli);
                    top.frame.contents().find(prefixo + "RAZAO").val(top.txtNome);
                    top.frame.contents().find(prefixo + "CNPJ").val(top.lblCnpj);
                    top.frame.contents().find(prefixo + "IE").val(top.txtIE);
                    top.frame.contents().find(prefixo + "END").val(top.txtEnde);
                    top.frame.contents().find(prefixo + "END_NR").val(top.txtEndeNum);
                    top.frame.contents().find(prefixo + "BAIRRO").val(top.txtBairro);
                    top.frame.contents().find(prefixo + "CIDADE").val(top.txtCidade);
                    top.frame.contents().find(prefixo + "CEP").val(top.txtCep);
                    top.frame.contents().find(prefixo + "UF").val(top.txtUF);


                }
                else if (destino == "motorista") {
                    top.frame.contents().find("#MOTORISTA").val(top.lblCodCli);
                    top.frame.contents().find("#PLACA").val(top.PLACA);
                }
                else if (destino == "coleta") {
                    top.frame.contents().find("#COLETA_ENTIDADE").val(top.lblCodCli);
                    top.frame.contents().find("#COLETA_RAZAO").val(top.txtNome);
                    top.frame.contents().find("#COLETA_FANTASIA").val(top.lblFantasia);
                    top.frame.contents().find("#COLETA_CIDADE").val(top.txtCidade);
                }
                else if (destino == "local") {
                    top.frame.contents().find("#LOCAL_ENTIDADE").val(top.lblCodCli);
                    top.frame.contents().find("#LOCAL_RAZAO").val(top.txtNome);
                    top.frame.contents().find("#LOCAL_FANTASIA").val(top.lblFantasia);
                    top.frame.contents().find("#LOCAL_CIDADE").val(top.txtCidade);
                }
                else if (destino == "outros") {
                    top.frame.contents().find("#OUTROS_ENTIDADE").val(top.lblCodCli);
                    top.frame.contents().find("#OUTROS_RAZAO").val(top.txtNome);
                    top.frame.contents().find("#OUTROS_FANTASIA").val(top.lblFantasia);
                    top.frame.contents().find("#OUTROS_CIDADE").val(top.txtCidade);
                }
                

                top.Fechar_tab("clienteSelecao", form);
                return false;
            }


            if (((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc") || (form == "#bTabs_movi_consigna"))) {
                if (BLOQUEAR_MOVI == "S") {
                    alert("Cliente bloqueado para movimentações \n" + top.txtNome);
                    vInativo = true;
                }

            }

            if (vInativo == false) {                

                if (((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc") || (form == "#bTabs_movi_consigna"))) {
                    if (Obs != "") {
                        alert('Observação para venda:\n' + Obs);
                    }
                }

                if (form == "#bTabs_nfs_e" && "@ViewBag.tipo" == "F") {
                    top.frame = top.$(form).find("iframe");
                    top.frame.contents().find("#id_fornec").val(top.lblCodCli);
                    top.frame.contents().find("#fornecedor_RAZAO").val(top.txtNome);
                    top.frame.contents().find("#fornecedor_CNPJ").val(top.lblCnpj);
                }
                else if ((form == "#bTabs_est_Entrada" || form == "#bTabs_est_saida") && "@ViewBag.tipo" == "T") {
                    top.frame = top.$(form).find("iframe");
                    top.frame.contents().find("#TRANSP").val(top.txtNome);
                }
                //else if (form == "#prevenda") {
                //    top.frame = top.$("#bTabs_movi_consigna").find("iframe");
                //    top.frame.contents().find(".input-search").val(top.txtNome);
                //    top.frame.contents().find('.input-search').trigger('keyup');
                //}
                else {

                    top.frame = top.$(form).find("iframe");

                    top.frame.contents().find("#lblCodCli").html(top.lblCodCli);
                    top.frame.contents().find("#lblCodCli_modal_juros").html(top.lblCodCli);
                    top.frame.contents().find("#lblCodCli2").val(top.lblCodCli);
                    top.frame.contents().find("#lblFantasia").html(top.lblFantasia);
                    top.frame.contents().find("#txtEntidade").val(top.txtEntidade);

                    top.frame.contents().find("#ENTIDADE").val(top.txtEntidade);

                    top.frame.contents().find("#txtNome").val(top.txtNome);
                    top.frame.contents().find("#txtNome_modal_juros").val(top.txtNome);
                    if (form == "#bTabs_movi_venda") {
                        try {
                            top.frame[0].contentWindow.exibeHistorico();
                        } catch (e) {
                        }
                        if (top.EMPRESA > 0) {
                            top.frame.contents().find("#EMPRESA").val(top.EMPRESA);
                        }                        
                    }

                    top.frame.contents().find("#txtNome2").val(top.txtNome);
                    top.frame.contents().find("#pesq").val(top.txtNome);
                    top.frame.contents().find("#txtPesq").val(top.txtNome);
                    top.frame.contents().find("#codcli").val(top.lblCodCli);
                    top.frame.contents().find("#txtEnde").html(top.txtEnde);
                    top.frame.contents().find("#txtBairro").html(top.txtBairro);
                    top.frame.contents().find("#txtCidade").html(top.txtCidade);
                    top.frame.contents().find("#txtCidade").val(top.txtCidade);
                    top.frame.contents().find("#txtUF").html(top.txtUF);
                    top.frame.contents().find("#txtFone").html(top.txtFone);
                    top.frame.contents().find("#txtCep").html(top.txtCep);
                    top.frame.contents().find("#lblCnpj").html("CNPJ: " + top.lblCnpj);

                    top.frame.contents().find("#MOTORISTA").val(top.txtNome);
                    top.frame.contents().find("#MOTORISTA_CPF").val(top.lblCnpj);
                    top.frame.contents().find("#ID_MOTORISTA").val(top.lblCodCli);

                    if (form.includes("#bTabs_frota_movi")) {
                        top.frame.contents().find("#txtPesq").val(top.txtNome);
                    }

                    top.frame.contents().find("#txtMotorista").val(top.txtNome);
                    top.frame.contents().find("#entidade_tabpreco").val(top.entidade_tabpreco);
                    top.frame.contents().find("#TabelaPrecoID").val(top.entidade_tabpreco);
                    top.frame.contents().find("#PGTO_LIMITE").val(top.PGTO_LIMITE);
                    top.frame.contents().find("#DEBITO_ATUAL").val(top.DEBITO_ATUAL);
                    top.frame.contents().find("#CREDITO_CONTA_CORRENTE").val(top.CREDITO_CONTA_CORRENTE);
                    top.frame.contents().find("#txtDescoPorcentagem").val(top.txtDescoPorcentagem);
                    top.frame.contents().find("#txtVendedorCliente").val(top.VendedorID);
                    top.frame.contents().find("#lblObsFinanc").text("")
                    if (top.PGTO_ALERTA_OPERADOR.trim() != "") {
                        top.frame.contents().find("#div_ciente_OBS_FINANC").show();
                        top.frame.contents().find("#lblObsFinanc").text("**" + top.PGTO_ALERTA_OPERADOR + "**").css("color", "red");
                    } else {
                        top.frame.contents().find("#div_ciente_OBS_FINANC").hide();
                    }
                    top.frame.contents().find("#txtEmail").val(top.txtEmail);
                    top.frame.contents().find("#txtFone").val(top.txtFone);

                    //campos p/ nfe
                    top.frame.contents().find("#txtEndeNum").val(top.txtEndeNum);
                    top.frame.contents().find("#txtEnde1").val(top.txtEnde1);
                    top.frame.contents().find("#txtBairro1").val(top.txtBairro1);
                    top.frame.contents().find("#txtCidade1").val(top.txtCidade);
                    top.frame.contents().find("#txtUF1").val(top.txtUF);
                    top.frame.contents().find("#txtIbge").val(top.txtIbge);
                    top.frame.contents().find("#txtCep1").val(top.txtCep);
                    top.frame.contents().find("#txtCnpj").val(top.txtCnpj);
                    top.frame.contents().find("#txtIE").val(top.txtIE);
                    top.frame.contents().find("#txtFone1").val(top.txtFone);
                    top.frame.contents().find("#txtPais").val(top.txtPais);
                    top.frame.contents().find("#txtTipo_Trib").val(top.txtTipo_Trib);

                    if (top.frame.contents().find("#txtGrau").val() == "") {
                        top.frame.contents().find("#txtGrau").val(top.FINANC_PLC_GRAU);
                        top.frame.contents().find("#txtGrau_Pai_ID").val(top.FINANC_PLC_ID);
                    }
                    
                    top.frame.contents().find("#IMPOSTO_ISENTO_PISCOFINS").val(top.IMPOSTO_ISENTO_PISCOFINS);                    

                    top.frame.contents().find("#lbl_total_cred").html('');
                    top.frame.contents().find("#itens_credito").html('');

                    if (form == "#bTabs_conta_pagar" || form == "#bTabs_financ_prev_fixo") {
                        top.frame.contents().find("#_TP_FINANC_PAGAR").val('');
                    }     

                    if (form == "#bTabs_CRM" && top.tipo == "C") {
                        try {
                            top.frame[0].contentWindow.MostrarBotaoFicha();
                        } catch (e) {

                        }
                    }

                    top.frame.contents().find("#cliente_modal_credito").val('');
                    if (top.PGTO_FIDC) {
                        top.frame.contents().find("#div_ciente_FIDC").show();
                    }
                    else {
                        top.frame.contents().find("#div_ciente_FIDC").hide();
                    }

                    //campos para agenda
                    top.frame.contents().find("#__txtNome").val(top.txtNome);
                    top.frame.contents().find("#__TIPO").val("@ViewBag.tipo");
                    top.frame.contents().find("#__ID_ENTIDADE").val(top.lblCodCli);
                    if ("@ViewBag.tipo" == "C") {
                        top.frame.contents().find("#__lbl_tipo").html("(Cliente)");
                    }
                    if ("@ViewBag.tipo" == "F") {
                        top.frame.contents().find("#__lbl_tipo").html("(Fornecedor)");
                    }

                    if (((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc") || (form == "#bTabs_movi_consigna"))) {
                        if (parseFloatPtBR(top.frame.contents().find("#PGTO_LIMITE").val()) > 0 || parseFloatPtBR(top.frame.contents().find("#CREDITO_CONTA_CORRENTE").val()) > 0) {
                            top.frame.contents().find("#btncredito").show();
                        } else {
                            top.frame.contents().find("#btncredito").hide();
                        }
                    }


                    if (dados[0].cashback.length > 0 && form == "#bTabs_movi_venda") {
                        top.frame.contents().find("#btncashback").show();

                        if (form == "#bTabs_movi_venda") {

                            var texto = "<div class='panel panel-primary' style='width: 100%; margin: 0 auto;'>" +
                                "<div class='panel-heading'>Cashback</div>" +
                                "<div class='panel-body'>" +
                                "<div class='col-md-12' style='margin: 6px 0 16px 0; text-align: left; padding: 0;'>" +
                                "<a href='javascript:FecharModalCashback();' class='btn btn-cancel btn-tamanho'>" +
                                "<span class='glyphicon glyphicon-remove' style='margin: 0px 5px 0px -5px;'></span>Fechar" +
                                "</a></div>";

                            texto += "<div id='yesprint' class='form-group'>" +
                                "<div class='form-group'>" +
                                "<div class='col-md-12' style='padding-left:0'>" +
                                "<div class='table-responsive'>" +
                                "<table class='table StyleTable'>" +
                                "<thead style='background: #3498db; color: #fff;'>" +
                                "<tr>" +
                                "<th>Venda</th>" +
                                "<th>Data Emissão</th>" +
                                "<th>Vencimento</th>" +
                                "<th>R$ Valor</th>" +
                                "<th>Selecionar</th>" +
                                "</tr>" +
                                "</thead>" +
                                "<tbody id='itenscash' style='font-size: 12px;'>";

                            $(dados[0].cashback).each(function (i) {
                                texto += "<tr> " +
                                    "<td style='text-align: left'>" + dados[0].cashback[i].ID + "</td>" +
                                    "<td style='text-align: left'>" + ConverteDataCSharp_Para_DataJs(dados[0].cashback[i].DATA_EMISSAO) + "</td>" +
                                    "<td style='text-align: left'>" + ConverteDataCSharp_Para_DataJs(dados[0].cashback[i].CASHBACK_DATA_VENC) + "</td>" +
                                    "<td style='text-align: right'>" + formatMoedaPtBr(dados[0].cashback[i].CASHBACK_VALOR) + "</td>" +
                                    "<td><input type='checkbox' class='check' onclick='DescontoCashback()'/></td>" +
                                    "</tr>";
                            });

                            texto += "</tbody>";
                            texto += "</table>";
                            texto += "</div>";
                            texto += "</div>";

                            texto += "</div>";
                            texto += "</div>";
                            texto += "</div>";
                            texto += "</div>";

                            top.frame.contents().find("#div_cashback").html(texto);
                        }

                    } else {
                        top.frame.contents().find("#btncashback").hide();
                    }

                    top.frame.contents().find("#txtCodPro").focus();
                    if ((form == "#bTabs_movi_venda") || (form == "#bTabs_movi_orc")) {
                        if (top.frame[0].contentWindow.location.href.includes("Details_Venda")) {
                            top.frame[0].contentWindow.carregaObra();
                            top.frame[0].contentWindow.Somar_Itens();
                            top.frame[0].contentWindow.checar_creditos_cliente();                            
                            if (form == "#bTabs_movi_venda") {
                                top.frame[0].contentWindow.VerificaBancoCartao();
                            }

                        }
                    }

                    if (top.frame[0] && top.frame[0].contentWindow.location.href.includes("Financ_Receber/Index")) {
                        try {
                            top.frame[0].contentWindow.checar_creditos_cliente();
                        } catch (e) {

                        }
                    }

                }

                top.$(".nav-tabs a").each(function () {
                    if (this.href.indexOf(form) !== -1) {
                        top.$(this).trigger("click");
                    }
                });
                if (form == "#prevenda") {
                    //top.frame = top.$("#bTabs_movi_consigna").find("iframe");
                    //top.frame.contents().find('.input-search').trigger('keyup');
                    //debugger;
                    //top.frame[0].contentWindow.KeyupManual();
                    //debugger;
                    //top.$('.nav-tabs.tabprincipal .active a').attr('href')
                    //$("#modal_prevenda").find(".input-search").trigger('keyup');
                    $('.input-search', top.window.frames[0].document).val(top.txtNome);
                    $('.input-search', top.window.frames[0].document).trigger('keyup');
                }
                if (form == "#bTabs_CRM") {
                    
                    top.frame = top.$(form).find("iframe");
                    top.frame[0].contentWindow.mostra_esconde_drop();
                }

                if (form == "#bTabs_conta_receber") {
                    top.frame.contents().find("#lbl_dia_manu").html(top.DIA_MANU);
                    if (parseFloatPtBR(top.DIA_MANU) > 0) {
                        top.frame.contents().find("#div_manu_financ_manual").show();
                    }
                    else {
                        top.frame.contents().find("#div_manu_financ_manual").hide();
                    }
                }

                top.Fechar_tab(fechar_tab.replace("#", ""), form);


            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}


// IMPRESSÃO 40 DIRETA COLUNAS...
var imprimirAjax = function (url) {
    $.ajax({
        type: "GET",
        url: (url),
    }).done(function (req) {
        if (req && req !== "") {
            printDIV(req);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText)
    });
}

// IMPRESSÃO 40 DIRETA COLUNAS - recebe parâmetro via POST...
var imprimirAjaxComParametroPOST = function (url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
    }).done(function (req) {
        if (req && req !== "") {
            printDIV(req);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText)
    });
}

//O CONTROLLER DEVE DAR UM RETURN VIEW
var ChamarImpressaoPost = function (url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
    }).done(function (req) {
        var tela_impressao = window.open('about:blank');
        tela_impressao.document.write(req);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText)
    });
}

// GERAR ARQUIVO .txt NO SERVIDOR (usado nastante p/ documetos fiscais)...
function Emitir_CupomFiscal(id) {
    $.ajax({
        type: "GET",
        url: "/Venda/Emitir_CupomFiscal",
        data: {
            id: id
        }
    }).done(function (req) {
        alert("ok")
    });
}


// BOTÃO ABRIR HTML EM MODAL...
function AbrirModal(vControler, vID, classeParaDesabilitar) {
    $('#myModal').modal("hide");
    if ($("#myModal table").length > 0 && $('#myModal').data("controller") == vControler + vID) {
        $('#myModal').modal("show");
        if (classeParaDesabilitar) {
            $('.' + classeParaDesabilitar).hide();
        }
    }
    else {
        $('#myModal .panel').html("<h1 style='color:#fff;width: 100%;text-align: left;'> Carregando ... </h1>");
        $('#myModal').modal("show");
        $("#myModal").load(vControler + vID, function () {
            $('#myModal').modal("show");
            $('#myModal').data("controller", vControler + vID);
            if (classeParaDesabilitar) {
                $('.' + classeParaDesabilitar).hide();
            }
        });
    }
}
// BOTÃO ABRIR HTML EM MODAL 2 ... (quando existir possibilidade de chamar mais de um modal na mesma HTML)
function AbrirModal2(vControler, vID, classeParaDesabilitar) {
    $('#myModal2').modal("hide");
    if ($("#myModal2 table").length > 0 && $('#myModal2').data("controller") == vControler + vID) {
        $('#myModal2').modal("show");
        if (classeParaDesabilitar) {
            $('.' + classeParaDesabilitar).hide();
        }
    }
    else {
        $('#myModal2 .panel').html("<h1 style='color:#fff;width: 100%;text-align: left;'> Carregando ... </h1>");
        $('#myModal2').modal("show");
        $("#myModal2").load(vControler + vID, function () {
            $('#myModal2').modal("show");
            $('#myModal2').data("controller", vControler + vID);
            if (classeParaDesabilitar) {
                $('.' + classeParaDesabilitar).hide();
            }
        });
    }
}

//ESSA FUNÇÃO SEMPRE REFAZ A CONSULTA NO CONTROLLER, DIFERENTE DAS OPÇÕES ACIMA QUE CHECAM SE JÁ EXISTE
function AbrirModal_SempreCairnoController(vControler, vID, classeParaDesabilitar) {
    $('#myModal2').modal("hide");
    $('#myModal2 .panel').html("<h1 style='color:#fff;width: 100%;text-align: left;'> Carregando ... </h1>");
    $('#myModal2').modal("show");
    if (vID) {
        $("#myModal2").load(vControler + vID, function () {
            $('#myModal2').modal("show");
            $('#myModal2').data("controller", vControler + vID);
            if (classeParaDesabilitar) {
                $('.' + classeParaDesabilitar).hide();
            }
        });
    } else {
        $("#myModal2").load(vControler, function () {
            $('#myModal2').modal("show");
            $('#myModal2').data("controller", vControler);
            if (classeParaDesabilitar) {
                $('.' + classeParaDesabilitar).hide();
            }
        });
    }

}


// FECHAR TAB/NAV PADRÃO DO SISTEMA (simular clique 'X')
function Fechar_tab(vTab, form) {
    var _top = Object.assign({}, top)

    _top.$(".nav-tabs a").each(function () {
        if (this.href.indexOf(vTab) !== -1) {
            _top.$(this).find(".navTabsCloseBtn").trigger("click");
        }
    });

    _top.$(".nav-tabs a").each(function () {
        if (this.href.indexOf(form) !== -1) {
            _top.$(this).trigger("click");
        }
    });
}

// VERIFICAR PERMISSÃO DE USUÁRIOS (ajax)

//NA CAHAMADA DA FUNÇÃO VERIFICAR_PERMI PASSAR O SEGUNDO PARAMETRO DESTA FORMA:VERIFICAR_PERMI('PERMISSAO', FUNCTION(){ MINHAFUNCAO()}) 
function Verificar_Permi(vPermi, callback, naodaralert) {
    Processo("wait");
    $.ajax({
        method: "GET",
        url: "/Usuario/Verificar_Permi?vPermi=" + vPermi,
    }).done(function (data) {
        if (data == "0") {
            Processo("normal");
            if (!naodaralert) {
                alert("Usuário sem permissão para esta rotina");
            }
            return;
        } else {
            callback.call();
            Processo();
        }
    }).fail(function () {
        Processo("normal");
        alert("Acesso negado");
    })
};
function Verificar_Permi_Modal(vPermi) {
    var retorno;
    $.ajax({
        method: "POST",
        url: "/Usuario/Verificar_Permi",
        data: { "vPermi": vPermi },
        async: false,
        success: function (data) {
            if (data == 0) {
                Processo("normal");
                alert("Usuário sem permissão para esta rotina");
                retorno = data;
            } else {
                retorno = data
            }
        },
        error: function () {
            alert('erro');
        }
    })
    return retorno;
};

function Verificar_Permi_Todas(vPermi, usuario, senha, callback) {
    //vPermi = Caso seja passada o backend irá buscar somente esta permissão especifica
    //senha e usuario = são parametros necessarios para busca de todas as permissões do usuario
    //callback = função a ser executada caso a condição desejada seja satisfeita

    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Usuario/Verificar_Permi_Todas",
        async: false,
        data: {
            vPermi: vPermi,
            senha: senha || "",
            usuario : usuario || ""
        },
        success: function (dados) {
            if (vPermi) {
                if (dados == 1) {
                    callback.call()
                } else {
                    alert("Usuário sem permissão para esta rotina")
                }
            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}


function Verificar_PermiSub(campo, url) {
    Verificar_Permi(campo, function () {
        window.location.href = url;
    })
}

function Carregar_Tabela_Preco(id) {
    $('#TabelaPrecoID').empty();
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Venda/CarregarTabelaPreco",
        success: function (dados) {
            $(dados).each(function (i) {
                if (id == dados[i].Id) {
                    sel = "selected";
                } else {
                    sel = "";
                }
                $('#TabelaPrecoID').append("<option value='" + dados[i].Id + "'  " + sel + ">" + dados[i].Descricao + "</option>");
            });
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

// TROCAR CURSOR/ESPERA DE RETORNO (WAIT E NORMAL)
function Processo(acao, id = "") {
    if (acao === "wait") {
        top.$("#carregando").show();
        top.$("body").css("cursor", "wait");
        $("body").css("cursor", "wait");
    } else {
        top.$("#carregando").hide();
        top.$("body").css("cursor", "default");
        $("body").css("cursor", "default");
    }
}


function ProcessoID(acao, id) {
    if (acao === "wait") {
        $(id).show();
        $(id).css("cursor", "wait");
    } else {
        $(id).hide();
        $(id).css("cursor", "default");
    }
}



// FUNÇÃO P/ VERIFICAR SE UM CNPJ É VÁLIDO...
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '') return "";
    if (cnpj.length !== 14) return "Cnpj Inválido";

    if (cnpj === "00000000000000" || cnpj === "11111111111111" || cnpj === "22222222222222" || cnpj === "33333333333333" ||
        cnpj === "44444444444444" || cnpj === "55555555555555" || cnpj === "66666666666666" || cnpj === "77777777777777" ||
        cnpj === "88888888888888" || cnpj === "99999999999999")
        return "Cnpj Inválido";

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return "Cnpj Inválido";

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return "Cnpj Inválido";

    return "";
};



// FUNÇÃO P/ VERIFICAR SE UM CPF É VÁLIDO...
function validarCPF(cpf) {

    var Soma;
    var Resto;
    Soma = 0;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return "";
    if (cpf == 11) return "CPF Inválido";
    if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444"
        || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
        return "CPF Inválido";

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return "CPF Inválido";

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return "CPF Inválido";
    return "";
};


// FUNÇÃO P/ SELECIONAR/DESMARCAR ITEM DA GRID P/ BAIXA
function selecionaAbaixo(self) {
    if ($(self).hasClass("selecionado")) {
        $(self).removeClass("selecionado");
    } else {
        $(self).addClass("selecionado");
    }

    if ($(".selecionado").length > 0) {
        $("#btnBaixarSelecionados").show();
        $("#btnAgrupa").show();
    } else {
        $("#btnBaixarSelecionados").hide();
        $("#btnAgrupa").hide();
    }
}


// FORMATAR STRING P/ DECIMAL EM CONVERSÕES
function parseFloatPtBR(value) {
    if (value == null || value == "") return parseFloat(0);
    value = value + "";
    value = value.replaceAll(".", "").replace(",", ".");

    //tratar casos onde o valor digitado contém mais de uma vírgula
    if (value.indexOf(',') != -1) {
        return 0;
    }
    var valorconvertido = parseFloat(value);
    if (isNaN(valorconvertido)) {
        return 0;
    }
    return valorconvertido;
}
function formatMoedaPtBr(value) {
    if (value == undefined) return 0;

    return (value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function formatPesoPtBr(value) {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    });
}


function formatPorcentagem(value, casas_decimais = 4) {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: casas_decimais,
        maximumFractionDigits: casas_decimais
    });
}

// RETORNAR DATA DIA NO PADRÃO DD/MM/YYYY
function DataDia() {
    var vData = new Date();
    var vRetorno = ("00" + (vData.getDate())).slice(-2) + "/" + ("00" + (vData.getMonth() + 1)).slice(-2) + "/" + vData.getFullYear();
    return vRetorno;
}



var BOTAO_TD_EDITAR = "<td>" +
    "<a class=\"btn btn-primary btn-xs\" href=\"\" > " +
    " <span class=\"glyphicon glyphicon-edit\"></span> " +
    "</a> ";

var BOTAO_TD_EXCLUIR = "<a class=\"btn btn-danger btn-xs\" href='javascript:;' onclick= 'excluirLinha(this)'> " +
    " <span class=\"btn-danger glyphicon {color:#FF6600} glyphicon-remove\"></span> " +
    "</a> " +
    "</td >";

var GridSalvarQtde = function (self) {
    var $td = $(self).parent();
    var valor = $(self).val();
    var qtde = parseFloatPtBR($td.parents("tr").find(".grid_Qtde input").val());
    var valor_unidade = parseFloatPtBR($td.parents("tr").find(".item_unidade_venda input").val());

    var valor_total = formatMoedaPtBr(valor_unidade * qtde);

    if ($td.parents("tr").find(".item_total_venda").length > 0) {
        $td.parents("tr").find(".item_total_venda").html(valor_total);
    }

    if ($td.parents("tr").find(".item_total_devol").length > 0) {
        $td.parents("tr").find(".item_total_devol").html(valor_total);
    }

    if ($td.parents("tr").find(".item_total_serv").length > 0) {
        $td.parents("tr").find(".item_total_serv").html(valor_total);
    }

    if ($td.parents("tr").find(".item_total_serv_terc").length > 0) {
        $td.parents("tr").find(".item_total_serv_terc").html(valor_total);
    }

    //25/09/20   

    Somar_Itens();
}



// FUNÇÃO P/ RETIRAR ACENTOS P/ PESQUISA EM GRID (utilizado ja pesquisa da grid)
var accentsTidy = function (s) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp("\\s", 'g'), "");
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'), "ae");
    r = r.replace(new RegExp("ç", 'g'), "c");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("ñ", 'g'), "n");
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("œ", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    r = r.replace(new RegExp("\\W", 'g'), "");
    return r;
};


// somente números, ponto e virgula
// inserir data-accept-dot="1" data-accept-comma="1" no input
// inserir only-number no class do input
jQuery(function ($) {
    $(document).on('keypress', 'input.only-number', function (e) {
        var $this = $(this);
        var key = (window.event) ? event.keyCode : e.which;
        var dataAcceptDot = $this.data('accept-dot');
        var dataAcceptComma = $this.data('accept-comma');
        var dataAcceptSubtract = $this.data('accept-subtract');

        var acceptDot = (typeof dataAcceptDot !== 'undefined' && (dataAcceptDot === true || dataAcceptDot === 1) ? true : false);
        var acceptComma = (typeof dataAcceptComma !== 'undefined' && (dataAcceptComma === true || dataAcceptComma === 1) ? true : false);
        var acceptSubtract = (typeof dataAcceptSubtract !== 'undefined' && (dataAcceptSubtract === true || dataAcceptSubtract === 1) ? true : false);

        //if ((key > 47 && key < 58) || (key === 45 && acceptSubtract) || (key === 46 && acceptDot) || (key === 44 && acceptComma)) {
        if ((key > 47 && key < 58) || (key === 45 && acceptSubtract) || (key === 44 && acceptComma)) {
            return true;
        } else {
            return (key === 8 || key === 0) ? true : false;
        }
    });
});


// somente números, ponto, traço e barras
// inserir onkeyup="somenteNPTB(this);" no input
function somenteNPTB(num) {
    var er = /[^\d,./-]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}


// somente números, traço e parênteses
// inserir onkeyup="somenteNTP(this);" no input
function somenteNTP(num) {
    var er = /[^\d()-]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}


function CarregarCidades($select, $uf, $ibge, viewbagentidadeibge, async = true) {
    var sel = "";
    $select.empty();
    $.ajax({
        async: async,
        dataType: "json",
        type: "POST",
        url: "/Config/SelecionarCidades",
        data: { UF: $uf.val() },
        beforeSend: function () {
            $select.empty().append('<option value="0">Aguarde...</option>');
        },
        success: function (dados) {
            $select.empty();
            $select.append("<option value='' class=''></option>");
            $(dados).each(function (i) {
                if (viewbagentidadeibge == dados[i].CODIGO) {
                    sel = "selected";
                } else {
                    sel = "";
                }
                $select.append("<option value='" + dados[i].MUNICIPIO + "'  " + sel + " class='" + dados[i].CODIGO + "'>" + dados[i].MUNICIPIO + "</option>");
            });
            try {
                ExibeIbgeCidade($select, $ibge);
            } catch (err) {

            }

        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });

}

function ExibeIbgeCidade($cidade, $cidadeIbge) {
    var classe = $cidade.find(':selected').attr('class');
    $cidadeIbge.val(classe);
}


function EmitirNfe(id, tipo, empresa, envio_email, modelo, emitir_boleto) {
    Processo("wait");
    var status = 0;
    var chave = "";
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Fiscal_Nfe/EmitirNfe",
        async: false,
        data: { "vid": id, "tipo": tipo, "empresa": empresa, "envio_email": envio_email, "emitir_boleto": emitir_boleto },
        success: function (dados) {
            alert(dados[0].motivo);
            status = dados[0].cStat;
            chave = dados[0].chave;
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
    Processo("normal");
    if ((status == 100 || status == 302) && tipo == "E") {
        //var url = "/Fiscal_Nfe/Download_NFE/?chave=previa_" + id + "&tipo=pdf&evento=.&empresa=" + empresa + "&modelo=" + modelo;

        if (status == 302) {
            ConsultarNFE_SEFAZ(chave, empresa, modelo)
        }


        var url = "/Fiscal_Nfe/Download_NFE/?chave=" + chave + "&tipo=pdf&evento=.&empresa=" + empresa + "&modelo=" + modelo;
        window.open(url);
        if (emitir_boleto == "S" && status == 100) {
            url = "/Financ_Receber/BoletosNFE/?idnfe=" + id + "&empresa=" + empresa + "&modelo=" + modelo + "&ENVIAR_BOLETO_EMAIL=S&chavenfe=" + chave;
            window.open(url);
        }

    }
    return status;
    //async = false trava a tela ate chegar um retorno do ajax
}

function Funcao_Sat(id, tabela, solicitacao) {
    if (!id) {
        alert("Não foi possível realizar a operação");
        return;
    }

    Processo("wait");
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Venda/Funcao_Sat",
        async: false,
        data: { "vid": id, "tabela": tabela, "solicitacao": solicitacao },
        success: function (dados) {

            if (dados[0].motivo == "0") {

                $.ajax({
                    dataType: "json",
                    type: "POST",
                    url: "/Venda/PegarDadosBalanca",
                    async: false,
                    data: {
                        codigo: $("#txtCodPro").val()
                    },
                    success: function (dados) {
                        if (dados == "") {
                            alert("Erro ao ler balança");
                        } else {
                            $("#txtQtde").val(dados);
                            $("#txtQtde").focus();
                            $("#txtQtde").blur();
                            $("#btnAdd_Prod_Serv").click();
                        }
                        Processo("normal");
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });

            } else {
                alert(dados[0].motivo);
            }
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
    Processo("normal");

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function EmitirNfse(id, modelo, empresa) {
    Processo("wait");
    var status = 0;
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/NFS_e/EmitirNfse",
        async: false,
        data: { "vid": id, "modelo": modelo, "empresa": empresa },
        success: function (dados) {
            alert(dados[0].motivo);
            status = dados[0].status;
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
    Processo("normal");
    return status;
    //async = false trava a tela ate chegar um retorno do ajax
}

//FUNÇÃO TESTE PARA EXPORTAR DE HTML PARA EXCEL
$(function () {
    
    $("body").on("click", "#btn_exporta_XLS", function () {
        Verificar_Permi('ACS_EXPORT_EXCEL_PDF', function () { exportar_excel_padrao() }) 
    });


});

function exportar_excel_padrao() {
    // When the stripped button is clicked, clone the existing source
    //var $clonedTable = $(".table.StyleTable:visible").clone(true, true);
    var $clonedTable = $.extend(true, [], $(".table:visible"))


    var filename = $("#____id_fielname").val();

    // Strip your empty characters from the cloned table (hidden didn't seem to work since the cloned table isn't visible)
    $clonedTable.find('[style*="display: none"]').remove();
    $clonedTable.find('[style*="display:none"]').remove();

    $clonedTable.find('button').remove();
    
    $clonedTable.table2excel({
        exclude: ".ExcluirUmaClasseCSS_Especifica",
        name: "Documento",
        filename: filename ? (filename + ".xls") : "Exportacao.xls", // do include extension 
        preserveColors: true
    });
}


function getClippedRegion(image, x, y, width, height) {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    //                   source region         dest. region
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    return {
        // Those are some pdfMake params
        image: canvas.toDataURL(),
        width: 500
    };
}
//FUNÇÃO TESTE PARA EXPORTAR DE HTML PARA PDF
$(function () {
    
    $(".btn_exporta_padrao.btn-pdf").on("click", function () {
        Verificar_Permi('ACS_EXPORT_EXCEL_PDF', function () { exportar_pdf_padrao() }) 
    });
   
});


async function exportar_pdf_padrao() {
    var $clonedTable = $.extend(true, [], $(".table:visible"))
    // Strip your empty characters from the cloned table (hidden didn't seem to work since the cloned table isn't visible)
    $clonedTable.find('[style*="display: none"]').remove();
    $clonedTable.find('[style*="display:none"]').remove();
    $clonedTable.find('button').remove();
 
    $clonedTable.find("tbody tr").css("height", "30px")
    let canvases = $clonedTable
    
    let images = [];
    let splitAt = 1500;
    for (let i = 0; i < canvases.length; i++) {
        let y = 0;
        await html2canvas(canvases[i])
            .then(canvas => {
                while (canvas.height > y) {
                    images.push(getClippedRegion(canvas, 0, y, canvas.width, splitAt));
                    y += splitAt;
                }

            })
    }
    // PDF creation using pdfMake
    var docDefinition = {
        content: images,
        pageSize: "A4"
    };

    var filename = $("#____id_fielname").val();

    pdfMake.createPdf(docDefinition).download(filename ? (filename + ".pdf") : "Exportacao.pdf");

    $clonedTable.find("tbody tr").css("height", "auto")



    //html2canvas($clonedTable.join('</br>')).then(function (canvas) {

    //    debugger
    //    // split the canvas produced by html2canvas into several, based on desired PDF page height
    //    let splitAt = 1600; // A page height which fits for "LETTER" pageSize...

    //    let images = [];
    //    let y = 0;
    //    while (canvas.height > y) {
    //        images.push(getClippedRegion(canvas, 0, y, canvas.width, splitAt));
    //        y += splitAt;
    //    }

    //    // PDF creation using pdfMake
    //    var docDefinition = {
    //        content: images,
    //        pageSize: "A4"
    //    };

    //    var filename = $("#____id_fielname").val();

    //    pdfMake.createPdf(docDefinition).download(filename ? (filename + ".pdf") : "Exportacao.pdf");

    //});
}



//Recebe o parâmetro do tipo datetime do C# e retorna uma data formatada em  YYYY-MM-DD (padrão do input tipo date)
function ConverteDataCSharp_Para_DataJs(dataCsharp) {
    if (!dataCsharp) {
        return null;
    }

    if (dataCsharp == "/Date(-62135589600000)/") {
        return null;
    }

    var jsDate = new Date(parseInt(dataCsharp.replace(/[^0-9 +]/g, ''))).toISOString().split('T')[0];//toLocaleDateString("pt-BR");
    return jsDate;
}



/***********************            TRECHO PARA A FUNÇÃO DE 'AJUDA' DO SISTEMA            ***********************

Para implementar, basta criar uma div vazia com o id 'ajuda_X', onde X é equivalente ao id do registro da tabela de ajuda, e que possua APENAS UMA CLASSE - 'ajuda'
ex.: <div id="ajuda_1" class="ajuda"></div>

Se o passo acima estiver feito, no carregamento da página já vai aparecer um botão com ícone de interrogação que, ao ser clicado, vai
disparar um ajax, procurando a descrição da tabela cujo id é igual ao X da div 'ajuda_X', e exibindo essa descrição num span

*/

//função que faz um ajax e retorna a descrição equivalente ao id informado
function BuscaDescricao_Ajuda(id) {
    //validação se o parâmetro é válido - tem q ser um número maior que zero
    if (parseFloatPtBR(id) <= 0) {
        alert('Ajuda não encontrada, entre em contato com a equipe Wisetec!');
        return;
    }

    Processo("wait");

    //se o span já tem texto nele, só escondo/mostro + alert, sem requisitar o banco de dados
    if ($("#span_ajuda_" + id).text().length > 0) {
        //$("#span_ajuda_" + id).toggle();//caso não queira exibir o span, comentar essa linha
        alert($("#span_ajuda_" + id).text());
    }
    else {
        //se o span está vazio, disparo ajax para buscar informação no banco de dados
        $.ajax({
            dataType: "json",
            type: "POST",
            url: "/config/BuscaDescricao_Ajuda",
            async: false,
            data: { "id": id },
            success: function (dados) {
                if (dados && dados[0] && dados[0].DESCRICAO != '') {
                    //se encontrou registro, jogo valor pro front e exibo o span + alert
                    $("#span_ajuda_" + id).text(dados[0].DESCRICAO);
                    //$("#span_ajuda_" + id).show();//caso não queira exibir o span, comentar essa linha
                    alert(dados[0].DESCRICAO);
                }
                else {
                    //mensagem que o registro não foi encontrado
                    alert('Ajuda não encontrada, entre em contato com a equipe Wisetec!');
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });
    }

    Processo("normal");
}

//no carregamento da página, eu escrevo o HTML do botão ajuda e um span dentro da div com id 'ajuda'
$(window).load(function () {
    $(".ajuda").each(function () {

        //variável que vai armazenar uma string equivalente ao HTML do botão de ajuda e do span para a descrição
        var BOTAO_AJUDA = "<div style='display:inline'>" +
            "<a style='padding:1px' class=\"\" href=\"javascript:BuscaDescricao_Ajuda(" + $(this).attr('id').substring(6) + ")\" > " +
            " <span class=\"glyphicon glyphicon-question-sign\"></span> " +
            "</a> " +
            "<span style='display:none' id='span_" + $(this).attr('id') + "'></span><div>"

        $(this).append(BOTAO_AJUDA);
    });

    $("a.ajuda_img").on("click", function (event) {
        event.preventDefault();
        $("#modal_ajuda_img").modal("show");
    });
});

$(window).load(function () {
    $(".ajudaBT5").each(function () {

        //variável que vai armazenar uma string equivalente ao HTML do botão de ajuda e do span para a descrição
        var BOTAO_AJUDA = "<div style='display:inline'>" +
            "<a style='padding:1px' class=\"\" href=\"javascript:BuscaDescricao_Ajuda(" + $(this).attr('id').substring(6) + ")\" > " +
            " <span class=\"bi bi-question-circle-fill text-black\"></span> " +
            "</a> " +
            "<span style='display:none' id='span_" + $(this).attr('id') + "'></span><div>"

        $(this).append(BOTAO_AJUDA);
    });

    $("a.ajuda_img").on("click", function (event) {
        event.preventDefault();
        $("#modal_ajuda_img").modal("show");
    });
});

/***********************            FIM DO TRECHO PARA A FUNÇÃO DE 'AJUDA' DO SISTEMA            ***********************/



function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//adiciona dias numa data - no formato javascript
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

//adiciona meses numa data - no formato javascript
Date.prototype.addMonths = function (m) {
    var d = new Date(this);
    var years = Math.floor(m / 12);
    var months = m - (years * 12);
    if (years) d.setFullYear(d.getFullYear() + years);
    if (months) d.setMonth(d.getMonth() + months);
    return d;
}

//transforma uma data javascript no formato esperado pelo input type date - "yyyy-MM-dd"
function setJSDateToInputTypeDate(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var return_date = date.getFullYear() + "-" + (month) + "-" + (day);
    return return_date;
}

//transforma data de "yyyy-MM-dd" para "dd/mm/yyyy"
function FormataDataHTMLparaDataPTBR(data) {
    var dia = data.split("-")[2];
    var mes = data.split("-")[1];
    var ano = data.split("-")[0];
    return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano;
}


//transforma data de "dd/mm/yyyy" para "yyyy-MM-dd"
function FormataDataPTBRparaHTML(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];
    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
}

//função que pega diferença entre datas (ambas no formato "yyyy-MM-dd"), retornando número de dia entre elas
function obtem_diferenca_entre_datas(data_input_inicial, data_input_final) {
    var t2 = new Date(data_input_inicial);
    var t1 = new Date(data_input_final);
    var resultado = ((t1 - t2) / (24 * 3600 * 1000));
    return resultado;
}


function VerificaOrigem() {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Origem_Venda/Verifica_Est_Origem",
        async: false,
        data: {
            ID: $("#Origem_VendaID").val()

        },
        success: function (dados) {
            $("#EST_ORIGEM").val(dados);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}


$(document).on('blur', "input.only-number", function () {
    try {

        var valor = $(this).val();
        if (valor != "" && valor != "0" && valor != "0,00" && valor != "0,0" && valor != "0,000" && valor != "0,0000" && valor != "0,00000" && valor != "0,000000" && valor != "0,0000000" && valor != "0,00000000") {
            if (parseFloatPtBR(valor) == 0) {
                alert('Valor inválido ' + $(this).val());
                $(this).val("");
                $(this).focus();
            }
        }
    } catch (err) {

    }


});

function verificaValorTpDoc(valor, cpf) {
    //var teste = $(this).val().replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');
    if (cpf == true) {
        var retorno = validarCPF(valor)
        $(".lbl_cpf").text(retorno)
    } else {
        $(".lbl_cpf").text("")
    }
    if (cpf == false) {
        var retorno = validarCNPJ(valor)
        $(".lbl_cnpj").text(retorno)
    } else {
        $(".lbl_cnpj").text("")
    }

}


//function validar_input_data(obj, e) {

//    $(obj).css("border-color", "");
//    if (!obj.checkValidity()) {
//        alert('Data inválida');
//        obj.value = ""
//        obj.focus();
//        $(obj).css("border-color", "red");
//    }
//}



$(document).on('blur', "input[type = 'datetime-local']", function () {
    $(this).css("border-color", "");
    if (!$(this)[0].validity.valid) {
        $(this).css("border-color", "red");
        $(this).val("");
        //$(this).focus();
    }

    //debugger;
    //validar_input_data(this);
});

$(document).on('blur', 'input[type = "date"]', function () {
    $(this).css("border-color", "");
    if (!$(this)[0].validity.valid) {
        //alert('Data inválida');
        $(this).css("border-color", "red");
        $(this).val("");
        $(this).focus();
    }
    else {
        var valor = $(this).val();

        if (valor != "") {

            var max = "2200-12-31";
            var min = "1900-12-31";
            var v1 = new Date(max);
            var v2 = new Date(valor);
            var v3 = new Date(min);
            //alert(v1 + '\n' + v2);

            if (v2 > v1) {
                //alert('Data inválida');
                $(this).css("border-color", "red");
                $(this).val("");
                $(this).focus();
            }

            if (v2 < v3) {
                //alert('Data inválida');
                $(this).css("border-color", "red");
                $(this).val("");
                $(this).focus();
            }
        }
    }
});


function FormatarDecimalParaJavascript(valor, casas_decimais) {
    if (valor) {
        return valor.toLocaleString("pt-BR", { style: 'decimal', minimumFractionDigits: `${casas_decimais}` });
    } else {
        return 0;
    }

}



var ConverterEstados = function (val) {
    var data;

    switch (val.toUpperCase()) {
        /* UFs */
        case "AC": data = "Acre"; break;
        case "AL": data = "Alagoas"; break;
        case "AM": data = "Amazonas"; break;
        case "AP": data = "Amapá"; break;
        case "BA": data = "Bahia"; break;
        case "CE": data = "Ceará"; break;
        case "DF": data = "Distrito Federal"; break;
        case "ES": data = "Espírito Santo"; break;
        case "GO": data = "Goiás"; break;
        case "MA": data = "Maranhão"; break;
        case "MG": data = "Minas Gerais"; break;
        case "MS": data = "Mato Grosso do Sul"; break;
        case "MT": data = "Mato Grosso"; break;
        case "PA": data = "Pará"; break;
        case "PB": data = "Paraíba"; break;
        case "PE": data = "Pernambuco"; break;
        case "PI": data = "Piauí"; break;
        case "PR": data = "Paraná"; break;
        case "RJ": data = "Rio de Janeiro"; break;
        case "RN": data = "Rio Grande do Norte"; break;
        case "RO": data = "Rondônia"; break;
        case "RR": data = "Roraima"; break;
        case "RS": data = "Rio Grande do Sul"; break;
        case "SC": data = "Santa Catarina"; break;
        case "SE": data = "Sergipe"; break;
        case "SP": data = "São Paulo"; break;
        case "TO": data = "Tocantíns"; break;

        /* Estados */
        case "ACRE": data = "AC"; break;
        case "ALAGOAS": data = "AL"; break;
        case "AMAZONAS": data = "AM"; break;
        case "AMAPÁ": data = "AP"; break;
        case "BAHIA": data = "BA"; break;
        case "CEARÁ": data = "CE"; break;
        case "DISTRITO FEDERAL": data = "DF"; break;
        case "ESPÍRITO SANTO": data = "ES"; break;
        case "GOIÁS": data = "GO"; break;
        case "MARANHÃO": data = "MA"; break;
        case "MINAS GERAIS": data = "MG"; break;
        case "MATO GROSSO DO SUL": data = "MS"; break;
        case "MATO GROSSO": data = "MT"; break;
        case "PARÁ": data = "PA"; break;
        case "PARAÍBA": data = "PB"; break;
        case "PERNAMBUCO": data = "PE"; break;
        case "PIAUÍ": data = "PI"; break;
        case "PARANÁ": data = "PR"; break;
        case "RIO DE JANEIRO": data = "RJ"; break;
        case "RIO GRANDE DO NORTE": data = "RN"; break;
        case "RONDÔNIA": data = "RO"; break;
        case "RORAIMA": data = "RR"; break;
        case "RIO GRANDE DO SUL": data = "RS"; break;
        case "SANTA CATARINA": data = "SC"; break;
        case "SERGIPE": data = "SE"; break;
        case "SÃO PAULO": data = "SP"; break;
        case "TOCANTÍNS": data = "TO"; break;
    }

    return data;
};

function verificaTamanhoArquivo(tamanho_arquivo, maximo_permitido) {

    if (tamanho_arquivo > maximo_permitido) {
        alert(`Atenção arquivo maior que o permitido (${maximo_permitido / 1000}KB)`)
        return false
    } else {
        return true
    }
}


$(document).on('blur', "input[type = 'text'], textarea", function (e) {
    $(this).val((this.value.replace(/'/g, '')));
    $(this).val((this.value.replace(/"/g, '')));
    $(this).val((this.value.replace(/`/g, '')));
    $(this).val((this.value.replace(/´/g, '')));
    $(this).val((this.value.replaceAll("|", "")));
});



$(window).load(function () {
    $("input[type = 'text']").not('.onlynumber').each(function () {
        if (this.value.includes("'") || this.value.includes('"')) {
            $(this).val((this.value.replace(/'/g, '')));
            $(this).val((this.value.replace(/"/g, '')));
            $(this).val((this.value.replace(/`/g, '')));
            $(this).val((this.value.replace(/´/g, '')));
            $(this).val((this.value.replaceAll("|", "")));
        }
    });
});


function ConsultarNFE_SEFAZ(chave, empresa, modelo) {
    $.ajax({
        dataType: "json",
        type: "POST",
        url: "/Fiscal_Nfe/ConsultarNfeIntegracao",
        async: false,
        data: { "chave": chave, "empresa": empresa, "modelo": modelo },
        success: function (dados) {
            alert(dados[0].motivo);
        },
        error: function (xhr, status, error) {
            alert(error);
        }
    });
}

$("input[data-fator]").on("blur")

$(document).on('blur', "input[data-fator]", function (e) {
    //se tem unidade alternativa cadastrada pra esse produto, só devo validar se for a unidade principal
    if ((!$("#div_und_alt").is(":visible")) || ($("#div_und_alt").is(":visible") && $("#und_alt :selected").attr("data-unidade_original") == "S")) {
        var valor_digitado = parseFloatPtBR($(this).val());
        var fator = parseFloat($(this).attr("data-fator"));
        var divisao = parseFloat((valor_digitado / fator).toFixed(10));
        if (!Number.isInteger(divisao)) {
            alert('Qtde. digitada fora da proporção do fator!\nFator: ' + fator.toString().replace('.', ',') + '\nQtde. digitada: ' + valor_digitado.toString().replace('.', ','));
            $(this).val('');
            e.preventDefault();
            $(this).focus();
            return;
        }
    }
    
});


function Calcula_Preco_Fator_Und_Alt(preco_cheio, operacao_fator, preco_fator) {
    var preco_calculado = 0;
    if (operacao_fator == "M") {
        preco_calculado = preco_cheio * preco_fator;
    }
    else if (operacao_fator == "D") {
        preco_calculado = preco_cheio / preco_fator;
    }
    return preco_calculado;
}

function Calcula_Qtde_Fator_Und_Alt(qtde_cheia, operacao_fator, est_fator) {
    var qtde_calculada = 0;
    if (operacao_fator == "M") {
        qtde_calculada = qtde_cheia * est_fator;
    }
    else if (operacao_fator == "D") {
        qtde_calculada = qtde_cheia / est_fator;
    }
    return qtde_calculada;
}

$("#div_unica_shared_produto #btnAdd_Prod_Serv").on('click', function (e) {
    if (!$("#txtCodPro").val() && !$("#txtDescricao").val()) {
        alert('Escolha um produto!');
        e.stopImmediatePropagation();
    }
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


//$(document).on('click', "button, a", function (e) {
//    var self = this;
//    debugger
//    //desabilita o elemento
//    $(this).attr("disabled", "disabled");
//    //habilita novamente depois de 2s
//    var tempo = 2000; //2 segundos
//    var myvar = setInterval(function () { habilitar_elemento(self, myvar); }, tempo);
//    //clearInterval(myvar);

//});

//function habilitar_elemento(elemento, myvar) {
//    debugger
//    clearInterval(myvar);
//    alert('vai habilitar')
//    $(elemento).removeAttr("disabled");
//    Processo();
//}

//agrupar array
function groupByArray(xs, key) { return xs.reduce(function (rv, x) { let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv; }, []); } 