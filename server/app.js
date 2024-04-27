const {client} = require('../server/database/connect');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
 
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
  }));

app.use('/user', userRouter);
app.use('/news', newsRouter);

// Подключение к базе данных перед запуском сервера
client.connect()
    .then(() => console.log('Подключение к базе данных успешно'))
    .catch(err => console.error('Ошибка при подключении к базе данных:', err.stack));
     
    
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
    
module.exports = app;