const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadDirectory = () => {
    const uploadDir = path.join(__dirname, '../../public/image/news/');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
};

// Настройка multer для загрузки файлов на сервер
const configureMulter = () => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/image/news/'));
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });

    return multer({ storage: storage });
};

module.exports = {createUploadDirectory, configureMulter};