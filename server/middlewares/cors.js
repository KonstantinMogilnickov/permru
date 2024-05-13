const allowedCors = ['*'];

function cors(req, res, next) {

    const {origin} = req.headers;

    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type,Authorization,Accept,X-Custom-Header');// разрешаем досту
    }
}

module.exports = cors;