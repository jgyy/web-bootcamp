function greet(firstName, LastName) {
  console.log(`Hey there, ${firstName} ${LastName[0]}.`);
}
greet("Cool", "Hot");

function repeat(str, numTimes) {
  let result = "";
  for (let i = 0; i < numTimes; i++) {
    result += str;
  }
  console.log(result);
}
repeat("Temperature ", 99);
