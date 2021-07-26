const delayColorChange = async (newColor, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.1) {
        resolve(`    Resolved: ${newColor}`);
      } else {
        reject(`Rejected: ${newColor}`);
      }
    }, delay);
  })
    .then((res) => {
      console.log(res);
    })
    .catch((rej) => {
      console.log(rej);
      delayColorChange(newColor, delay);
    });
};

delayColorChange("red", 512)
  .then(delayColorChange("orange", 512))
  .then(delayColorChange("yellow", 512))
  .then(delayColorChange("green", 512))
  .then(delayColorChange("blue", 512))
  .then(delayColorChange("indigo", 512))
  .then(delayColorChange("violet", 512));
