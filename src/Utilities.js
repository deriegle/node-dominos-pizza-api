const httpJson = require('./http-json.js');
const urls = require('../urls.json');
const Address = require('./Address.js');

const findNearbyStores = async (address, pickUpType, callback) => {
  if(typeof pickUpType === 'function'){
    callback = pickUpType;
    pickUpType = 'Delivery';
  }

  if(!address || !callback) {
    if(!callback){
      throw('invalid findNearbyStores request. address and callback are required at a minimum.');
    }

    if(callback) {
      callback(
        {
          success: false,
          message: 'At least a partial address (minimum accepted is zipcode) is required to find stores'
        }
      );
    }

    return false;
  }

  address = new Address(address)
  const addressLines = address.getAddressLines();

  const url = urls.store.find
    .replace('${line1}', encodeURI(addressLines.line1))
    .replace('${line2}', encodeURI( addressLines.line2))
    .replace('${type}', pickUpType || 'Delivery');

  callback(await httpJson.get(url));
};

module.exports = {
  findNearbyStores
};
