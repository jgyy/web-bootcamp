const prompt = require("prompt");

prompt.start();
prompt.get(["dayOfWeek"], function (err, result) {
  dayOfWeek = result.dayOfWeek.toLowerCase();
  if (dayOfWeek === "monday") {
    console.log("UGHH I HATE MONDAYS!");
  } else if (dayOfWeek === "saturday") {
    console.log("YAY I LOVE SATURDAYS!");
  } else if (dayOfWeek === "friday") {
    console.log("FRIDAY ARE DECENT, ESPECIALLY AFTER WORK!");
  } else {
    console.log("MEH");
  }
});
