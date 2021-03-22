"use strict";

process.env.AWS_PROFILE = "umeses";
const fs = require("fs");
const csv = require("csv");
const aws = require("aws-sdk");
aws.config.update({ region: "ap-northeast-1" });
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
    // contentsId
    let contentsId = data.contentsId;
    if (data.lang) {
      contentsId = `${data.contentsId}_${data.lang}`;
    }

    let industry = [];
    let scene = [];
    let cdList;
    let nameList;

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

    // dynamodb put
    let params = {
      Item: {
        contentsId: contentsId,
        category: data.category,
        title: data.title,
        description: data.description,
        manuscript: data.manuscript,
        seconds: data.seconds,
        industry: industry,
        scene: scene,
        timestamp: "2021-04-01T10:00:00+09:00",
      },
      TableName: table,
    };

    console.log(`\n[${contentsId}] ===================================`);
    console.log(JSON.stringify(params));
    dynamodb.put(params, (err, data) => {
      if (err) console.error(JSON.stringify(err, null, 2));
    });
  }
});

parser.on("error", (e) => {
  console.log(e);
});

parser.on("end", () => {
  console.log("\nend");
});
