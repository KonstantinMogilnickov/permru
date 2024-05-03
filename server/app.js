const {client} = require('../server/database/connect');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
 
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
  }));

app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use(express.static(path.join(__dirname, '../public'))); // Указываем Express обслуживать статические файлы из папки public
// Подключение к базе данных перед запуском сервера
client.connect()
    .then(() => console.log('Подключение к базе данных успешно'))
    .catch(err => console.error('Ошибка при подключении к базе данных:', err.stack));
 
    const uploadDir = path.join(__dirname, '../public/image');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../public/image'));
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    // Получаем имя файла без пути
    if (!req.file) {
        return res.status(400).send('Нет загруженного файла');
    }
    const fileName = req.file.originalname;
    res.send({
        message: 'Файл загружен',
        file: `/image/${fileName}` // Возвращаем путь к файлу в папке public
    });
});



    
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
    
module.exports = app;