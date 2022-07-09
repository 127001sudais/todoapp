import jwt from "jsonwebtoken"
import { User } from "../models/users.js"

export let isAuthenticated = async (req, res, next) => {
    try {
        let { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: "Login First" })

        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded._id)
        next()

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })

    }
}