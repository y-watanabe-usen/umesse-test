"use strict";

///
/// node merge_contents.js free merge-free.csv
/// merge csv header
/// id,after
//
const fs = require("fs");
const csv = require("csv");
const { execSync } = require("child_process");

if (!process.argv[2] || !process.argv[3]) {
  console.log(
    "argv error: node merge_contents.js [free | template] [merge csv file]"
  );
  return;
}

const contentsFileName = "umesse-contents.csv";
const templateFileName = "umesse-contents_template.csv";

const type = process.argv[2];
const file = process.argv[3];

const parser = csv.parse({ columns: true, trim: true });
const readStream = fs.createReadStream(file, { encoding: "utf-8" });

readStream.pipe(parser);

parser.on("readable", () => {
  let data;
  while ((data = parser.read())) {
    try {
      if (type == "free") {
        const id = data.id.padStart(6, "0");
        const stdout = execSync(
          `grep 'JP' ${contentsFileName} -n | grep -e '${id}' | cut -d ':' -f 1`
        );
        const num = Number(stdout.toString());
        if (num == 0) {
          console.log(data);
          continue;
        }
        let text = data.after;
        if (text.match(/\n|\r\n/)) {
          text = `"${data.after.replace(/\n|\r\n/, "\\r\\n")}"`;
        }
        execSync(`sed -i '${num} {s/,[^,]*/,${text}/7}' ${contentsFileName}`);
      } else if (type == "template") {
        const id = data.id.padStart(5, "0");
        const stdout = execSync(
          `grep -e '${id}' ${templateFileName} -n | cut -d ':' -f 1`
        );
        const num = Number(stdout.toString());
        if (num == 0) {
          console.log(data);
          continue;
        }
        let text = data.after;
        if (text.match(/\n|\r\n/)) {
          text = `"${data.after.replace(/\n|\r\n/, "\\r\\n")}"`;
        }
        execSync(`sed -i '${num} {s/,[^,]*/,${text}/6}' ${templateFileName}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
});

parser.on("error", (e) => {
  console.error(e);
});

parser.on("end", () => {
  console.log("\nend");
});
