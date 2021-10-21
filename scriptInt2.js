$(document).ready(() => {
    var fruta = ['4', '2', '2', '7', '9', '0', '6', '2', '5', '8']
    var entradaAnalogica = [55,77,99,33,11]
    const ajaxValues = link => {
        
        //$.get(link, function(data){
            var data = "4227906258 3147649 433684552 2139226109"
            var arr = data.split();          //['xxxxxxxxxxx xxxxxxxx xxxxxxxxxx xxxxx']
            arr = arr[0].split(' ');          //['xxxxxxxxxxx', 'xxxxxxxx', 'xxxxxxxxxx', 'xxxxx']

                

                fruta[parseInt(Math.random()*10)] = parseInt(Math.random()*10) + ''
                arr[0] = fruta.join('')
                arr[1] = fruta.join('')
                arr[2] = fruta.join('')
                arr[3] = fruta.join('')



            var quantidadeUDInt = arr.length        //4 ou 6
            var arrayArmazenaEmBool = []
            for(let n = 0; n < quantidadeUDInt; n++){
                arrayArmazenaEmBool.push(parseInt(arr[n]).toString(2))        //['1010100110101', '110100010', '101011110010', '10110']
            }

            for (var UDInt10dig = 0; UDInt10dig < quantidadeUDInt; UDInt10dig++) {
                arrayArmazenaEmBool[UDInt10dig] = (arrayArmazenaEmBool[UDInt10dig]).split('');     //[['1','0','1','0','1','0','0','1','1'...
                for (var x = 0; x < arrayArmazenaEmBool[UDInt10dig].length; x++) {
                    arrayArmazenaEmBool[UDInt10dig][x] = parseInt(arrayArmazenaEmBool[UDInt10dig][x])      //[[1,0,1,0,1,0,0,1,1,0,1,0,1], ...
                }
                while(arrayArmazenaEmBool[UDInt10dig].length < 32){
                    arrayArmazenaEmBool[UDInt10dig].unshift(0);          //[[0,0,0,0,0,1,0,1,0,1,0,0,1,1,0,1,0,1], [0,0,0,0,1,1,0,1,0,1...
                }
                arrayArmazenaEmBool[UDInt10dig].reverse()          //[[1,0,1,1,0,0,1,0,1,0,1,0,0,0,0,0], [1,0,1,1,0,1...
            }

            var i = 0
            for(let n = 0; n < quantidadeUDInt; n++){
                for (let cont = 0; cont < 32; cont++) {
                    entradasESaidasConcatenadas[i] = arrayArmazenaEmBool[n][[cont]]         //[1,0,1,1,0,0,1,0,1,0,1,0,0,0,0,0,1...
                    i++
                }
            }
        //})
    }

    var preencheArraycomZeros = (array,quantidade) => {
        for(let n = 0; n < quantidade; n++){
            array.push(0)
        }
    }



    var todosIDs = []
    var _todosIDs = id => "#" + todosIDs[id]
    var todosWrd = []
    var _todosWrd = id => "#" + todosWrd[id]
    
    var invalidaVariveisVazias = valorClass => {
        let tag
        let texto
        var _valorClassEQ = id => $("."+valorClass+":eq(" + id +")")
        var numerosDeElementoDaClass = $("."+valorClass).length
        for(let n = 0; n < numerosDeElementoDaClass; n++){
            texto = _valorClassEQ(n).next().text()
            if(texto){
                tag = _valorClassEQ(n).next().next().attr("id")
                valorClass == "tag" ? todosIDs.push(tag) : todosWrd.push(tag)
            }
            else{
                _valorClassEQ(n).parent().removeClass().addClass('class')
            }
        } 
    }
    invalidaVariveisVazias("tag")
    invalidaVariveisVazias("wrd") 

    var quantidadesDeIO = todosIDs.length      //127 ou 200

    var entradasESaidasConcatenadas = []
    preencheArraycomZeros(entradasESaidasConcatenadas,quantidadesDeIO)
    var tempoEmON = []
    preencheArraycomZeros(tempoEmON,quantidadesDeIO)

    var SensCilGiraMesaAvancado

    var backgroundcolor = (adress,cor) =>  $(adress).css('background-color',cor)
    cartaoMax = 14
    cartaoMin =0


    var variaveisEstado = () => {

        for(let n = 0; n < quantidadesDeIO; n++){
            if(entradasESaidasConcatenadas[n]){
                tempoEmON[n]++
            }  
        }

        var pintaIdentificacaoRapida = () => {
            if(moduloDeMonutoramento == "IDENTIFICACAO_RAPIDA"){
                for(let n = 0; n < quantidadesDeIO; n++){
                    entradasESaidasConcatenadas[n] ? backgroundcolor(_todosIDs(n),'#00ff00') : backgroundcolor(_todosIDs(n),'#dbdbdb')
                    mostraTempo($(_todosIDs(n)),n)
                }
            }
        }
        pintaIdentificacaoRapida()


        if(moduloDeMonutoramento == "temposDeCiclo"){ // PREENCHE A BARRA DE TRACE DA VARIAVEL n

            $(".lupa").change(() => {
                identificaCartao($(".lupa:checked").val())
                for(let n = cartaoMin; n < cartaoMax; n++){
                    $(_todosIDs(n) + " div").remove()
                }
            })

            var preencheBarraTemposDeCiclo = () => {
                
                console.log(cartaoMin,cartaoMax);
                for(let n = cartaoMin; n < cartaoMax; n++){
                    $(_todosIDs(n)).append("<div class='estado'></div>");
                    entradasESaidasConcatenadas[n] ? backgroundcolor(_todosIDs(n) + " div:last-child",'#00ff00') : backgroundcolor(_todosIDs(n) + " div:last-child",'#dbdbdb')
                    if($(_todosIDs(n)).children().length >= 300){
                        $(_todosIDs(n) + " div:eq(0)").remove();
                    }
                }
            }

            preencheBarraTemposDeCiclo()


            $(".tamanho").css('height',parseInt(Math.random()*250)+'px')


        }


        
        if((SensCilGiraMesaAvancado == 0) && (entradasESaidasConcatenadas[1] == 1)){ // ATUALIZA CONTADOR DE VARIAVEL DENTRO A CADA CICLO
            for(let n = 0; n < quantidadesDeIO ; n++){
                if(moduloDeMonutoramento == "temposDeCiclo"){
                    mostraTempo($(_todosIDs(n)).parent().find(".tempoFinal"),n)  // ATUALIZA CONTADOR EM TEMPOS DE CICLO QUANDO O CICLO ACABA
                }
                tempoEmON[n] = 0
            }
        }
        SensCilGiraMesaAvancado = entradasESaidasConcatenadas[1]
    }

    var i = 0

    setInterval(variaveisEstado);

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
                $(_todosIDs(n)).text("")  
            }
        }

        if(($("#exibicao option:selected").val() == "temposDeCiclo")){
            $(".IDEN").attr('id','temposDeCiclo')
            moduloDeMonutoramento = "temposDeCiclo"
            for(let n = 0; n < quantidadesDeIO; n++){
                $(_todosIDs(n)).parent().append("<div class='tempoFinal'>0.0s</div>")
                $(_todosIDs(n)).text("")
                $(_todosIDs(n)).css('background-color','#e2e2e2')
            }

        }

    })


    var identificaCartao = cart => {
        cart === undefined ? cart = "c2" : cart = cart
        var ternario = (cartao, min, max) => {if(cart == cartao) { return (cartaoMin = min, cartaoMax = max)}}
        ternario("c2",0,14);
        ternario("c3",14,30);
        ternario("c4",30,37);
        ternario("c5",37,43);
        ternario("c6",43,51);
        ternario("c7",51,67);
        console.log(cart);
    }

    var mostraTempo = (local,IO) => {
            var dezena = tempoEmON[IO] /100
            local.text(dezena.toFixed(1) + " s") 
    }

})