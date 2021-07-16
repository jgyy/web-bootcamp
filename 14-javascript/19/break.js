const prompt = require("prompt");
const schema = {
  name: "prompt",
  description: "Hey, say something",
};

prompt.start();

const query = () => {
  prompt.get([schema], function (err, res) {
    input = res.prompt;
    if (input.toLowerCase() != "stop copying me") {
      console.log(input);
      query();
    }
  });
};

query();
