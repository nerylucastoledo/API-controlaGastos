const connectToDatabase = require("../models/db");
const { ObjectId } = require('mongodb');

class CategoryService {
  static async createCategory(name, username) {
    try {
      const db = await connectToDatabase();
      const categorys = await db.collection("categorys");

      const existingCategory = await db.collection("categorys").findOne({ name });
  
      if (existingCategory) {
        return {
          error: true,
          message: "Já existe uma categoria com esse nome!"
        };
      }
  
      categorys.insertOne({
        name,
        username,
      })

      return {
        error: false,
        message: "Categoria criada com sucesso!"
      };
    } catch {
      console.error("Erro ao criar a categoria:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async findAlllCategorysByUsername(username) {
    try {
      const db = await connectToDatabase();
      const categorys = await db.collection("categorys").find({ username }).toArray();
  
      return categorys
    } catch {
      return false
    }
  }

  static async updateCategory(_id, name) {
    try {
      const newObjectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const existingCategory = await db.collection("categorys").findOne({ name });
  
      if (existingCategory) {
        return {
          error: true,
          message: "Já existe uma categoria com esse nome!"
        };
      }
  
      const result = await db.collection("categorys").updateOne(
        { _id: newObjectId },
        { $set: { name } }
      );
  
      if (result.matchedCount !== 0 && result.modifiedCount !== 0) {
        return {
          error: false,
          message: "Categoria atualizada com sucesso!"
        };
      }
  
      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    } catch (error) {
      console.error("Erro ao atualizar a categoria:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async deleteCategory(_id) {
    try {
      const objectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const result = await db.collection("categorys").deleteOne({ _id: objectId });
  
      return result.deletedCount !== 0
    } catch {
      return false
    }
  };
}

module.exports = CategoryService