const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const existingEmail = await User.findOne({email})

        if(existingEmail){
            return res.status(400).send('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, 
            password: hashedPassword,
            email
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({userId: savedUser._id, role: newUser.role}, 'Secret123', { expiresIn: '1h' })

        res.status(201).send({token})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({userId: user._id, role: user.role }, "Secret123", { expiresIn: "1h" });

        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    signUp,
    login
}