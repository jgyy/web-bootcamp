const prompt = require("prompt");
const schema = {
  name: "secret",
  description: "Enter the secret code",
};
const SECRET = "secret";

prompt.start();

const query = () => {
  prompt.get([schema], function (err, res) {
    if (res.secret != SECRET) {
      console.log("You guessed incorrectly, please try again.");
      query();
    } else {
      console.log("CONGRATES YOU GOT THE SECRET!!!!");
    }
  });
};

query();
