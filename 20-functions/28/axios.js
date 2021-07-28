import axios from "axios";

const fetchBitcoinPrice = async () => {
  const random = Math.random();
  try {
    const res = await axios("https://api.cryptonator.com/api/ticker/btc-usd");
    console.log(res.data.ticker.price);
    if (random > 0.5) throw "Bitcoin price is inaccurate!";
  } catch (e) {
    console.log("SOMETHING WENT WRONG!!!!");
    console.log(e);
  }
};
fetchBitcoinPrice();