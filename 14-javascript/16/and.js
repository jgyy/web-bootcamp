const prompt = require("prompt");
const schema = {
  name: "password",
  description: "Enter your password",
};

prompt.start();
prompt.get([schema], function (err, result) {
  const password = result.password;
  if (password.length >= 6 && password.indexOf(" ") === -1) {
    console.log("VALID PASSWORD!");
  } else {
    console.log("INCORRECT FORMAT FOR PASSWORD!");
  }
});
