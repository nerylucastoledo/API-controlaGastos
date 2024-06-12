const connectToDatabase = require("../models/db")

const createPeople = async (req, res) => {
  try {
    const { name, username } = req.body
    const db = await connectToDatabase();
    const peoples = await db.collection("peoples");

    peoples.insertOne({
      username,
      name
    })
    res.status(201).json({ message: "Pessoa criada com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: "Ocorreu um erro interno!" });
  }
}

const getPeoples = async (username) => {
  try {
    const db = await connectToDatabase();
    const peoples = await db.collection("peoples").find({ username }).toArray();
    return peoples;
  } catch {
    return []
  }
}

module.exports = { createPeople, getPeoples };