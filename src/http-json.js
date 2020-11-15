const http = require('request');
const urls = require('../urls.json')

const post = async (url, body) => {
  let result;

  try {
    result = await fetch(url, {
      headers: {
        Referer: urls.referer,
        'Content-Type': 'application/json'
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  } catch (err) {
    return callback({
      success: false,
      message: error
    });
  }

  if (!result.ok) {
    return {
      success: false,
      message: `HTML Status Code Error: ${result.status}`,
    };
  }

  return res.json()
    .then((data) => ({ success: true, result: data }))
    .catch((err) => ({ success: false, message: err }));
}

const get = async (url) => {
  let result;

  try {
    result = await fetch(url, {
      headers: {
        'Referer': urls.referer,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: error
    };
  }

  if (!result) {
    return {
      success: false,
      message: error
    };
  }

  if (result.status !== 200) {  //If request didn't error but response isn't status code 200.
    return {
      success: false,
      message: `HTML Status Code Error:  ${result.status}`,
    };
  }

  return {
    success: true,
    result: await result.json(),
  };
}

module.exports = {
  get,
  post,
};
