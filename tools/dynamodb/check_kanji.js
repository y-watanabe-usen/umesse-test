"use strict";

const fs = require("fs");
const csv = require("csv");
const path = require("path");

if (!process.argv[2]) {
  console.log("argv error: node check_kanji.js [csv file]");
  return;
}

const file = process.argv[2];

const parser = csv.parse({ columns: true, trim: true });
const readStream = fs.createReadStream(file, { encoding: "utf-8" });

readStream.pipe(parser);

let check = [];
parser.on("readable", () => {
  let data;
  while ((data = parser.read())) {
    let manuscript;
    if (data.category === "template" || data.lang === "JP")
      manuscript = data.manuscript;

    const str = `${data.title}${data.description}${manuscript}`;

    for (let i = 0; i <= str.length; i++) {
      const v = str.substring(i, i + 1);
      const hexV = v.charCodeAt(0).toString(16).toLowerCase();
      if (hexV.substring(0, 2) == "2f") {
        // console.log(v, hexV);
        check.push(v);
      }
    }
  }
});

parser.on("error", (e) => {
  console.error(e);
});

parser.on("end", () => {
  console.log(Array.from(new Set(check)));
  console.log("\nend");
});
