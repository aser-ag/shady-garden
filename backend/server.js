import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config()
await connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/test', (req, res) => {
    res.send('server is working');
});

app.get('/api/test', (req, res) => {
    res.json({
        status: 'success', message: 'API is running'
    });
});

app.listen(5000, () => {
    console.log('server running on http://localhost:5000');
});