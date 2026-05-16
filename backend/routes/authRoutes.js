import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "This email already exists"} );
        }

        const newUser = await User.create( {name, email, password} );
        const token = generateToken(newUser._id);

        res.status(201).json({
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            },
            token: token,
        });

    } catch (error) {
        res.status(500).json({message: "Could not create user", error: error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne( {email} );

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json( {message: "Invalid credentials"} );
        }

        const token = generateToken(user._id);
        res.status(200).json({
            profile: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }, 
            token: token,
        });

    } catch (error) {
        res.status(500).json({message: "Could not authenticate user", error: error.message});
    }
});

export default router;