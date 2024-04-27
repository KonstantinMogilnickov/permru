const {client} = require("../database/connect");

const getNews = async (req, res) => {
    try{
        const query = 'SELECT * FROM news';
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
