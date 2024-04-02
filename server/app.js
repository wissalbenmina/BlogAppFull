const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// connect to DB
mongoose.connect('mongodb://localhost:27017/Posts');

// middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(logger);
app.use(errorHandler);

// routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes)

app.listen(3000, () => {
    console.log('server is running on port 3000');
})