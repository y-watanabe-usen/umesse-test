const { bgm, narration  } = require("../umesse/resources")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function main() {
	const bgmList = await bgm.getAll();
	console.log(bgmList);
	const narrationList = await narration.getAll();
	console.log(narrationList);
}

main()
