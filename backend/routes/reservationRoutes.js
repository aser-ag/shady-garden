import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { 
    getAllReservations, 
    getUserReservations, 
    createReservation, 
    updateReservation, 
    deleteReservation 
} from '../controllers/reservationController.js';

const router = express.Router();

router.get('/', getAllReservations);
router.get('/my', protect, getUserReservations);
router.post('/', protect, createReservation);
router.patch('/:id', protect, updateReservation);
router.delete('/:id', protect, deleteReservation);

export default router;