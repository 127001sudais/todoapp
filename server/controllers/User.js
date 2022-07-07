import cloudinary from "cloudinary"
import fs, { stat } from "fs"
import { sendMail } from "../utils/sendMail.js"
import { sendToken } from "../utils/sendToken.js"
import { User } from "../models/users.js"

export let register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let avatar = req.files.avatar.tempFilePath;
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "email is already in use" })
        }

        let otp = Math.floor(Math.random() * 1000000)

        let mycloud = await cloudinary.v2.uploader.upload(avatar)

        fs.rmSync("./tmp", { recursive: true })

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            },
            otp,
            otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
        })
        await sendMail(email, "verify your account", `your one time password is ${otp}`)

        sendToken(
            res, user, 201, "OPT has been sent tou your email,please verify your account"
        );
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export let verify = async (req, res) => {
    try {
        let otp = Number(req.body.otp);
        let user = await User.findById(req.user._id);

        if (user.otp !== otp || user.otp_expiry < Date.now()) {
            return res.status(400).json({ success: false, message: "the one time password is either invalid or expired" })
        }
        user.verified = true;
        user.otp = null;
        user.otp_expiry = null

        await user.save()
        sendToken(res, user, 200, "Account verified")
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export let login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "enter login credentials " })
        }
        let user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" })
        }

        let isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email or password" })

        }
        sendToken(res, user, 200, "login successful")
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}

export let logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
            })
            .json({ success: true, message: "logged out succesfully" })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}

