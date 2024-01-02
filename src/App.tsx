import { useState } from "react";
import "./App.css";
import "./AppTempos.css";

function App() {
  const [count, setCount] = useState(0);
  let tempoEmON: any = 0;

  let fruta = ["3", "2", "2", "7", "9", "0", "6", "2", "5", "8"];
  let entradaAnalogica = [
    55, 77, 99, 33, 181, 170, 136, 42, 18, 100, 100, 100, 100, 100, 100,
  ];
  setInterval(
    () => (fruta[Math.random() * 9 + 1] = Math.random() * 5 + ""),
    2000
  );

  const ajaxValues = (link: any) => {
    //$.get(link, data => {
    let data = [
      fruta.join(""),
      " ",
      fruta.join(""),
      " ",
      fruta.join(""),
      " ",
      "9226109",
    ].join(""); //'xxxxxxxxxxx xxxxxxxx xxxxxxxxxx xxxxx'

    let arrayArmazenaEmBool = data
      .split(" ")
      .reduce((acumulado, indice) => [...acumulado, indice] as any, []); //['1010100110101', '110100010', '101011110010', '10110']
    const arrayArmazenaNumber = arrayArmazenaEmBool
      .map((value: any) => value.padStart(32, "0"))
      .map((value) => Array.from(value, Math.abs).reverse());
    return arrayArmazenaNumber.reduce(
      (total, indice) => total.concat(indice),
      []
    );
    //})
  };

  let todosIDs: any[] = [];
  let todosWrd: any[] = [];
  const _todosIDs = (id: any) => "#" + todosIDs[id];
  const _todosWrd = (id: any) => "#" + todosWrd[id];

  const invalidaVariveisVazias = (valorClass: any) => {
    let array = [];
    const _valorClassEQ = (id: any) => $("." + valorClass + ":eq(" + id + ")");
    const ElementoDaClass = $("." + valorClass);
    for (let n in ElementoDaClass) {
      if (_valorClassEQ(n).next().text())
        array.push(_valorClassEQ(n).next().next().attr("id"));
      else adicionaClasseAosCartoes(_valorClassEQ(n), "class");
    }
    return array;
  };

  const adicionaClasseAosCartoes = (address: any, classe: any) =>
    address.parent().removeClass().addClass(classe);

  const backgroundcolor = (address: any, cor: any) =>
    $(address).css("background-color", cor);

  const somaMaisUmSeVariavelDentro = (arrayDeReferencia: any) => {
    for (let n in todosIDs) {
      if (arrayDeReferencia[n]) tempoEmON[n]++;
    }
  };

  const pintaIdentificacaoRapida = (
    VariveisQueSeramPintadas: any,
    tempoEmON: any
  ) => {
    for (let n in todosIDs) {
      VariveisQueSeramPintadas[n]
        ? backgroundcolor(_todosIDs(n), "#00ff00")
        : backgroundcolor(_todosIDs(n), "#dbdbdb");
      mostraTempo($(_todosIDs(n)), tempoEmON[n]);
    }
  };

  const trocaAsBarrasAoTrocarOCartao = () => {
    let tamanhoCartao: any = identificaCartao($(".lupa:checked").val() as any);
    for (let n = tamanhoCartao.min; n < tamanhoCartao.max; n++) {
      $(_todosIDs(n) + " div").remove();
    }
    return tamanhoCartao;
  };

  const preencheBarraTemposDeCiclo = (
    tamanhoCartao: any,
    veriaveisEmTrueAtualmente: any
  ) => {
    for (let n = tamanhoCartao.min; n < tamanhoCartao.max; n++) {
      $(_todosIDs(n)).append("<div class='estado'></div>");
      veriaveisEmTrueAtualmente[n]
        ? backgroundcolor(_todosIDs(n) + " div:last-child", "#00ff00")
        : backgroundcolor(_todosIDs(n) + " div:last-child", "#dbdbdb");
      if ($(_todosIDs(n)).children().length >= 300) {
        $(_todosIDs(n) + " div:eq(0)").remove();
      }
    }
  };

  const pintaAnalogicasTemposDeCiclo = () => {
    for (let n in entradaAnalogica) {
      entradaAnalogica[n] = Math.abs(
        entradaAnalogica[n] + (Math.random() - 0.5) * 10
      );
      entradaAnalogica[n] > 190
        ? (entradaAnalogica[n] = 190)
        : entradaAnalogica[n] * 1;
      $(_todosWrd(n) + " .tamanho").css("height", entradaAnalogica[n]);
    }
  };

  const identificaCartao = (cart = "c2") => {
    let min, max;
    const ternario = (cartao: any, mi: any, ma: any) => {
      if (cart == cartao) {
        (min = mi), (max = ma);
      }
    };
    ternario("c2", 0, 14);
    ternario("c3", 14, 30);
    ternario("c4", 30, 37);
    ternario("c5", 37, 43);
    ternario("c6", 43, 51);
    ternario("c7", 51, 67);
    return { min, max };
  };

  const mostraTempo = (local: any, IO: any) => {
    local.text((IO / 100).toFixed(1) + " s");
  };

  const mudaDePagDevice = () => {
    const addressToDevice = "http://10.2.65.150/awp/";
    let linkCompleto;
    $("#device option:selected").val() == "CPU"
      ? (linkCompleto = addressToDevice + "index.html")
      : (linkCompleto = addressToDevice + "index2.html");
    return linkCompleto;
  };

  const arrayGravaBordaCicloCompleto = { array: [] as any[] };

  const gravaBorda = (armazenaBorda: any, IO: any) => {
    if (armazenaBorda == undefined) armazenaBorda = IO;
    let arrayApagar = [];

    if (todosIDs.length > 0)
      for (let n in armazenaBorda as any[]) {
        if (armazenaBorda[n] != IO[n] && todosIDs[n][0] == "I")
          arrayApagar.push({ bool: IO[n], id: todosIDs[n] });
      }
    if (arrayApagar.length > 0) {
      arrayGravaBordaCicloCompleto.array = [
        ...arrayGravaBordaCicloCompleto.array,
        arrayApagar,
      ];
    }
    return IO;
  };

  const preencheBordaGrid = (array: any[]) => {
    $("#ordemDasVariaveis > *").remove();
    for (let n in array) {
      for (let m in array[n]) {
        let bool;
        array[n][m].bool ? (bool = "subida") : (bool = "descida");
        $("#ordemDasVariaveis").append(
          "<nav class=" +
            bool +
            '><i class="ceta"></i>' +
            array[n][m].id +
            "</nav>"
        );
      }
    }
    return [];
  };

  const MainIdentificacaoRapida = () => {
    let entradasESaidasConcatenadas;
    let bordaEntradasESaidas: any;
    let armazenaBorda: any;

    tempoEmON = Array(todosIDs.length).fill(0);

    $(".tempoFinal").remove();
    $(".IDEN").attr("id", "IDENTIFICACAO_RAPIDA");

    todosIDs = invalidaVariveisVazias("tag");
    todosWrd = invalidaVariveisVazias("wrd");

    let loop = () => {
      entradasESaidasConcatenadas = ajaxValues(mudaDePagDevice());
      bordaEntradasESaidas = gravaBorda(
        bordaEntradasESaidas,
        entradasESaidasConcatenadas
      );
      somaMaisUmSeVariavelDentro(entradasESaidasConcatenadas);
      if (entradasESaidasConcatenadas[1] && !armazenaBorda) {
        tempoEmON = Array(todosIDs.length).fill(0);
        arrayGravaBordaCicloCompleto.array = preencheBordaGrid(
          arrayGravaBordaCicloCompleto.array
        );
      }
      armazenaBorda = entradasESaidasConcatenadas[1];
      pintaIdentificacaoRapida(entradasESaidasConcatenadas, tempoEmON);
    };
    clearInterval(cleanLoop);
    cleanLoop = setInterval(loop);

    $("#device").change(() => {
      const link = mudaDePagDevice();
    });
  };

  const MainTemposDeCiclo = () => {
    let entradasESaidasConcatenadas;
    $(".IDEN").attr("id", "temposDeCiclo");
    todosIDs = invalidaVariveisVazias("tag");
    todosWrd = invalidaVariveisVazias("wrd");

    for (let n in todosIDs) {
      $(_todosIDs(n)).parent().append("<div class='tempoFinal'>0.0s</div>");
      $(_todosIDs(n)).text("");
      backgroundcolor(_todosIDs(n), "#e2e2e2");
    }

    let tamanhoCartao = identificaCartao($(".lupa:checked").val() as any);
    $(".lupa").change(() => (tamanhoCartao = trocaAsBarrasAoTrocarOCartao()));

    let armazenaBorda: any;
    let loop = () => {
      entradasESaidasConcatenadas = ajaxValues(mudaDePagDevice());
      preencheBarraTemposDeCiclo(tamanhoCartao, entradasESaidasConcatenadas);
      somaMaisUmSeVariavelDentro(entradasESaidasConcatenadas);
      if (entradasESaidasConcatenadas[1] && !armazenaBorda) {
        for (let n in todosIDs) {
          mostraTempo(
            $(_todosIDs(n)).parent().find(".tempoFinal"),
            tempoEmON[n]
          );
        }
        tempoEmON = Array(todosIDs.length).fill(0);
      }
      armazenaBorda = entradasESaidasConcatenadas[1]; // ATUALIZA CONTADOR
      pintaAnalogicasTemposDeCiclo();
    };
    clearInterval(cleanLoop as any);
    cleanLoop = setInterval(loop);

    $("#device").change(() => {
      const link = mudaDePagDevice();
    });
  };

  $("#exibicao").change(() =>
    selecionaValor("#exibicao", "IDENTIFICACAO_RAPIDA")
      ? MainIdentificacaoRapida()
      : MainTemposDeCiclo()
  );

  const selecionaValor = (nome: any, valor: any) =>
    $(nome + " option:selected").val() == valor;
  let cleanLoop: any;
  mudaDePagDevice();

  MainIdentificacaoRapida();
  return (
    <div id="all">
      <article>
        <div>
          <nav className="h1">
            <h1>INJETORA 115</h1>
          </nav>
        </div>
        <div className="select">
          <select id="exibicao">
            <option value="IDENTIFICACAO_RAPIDA">IDENTIFICACAO RAP</option>
            <option value="temposDeCiclo">TEMPOS DE CICLO</option>
          </select>
          <select id="device">
            <option value="CPU">CPU</option>
            <option value="REMOTA">REMOTA</option>
          </select>
        </div>
      </article>

      <div
        id="IDENTIFICACAO_RAPIDA"
        className="IDEN"
        style={{ flexDirection: "column", width: "100%" }}
      >
        <div id="CPU" style={{ flexDirection: "column", width: "100%" }}>
          <div className="br"></div>
          <div className="organizacao">
            <div className="cartao">
              <div className="nomeCartao">
              2 - ENTRADAS DIGITAIS GIRO DA MESA E POSIÇÃO DO INJETOR{" "}
                <input
                  type="radio"
                  className="lupa"
                  name="trace"
                  value="c2"
                  id="c2"
                  checked
                />
                <label>
                  <i className="gg-search"></i>
                </label>
              </div>
              <section>
                <div className="I">
                  <nav className="tag">%I0.0</nav>
                  <nav>SENS MOLDE FECH GRADE</nav>
                  <div className="IQb" id="I00"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.1</nav>
                  <nav>SENS CIL GIRA MESA AVANCADO</nav>
                  <div className="IQb" id="I01"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.2</nav>
                  <nav>SENS CIL GIRA MESA RECUADO</nav>
                  <div className="IQb" id="I02"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.3</nav>
                  <nav>SENS CIL TRAVA GIRO FORA</nav>
                  <div className="IQb" id="I03"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.4</nav>
                  <nav>SENS CIL TRAVA GIRO DENTRO</nav>
                  <div className="IQb" id="I04"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.5</nav>
                  <nav>SENS CUNHA AVANC</nav>
                  <div className="IQb" id="I05"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.6</nav>
                  <nav>SENS CUNHA REC</nav>
                  <div className="IQb" id="I06"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I0.7</nav>
                  <nav>SENS INJET1 RECUADO</nav>
                  <div className="IQb" id="I07"></div>
                </div>
              </section>
              <section>
                <div className="I">
                  <nav className="tag">%I1.0</nav>
                  <nav>SENS INJET1 AVANCADO</nav>
                  <div className="IQb" id="I10"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.1</nav>
                  <nav>SENS INJET2 RECUADO</nav>
                  <div className="IQb" id="I11"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.2</nav>
                  <nav>SENS INJET2 AVANCADO</nav>
                  <div className="IQb" id="I12"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.3</nav>
                  <nav>SENS EXTRAT RABICHO RECUADO</nav>
                  <div className="IQb" id="I13"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.4</nav>
                  <nav>SENS FINAL CARGA INJ1</nav>
                  <div className="IQb" id="I14"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.5</nav>
                  <nav>SENS FINAL CARGA INJ2</nav>
                  <div className="IQb" id="I15"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.6</nav>
                  <nav></nav>
                  <div className="IQb" id="I16"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I1.7</nav>
                  <nav></nav>
                  <div className="IQb" id="I17"></div>
                </div>
              </section>
            </div>
            <div className="br"></div>
            <div className="cartao">
              <div className="nomeCartao">
                3 - MANOBRAS MANUAIS{" "}
                <input
                  type="radio"
                  className="lupa"
                  name="trace"
                  value="c3"
                  id="c3"
                />
                <label>
                  <i className="gg-search"></i>
                </label>
              </div>
              <section>
                <div className="I">
                  <nav className="tag">%I2.0</nav>
                  <nav>CH GIROM POSIC LIBERA M</nav>
                  <div className="IQb" id="I20"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.1</nav>
                  <nav>CH GIROM POSIC AUTOMAT</nav>
                  <div className="IQb" id="I21"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.2</nav>
                  <nav>CH GIROM RAPIDO</nav>
                  <div className="IQb" id="I22"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.3</nav>
                  <nav>BOT ENGATE PINOM MANUAL</nav>
                  <div className="IQb" id="I23"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.4</nav>
                  <nav>BOT AV GIROM MANUAL</nav>
                  <div className="IQb" id="I24"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.5</nav>
                  <nav>BOT RET GIROM MANUAL</nav>
                  <div className="IQb" id="I25"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.6</nav>
                  <nav>BOT AV INJETOR1 MANUAL</nav>
                  <div className="IQb" id="I26"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I2.7</nav>
                  <nav>BOT RET INJETOR1 MANUAL</nav>
                  <div className="IQb" id="I27"></div>
                </div>
              </section>
              <section>
                <div className="I">
                  <nav className="tag">%I3.0</nav>
                  <nav>BOT AV INJETOR2 MANUAL</nav>
                  <div className="IQb" id="I30"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.1</nav>
                  <nav>BOT RET INJETOR2 MANUAL</nav>
                  <div className="IQb" id="I31"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.2</nav>
                  <nav>BOT INJEC MANUAL INJETOR1</nav>
                  <div className="IQb" id="I32"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.3</nav>
                  <nav>BOT INJEC MANUAL INJETOR2</nav>
                  <div className="IQb" id="I33"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.4</nav>
                  <nav>SELET DOSAGEM INJET1</nav>
                  <div className="IQb" id="I34"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.5</nav>
                  <nav>SELET DOSAGEM INJET2</nav>
                  <div className="IQb" id="I35"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.6</nav>
                  <nav>SELET INJEC AUT INJET1</nav>
                  <div className="IQb" id="I36"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I3.7</nav>
                  <nav>SELET INJEC AUT INJET2</nav>
                  <div className="IQb" id="I37"></div>
                </div>
              </section>
            </div>
          </div>
          <div className="br"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
