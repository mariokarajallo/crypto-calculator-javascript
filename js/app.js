const cryptoSelect = document.querySelector("#criptomonedas");
const coinSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");

const objCrypto = {
  coin: "",
  crypto: "",
};

document.addEventListener("DOMContentLoaded", () => {
  consultarCrypto();
  cryptoSelect.addEventListener("change", leerValor);
  coinSelect.addEventListener("change", leerValor);
  formulario.addEventListener("submit", enviarFormulario);
});

// promise
const obtenerCrypto = (crypto) =>
  new Promise((resolve) => {
    resolve(crypto);
  });

function consultarCrypto() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => obtenerCrypto(result.Data))
    .then((crypto) => selectCrypto(crypto));
}

function selectCrypto(crypto) {
  crypto.forEach((coin) => {
    const { Name, FullName } = coin.CoinInfo;

    const option = document.createElement("OPTION");
    option.value = Name;
    option.textContent = FullName;
    cryptoSelect.appendChild(option);
  });
}

function leerValor(e) {
  console.log(e.target.value);
  console.log(e.target.name);
  objCrypto[e.target.name] = e.target.value;
  console.log(objCrypto);
}

function enviarFormulario(e) {
  e.preventDefault();

  //validar
  const { coin, crypto } = objCrypto;
  if (coin === "" || crypto === "") {
    console.log("incompleto");
    return;
  }
}
