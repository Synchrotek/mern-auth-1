const express = require('express');
const router = express.Router();

// import controller
const { signup } = require('../controllers/auth.controller.js');

// import validators
const { userSignupValidator } = require('../validators/auth.validator.js');
const { runValidation } = require('../validators/index.validator.js');

router.post('/signup', userSignupValidator, runValidation, signup);

module.exports = router;