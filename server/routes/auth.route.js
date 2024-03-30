const express = require('express');
const router = express.Router();

// import controller
const { signup, accountActivation, signin } = require('../controllers/auth.controller.js');

// import validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth.validator.js');
const { runValidation } = require('../validators/index.validator.js');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signup', userSigninValidator, runValidation, signin);

module.exports = router;