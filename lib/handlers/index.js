const api = require('../api');

const get = (_, res) => {
  res.render('index');
};

const post = async (req, res) => {
  req.session.addresses = await api(req.body.postcode);

  res.redirect('/addresses');
};

module.exports = {
  get,
  post,
};
