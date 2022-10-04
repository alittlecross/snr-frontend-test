const api = require('../api');
const validate = require('../validators/index');

const get = (_, res) => {
  res.render('index');
};

const post = async (req, res) => {
  const error = validate(req.body);

  if (!error) {
    req.session.addresses = await api(req.body.postcode);

    res.redirect('/addresses');
  } else {
    res.render('index', {
      details: req.body,
      error,
    });
  }
};

module.exports = {
  get,
  post,
};
