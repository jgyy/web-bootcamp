const prompt = require("prompt");
const schema = {
  name: "password",
  description: "Please enter a new password",
};

prompt.start();
prompt.get([schema], function (err, result) {
  const password = result.password;
  if (password.length >= 6) {
    if (password.indexOf(" ") === -1) {
      console.log("Valid password!");
    } else {
      console.log("Password cannot contain spaces!");
    }
  } else {
    console.log("PASSWORD TOO SHORT! Must be 6+ characters");
  }
});
