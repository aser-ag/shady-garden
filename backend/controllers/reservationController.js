import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';

export const getAllReservations = async (req, res) => {
    try {
        const filter = {};

        if (req.query.datetime) {
            filter.datetime = new Date(req.query.datetime);

        } else if (req.query.date) {
            const startDate = new Date(req.query.date);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);

            filter.datetime = {
                $gte: startDate,
                $lt: endDate
            };
        }

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.user) {
            filter.user = req.query.user;
        }

        const reservations = await Reservation.find(filter).populate('user', 'name email');
        res.json(reservations);

    } catch (error) {
        res.status(500).json( {message: "Server error", error: error.message});
    }
    
};

export const getUserReservations = async (req, res) => {
    try {
        const userReservations = await Reservation.find( {user: req.user._id} );

        res.status(200).json(userReservations);
    } catch (error) {
        res.status(500).json( {message: "Server error", error: error.message} );
    }
};

export const createReservation = async (req, res) => {
    try {
        const reservationData = {
            ...req.body,
            user: req.user._id
        };
        const newReservation = await Reservation.create(reservationData);
        res.status(201).json(newReservation);

    } catch (error) {
        res.status(500).json( {message: "Could not create reservation", error: error.message});
    }
};

export const updateReservation = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json( {message: "Invalid ID format"});
    }

    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        if (reservation.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this reservation" });
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        res.json(updatedReservation);

    } catch (error) {
        res.status(500).json( {message: "Server Error", error: error.message} );
    }
};

export const deleteReservation = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json( {message: "Invalid ID format"});
    }

    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        if (reservation.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this reservation"})
        }

        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

        res.json(deletedReservation);

    } catch (error) {
        res.status(500).json( {message: "Server Error", error: error.message} );
    }
};