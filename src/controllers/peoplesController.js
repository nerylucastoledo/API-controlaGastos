const connectToDatabase = require("../models/db")

const getAllPeoples = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const cards = await db.collection("peoples").find({ username: "lucas@1" }).toArray();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).send('Conexão falhou');
  }
}

module.exports = { getAllPeoples };