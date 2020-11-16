const httpJson = require('./http-json');
const urls = require('./urls');
const Address = require('./Address');

const validPickUpTypes = ['Delivery', 'Carryout', 'all'];

class Utilities {
  static async findNearbyStores(address, pickUpType = 'Delivery') {
    if (!validPickUpTypes.includes(pickUpType)) {
      return {
        success: false,
        message: `${pickUpType} is not a valid pick up type. Please use one of ${validPickUpTypes.join(', ')}`,
      };
    }

    if (!address) {
      return {
        success: false,
        message: 'At least a partial address (minimum accepted is zipcode) is required to find stores'
      };
    }

    address = new Address(address)
    const addressLines = address.getAddressLines();

    const url = urls.store.find
      .replace('${line1}', encodeURI(addressLines.line1))
      .replace('${line2}', encodeURI( addressLines.line2))
      .replace('${type}', pickUpType || 'Delivery');

    return await httpJson.get(url);
  }
}

module.exports = Utilities;
