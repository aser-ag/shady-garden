import MenuItem from '../models/MenuItem.js'
import mongoose from 'mongoose';

export const getMenu = async (req, res) => {
    try {
        const filter = { isAvailable: true };
        
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const menu = await MenuItem.find(filter);
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
    
};

export const getMenuItem = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json( {message: "Invalid ID format"});
    }

    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ error: "Item not found" });

        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createMenuItem = async (req, res) => {
    try {
        const newMenuItem = await MenuItem.create(req.body);
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ message: "Could not create item", error: error.message });
    }
};

export const updateMenuItem = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json( {message: "Invalid ID format"});
    }

    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if (!updatedItem)
            return res.status(404).json({ error: "Item not found" });

        res.json(updatedItem);

    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const deleteMenuItem = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json( {message: "Invalid ID format"});
    }

    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json(deletedItem);

    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};