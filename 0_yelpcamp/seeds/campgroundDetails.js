import { LoremIpsum } from "lorem-ipsum";
import cities from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";

const lorem = new LoremIpsum({ wordsPerSentence: { max: 99, min: 1 } });
const loremSentence = () => lorem.generateSentences(1);
const cityList = () => cities.sort(() => Math.random() - 0.5);
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const image = () => {
  const url = "https://source.unsplash.com/random/";
  const w = Math.floor((Math.random() - 0.5) * 100) + 800;
  const h = Math.floor((Math.random() - 0.5) * 100) + 450;
  return `${url}${w}x${h}`;
};

const campgroundDetails = (city) => {
  return {
    location: `${city.city} ${city.state}`,
    title: `${sample(descriptors)} ${sample(places)}`,
    image: image(),
    description: loremSentence(),
    price: Math.floor(Math.random() * 10000) / 100,
  };
};

export { campgroundDetails, cityList, loremSentence };
