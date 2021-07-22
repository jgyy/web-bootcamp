const allLinks = document.querySelectorAll("a");
const linkText = [];

for (let link of allLinks) {
  index = Math.floor(Math.random() * linkText.length);
  linkText.splice(index, 0, link.innerHTML);
}
for (let i = 0; i < allLinks.length; i++) {
  let color = "#";
  for (let j = 0; j < 8; j++) {
    const num = Math.floor(Math.random() * 16);
    color += num.toString(16);
  }
  allLinks[i].innerHTML = linkText[i];
  allLinks[i].style.color = color;
}
