const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const usermodel = require('../models/user.model')

async function registeruser(req, res) {
    try {
        const { username, email, password, role = 'user' } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const existingUser = await usermodel.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await usermodel.create({
            username,
            email,
            password: hash,
            role
        })

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token)

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

async function loginuser(req, res) {
    try {
        const { username, email, password } = req.body

        if (!password || (!username && !email)) {
            return res.status(400).json({
                message: 'Username/email and password required'
            })
        }

        const user = await usermodel.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token)

        return res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

async function logoutuser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    return res.status(200).json({
        message: "Successfully logged out"
    })
}

module.exports = { registeruser, loginuser, logoutuser }