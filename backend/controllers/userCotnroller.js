import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// create token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET);
};

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


// singup
const registerUser = async (req, res) => {
    const { name, password, email } = req.body
    try {
        // checking is user already exists
        const exits = await userModel.findOne({ email })
        if (exits) {
            return res.json({ success: false, message: "User already exists" })
        }
        // validating email format  & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Password not strong enough" })
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);

        //  create the user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hash
        });
        const user = await newUser.save()
        // Toekn
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }