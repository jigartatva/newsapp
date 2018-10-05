
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: process.env.DEV_API_ENDPOINT || '',
    key: process.env.DEV_API_KEY || '',
  },
  production: {
    api: process.env.PROD_API_ENDPOINT || '',
    key: process.env.PROD_API_KEY || '',
  }
};

module.exports = apiEnvironment[env];
