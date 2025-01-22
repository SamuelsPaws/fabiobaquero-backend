const express = require('express');
const pg = require('pg');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'https://fabiobaquero.netlify.app' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/articles', articleRoutes);
app.use('/articles', express.static(path.join(__dirname, 'data', 'articles')));

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});