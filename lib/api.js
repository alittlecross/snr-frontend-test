const axios = require('axios');

const { apiKey } = require('../config');

const api = async (postcode) => {
  const { data } = await axios.get(`https://api.os.uk/search/places/v1/postcode?postcode=${postcode.replace(/\s/g, '')}&key=${apiKey}`);

  return data.results || [];
};

module.exports = api;
