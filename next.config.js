const config = require('./.contentful.json');

module.exports = {
  target: 'serverless',
  env: {
    SPACE_ID: config.SPACE_ID,
    ACCESS_TOKEN: config.ACCESS_TOKEN
  }
};
