const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            })
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Account already exists with this email address or username"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(201).json({
            success: true,
            token,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar || "",
                headline: user.headline || "Interview Candidate"
            }
        })
    } catch (error) {
        console.error("Register Error:", error)
        return res.status(500).json({
            message: "Server error during registration"
        })
    }
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            success: true,
            token,
            message: "User loggedIn successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar || "",
                headline: user.headline || "Interview Candidate"
            }
        })
    } catch (error) {
        console.error("Login Error:", error)
        return res.status(500).json({
            message: "Server error during login"
        })
    }
}

/**
 * @name logoutUserController
 * @description clear token from user authorization header and add token to blacklist
 * @access Private
 */
async function logoutUserController(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1]
            await tokenBlacklistModel.create({ token })
        }

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.error("Logout Error:", error)
        return res.status(500).json({
            message: "Server error during logout"
        })
    }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access Private
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar || "",
                headline: user.headline || "Interview Candidate",
                createdAt: user.createdAt
            }
        })
    } catch (error) {
        console.error("GetMe Error:", error)
        return res.status(500).json({
            message: "Server error fetching user"
        })
    }
}

/**
 * @name updateProfileController
 * @description update user profile details (username, headline, avatar)
 * @access Private
 */
async function updateProfileController(req, res) {
    try {
        const { username, headline, avatar } = req.body
        const userId = req.user.id

        if (username) {
            const existing = await userModel.findOne({ username, _id: { $ne: userId } })
            if (existing) {
                return res.status(400).json({
                    message: "Username already taken"
                })
            }
        }

        const updateData = {}
        if (username) updateData.username = username
        if (headline !== undefined) updateData.headline = headline
        if (avatar !== undefined) updateData.avatar = avatar

        const user = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password")

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar || "",
                headline: user.headline || "Interview Candidate",
                createdAt: user.createdAt
            }
        })
    } catch (error) {
        console.error("Update Profile Error:", error)
        return res.status(500).json({
            message: "Server error updating profile"
        })
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    updateProfileController
}