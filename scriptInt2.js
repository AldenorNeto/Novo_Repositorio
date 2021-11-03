setTimeout(() => {
    
    var fruta = ['3', '2', '2', '7', '9', '0', '6', '2', '5', '8']
    var entradaAnalogica = [55,77,99,33,181,170,136,42,18,100,100,100,100,100,100]
    setInterval(()=>fruta[parseInt((Math.random()*9)+1)] = parseInt(Math.random()*5) + '',2000)
  

    const ajaxValues = link => {
        //$.get(link, data => {
            var data = [fruta.join(''),' ',fruta.join(''),' ',fruta.join(''),' ','9226109'].join('')//'xxxxxxxxxxx xxxxxxxx xxxxxxxxxx xxxxx'

            var arrayArmazenaEmBool = [data][0].split(' ').reduce((acumulado, indice) => acumulado.concat(parseInt(indice).toString(2)),[]) //['1010100110101', '110100010', '101011110010', '10110']
            arrayArmazenaEmBool = arrayArmazenaEmBool.map((value) => value.padStart(32,0)).map((value) => value = Array.from(value,Math.abs).reverse()) 
            return arrayArmazenaEmBool.reduce((total, indice) => total.concat(indice), [])
         //})
    }

    var todosIDs = []
    var todosWrd = []
    const _todosIDs = id => "#" + todosIDs[id]
    const _todosWrd = id => "#" + todosWrd[id]
    
    const invalidaVariveisVazias = valorClass => {
        var array = []
        const _valorClassEQ = id => $("."+valorClass+":eq("+ id +")")
        const ElementoDaClass = $("."+valorClass)
        for(let n in ElementoDaClass){
            if(_valorClassEQ(n).next().text()){
                array.push(_valorClassEQ(n).next().next().attr("id"))
            }else{
                adicionaClasseAosCartoes(_valorClassEQ(n),'class')
            }
        } 
        return array
    }

    const adicionaClasseAosCartoes = (address,classe) => address.parent().removeClass().addClass(classe) 

    const backgroundcolor = (address,cor) => $(address).css('background-color',cor)

    const somaMaisUmSeVariavelDentro = (arrayDeReferencia) => {
        for(let n in todosIDs){if(arrayDeReferencia[n])tempoEmON[n]++}
    }

    const pintaIdentificacaoRapida = (VariveisQueSeramPintadas,tempoEmON) => {
        for(let n in todosIDs){
            VariveisQueSeramPintadas[n] ? backgroundcolor(_todosIDs(n),'#00ff00') : backgroundcolor(_todosIDs(n),'#dbdbdb')
            mostraTempo($(_todosIDs(n)),tempoEmON[n])
        }
    }
    
    const trocaAsBarrasAoTrocarOCartao = () => {
        tamanhoCartao = identificaCartao($(".lupa:checked").val())
        for(let n = tamanhoCartao.min; n < tamanhoCartao.max; n++){
            $(_todosIDs(n) + " div").remove()
        }
        return tamanhoCartao
    }
    
    const preencheBarraTemposDeCiclo = (tamanhoCartao,veriaveisEmTrueAtualmente) => {
        for(let n = tamanhoCartao.min; n < tamanhoCartao.max; n++){
            $(_todosIDs(n)).append("<div class='estado'></div>");
            veriaveisEmTrueAtualmente[n] ? backgroundcolor(_todosIDs(n) + " div:last-child",'#00ff00') : backgroundcolor(_todosIDs(n) + " div:last-child",'#dbdbdb')
            if($(_todosIDs(n)).children().length >= 300){
                $(_todosIDs(n) + " div:eq(0)").remove();
            }
        }
    }


    
    var pintaAnalogicasTemposDeCiclo = () => {
        for(let n in entradaAnalogica){
            entradaAnalogica[n] = Math.abs(entradaAnalogica[n] + parseInt((Math.random() - 0.5)*10))
            entradaAnalogica[n] > 190 ? entradaAnalogica[n] = 190 : entradaAnalogica[n] * 1
            $(_todosWrd(n) + " .tamanho").css('height',entradaAnalogica[n])
            
        }
    }


    const identificaCartao = cart => {
        var  min, max
        cart === undefined ? cart = "c2" : cart = cart
        const ternario = (cartao,mi,ma) => {if(cart == cartao) {min=mi, max=ma}}
        ternario("c2",0,14);
        ternario("c3",14,30);
        ternario("c4",30,37);
        ternario("c5",37,43);
        ternario("c6",43,51);
        ternario("c7",51,67);
        return {min, max}
    }

    const mostraTempo = (local,IO) => {
        local.text((IO /100).toFixed(1) + " s") 
    }

    const mudaDePagDevice = () => {
        const addressToDevice = "http://10.2.65.150/awp/"
        let linkCompleto
        $("#device option:selected").val() == "CPU" ? linkCompleto = addressToDevice + "index.html" : linkCompleto = addressToDevice + "index2.html";
        return linkCompleto
    }

    function objGravaBorda(bool,id){
        this.bool = bool
        this.id = id
    }

    const gravaBorda = (armazenaBorda, IO) => {
        if (armazenaBorda == undefined) armazenaBorda = IO
        let arrayApagar = []

        for(let n in armazenaBorda){
            if((armazenaBorda[n] != IO[n]) && (todosIDs[n][0] == "I")){
                var mic = new objGravaBorda(IO[n],_todosIDs(n))
                arrayApagar.push(mic)
            }
        }
        if(arrayApagar.length > 0)console.log(arrayApagar);
        

        return IO

    }


    const MainIdentificacaoRapida = () => {

        var entradasESaidasConcatenadas
        var bordaEntradasESaidas
        var link = mudaDePagDevice()

        $(".tempoFinal").remove()
        $(".IDEN").attr('id','IDENTIFICACAO_RAPIDA')
        todosIDs = invalidaVariveisVazias("tag")
        todosWrd = invalidaVariveisVazias("wrd")

        let armazenaBorda
        tempoEmON = Array(todosIDs.length).fill(0)

        var loop = () => {
            entradasESaidasConcatenadas = ajaxValues(link)
            bordaEntradasESaidas = gravaBorda(bordaEntradasESaidas,entradasESaidasConcatenadas)
            somaMaisUmSeVariavelDentro(entradasESaidasConcatenadas)
            if(entradasESaidasConcatenadas[1] && !armazenaBorda) tempoEmON = Array(todosIDs.length).fill(0)
            armazenaBorda = entradasESaidasConcatenadas[1]
            pintaIdentificacaoRapida(entradasESaidasConcatenadas,tempoEmON)
        }
        clearInterval(cleanLoop)
        cleanLoop = setInterval(loop)
        
        $("#device").change(() => link = mudaDePagDevice())
    }

    const MainTemposDeCiclo = () => {

        var entradasESaidasConcatenadas
        var link = mudaDePagDevice()
        $(".IDEN").attr('id','temposDeCiclo')
        todosIDs = invalidaVariveisVazias("tag")
        todosWrd = invalidaVariveisVazias("wrd")

        for(let n in todosIDs){
            $(_todosIDs(n)).parent().append("<div class='tempoFinal'>0.0s</div>")
            $(_todosIDs(n)).text("")
            backgroundcolor(_todosIDs(n),'#e2e2e2')
        }

        var tamanhoCartao = identificaCartao($(".lupa:checked").val())
        $(".lupa").change(() => tamanhoCartao = trocaAsBarrasAoTrocarOCartao())

        let armazenaBorda
        var loop = () => { 
            entradasESaidasConcatenadas = ajaxValues(link)
            preencheBarraTemposDeCiclo(tamanhoCartao,entradasESaidasConcatenadas)
            somaMaisUmSeVariavelDentro(entradasESaidasConcatenadas)
            if(entradasESaidasConcatenadas[1] && !armazenaBorda){for(let n in todosIDs){mostraTempo($(_todosIDs(n)).parent().find(".tempoFinal"),tempoEmON[n])}tempoEmON = Array(todosIDs.length).fill(0)}
            armazenaBorda = entradasESaidasConcatenadas[1]  // ATUALIZA CONTADOR }
            pintaAnalogicasTemposDeCiclo()
        }
        clearInterval(cleanLoop)
        cleanLoop = setInterval(loop)

        $("#device").change(() => link = mudaDePagDevice())
    }

    $("#exibicao").change(() => selecionaValor("#exibicao","IDENTIFICACAO_RAPIDA") ? MainIdentificacaoRapida() : MainTemposDeCiclo())

    const selecionaValor = (nome,valor) => $(nome+" option:selected").val() == valor
    var cleanLoop
    var tempoEmON
    mudaDePagDevice()
    MainIdentificacaoRapida()


})