// Ordnance Survey endpoint https://api.os.uk/search/places/v1/postcode?postcode=[yourValue]&key=[apiKey]
// Docs https://osdatahub.os.uk/docs/places/gettingStarted

const config = {
  apiKey: 'gLfSz6lFO7CVKDABcxg96TSAf4DK5YNQ',
  port: +process.env.PORT || 3000,
};

module.exports = config;
