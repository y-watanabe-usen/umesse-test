
const express = require('express')
const router = express.Router()

const AudioManager = require('../../utils/audioManager')
const audioManager = new AudioManager()

router.get('/', (req, res) => {
    res.json({ message: 'MaterialRouter / ' })
})


const fetchChime = async (req, res) => {
    const id = req.params.id;
    res.json(await audioManager.fetchChime(id))
}
const fetchChimes = async (req, res) => {
    res.json(await audioManager.fetchChimes())
}

const putChime = (req, res) => {
    res.json({ ok: 'ok' })
}

router.get('/chime', fetchChimes)
router.route('/chime/:id')
    .get(fetchChime)
    .post(putChime)

module.exports = router