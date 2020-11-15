const urls = require('../urls.json');
const request = require('request');
const parser = require('xml2json');

const byUrl = async (url) => {
  let result;

  try {
    result = await fetch(url)
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }

  if (res.ok) {
    return {
      success: false,
      message: `HTML Status Code Error ${res.status}`,
    };
  }

  const json = parser.toJSON(res.body, {
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
    orders: json['soap:Envelope']['soap:Body'].GetTrackerDataResponse.OrderStatuses,
    query: json['soap:Envelope']['soap:Body'].GetTrackerDataResponse.Query
  };
}

const byPhone = async (phone) => {
  if (!phone) {
    return {
      success: false,
      message: 'Phone is required!'
    };
  }

  return byUrl(`${urls.track}Phone=${phone}`);
};

const byId = async (storeID, orderKey) => {
  if (!storeID || !orderKey) {
    return {
      success: false,
      message: 'storeID and orderKey are all required to get pizza info using the orderKey'
    };
  }

  return byUrl(`${urls.track}StoreID=${storeID}&OrderKey=${orderKey}`);
};


module.exports = {
  byPhone,
  byId,
};

