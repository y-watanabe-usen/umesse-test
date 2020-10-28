const { controller } = require("./utils/s3Controller")

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


exports.bgm = {
	getAll: () => {
		return controller.list("umesse-contents","BGM");
		// TODO: swaggerAPIの返却jsonにコンバート.
	},
	get: (id) => {
	}
}

exports.narration = {
	getAll: () => {
		return controller.list("umesse-contents","ナレーション");
	},
	get : (id) => {}
}
