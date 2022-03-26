const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolio');
app.use('/portfolio', portfolioRoutes);

const ingredientRoutes = require('./routes/ingredients');
app.use('/ingredients', ingredientRoutes);

module.exports = app;
