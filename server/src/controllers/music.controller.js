const jwt = require('jsonwebtoken')
const musicmodel = require('../models/music.model')
const musicupload = require('../services/storage.service')

async function createmusic(req, res) {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You do not have access to create music"
            })
        }

        const { title } = req.body
        const file = req.file

        if (!title || !file) {
            return res.status(400).json({
                message: "Title and file are required"
            })
        }

        const result = await musicupload.uploadFile(file.buffer.toString('base64'))

        const music = await musicmodel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })

        return res.status(201).json({
            message: "Music uploaded",
            music
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { createmusic }