const express = require('express');
const { getNews } = require('../controllers/newsController');
const newsRouter = express.Router();

////////////////////////////////////

newsRouter.get('/', getNews);

///////////////////////////////////
module.exports = newsRouter;