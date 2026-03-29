const jwt = require('jsonwebtoken')
const musicmodel = require('../models/music.model')
const createalbum = require('../models/album.model')
const musicupload = require('../services/storage.service')

async function createmusic(req, res) {
    try {
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
            artist: req.user.id
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

async function albumcreate(req, res) {
    try {
        const { title, musics } = req.body

        if (!title || !Array.isArray(musics)) {
            return res.status(400).json({
                message: "Title and musicIds (array) are required"
            })
        }

        const album = await createalbum.create({
            title,
            artist: req.user.id,
            musics: musics
        })

        return res.status(201).json({
            message: "Album created",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


async function getallmusic(req, res) {
    try {
        const music = await musicmodel.find().limit(20).populate('artist')

        return res.status(200).json({
            message: "All music fetched",
            music
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

async function getallalbum(req, res) {
    try {
        const album = await createalbum
            .find().select('title artist').populate('artist')

        return res.status(200).json({
            message: "All albums fetched",
            album
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

async function getalbumbyid(req, res) {
    try {
        const alid = req.params.albumid

        const album = await createalbum
            .findById(alid)
            .populate('artist', 'username email')
            .populate('musics', 'title uri')

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            })
        }

        return res.status(200).json({
            message: "Album fetched",
            album
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

module.exports = { createmusic, albumcreate, getallmusic, getallalbum, getalbumbyid }