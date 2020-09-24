// 音源管理.
class AudioManager {

    constructor() { }

    async fetchChime(id) {
        return { name: `chime$id`, url: "url" }
    }
    async fetchChimes() {
        return [
            { name: "chime1", url: "url" },
            { name: "chime2", url: "url" },
            { name: "chime3", url: "url" },
            { name: "chime4", url: "url" },
            { name: "chime5", url: "url" },
            { name: "chime6", url: "url" },
        ]
    }
}

module.exports = AudioManager