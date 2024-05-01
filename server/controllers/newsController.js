const {client} = require("../database/connect");

const getNews = async (req, res) => {
    try{
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

module.exports = {
    getNews 
}
