const connectToDatabase = require("../models/db");
const { ObjectId } = require('mongodb');

class UserService {
  static async createUser(body) {
    try {
      const db = await connectToDatabase();
      const users = await db.collection("users");
      users.insertOne(body)
      return true;
    } catch (err) {
      return false;
    }
  }

  static async findUserByEmail(email) {
    try {
      const db = await connectToDatabase();
      const users = await db.collection("users").find(email).toArray();
      return users;
    } catch {
      return [];
    }
  }

  static async updateSalary(username, salary) {
    try {
      const db = await connectToDatabase();
      const user = await db.collection("users").findOne({ username });

      if (user.salary === salary) {
        return {
          error: true,
          message: "Salário é o mesmo já cadastrado!"
        };
      }

      const result = await db.collection("users").updateOne(
        { username: username },
        { $set: { salary } }
      );

      if (result.matchedCount !== 0 && result.modifiedCount !== 0) {
        return {
          error: false,
          message: "Salário atualizado com sucesso!"
        };
      }
  
      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    } catch (error) {
      console.error("Erro ao atualizar o salário:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }
}

module.exports = UserService