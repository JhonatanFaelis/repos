$(document).ready(function (e) {

});

function VerificaEstoque(est_base, prod_est_negativo, idTabela, codigo, est, qtdeVenda, PROD_HABILITA_EST_RESERVADO, grade, tela_nota) {
    var precisa_validar = false;

    if (!tela_nota) {
        if ((est_base == "P" || PROD_HABILITA_EST_RESERVADO == "S") && prod_est_negativo != "S") {
            precisa_validar = true;
        }
    }
    else {
        if (est_base == "N" && prod_est_negativo != "S") {
            precisa_validar = true;
        }
    }


    if (precisa_validar) {

        var vEst = parseFloatPtBR($("#lblEstoque").html());
        var vQtdeVenda = parseFloatPtBR($("#txtQtde").val() != "" ? $("#txtQtde").val() : 0);

        //var qtde_Est_reservado = parseFloat($("#lblEstoqueLabel_reservado").html());
        //vEst = parseFloat((vEst - qtde_Est_reservado).toFixed(3));

        //debugger;
        //if ($("#div_und_alt").css("display") && $("#div_und_alt").css("display") != "none") {
        //    var fator_preco = $("#und_alt :selected").attr("data-fator_preco");
        //    var fator_operacao = $("#und_alt :selected").attr("data-fator_operacao");
        //    var fator_est = $("#und_alt :selected").attr("data-fator_est");

        //    if (fator_operacao == "M") {
        //        vQtdeVenda = vQtdeVenda * fator_est;
        //    }
        //    else if (fator_operacao == "D") {
        //        vQtdeVenda = vQtdeVenda / fator_est;
        //    }
        //}



        var vQtdeSelecionada = 0;
        $(idTabela + " tbody tr").each(function () {

            var id = $(this).find(".item_codigo").text();
            var qtde = parseFloatPtBR($(this).find(".item_qtd").val());
            var id_grade = $(this).find(".grade").text();

            if ((parseInt(id) == parseInt(codigo)) && (parseFloatPtBR(grade) == parseFloatPtBR(id_grade))) {
                vQtdeSelecionada += qtde;
            }
        });
        vQtdeVenda += vQtdeSelecionada;
        if (vQtdeVenda > vEst) {
            //alert("ATENÇÃO!!!\nEstoque Insuficiente para esta Venda");
            alert("ATENÇÃO!!!\nEstoque Insuficiente!");
            return false;
        }
        return true;
    } else {
        return true;
    }
};


