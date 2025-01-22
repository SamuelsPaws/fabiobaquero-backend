const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fabiobaquero',
    password: 'Profound18K',
    port: 5432
});

module.exports = pool;