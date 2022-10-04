const express = require('express');

const router = express.Router();

const { get, post } = require('../lib/handlers/index');

router.get('/', get);
router.post('/', post);

module.exports = router;
