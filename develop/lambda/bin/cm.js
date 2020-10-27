const { controller } = require("../umesse/s3Controller")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function main() {
	const ret  = await controller.list("umesse-contents","BGM");
	console.log(ret);
}

main()
