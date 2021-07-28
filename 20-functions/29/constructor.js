function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `rgb(${r}, ${g}, ${b})`;
};
Color.prototype.rgba = function (a=1.0) {
    const { r, g, b } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

Color.prototype.hex = function () {
  const { r, g, b } = this;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const color = new Color(200, 100, 50);
console.log(color);
console.log(color.r, color.g, color.b);
console.log(color.rgb());
console.log(color.rgba(0.5));
console.log(color.hex());
