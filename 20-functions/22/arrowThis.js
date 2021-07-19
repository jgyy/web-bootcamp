const person = {
  firstName: "Viggo",
  lastName: "Mortensen",
  fullName: () => {
    console.log(this);
  },
  fullName2: function () {
    console.log(this);
  },
  shoutName: function () {
    setTimeout(() => {
      console.log(this);
    }, 1);
  },
  shoutName2: function() {
    setTimeout(function() {
      console.log(this);
    }, 1);
  },
};
person.fullName();
person.fullName2();
person.shoutName();
person.shoutName2();
