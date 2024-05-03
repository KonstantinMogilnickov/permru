const express = require('express');
const { getNews, addNews, getCategories } = require('../controllers/newsController');
const newsRouter = express.Router();

////////////////////////////////////

newsRouter.get('/', getNews);
newsRouter.post('/addNews', addNews);
newsRouter.get('/getCategories', getCategories);

///////////////////////////////////
module.exports = newsRouter;