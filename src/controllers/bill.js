const connectToDatabase = require("../models/db");
const { getCards } = require("./cardsController");
const { getPeoples } = require("./peoplesController");
const { getCategorys } = require("./categorysController");
const { ObjectId } = require('mongodb');

const deleteBillItem = async (req, res) => {
  try {
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const db = await connectToDatabase();
    const result = await db.collection("bill").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Não foi possível deletar!" });
    }

    res.status(200).json({ message: "Deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno!" });
  }
};

const getAllBills = async (req, res) => {
  try {
    const { username, date } = req.query
    const db = await connectToDatabase();
    const billList = await db.collection("bill").find({ username, date }).toArray();
    const cardList = await getCards(username);
    const peopleList = await getPeoples(username);
    const categoryList = await getCategorys(username)

    const data = {
      billList,
      cardList,
      peopleList,
      categoryList,
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ error: "Ocorreu um erro interno!" });
  }
}

const updateBill = async (req, res) => {
  try {
    const { _id, item, value } = req.body
    const newObjectId = new ObjectId(_id)
    const db = await connectToDatabase();
    const result = await db.collection("bill").updateOne(
      { _id: newObjectId },
      { $set: { 
          item: item, 
          value: value 
        } 
      } 
    );

    if (result.matchedCount === 0 || result.modifiedCount === 0) {
      return res.status(404).json({ message: "Não foi possível atualizar!" });
    }

    res.status(200).json({ message: "Atualizado com sucesso!" });
  } catch (err) {
    res.status(500).send({ error: "Ocorreu um erro interno!" });
  }
}

module.exports = { getAllBills, deleteBillItem, updateBill };