const cryptoSelect = document.querySelector("#criptomonedas");

document.addEventListener("DOMContentLoaded", () => {
  consultarCrypto();
});

function consultarCrypto() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => console.log(result.Data));
}
