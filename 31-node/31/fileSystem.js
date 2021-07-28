import fs from "fs";
let folderName = "";
if (process.argv.length > 2) folderName = `/tmp/${process.argv[2]}`;
else folderName = "/tmp/project";

try {
  if (fs.existsSync(folderName)) fs.rmSync(folderName, { recursive: true });
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`, "");
  fs.writeFileSync(`${folderName}/style.css`, "");
  fs.writeFileSync(`${folderName}/app.js`, "");
  fs.readdirSync(folderName).forEach(file => console.log(file));
} catch (e) {
  console.log(e);
}
