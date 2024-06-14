const connectToDatabase = require("../models/db");
const { ObjectId } = require('mongodb');

class CardService {
  static async createCard(name, color, username) {
    try {
      const db = await connectToDatabase();
      const cards = await db.collection("cards");

      const existingCard = await db.collection("cards").findOne({ name });
  
      if (existingCard) {
        return {
          error: true,
          message: "Já existe uma cartão com esse nome!"
        };
      }
  
      cards.insertOne({
        name,
        color,
        username,
      })

      return {
        error: false,
        message: "Cartão criado com sucesso!"
      };
    } catch {
      console.error("Erro ao criar a cartão:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async findAlllCardsByUsername(username) {
    try {
      const db = await connectToDatabase();
      const cards = await db.collection("cards").find({ username }).toArray();
  
      return cards
    } catch {
      return false
    }
  }

  static async updateCard(_id, color, name) {
    try {
      const newObjectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const existingCard = await db.collection("cards").findOne({ name });
  
      if (existingCard && existingCard.color === color && existingCard.name === name) {
        return {
          error: true,
          message: "Já existe uma cartão com esse nome e essa cor!"
        };
      }
  
      const result = await db.collection("cards").updateOne(
        { _id: newObjectId },
        { $set: { name, color } }
      );
  
      if (result.matchedCount !== 0 && result.modifiedCount !== 0) {
        return {
          error: false,
          message: "Cartão atualizada com sucesso!"
        };
      }
  
      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    } catch (error) {
      console.error("Erro ao atualizar a cartão:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async deleteCard(_id) {
    try {
      const objectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const result = await db.collection("cards").deleteOne({ _id: objectId });
  
      return result.deletedCount !== 0
    } catch {
      return false
    }
  };
}

module.exports = CardService