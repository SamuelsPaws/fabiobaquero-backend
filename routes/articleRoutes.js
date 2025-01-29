const express = require('express');
const router = express.Router();
const { getArticleBySlug, getArticleViews, getAllArticleData, getTop5ViewedByCategory, getAllArticlesByCategory, get5LatestByCategory, incrementArticleViews } = require('../controllers/articleController');

router.get('/', (req, res) => {
    res.json({ message: 'Articles API works!' });
});

// Fetch top 5 viewed articles by category
router.get('/:category/top-5-viewed', getTop5ViewedByCategory);

// Fetch top 5 viewed articles by category
router.get('/:category/latest-5', get5LatestByCategory);

// Fetch all articles by category
router.get('/:category/all', getAllArticlesByCategory);

// Fetch a specific article by slug
router.get('/:category/:slug', getArticleBySlug);

// Fetch an article's views
router.get('/:category/:slug/views', getArticleViews);

// Fetch all data for one article
router.get('/:category/:slug/db', getAllArticleData);

// Increment views on articles
router.post('/:category/:slug/add-view', incrementArticleViews);

module.exports = router;