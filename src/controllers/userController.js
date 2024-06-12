const connectToDatabase = require("../models/db");

const createUser = async (body) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("users");
    users.insertOne(body)
    return true;
  } catch (err) {
    return false;
  }
}

const getAllUsers = async (email) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection("users").find(email).toArray();
    return users;
  } catch (err) {
    return [];
  }
}

module.exports = { createUser, getAllUsers };