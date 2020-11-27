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
	get : (id) => {},
}

exports.userRecording = {
	getAll: () => {
		return controller.list("umesse-contents","ユーザー録音データ");
	},
	get : (id) => {},
	put: (params) => {
		controller.put("umesse-contents", "ユーザー録音データ/" + params['filename'], params['resources']);
		return "ok";
	}
}
