const args = process.argv.slice(2);
if (args.length > 0) {
  for (let arg of args) {
    console.log(`Hi there, ${arg}!`);
  }
} else {
  console.log(process.argv);
}
