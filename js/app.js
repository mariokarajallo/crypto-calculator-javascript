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

function selectCrypto(crypto) {
  crypto.forEach((coin) => {
    const { Name, FullName } = coin.CoinInfo;

    const option = document.createElement("OPTION");
    option.value = Name;
    option.textContent = FullName;
    cryptoSelect.appendChild(option);
  });
}
