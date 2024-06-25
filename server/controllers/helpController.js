const {query} = require('express');
const {client} = require('../database/connect');

const addReport  = async (req, res) => {
    try{
        if(!req.body){
            res.status(400).send('Bad Request');
        }

        const {description, id_user }  = req.body;
        const query = `
        INSERT INTO user_report (description,id_user) VALUES ($1,$2)
        `;
        const data = [description, id_user];
        await client.query(query, data);
        res.status(200).send('Успешно!');

    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const getReports  = async  (req, res)  =>  {
    try{
        const query  = `
        SELECT * FROM user_report
        `;
        const data  = await client.query(query);
        res.status(200).send(data.rows);
       
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteReport   = async  (req, res)  =>  {
    try{
        if(!req.body){
            res.statustatus(400).send('Bad Request');
        }

        const {id } = req.body;
        const query = `DELETE FROM user_report WHERE id = $1`;
        await client.query(query, [id]);
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');    
    }
}

module.exports = {
    addReport,
    getReports,
    deleteReport
};