const connectToDatabase = require("../models/db")

const getAllCards = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const cards = await db.collection("cards").find({ username: "lucas@1" }).toArray();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).send('Conexão falhou');
  }
}

module.exports = { getAllCards };