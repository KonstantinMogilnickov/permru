const { client } = require("../database/connect");

const getAllServices = async (req, res) => {
  try {
    const query = `
        SELECT s.*, o.organization
        FROM services s
        INNER JOIN services_organization o ON s.id_service_organization = o.id
        `;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const regUser = async (req, res) => {
  try {
    const status = 1;
    const { surname, name, patrynumic, telephone, email, userId, serviceId } =
      req.body;
    const query = `
        INSERT INTO service_reg (surname, name, patrynumic, telephone, email,user_id, service_id,status)
        VALUES ($1,$2,$3,$4,$5,$6,$7, $8)
        `;
    const data = [
      surname,
      name,
      patrynumic,
      telephone,
      email,
      userId,
      serviceId,
      status,
    ];
    await client.query(query, data);
    res.status(200).send("Данные успешно вставлены!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Произошла ошибка при вставке данных");
  }
};

const getAllRegUsers = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send("Body is empty");
      return;
    }
    const query = `SELECT n. * , s.service_name
    FROM service_reg n 
    INNER JOIN services s ON n.service_id  = s.id
    WHERE n.status = 1;
    `;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error!");
  }
};

const serviceComplete  = async  (req, res)  =>  {
    try{
        const {id}= req.body;
        const query  = `UPDATE service_reg SET status = 3 WHERE id  =  $1`;
        await client.query(query, [id]);
        res.status(200).json({message:"Запись успешно обновлена!"});
    }catch  (err)  {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const serviceReject = async  (req, res)  =>  {
    try{
        const {id}= req.body;
        const query  = `UPDATE service_reg SET status = 2 WHERE id  =  $1`;
        await client.query(query, [id]);
        res.status(200).json({message:"Запись успешно обновлена!"});
    }catch  (err)  {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};


const getMyServices = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send("Body is empty");
      return;
    }

    const query = `
        SELECT n.*, c.service_name, s.status
        FROM service_reg n
        INNER JOIN services c ON n.service_id = c.id
        INNER JOIN service_reg_status s ON n.status  = s.id
        `;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteMyService = async (req, res) => {
  try {
    console.log("Получен запрос на удаление:", req.body);
    const { id } = req.body;
    const query = `DELETE FROM service_reg WHERE id = $1`;
    const result = await client.query(query, [id]);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getAllServices,
  regUser,
  getMyServices,
  deleteMyService,
  getAllRegUsers,
  serviceComplete,
  serviceReject
};
