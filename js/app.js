const cryptoSelect = document.querySelector("#criptomonedas");

document.addEventListener("DOMContentLoaded", () => {
  consultarCrypto();
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
