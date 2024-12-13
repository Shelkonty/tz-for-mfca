export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'crypto_rates',
  },
  coingecko: {
    apiKey: process.env.COINGECKO_API_KEY,
    baseUrl: 'https://pro-api.coingecko.com/api/v3',
  }
});
