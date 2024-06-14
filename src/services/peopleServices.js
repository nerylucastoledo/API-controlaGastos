const connectToDatabase = require("../models/db");
const { ObjectId } = require('mongodb');

class PeopleService {
  static async createPeople(name, username) {
    try {
      const db = await connectToDatabase();
      const peoples = await db.collection("peoples");

      const existingPeople = await db.collection("peoples").findOne({ name });
  
      if (existingPeople) {
        return {
          error: true,
          message: "Já existe uma pessoa com esse nome!"
        };
      }
  
      peoples.insertOne({
        name,
        username,
      })

      return {
        error: false,
        message: "Pessoa criada com sucesso!"
      };
    } catch {
      console.error("Erro ao criar a pessoa:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async findAlllPeopleByUsername(username) {
    try {
      const db = await connectToDatabase();
      const peoples = await db.collection("peoples").find({ username }).toArray();
  
      return peoples
    } catch {
      return false
    }
  }

  static async updatePeople(_id, name) {
    try {
      const newObjectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const existingPeople = await db.collection("peoples").findOne({ name });
  
      if (existingPeople) {
        return {
          error: true,
          message: "Já existe uma pessoa com esse nome!"
        };
      }
  
      const result = await db.collection("peoples").updateOne(
        { _id: newObjectId },
        { $set: { name } }
      );
  
      if (result.matchedCount !== 0 && result.modifiedCount !== 0) {
        return {
          error: false,
          message: "Pessoa atualizada com sucesso!"
        };
      }
  
      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    } catch (error) {
      console.error("Erro ao atualizar a pessoa:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async deletePeople(_id) {
    try {
      const objectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const result = await db.collection("peoples").deleteOne({ _id: objectId });
  
      return result.deletedCount !== 0
    } catch {
      return false
    }
  };
}

module.exports = PeopleService