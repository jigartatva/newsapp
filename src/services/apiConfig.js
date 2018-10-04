
const env = process.env.NODE_ENV || 'development';

const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2',
    key: '0d868cdbccbe40d29f4a1e6a94f5c155',
  }
};

module.exports = apiEnvironment[env];
