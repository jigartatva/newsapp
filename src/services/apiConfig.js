
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: process.env.DEV_API_ENDPOINT || 'https://newsapi.org/v2',
    key: process.env.DEV_API_KEY || 'cc7b9469f5d94b94af516c39da0db6eb',
  },
  production: {
    api: process.env.PROD_API_ENDPOINT || 'https://newsapi.org/v2',
    key: process.env.PROD_API_KEY || 'cc7b9469f5d94b94af516c39da0db6eb',
  }
};

module.exports = apiEnvironment[env];
