const allLinks = document.querySelectorAll("a");
const linkText = [];

for (let link of allLinks) {
  index = Math.floor(Math.random() * linkText.length);
  linkText.splice(index, 0, link.innerHTML);
}
for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].innerHTML = linkText[i];
}
