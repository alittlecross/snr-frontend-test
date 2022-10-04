const get = (req, res) => {
  const addresses = req.session.addresses.map((e) => ({
    address: e.DPA.ADDRESS,
    uprn: e.DPA.UPRN,
  }));

  res.render('addresses', {
    addresses,
  });
};

module.exports = {
  get,
};
