const connectToDatabase = require("../models/db");

const createCategory = async (req, res) => {
  try {
    const { name, username } = req.body
    const db = await connectToDatabase();
    const categorys = await db.collection("categorys");

    categorys.insertOne({
      username,
      name,
    })
    res.status(201).json({ message: "Categoria criada com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: "Ocorreu um erro interno!" });
  }
}

const getCategorys = async (username) => {
  try {
    const db = await connectToDatabase();
    const categorys = await db.collection("categorys").find({ username }).toArray();
    return categorys
  } catch (err) {
    return []
  }
}

module.exports = { createCategory, getCategorys };