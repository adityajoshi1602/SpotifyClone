const express = require('express')
const musiccontrollers = require('../controllers/music.controller')
const authamiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')
const router = express()

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/upload', authamiddleware.authartist, upload.single("music"), musiccontrollers.createmusic)
router.post('/album', authamiddleware.authartist, musiccontrollers.albumcreate)

router.get('/', authamiddleware.authuser, musiccontrollers.getallmusic)
router.get('/album', authamiddleware.authuser, musiccontrollers.getallalbum)

router.get('/album/:albumid', authamiddleware.authuser, musiccontrollers.getalbumbyid)

module.exports = router