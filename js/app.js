const cryptoSelect = document.querySelector("#criptomonedas");
const coinSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

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
    mostrarAlerta("Ambos campos son obligatorios");
    return;
  }

  consultarAPI();
}

function mostrarAlerta(msg) {
  const existeError = document.querySelector(".error");
  if (!existeError) {
    const divMensaje = document.createElement("DIV");
    divMensaje.classList.add("error");
    divMensaje.textContent = msg;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      formulario.removeChild(divMensaje);
    }, 3000);
  }
}
function consultarAPI() {
  const { coin, crypto } = objCrypto;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => mostrarCotizacion(result.DISPLAY[crypto][coin]));
}

function mostrarCotizacion(cotizacion) {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  const precio = document.createElement("P");
  precio.classList.add("precio");
  precio.innerHTML = `El valor es de <span>${PRICE}</span>`;

  const precioAlto = document.createElement("P");
  precioAlto.innerHTML = `El valor mas alto del dia <span>${HIGHDAY}</span>`;

  const precioBajo = document.createElement("P");
  precioBajo.innerHTML = `El valor mas bajo del dia <span>${LOWDAY}</span>`;

  const cambioPorcentaje = document.createElement("P");
  cambioPorcentaje.innerHTML = `Tuvo una variacion de <span>${CHANGEPCT24HOUR} %</span>`;

  const ultimoCambio = document.createElement("P");
  ultimoCambio.innerHTML = `Ultima actualización <span>${LASTUPDATE}</span>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(cambioPorcentaje);
  resultado.appendChild(ultimoCambio);
}
