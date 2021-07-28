function makeColor(r, g, b) {
  return {
    r: r,
    g: g,
    b: b,
    rgb: function () {
      const { r, g, b } = this;
      return `rgb(${r}, ${g}, ${b})`;
    },
    hex: function () {
      const { r, g, b } = this;
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    },
  };
}

const color = makeColor(200, 100, 50);
console.log(color);
console.log(color.r, color.g, color.b);
console.log(color.rgb());
console.log(color.hex());
