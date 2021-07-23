const allImages = document.getElementsByTagName("img");

for (let img of allImages) {
  const size = String(Math.floor(Math.random() * 400) + 400);
  const link = `https://picsum.photos/${size}/${size}`;
  img.src = link;
}

const links = document.querySelectorAll("a");
const linkList = [];

for (let link of links) {
  const index = Math.floor(Math.random() * linkList.length);
  linkList.splice(index, 0, link.href);
}
for (let i = 0; i < links.length; i++) {
  links[i].href = linkList[i];
}
