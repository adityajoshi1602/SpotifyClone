const db = require('mongoose')
const musicschema = new db.Schema({
    uri: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: db.Schema.Types.ObjectId,
        ref:"user",
        required: true
    }
})

const musicmodel= db.model('music',musicschema)

module.exports=musicmodel