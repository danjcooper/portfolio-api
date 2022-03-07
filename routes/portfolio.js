const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio');

router.post('/messages/add', portfolioController.addMessage);

module.exports = router;
