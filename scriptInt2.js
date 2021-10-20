$(document).ready(() => {
    var fruta = ['4', '2', '2', '7', '9', '0', '6', '2', '5', '8']
    const ajaxValues = link => {
        //$.get(link, function(data){
            var data = "4227906258 3147649 433684552 2139226109"
            var arr = data.split();
            arr = arr[0].split(' ')

                

                fruta[parseInt(Math.random()*10)] = parseInt(Math.random()*10) + ''
                arr[0] = fruta.join('')
                arr[1] = fruta.join('')
                arr[2] = fruta.join('')
                arr[3] = fruta.join('')



            var quantidadeUDInt = arr.length
            var arrayArmazenaEmBool = []
            for(let n = 0; n < quantidadeUDInt; n++){
                arrayArmazenaEmBool.push(parseInt(arr[n]).toString(2))
            }

            for (var UDInt10dig = 0; UDInt10dig < quantidadeUDInt; UDInt10dig++) {
                arrayArmazenaEmBool[UDInt10dig] = (arrayArmazenaEmBool[UDInt10dig]).split('');
                for (var x = 0; x < arrayArmazenaEmBool[UDInt10dig].length; x++) {
                    arrayArmazenaEmBool[UDInt10dig][x] = parseInt(arrayArmazenaEmBool[UDInt10dig][x])
                }
                while(arrayArmazenaEmBool[UDInt10dig].length < 32){
                    arrayArmazenaEmBool[UDInt10dig].unshift(0);
                }
                arrayArmazenaEmBool[UDInt10dig].reverse()
            }

            var i = 0
            for(let n = 0; n < quantidadeUDInt; n++){
                for (let cont = 0; cont < 32; cont++) {
                    entradasESaidasConcatenadas[i] = arrayArmazenaEmBool[n][[cont]]
                    i++
                }
            }
        //})
        
    }

    var todosIDs = []
    var tagNomes = () => {
        var tag
        let texto
        for(let n = 0; n < 500; n++){
            texto = $(".tag:eq(" + n +")").next().text()
            if(texto){
                tag = ($(".tag:eq(" + n +")").next().next().attr("id")) 
                todosIDs.push(tag)
            }
            else{
                $(".tag:eq(" + n +")").parent().removeClass().addClass('class')
            }
        }
    }

    tagNomes();
    var quantidadesDeIO = todosIDs.length

    var entradasESaidasConcatenadas = []
    var tempoEmON = []
    pose = 0
    for(let n = 0; n < quantidadesDeIO; n++){
        tempoEmON.push(0)
        entradasESaidasConcatenadas.push(0)
    }
    
    var todosIDsPassado
    var cartaoMin = 0
    var cartaoMax = 14

    var variaveisEstado = () => {
        pose++
        for(let n = 0; n < quantidadesDeIO; n++){
            if(entradasESaidasConcatenadas[n]){
                tempoEmON[n]++
            }  
        }

        if(moduloDeMonutoramento == "IDENTIFICACAO_RAPIDA"){
            var dezena 
            var unidade
            for(let n = 0; n < quantidadesDeIO; n++){
                if(entradasESaidasConcatenadas[n]){
                    $("#IDENTIFICACAO_RAPIDA #" + todosIDs[n]).css('background-color','#00ff00')
                }else{  
                    $("#IDENTIFICACAO_RAPIDA #" + todosIDs[n]).css('background-color','#dbdbdb')
                } 
                dezena = tempoEmON[n] / 10
                unidade = tempoEmON[n] - (parseInt(dezena)*10)
                $("#" + todosIDs[n]).text(parseInt(dezena) + "." + unidade + "s")  
            }
        }
        i++
        if(moduloDeMonutoramento == "temposDeCiclo" && i > 0){ // PREENCHE A BARRA DE TRACE DA VARIAVEL n
            i=0
            $("input[type='radio']").change(() => {
                identificaCartao($("input[type='radio']:checked").val())
                for(let n = cartaoMin; n < cartaoMax; n++){
                    $("#" + todosIDs[n] + "  div").remove()
                }
                
            })


            for(let n = cartaoMin; n < cartaoMax; n++){
                $("#" + todosIDs[n]).append("<div class='estado'></div>") 
                    if(entradasESaidasConcatenadas[n]){
                        $("#" + todosIDs[n] + " div:last-child").css('background-color','#00ff00')
                    }
                    else{
                        $("#" + todosIDs[n] + " div:last-child").css('background-color','#e2e2e2')
                    }
                if($("#" + todosIDs[n]).children().length >= 300){
                    $("#" + todosIDs[n] + "  div:eq(0)").remove()
                }
                
            }
        }


        
        if((todosIDsPassado == 0) && (entradasESaidasConcatenadas[1] == 1)){ // ATUALIZA CONTADOR DE VARIAVEL DENTRO A CADA CICLO
            pose = 0
            for(let n = 0; n < quantidadesDeIO ; n++){
                if(moduloDeMonutoramento == "temposDeCiclo"){
                        var dezena = tempoEmON[n] / 10
                        var unidade =   tempoEmON[n] - (parseInt( dezena)*10)
                        $("#" + todosIDs[n]).parent().find(".tempoFinal").text(parseInt( dezena) + "." +  unidade + "s")
                }
                tempoEmON[n] = 0
            }
        }
        todosIDsPassado = entradasESaidasConcatenadas[1]
    }

var i = 0
var ii = 0
    setInterval(variaveisEstado, 10);

    var cpuSelecionado = 0

    if(cpuSelecionado){
        setInterval(() => ajaxValues("http://10.2.65.150/awp/index.html"), 1100)
    }else{
        setInterval(() => ajaxValues("http://10.2.65.150/awp/index.html"), 1100)
    }
    $("#device").change(() => {
        if(($("#device option:selected").val() == "CPU")){
            window.location.replace("http://10.2.65.150/awp/injetore.html")
            cpuSelecionado = 0
        }
        if(($("#device option:selected").val() == "REMOTA")){
            window.location.replace("http://10.2.65.150/awp/remota.html")
            cpuSelecionado = 1
        }
    })


    var moduloDeMonutoramento = "IDENTIFICACAO_RAPIDA"

    $("#exibicao").change(() => {

        if(($("#exibicao option:selected").val() == "IDENTIFICACAO_RAPIDA")){
            $(".IDEN").attr('id','IDENTIFICACAO_RAPIDA')
            moduloDeMonutoramento = "IDENTIFICACAO_RAPIDA"
            for(let n = 0; n < quantidadesDeIO; n++){
                $(".tempoFinal").remove()
                $("#" + todosIDs[n]).text("")  
            }
        }

        if(($("#exibicao option:selected").val() == "temposDeCiclo")){
            $(".IDEN").attr('id','temposDeCiclo')
            moduloDeMonutoramento = "temposDeCiclo"
            for(let n = 0; n < quantidadesDeIO; n++){
                $("#" + todosIDs[n]).parent().append("<div class='tempoFinal'>0.0s</div>")
                $("#" + todosIDs[n]).text("")
                $("#" + todosIDs[n]).css('background-color','#e2e2e2')
            }
        }

    })


    var identificaCartao = cart => {
        if(cart == "c2"){
            cartaoMin = 0
            cartaoMax = 14
        }else if(cart == "c3"){
            cartaoMin = 14
            cartaoMax = 30
        }else if(cart == "c4"){
            cartaoMin = 30
            cartaoMax = 37
        }else if(cart == "c5"){
            cartaoMin = 37
            cartaoMax = 43
        }else if(cart == "c6"){
            cartaoMin = 43
            cartaoMax = 51
        }else if(cart == "c7"){
            cartaoMin = 51
            cartaoMax = 67
        }else if(cart == "c8"){
            cartaoMin = 67
            cartaoMax = 83
        }else if(cart == "c9"){
            cartaoMin = 83
            cartaoMax = 99
        }else if(cart == "c14"){
            cartaoMin = 100
            cartaoMax = 107
        }else if(cart == "c15"){
            cartaoMin = 107
            cartaoMax = 115
        }else if(cart == "c16"){
            cartaoMin = 115
            cartaoMax = 119
        }else if(cart == "c17"){
            cartaoMin = 119
            cartaoMax = 123
        }else if(cart == "c18"){
            cartaoMin = 123
            cartaoMax = 127
        }
    }


})