require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,

    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '180721',
        database: process.env.DB_NAME || 'aisanka'
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'AISANKA2026'
    }
};

module.exports = config;