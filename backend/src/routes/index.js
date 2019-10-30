import express from 'express';
import { index } from '../controllers/doctorController';

const router = express.Router();

router.get('/', (req, res) => {
    // res.json({ message: 'مرحباً بالعالم!' });
    res.json({ message: 'مرحباً بالعالمين!!!!' });
});

router.get('/doctors', index);

export default router;