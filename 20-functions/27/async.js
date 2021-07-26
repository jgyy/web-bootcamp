const login = async (username, password) => {
  random = Math.random();
  if (random > 0.1) throw `Invalid Credentials ${password.length}`;
  return `Welcome, ${username}!`;
};

const loginFunc = (username, password) => {
  login(username, password)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      setTimeout(() => {
        loginFunc(username, password);
      }, 512);
    });
};
loginFunc("username", "password");
