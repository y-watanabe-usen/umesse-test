"use strict";

const fs = require("fs");
const csv = require("csv");
const path = require("path");

if (!process.argv[2] || !process.argv[3]) {
  console.log("argv error: node check_contents.js [contents data dir] [csv file]");
  return;
}

const dir = process.argv[2];
const file = process.argv[3];

const parser = csv.parse({ columns: true, trim: true });
const readStream = fs.createReadStream(file, { encoding: "utf-8" });

readStream.pipe(parser);

parser.on("readable", () => {
  let data;
  while ((data = parser.read())) {
    // skip
    if (data.category === "template") continue;

    // skip
    if (data.lang && (!data.manuscript || !data.seconds)) continue;

    // contentsId
    let contentsId = data.contentsId;
    if (data.lang) {
      contentsId = `${data.contentsId}_${data.lang}`;
    }

    let target = path.join(dir, data.category, `${contentsId}.mp3`);
    if (!fs.existsSync(target)) console.log(`none file: ${target}`);
  }
});

parser.on("error", (e) => {
  console.error(e);
});

parser.on("end", () => {
  console.log("\nend");
});
