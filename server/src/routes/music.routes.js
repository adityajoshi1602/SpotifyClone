const express = require('express')
const musiccontrollers= require('../controllers/music.controller')
const multer = require('multer')
const router = express()

const upload = multer({
    storage:multer.memoryStorage()
})

router.post('/upload',upload.single("music"),musiccontrollers.createmusic)

module.exports=router