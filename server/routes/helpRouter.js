const express = require('express');
const {addReport, getReports, deleteReport} = require('../controllers/helpController');

const helpRouter = express.Router();

helpRouter.post('/addReport', addReport);
helpRouter.get('/getReports', getReports);
helpRouter.delete('/deleteReport', deleteReport);

module.exports = helpRouter;