const connectToDatabase = require("../models/db");

const getAllCategorys = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("categorys").find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Conexão falhou');
  }
}

module.exports = { getAllCategorys };