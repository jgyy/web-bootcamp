function bankRobbery() {
  const heroes = ["Spiderman", "Wolverine", "Panther", "Batman"];
  function cryForHelp() {
      let color = "purple";
      console.log(color);
      function inner() {
          for (let hero of heroes) {
              console.log(`PLEASE HELP US, ${hero}!`);
          }
      }
      inner();
  }
  cryForHelp();
}
bankRobbery();
