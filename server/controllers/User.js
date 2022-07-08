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

export let addTask = async (req, res) => {
    try {
        let { title, description } = req.body;

        let user = await User.findById(req.user._id)

        user.tasks.push({
            title
            , description
            , completed: false,
            createdAt: new Date(Date.now())

        })

        await user.save()

        res.status(200).json({ success: true, message: "task added succesfully" })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export let removeTask = async (req, res) => {
    try {
        let { taskId } = req.params;

        let user = await User.findById(req.user._id)

        user.tasks = user.tasks.filter(
            (task) => task._id.toString() !== taskId.toString()
        )

        await user.save()

        res
            .status(200)
            .json({ success: true, message: "task removed succesfully" })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}

export let updateTask = async (req, res) => {
    try {
        let { taskId } = req.params

        let user = await User.findById(req.user._id)

        user.task = user.tasks.find(
            (task) => task._id.toString() === taskId.toString()
        )

        user.task.completed = !user.task.completed

        await user.save()

        res
            .status(200)
            .json({ success: true, message: "task updated succesfully" })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export let getMyProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id)

        sendToken(res, user, 201, `welcome ${user.name}`)
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}

export let updateProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id)

        let { name } = req.body;
        let avatar = req.files.avatar.tempFilePath;

        if (name) user.name = name;
        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)

            let mycloud = await cloudinary.v2.uploader(avatar)

            fs.rmSync("./tmp", { recursive: true })

            user.avatar = {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        }
        await user.save()

        res
            .status(200)
            .json({ success: true, message: "profile updated succesfully" })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export let updatePassword = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).select("+password")

        let { oldPassword, newPassword } = req.body

        if (!oldPassword || newPassword) {
            return res
                .status(400)
                .json({ success: false, message: "plesase enter correct credentials" })
        }
        let isMatch = await user.comparePassword(oldPassword)

        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: " old password does not match" })
        }
        user.password = newPassword

        await user.save()

        res
            .status(200)
            .json({ success: true, message: "password updated succesfully" })


    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export let forgetPassword = async (req, res) => {
    try {
        let { email } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "please enter a valid email" })

        }

        let otp = Math.floor(Math.random() * 100000)

        user.resetPasswordOtp = otp
        user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000

        await user.save()

        let message = `your one time password for reseting the password ${otp}.If you did not requser this email please ignore it`

        await sendMail(email, "Request for reseting password", message)

        res.status(200).json({ success: true, message: `one time password has been sent to ${email}` })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}

export let resetPassword = async (req, res) => {
    try {
        let { otp, password } = req.body;

        let user = await User.findOne({
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "invalid one time password or has been expired" })
        }
        user.password = newPassword
        user.resetPasswordOtp = null
        user.resetPasswordExpiry = null
        await user.save()

        res
            .status(200)
            .json({ success: true, message: `password changed succesfully` })
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}