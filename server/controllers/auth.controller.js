const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_SMTP_USER,
        pass: process.env.NODEMAILER_SMTP_PASSWORD,
    },
});

// exports.signup = (req, res) => {
// console.log('REQ BODY ON SIGNUP:', req.body);
// const { name, email, password } = req.body;

// User.findOne({ email }).then(user => {
//     if (user) {
//         return res.status(400).json({
//             error: 'Email is taken'
//         });
//     }

//     let newUser = new User({ name, email, password });
//     newUser.save().then(success => {
//         return res.json({
//             message: 'Singup succes! Please SignIn'
//         });
//     }).catch(err => {
//         console.log('SINGUP ERROR', err);
//         return res.status(400).json({
//             error: err
//         });
//     });
// });
// };

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }).then(async (user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        // let info = await transporter.sendMail({
        //     from: '"Sam 202 👻" <sam202@ethereal.email>', // sender address
        //     to: "bar@example.com, baz@example.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });
        // console.log(`Message sent: ${info.messageId}`);
        // rss.json(info);

        const token = jwt.sign(
            { name, email, password },
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: '10m' }
        );

        const emailDataToSend = {
            from: `"Sentinal Prime HQ👻" ${process.env.EMAIL_FROM}`, // sender address
            to: email,
            subject: `Hello ✔`,
            text: "Account Activation Link",
            html: `
                <h1>Click on the below link</h1>
                <h3>To save yourself from Icon of Sin</h3>
                <a href="${process.env.CLIENT_URL}/auth/activate/${token}">
                    Click here to Activate your account to Continue.
                </a>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <br /><hr /><br />
                <p>This email is kind of sensitive</p>
                <p>Handle with care && Have a good Day ;)</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
        }
        await transporter.sendMail(emailDataToSend)
            .then(emailSent => {
                console.log("SIGNUP EMAIL SENT", emailSent);
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
            }).catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                })
            })
    });
};

exports.accountActivation = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
            if (err) {
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
                return res.status(401).json({
                    error: 'Expired link. Please Singup again'
                })
            }

            const { name, email, password } = jwt.decode(token);
            const user = new User({ name, email, password })
            user.save().then(result => {
                return res.json({
                    message: 'Signup success. Please Singin'
                });
            }).catch(err => {
                console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                return res.status(401).json({
                    error: 'Error saving use in our databse. Try Singup again'
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again.'
        });
    }
}

exports.signin = (req, res) => {

}