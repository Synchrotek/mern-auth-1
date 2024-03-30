const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connect to DB -----------------------------------
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Error => ", err));

// import routes -----------------------------------
const authRoutes = require('./routes/auth.route.js');

// app middlewares ---------------------------------
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `http://localhost:4500` }));
}

// middlewares -------------------------------------
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
})

