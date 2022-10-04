const express = require('express');

const router = express.Router();

const { get } = require('../lib/handlers/addresses');

router.get('/addresses', get);

module.exports = router;
