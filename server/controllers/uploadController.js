const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('Нет загруженного файла');
    }
    const fileName = req.file.originalname;
    res.send({
        message: 'Файл загружен',
        file: `/image/news/${fileName}`
    });
};

module.exports = {uploadFile};