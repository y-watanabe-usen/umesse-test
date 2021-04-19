"use strict";

const fs = require("fs");
const csv = require("csv");
const aws = require("aws-sdk");
aws.config.update({
  region: "ap-northeast-1",
  // aws
  credentials: new aws.SharedIniFileCredentials({
    profile: "umesse",
  }),
  // localstack
  // endpoint: "http://localhost:4566",
});
const dynamodb = new aws.DynamoDB.DocumentClient();

if (!process.argv[2] || !process.argv[3]) {
  console.log("argv error: node put.js [dynamodb table] [csv file]");
  return;
}

const table = process.argv[2];
const file = process.argv[3];

const parser = csv.parse({ columns: true, trim: true });
const readStream = fs.createReadStream(file, { encoding: "utf-8" });

readStream.pipe(parser);

parser.on("readable", () => {
  let data;
  while ((data = parser.read())) {
    // skip
    if (data.lang && (!data.manuscript || !data.seconds)) continue;

    // contentsId
    let contentsId = data.contentsId;
    if (data.lang) {
      contentsId = `${data.contentsId}_${data.lang}`;
    }

    let seconds;
    let industry = [];
    let scene = [];
    let cdList;
    let nameList;

    // seconds
    if (data.seconds) {
      let secondList = data.seconds.split(":");
      seconds = parseInt(secondList[0]) * 60 + parseInt(secondList[1]);
    }

    // industry
    cdList = [...new Set(data.industryCd.split("-"))];
    nameList = [...new Set(data.industryName.split("-"))];
    cdList.forEach((value, key) => {
      industry.push({
        industryCd: value,
        industryName: nameList[key],
      });
    });

    // scene
    cdList = [...new Set(data.sceneCd.split("-"))];
    nameList = [...new Set(data.sceneName.split("-"))];
    cdList.forEach((value, key) => {
      scene.push({
        sceneCd: value,
        sceneName: nameList[key],
      });
    });

    // params set
    let params;
    let title = data.title;

    switch (data.lang) {
      case "EN":
        title = `${title} (英語)`;
        break;
      case "CH":
        title = `${title} (中国語)`;
        break;
      case "KR":
        title = `${title} (韓国語)`;
        break;
    }

    params = {
      Item: {
        contentsId: contentsId,
        category: data.category,
        title: title,
        description: data.description,
        manuscript: data.manuscript,
        seconds: seconds,
        industry: industry,
        scene: scene,
        timestamp: "2021-04-01T10:00:00+09:00",
      },
      TableName: table,
    };

    // if category template
    if (data.category === "template") {
      let details = [];
      if (data.jp) {
        details.push({ text: data.jp, lang: "ja", speaker: "0" });
        details.push({ text: data.jp, lang: "ja", speaker: "1" });
      }
      if (data.en) {
        details.push({ text: data.en, lang: "en", speaker: "0" });
        details.push({ text: data.en, lang: "en", speaker: "1" });
      }
      if (data.ch) {
        details.push({ text: data.ch, lang: "zh", speaker: "0" });
        details.push({ text: data.ch, lang: "zh", speaker: "1" });
      }
      if (data.kr) {
        details.push({ text: data.kr, lang: "ko", speaker: "0" });
        details.push({ text: data.kr, lang: "ko", speaker: "1" });
      }

      params = {
        Item: {
          contentsId: `T${contentsId}`,
          category: data.category,
          title: data.title,
          description: data.description,
          manuscript: data.manuscript,
          details: details,
          industry: industry,
          scene: scene,
          timestamp: "2021-04-01T10:00:00+09:00",
        },
        TableName: table,
      };
    }

    console.log(`\n[T${contentsId}] ===================================`);
    console.log(JSON.stringify(params));

    // dynamodb put
    dynamodb.put(params, (err, data) => {
      if (err) console.error(JSON.stringify(err, null, 2));
    });
  }
});

parser.on("error", (e) => {
  console.error(e);
});

parser.on("end", () => {
  console.log("\nend");
});
