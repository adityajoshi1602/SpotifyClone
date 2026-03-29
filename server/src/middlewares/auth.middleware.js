const jwt = require('jsonwebtoken')

async function authartist(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "Access denied: Artists only"
            })
        }

        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

async function authuser(req, res, next) {
    const token = req.cookies.token
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}


module.exports = { authartist, authuser}