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

const rainbow = async () => {
  await delayColorChange("red", 512);
  await delayColorChange("orange", 512);
  await delayColorChange("yellow", 512);
  await delayColorChange("green", 512);
  await delayColorChange("blue", 512);
  await delayColorChange("indigo", 512);
  await delayColorChange("violet", 512);
  return "End of Rainbow";
};
rainbow();
