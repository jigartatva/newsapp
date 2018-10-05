
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: process.env.DEV_API_ENDPOINT || 'https://newsapi.org/v2',
    key: process.env.DEV_API_KEY || '0d868cdbccbe40d29f4a1e6a94f5c155',
  },
  production: {
    api: process.env.PROD_API_ENDPOINT || 'https://newsapi.org/v2',
    key: process.env.PROD_API_KEY || '0d868cdbccbe40d29f4a1e6a94f5c155',
  }
};

module.exports = apiEnvironment[env];
