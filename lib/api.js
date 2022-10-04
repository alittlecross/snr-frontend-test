const axios = require('axios');
const httpError = require('http-errors');

const { apiKey } = require('../config');

const api = async (postcode) => {
  const { data, status } = await axios.get(`https://api.os.uk/search/places/v1/postcode?postcode=${postcode.replace(/\s/g, '')}&key=${apiKey}`);

  if (status !== 200) {
    throw httpError(500, `https://api.os.uk/search/places/v1/postcode returned ${status}`);
  }

  return data.results || [];
};

module.exports = api;
