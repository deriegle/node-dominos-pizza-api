const urls = require('../urls.json');
const parser = require('xml2json');

class Track {
  static async byPhone(phone) {
    if (!phone) {
      return {
        success: false,
        message: 'Phone is required!'
      };
    }

    return Track._byUrl(`${urls.track}Phone=${phone}`);
  }

  static async byId(storeID, orderKey) {
    if (!storeID || !orderKey) {
      return {
        success: false,
        message: 'StoreID and orderKey are required!'
      };
    }

    return Track._byUrl(`${urls.track}StoreID=${storeID}&OrderKey=${orderKey}`);
  }

  static async _byUrl(url) {
    let result;

    try {
      result = await fetch(url)
    } catch (error) {
      return {
        success: false,
        message: error
      };
    }

    if (!result.ok) {
      return {
        success: false,
        message: `HTML Status Code Error ${result.status}`,
      };
    }

    const json = parser.toJson(result.body, {
      coerce: false,
      sanitize: false,
      object: true,
      trim: false
    });

    if (!json['soap:Envelope']) {
      return {
        success: false,
        message: 'API soap:Envelope not present',
        data: result
      };
    }

    if (!json['soap:Envelope']['soap:Body']) {
      return {
        success: false,
        message: 'API soap:Body not present',
        data: result
      };
    }

    if(!json['soap:Envelope']['soap:Body'].GetTrackerDataResponse){
      return {
        success: false,
        message:'API GetTrackerDataResponse not present',
        data: result
      };
    }

    return {
      success: true,
      orders: json['soap:Envelope']['soap:Body'].GetTrackerDataResponse.OrderStatuses,
      query: json['soap:Envelope']['soap:Body'].GetTrackerDataResponse.Query
    };
  }
}

module.exports = Track;

