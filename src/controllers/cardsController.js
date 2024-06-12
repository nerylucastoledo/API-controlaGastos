const connectToDatabase = require("../models/db")

const createCard = async (req, res) => {
  try {
    const { name, color, username } = req.body
    const db = await connectToDatabase();
    const cards = await db.collection("cards");

    cards.insertOne({
      username,
      name,
      color
    })
    res.status(201).json({ message: "Cartão criado com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: "Ocorreu um erro interno!" });
  }
}

const getCards = async (username) => {
  try {
    const db = await connectToDatabase();
    const cards = await db.collection("cards").find({ username }).toArray();
    return cards
  } catch {
    return [];
  }
}

module.exports = { createCard, getCards };