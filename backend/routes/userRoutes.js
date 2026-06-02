import express from 'express';
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', protect, async (req, res) => {
    try {
        const user = req.user
        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.patch('/profile', protect, async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = req.user;

        if (name) { user.name = name; };
        if (email) { user.email = email; };
        if (password) { user.password = password; };
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.delete('/profile', protect, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        res.json(deletedUser);

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;