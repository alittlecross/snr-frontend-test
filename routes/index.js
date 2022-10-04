const express = require('express');

const router = express.Router();

const { get } = require('../lib/handlers/index');

router.get('/', get);

module.exports = router;
