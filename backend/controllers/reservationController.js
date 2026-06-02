import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';

export const getAllReservations = async (req, res) => {
    try {
        const reservation = await Reservation.find( {} );
        res.json(reservation);

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
        const newReservation = await Reservation.create(req.body);
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
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        if (!updatedReservation) {
            return res.status(404).json( {error: "Reservation not found"} );
        }
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
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!deletedReservation) {
            return res.status(404).json( {error: "Reservation not found"} );
        }

        res.json(deletedReservation);

    } catch (error) {
        res.status(500).json( {message: "Server Error", error: error.message} );
    }
};