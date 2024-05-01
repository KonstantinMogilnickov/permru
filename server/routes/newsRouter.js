const express = require('express');
const { getNews, getAllNewsIds, getNewsById } = require('../controllers/newsController');
const newsRouter = express.Router();

////////////////////////////////////

newsRouter.get('/', getNews);

///////////////////////////////////
module.exports = newsRouter;