import mongoose from "mongoose";

const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Appetizer', 'Main', 'Dessert', 'Drink']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    isAvailable: {
        type: Boolean,
        required: [true, 'Please confirm if this item is available']
    }
}, {
    timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;