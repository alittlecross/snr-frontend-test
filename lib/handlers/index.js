const api = require('../api');
const validate = require('../validators/index');

const get = (req, res) => {
  res.render('index');
};

const post = async (req, res, next) => {
  const error = validate(req.body);

  if (!error) {
    try {
      req.session.addresses = await api(req.body.postcode);

      res.redirect('/addresses');
    } catch (err) {
      next(err);
    }
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
