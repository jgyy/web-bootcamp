const delayColorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    console.log(newColor);
    doNext && doNext();
  }, delay);
};

delayColorChange("red", 512, () => {
  delayColorChange("orange", 512, () => {
    delayColorChange("yellow", 512, () => {
      delayColorChange("green", 512, () => {
        delayColorChange("blue", 512, () => {
          delayColorChange("indigo", 512, () => {
            delayColorChange("violet", 512, () => {});
          });
        });
      });
    });
  });
});
