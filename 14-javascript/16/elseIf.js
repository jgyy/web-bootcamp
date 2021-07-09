// 0-5 - FREE
// 5-10 - CHILD $10
// 10-65 - ADULT $20
// 65+ SENIOR $10

const age = Math.floor(Math.random() * 99);
if (age < 5) {
    console.log("You are a baby. You get in for free!");
} else if (age < 10) {
    console.log("You are a child. You pay $10!");
} else if (age < 65) {
    console.log("You are an adult. You pay $20!");
}