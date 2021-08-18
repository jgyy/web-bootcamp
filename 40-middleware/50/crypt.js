import bcrypt from "bcrypt";

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 8);
  console.log(hash);
  return hash;
};

const login = async (pw, hashPw) => {
  const result = await bcrypt.compare(pw, hashPw);
  if (result) console.log("LOGIN SUCCESSFUL!");
  else console.log("LOGIN FAILED!");
};

const pw = Math.random().toString();
const hashPw = await hashPassword(pw);
await login(pw, hashPw);
