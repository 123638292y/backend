const express = require('express');
const { registerUser } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/signup', registerUser);

module.exports = router;
