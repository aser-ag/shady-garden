import express from 'express';
import { 
    getMenu, 
    getMenuItem, 
    createMenuItem, 
    updateMenuItem, 
    deleteMenuItem 
} from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', getMenuItem);
router.post('/', createMenuItem);
router.patch('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router