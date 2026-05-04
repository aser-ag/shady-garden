import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add the user that made the reservation']
    },
    datetime: {
        type: Date,
        required: [true, 'Please select a date and time']
    },
    guests: {
        type: Number,
        required: [true, 'Please add the number of guests'],
        min: 0,
    },
    status: {
        type: String,
        required: [true, 'Please add the status of the reservation'],
        enum: ['pending', 'confirmed', 'canceled', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;