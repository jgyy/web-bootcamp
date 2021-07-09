const prompt = require("prompt");
const schema = {
  name: "input",
  description: "Enter something",
};

prompt.start();
prompt.get([schema], function (err, result) {
  const input = result.input;
  if (input) {
    console.log("TRUTHY");
  } else {
    console.log("FALSY");
  }
});
