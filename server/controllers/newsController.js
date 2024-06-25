const { query } = require("express");
const {client} = require("../database/connect");

const getNews = async (req, res) => {
    try{
        if (!req.body) {
            res.status(400).send('Body is empty');
            return;
        }
        const query = `
        SELECT n.*, c.category
        FROM news n
        INNER JOIN news_category c ON n.id_category = c.id
        `;
        const result = await client.query(query);
        res.status(200).json(result.rows);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

const addNews = async (req, res) => {
    try{
        if (!req.body) {
            res.status(400).send('Body is empty');
            return;
        }
        const {title, text, image_path, date, creator, id_category, id_news_status} = req.body;
        const query = `
        INSERT INTO news 
        (title, text, image_path, date, creator, id_category, id_news_status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7);
        `;
        const data = [title, text, image_path, date, creator, id_category, id_news_status];
        await client.query(query, data);
        res.status(200).send('Новость добавлена');
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

const getCategories = async (req, res) => {
    try{
        if (!req.body) {
            res.status(400).send('Body is empty');
            return;
        }
        const query = `SELECT * FROM news_category`;
        const result = await client.query(query);
        res.status(200).json(result.rows);
    }
    catch (error){
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

const deleteNews = async (req,res) =>{
    try {
       if(!req.body){
           res.status(400).send('Body is empty');
       }
       const {id} = req.body;

       const query = `DELETE FROM news WHERE id = $1`;
       const result = await client.query(query,[id]);
       res.status(200).json({message: "Новость успешно удалена"});
    }catch (err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    getNews, addNews, getCategories, deleteNews
}
