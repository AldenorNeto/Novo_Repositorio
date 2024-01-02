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
                1 - FUNCIONAMENTO MOLDE: 1 2 3 4 5
              </div>
              <section>
                <div className="I">
                  <nav className="tag">%I12.0</nav>
                  <nav>FC AB Molde 1</nav>
                  <div className="IQb" id="I120"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.1</nav>
                  <nav>FC FE Molde 1</nav>
                  <div className="IQb" id="I121"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.2</nav>
                  <nav>FC IN Molde 1</nav>
                  <div className="IQb" id="I122"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.3</nav>
                  <nav>FC AB Molde 2</nav>
                  <div className="IQb" id="I123"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.4</nav>
                  <nav>FC FE Molde 2</nav>
                  <div className="IQb" id="I124"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.5</nav>
                  <nav>FC IN Molde 2</nav>
                  <div className="IQb" id="I125"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.6</nav>
                  <nav>FC AB Molde 3</nav>
                  <div className="IQb" id="I126"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I12.7</nav>
                  <nav>FC FE Molde 3</nav>
                  <div className="IQb" id="I127"></div>
                </div>
              </section>
              <section>
                <div className="I">
                  <nav className="tag">%I13.0</nav>
                  <nav>FC IN Molde 3</nav>
                  <div className="IQb" id="I130"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.1</nav>
                  <nav>FC AB Molde 4</nav>
                  <div className="IQb" id="I131"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.2</nav>
                  <nav>FC FE Molde 4</nav>
                  <div className="IQb" id="I132"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.3</nav>
                  <nav>FC IN Molde 4</nav>
                  <div className="IQb" id="I133"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.4</nav>
                  <nav>FC AB Molde 5</nav>
                  <div className="IQb" id="I134"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.5</nav>
                  <nav>FC FE Molde 5</nav>
                  <div className="IQb" id="I135"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.6</nav>
                  <nav>FC IN Molde 5</nav>
                  <div className="IQb" id="I136"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I13.7</nav>
                  <nav></nav>
                  <div className="IQb" id="I137"></div>
                </div>
              </section>
            </div>
            <div className="br"></div>
            <div className="cartao">
              <div className="nomeCartao">
                2 - FUNCIONAMENTO MOLDE: 6 7 8 9 10
              </div>
              <section>
                <div className="I">
                  <nav className="tag">%I14.0</nav>
                  <nav>FC AB Molde 6</nav>
                  <div className="IQb" id="I140"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.1</nav>
                  <nav>FC FE Molde 6</nav>
                  <div className="IQb" id="I141"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.2</nav>
                  <nav>FC IN Molde 6</nav>
                  <div className="IQb" id="I142"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.3</nav>
                  <nav>FC AB Molde 7</nav>
                  <div className="IQb" id="I143"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.4</nav>
                  <nav>FC FE Molde 7</nav>
                  <div className="IQb" id="I144"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.5</nav>
                  <nav>FC IN Molde 7</nav>
                  <div className="IQb" id="I145"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.6</nav>
                  <nav>FC AB Molde 8</nav>
                  <div className="IQb" id="I146"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I14.7</nav>
                  <nav>FC FE Molde 8</nav>
                  <div className="IQb" id="I147"></div>
                </div>
              </section>
              <section>
                <div className="I">
                  <nav className="tag">%I15.0</nav>
                  <nav>%I15.0 FC IN Molde 8</nav>
                  <div className="IQb" id="I150"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.1</nav>
                  <nav>%I15.1 FC AB Molde 9</nav>
                  <div className="IQb" id="I151"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.2</nav>
                  <nav>%I15.2 FC FE Molde 9</nav>
                  <div className="IQb" id="I152"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.3</nav>
                  <nav>%I15.3 FC IN Molde 9</nav>
                  <div className="IQb" id="I153"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.4</nav>
                  <nav>%I15.4 FC AB Molde 10</nav>
                  <div className="IQb" id="I154"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.5</nav>
                  <nav>%I15.5 FC FE Molde 10</nav>
                  <div className="IQb" id="I155"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.6</nav>
                  <nav>%I15.6 FC IN Molde 10</nav>
                  <div className="IQb" id="I156"></div>
                </div>
                <div className="I">
                  <nav className="tag">%I15.7</nav>
                  <nav></nav>
                  <div className="IQb" id="I157"></div>
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
