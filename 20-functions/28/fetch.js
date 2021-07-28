import fetch from "node-fetch";

const fetchBitcoinPrice = async () => {
  const random = Math.random();
  try {
    const res = await fetch("https://api.cryptonator.com/api/ticker/btc-usd");
    const data = await res.json();
    console.log(data.ticker.price);
    if (random > 0.5) throw "Bitcoin price is inaccurate!";
  } catch (e) {
    console.log("SOMETHING WENT WRONG!!!!");
    console.log(e);
  }
};
fetchBitcoinPrice();
