
const express = require('express')
const router = express.Router()

const AudioManager = require('../../utils/audioManager')
const handler = require('../../handler');

const audioManager = new AudioManager()

router.get('/', (req, res) => {
    res.json({ message: 'MaterialRouter / ' })
})


const fetchChime = async (req, res) => {
    const id = req.params.id;
    res.json(await handler.get({bucket:'umesse-contents',key:'bgm/14_NSC726-014.mp3'}))
}
const fetchChimes = async (req, res) => {
    res.json(await handler.list({bucket:'umesse-contents',key:'chime'}))
}

const putChime = (req, res) => {
    res.json({ ok: 'ok' })
}

router.get('/chime', fetchChimes)
router.route('/chime/:id')
    .get(fetchChime)
    .post(putChime)

module.exports = router