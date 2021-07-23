const input = document.querySelector("input");
const h2 = document.querySelector("h2");

input.addEventListener("input", function() {
    h2.innerText = this.value;
});