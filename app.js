const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolio');
app.use('/portfolio', portfolioRoutes);

module.exports = app;
