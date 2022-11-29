"use strict";


/// count
/// node report_output.js ./output.json count
///
/// cm
/// node report_output.js ./output.json cm > cm_$(date '+%Y%m%d').csv
///
/// recording
/// node report_output.js ./output.json recording > recording_$(date '+%Y%m%d').csv
///
/// tts
/// node report_output.js ./output.json tts > tts_$(date '+%Y%m%d').csv
///
if (!process.argv[2]) {
  console.log(
    "argv error: node report_output.js [json file path] [count:default|cm|recording|tts]"
  );
  return;
}

const json = require(process.argv[2]);
const input = process.argv[3] || "count";

switch (input) {
  case "cm":
    json.forEach((i) => {
      if (i.cm.length > 0) {
        i.cm.forEach((j) => {
          console.log(`${i.unisCustomerCd},${j.cmId},${j.title},${j.timestamp}`);
        });
      }
    });
    break;

  case "recording":
    json.forEach((i) => {
      if (i.recording.length > 0) {
        i.recording.forEach((j) => {
          console.log(`${i.unisCustomerCd},${j.recordingId},${j.timestamp}`);
        });
      }
    });
    break;

  case "tts":
    json.forEach((i) => {
      if (i.tts.length > 0) {
        i.tts.forEach((j) => {
          console.log(`${i.unisCustomerCd},${j.ttsId},${j.timestamp}`);
        });
      }
    });
    break;

  case "count":
  default:
    let count = {
      user: 0,
      activate: 0,
      cm: 0,
      recording: 0,
      tts: 0,
    };
    json.forEach((i) => {
      count.user++;
      if (i.cm) count.cm += i.cm.length;
      if (i.authAgree) count.activate++;
      if (i.recording) count.recording += i.recording.length;
      if (i.tts) count.tts += i.tts.length;
    });
    console.log(count);
    break;
}
