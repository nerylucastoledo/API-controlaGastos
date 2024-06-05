const connectToDatabase = require("../models/db");

const getAllUsers = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("users").find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Conexão falhou');
  }
}

module.exports = { getAllUsers };