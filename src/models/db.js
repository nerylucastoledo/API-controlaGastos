// src/models/db.js
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("controlaGastos");
}

module.exports = connectToDatabase;