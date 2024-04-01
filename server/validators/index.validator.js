const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    next();
}