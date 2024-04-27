const {client} = require('../database/connect');
const jwt = require('jsonwebtoken');

const insertUser = async (req, res) => {
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
}

const loginUser = async (req, res) => {
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
}

const deleteAccount = async (req, res) => {
    try{
        const { id } = req.body;
        const query = 'DELETE FROM users WHERE id = $1';
        const result = await client.query(query, [id]);
        res.status(200).json({ message: 'Пользователь успешно удален' });

    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}
   
module.exports = {
    insertUser, loginUser, deleteAccount
}
    