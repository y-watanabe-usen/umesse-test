const { fetch, userRecording } = require("../umesse/resources")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function main() {
	const userRecordingList = await userRecording.getAll();
	console.log(userRecordingList);
}

main()
