global.fetch = require('node-fetch');

module.exports = {
  Order: require('./src/Order'),
  Address: require('./src/Address'),
  Customer: require('./src/Customer'),
  Store: require('./src/Store'),
  Track: require('./src/Track'),
  Item: require('./src/Item'),
  Coupon: require('./src/Coupon'),
  Utilities: require('./src/Utilities'),
  Menu: require('./src/Menu'),
  MenuItem: require('./src/MenuItem'),
  MenuCategory: require('./src/MenuCategory'),
};
