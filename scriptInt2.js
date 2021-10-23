setTimeout(() => {
    
    var fruta = ['4', '2', '2', '7', '9', '0', '6', '2', '5', '8']
    var entradaAnalogica = [55,77,99,33,11]
    const ajaxValues = link => {
        
        //$.get(link, function(data){
            var data = "4227906258 3147649 433684552 2139226109"
            var arr = data.split();          //['xxxxxxxxxxx xxxxxxxx xxxxxxxxxx xxxxx']
            arr = arr[0].split(' ');          //['xxxxxxxxxxx', 'xxxxxxxx', 'xxxxxxxxxx', 'xxxxx']
                

                fruta[parseInt(Math.random()*10)] = parseInt(Math.random()*10) + ''
                arr = [fruta.join(''),fruta.join(''),fruta.join(''),fruta.join('')]



                
            var quantidadeUDInt = arr.length        //4 ou 6
            var arrayArmazenaEmBool = []
            for(let n = 0; n < quantidadeUDInt; n++){
                arrayArmazenaEmBool.push(parseInt(arr[n]).toString(2))        //['1010100110101', '110100010', '101011110010', '10110']
                arrayArmazenaEmBool[n] = Array.from(arrayArmazenaEmBool[n],Math.abs).reverse().concat(Array(32 - arrayArmazenaEmBool[n].length).fill(0))
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
        var tag, texto
        var _valorClassEQ = id => $("."+valorClass+":eq(" + id +")")
        var numerosDeElementoDaClass = $("."+valorClass).length
        for(let n = 0; n < numerosDeElementoDaClass; n++){
            texto = _valorClassEQ(n).next().text()
            if(texto){
                tag = _valorClassEQ(n).next().next().attr("id")
                valorClass == "tag" ? todosIDs.push(tag) : todosWrd.push(tag)
            }
            else{
                setTimeout(()=>adicionaClasseAosCartoes(_valorClassEQ(n),'class'),2)
                
            }
        } 
    }
    invalidaVariveisVazias("tag")
    invalidaVariveisVazias("wrd")

    var adicionaClasseAosCartoes = (address,classe) => address.parent().removeClass().addClass(classe) 

    var quantidadesDeIO = todosIDs.length      //127 ou 200

    var entradasESaidasConcatenadas = []
    preencheArraycomZeros(entradasESaidasConcatenadas,quantidadesDeIO)
    var tempoEmON = []
    preencheArraycomZeros(tempoEmON,quantidadesDeIO)

    var SensCilGiraMesaAvancado

    var backgroundcolor = (address,cor) => $(address).css('background-color',cor)

    const somaMaisUmSeVariavelDentro = () => {
        for(let n = 0; n < quantidadesDeIO; n++){
            if(entradasESaidasConcatenadas[n]){
                tempoEmON[n]++
            }  
        }
    }

    var pintaIdentificacaoRapida = () => {
            for(let n = 0; n < quantidadesDeIO; n++){
                entradasESaidasConcatenadas[n] ? backgroundcolor(_todosIDs(n),'#00ff00') : backgroundcolor(_todosIDs(n),'#dbdbdb')
                mostraTempo($(_todosIDs(n)),n)
            }
    }
    
    const trocaAsBarrasAoTrocarOCartao = () => {
            tamanhoCartao = identificaCartao($(".lupa:checked").val())
            for(let n = tamanhoCartao.min; n < tamanhoCartao.max; n++){
                $(_todosIDs(n) + " div").remove()
            }
            return tamanhoCartao
    }
    
    var preencheBarraTemposDeCiclo = (tamanhoCartao) => {
        for(let n = tamanhoCartao.min; n < tamanhoCartao.max; n++){
            $(_todosIDs(n)).append("<div class='estado'></div>");
            entradasESaidasConcatenadas[n] ? backgroundcolor(_todosIDs(n) + " div:last-child",'#00ff00') : backgroundcolor(_todosIDs(n) + " div:last-child",'#dbdbdb')
            if($(_todosIDs(n)).children().length >= 300){
                $(_todosIDs(n) + " div:eq(0)").remove();
            }
        }
    }
            //>>>>>$(".tamanho").css('height',parseInt(Math.random()*250)+'px')<<<<

        $("#" + todosIDs[2]).parent().find(".tempoFinal").text("romel")


    const resetaCiclo = () =>{
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

    var identificaCartao = cart => {
        var  min, max
        cart === undefined ? cart = "c2" : cart = cart
        var ternario = (cartao,mi,ma) => {if(cart == cartao) {min=mi, max=ma}}
        ternario("c2",0,14);
        ternario("c3",14,30);
        ternario("c4",30,37);
        ternario("c5",37,43);
        ternario("c6",43,51);
        ternario("c7",51,67);
        return {min, max}
    }

    var mostraTempo = (local,IO) => {
            var dezena = tempoEmON[IO] /100
            local.text(dezena.toFixed(1) + " s") 
    }



    var mudaDePagDevice = () => {
        const addresToDevice = "http://10.2.65.150/awp/"
        const AbreviaAjax = index => setInterval(() => ajaxValues(addresToDevice + index), 1100)
        const replacePagDevice = (Device, cpuBool) => {
            window.location.replace(addresToDevice + Device + ".html")
            return cpuBool
        }
        replacePagDevice ? AbreviaAjax("index.html") : console.log(56663);
        $("#device").change(() => {
            $("#device option:selected").val() == "CPU" ? replacePagDevice("injetore",0) : replacePagDevice("remota",1)
        })
    }


    $("#device").change(mudaDePagDevice())


    const MainIdentificacaoRapida = () => {
        $(".IDEN").attr('id','IDENTIFICACAO_RAPIDA')
        moduloDeMonutoramento = "IDENTIFICACAO_RAPIDA"
        
        for(let n = 0; n < quantidadesDeIO; n++){
            $(".tempoFinal").remove()
            $(_todosIDs(n)).text("")  
        }

        setInterval(() => {if(selecionaValor("#exibicao","IDENTIFICACAO_RAPIDA")){
                somaMaisUmSeVariavelDentro()
                pintaIdentificacaoRapida()
            }
        },10)

        setInterval(resetaCiclo);
    }

    const MainTemposDeCiclo = () => {

        $(".IDEN").attr('id','temposDeCiclo')
        moduloDeMonutoramento = "temposDeCiclo"
        for(let n = 0; n < quantidadesDeIO; n++){
            $(_todosIDs(n)).parent().append("<div class='tempoFinal'>0.0s</div>")
            $(_todosIDs(n)).text("")
            backgroundcolor(_todosIDs(n),'#e2e2e2')
        }

        var tamanhoCartao = identificaCartao($(".lupa:checked").val())
        $(".lupa").change(() => tamanhoCartao = trocaAsBarrasAoTrocarOCartao())
        
        setInterval(() => {if(selecionaValor("#exibicao","temposDeCiclo")){
            preencheBarraTemposDeCiclo(tamanhoCartao)
            somaMaisUmSeVariavelDentro();
        }});

        setInterval(resetaCiclo);
    }

    $("#exibicao").change(() => selecionaValor("#exibicao","IDENTIFICACAO_RAPIDA") ? MainIdentificacaoRapida() : MainTemposDeCiclo())

    const selecionaValor = (nome,valor) => $(nome+" option:selected").val() == valor
    var moduloDeMonutoramento = "IDENTIFICACAO_RAPIDA"
    MainIdentificacaoRapida()

})