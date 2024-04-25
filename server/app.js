const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Строка подключения к базе данных PostgreSQL
const connectionString = 'postgres://postgres.nufjprhaavfxuywgsnwn:Asdf654km!1234@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
  }));
// Создаем новый экземпляр клиента PostgreSQL
const client = new Client({
    connectionString: connectionString,
});

// Подключение к базе данных перед запуском сервера
client.connect()
    .then(() => console.log('Подключение к базе данных успешно'))
    .catch(err => console.error('Ошибка при подключении к базе данных:', err.stack));

    app.post('/insertUser', async (req, res) => {
        try {
            // Обработка POST-запроса
            const { login,email, name, surname, patrynumic,id_role,password } = req.body;
            const query = `
                INSERT INTO users (login,email, name, surname, patrynumic,id_role,password)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;
            const data = [login,email, name, surname, patrynumic,id_role,password];
            await client.query(query, data);
            res.status(200).send('Данные успешно вставлены');
        } catch (error) {
            console.error('Ошибка при вставке данных:', error.message);
            res.status(500).send('Произошла ошибка при вставке данных');
        }
    });
    
    app.post('/login', async (req, res) => {
        try {
            const { login, password } = req.body;
    
            // Проверяем, существует ли пользователь с данным логином
            const userQuery = 'SELECT * FROM users WHERE login = $1';
            const userData = [login];
            const result = await client.query(userQuery, userData);
    
            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Неверный логин или пароль' });
            }
    
            // Сравниваем пароль из базы данных с введенным паролем
            const user = result.rows[0];
            if (password !== user.password) {
                return res.status(401).json({ message: 'Неверный логин или пароль' });
            }
            
            // Генерируем JWT токен
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET , { expiresIn: '1h' });
            
            res.status(200).json({ token,user});
        } catch (error) {
            console.error('Ошибка при аутентификации:', error.message);
            res.status(500).send('Произошла ошибка при аутентификации');
        }
    });

    app.get('/getNews', async (req, res) =>{
        try{
            const query = 'SELECT * FROM news';
            const result = await client.query(query);  
            res.status(200).json(result.rows);
            
        }catch(error){
            console.log(error);
            res.status(500).send('Internal server error');

        }
    });
    
    
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
    
    module.exports = app;