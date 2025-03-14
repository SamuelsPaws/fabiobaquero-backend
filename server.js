require('dotenv').config();
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const path = require('path');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});

// Routes
app.use('/api/articles', articleRoutes);
app.use('/articles', express.static(path.join(__dirname, 'data', 'articles')));

// Testing purposes
app.get('/api/ping', (_, res) => {
    res.status(200).send('pong');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});