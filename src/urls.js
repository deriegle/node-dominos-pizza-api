const unitedStatesUrls = require('../urls.us.json');
const canadaUrls = require('../urls.ca.json');

module.exports = process.env.CANADA === 'true' ? canadaUrls : unitedStatesUrls;
