const path = require('path');
const fs = require('fs');
const pool = require('../db');

// Fetch a specific article by slug
const getArticleBySlug = (req, res) => {
  const { category, slug } = req.params;
  const articlePath = path.join(__dirname, '..', 'data', 'articles', category, `${slug}.json`);

  if (fs.existsSync(articlePath)) {
      const data = fs.readFileSync(articlePath, 'utf-8');
      return res.json(JSON.parse(data));
  } else {
      return res.status(404).json({ error: 'Article not found' });
  }
}

// DB QUERIES
const getArticleViews = async (req, res) => {
  const { category, slug } = req.params;

  try {
    const result = await pool.query(
      'SELECT views FROM articles WHERE slug = $1 AND category = $2',
      [slug, category]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    return res.json(result.rows[0].views);
  } catch(err)  {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

const getAllArticleData = async (req, res) => {
  const { category, slug } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM articles WHERE slug = $1 AND category = $2',
      [slug, category]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    return res.json(result.rows[0]);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

const getTop5ViewedByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM articles WHERE category = $1 ORDER BY views DESC LIMIT 5',
      [category]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'There are no articles for this query.' });
    }

    return res.json(result.rows);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getArticleBySlug, getArticleViews, getAllArticleData, getTop5ViewedByCategory };