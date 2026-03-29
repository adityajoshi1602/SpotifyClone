const db = require('mongoose')

const albumschema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    musics: [
        {
            type: db.Schema.Types.ObjectId,
            ref: "music"
        }
    ],
    artist: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
})

const createalbum = db.model('album', albumschema)

module.exports = createalbum