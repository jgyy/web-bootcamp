import franc from "franc";
import langs from "langs";

const fran = [
  franc("Alle menslike wesens word vry"),
  franc("এটি একটি ভাষা একক IBM স্ক্রিপ্ট"),
  franc("Alle menneske er fødde til fridom"),
  franc(""),
];
console.log(fran);

const lang = [
  langs.all(),
  langs.names(),
  langs.names(true),
  langs.codes("1"),
  langs.codes("2T"),
  langs.codes("2B"),
  langs.codes("3"),
  langs.where("name", "Korean"),
  langs.where("local", "한국어, 조선어"),
  langs.where("1", "ko"),
  langs.where("2", "kor"),
  langs.where("2T", "kor"),
  langs.where("2B", "kor"),
  langs.where("3", "kor"),
  langs.has("name", "Korean"),
  langs.has("local", "한국어, 조선어"),
  langs.has("1", "ko"),
  langs.has("2", "kor"),
  langs.has("2T", "kor"),
  langs.has("2B", "kor"),
  langs.has("3", "kor"),
  langs.has("name", "Geordie"),
  langs.has("high", "fives"),
];
console.log(lang);
