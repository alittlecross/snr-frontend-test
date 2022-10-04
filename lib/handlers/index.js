const get = (_, res) => {
  res.render('index');
};

const post = (_, res) => {
  res.redirect('/addresses');
};

module.exports = {
  get,
  post,
};
