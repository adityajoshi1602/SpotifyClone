const ImageKit = require('@imagekit/nodejs').default

const imagekitclient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
    const result = await imagekitclient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "/spotifyclone/music"
    })

    return result
}

module.exports = { uploadFile }