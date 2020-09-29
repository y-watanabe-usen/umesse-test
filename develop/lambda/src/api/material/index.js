
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
    res.json(await handler.get({bucket:'umesse-contents',key:'BGM/サンプル01.mp3'}))
}
const fetchChimes = async (req, res) => {
    res.json(await handler.list({bucket:'umesse-contents',key:'チャイム'}))
}

const putChime = (req, res) => {
    res.json({ ok: 'ok' })
}

const fetchTag = async (req, res) => {
    // aws --endpoint-url http://localhost:4566 s3api put-object-tagging \
    //     --bucket umesse-contents \
    //     --key チャイム/サンプル01.mp3 \
    //     --tagging '{"TagSet":[{"Key":"div", "Value":"demo"}]}'
    res.json(await handler.getTag({bucket:'umesse-contents',key:'チャイム/サンプル01.mp3'}))
}

const fetchMeta = async (req, res) => {
    // aws --endpoint-url http://localhost:4566 s3api copy-object \
    //     --bucket umesse-contents \
    //     --key チャイム/サンプル01.mp3 \
    //     --copy-source umesse-contents/チャイム/サンプル01.mp3 \
    //     --metadata-directive REPLACE \
    //     --metadata '{"test":"aaa", "demo":"bbb"}'
    res.json(await handler.getMeta({bucket:'umesse-contents',key:'チャイム/サンプル01.mp3'}))
}

router.get('/chime', fetchChimes)
router.route('/chime/:id')
    .get(fetchChime)
    .post(putChime)
router.get('/tag', fetchTag)
router.get('/meta', fetchMeta)

module.exports = router