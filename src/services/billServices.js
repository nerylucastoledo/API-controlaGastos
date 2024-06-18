const connectToDatabase = require("../models/db");
const { ObjectId } = require('mongodb');

const { getCards } = require("../controllers/cardsController");
const { getPeoples } = require("../controllers/peoplesController");
const { getCategorys } = require("../controllers/categorysController");

const formatCurrencyToNumber = (value) => {
  value = value
    .replace(/\./g, "")
    .replace("R$ ", "")
    .replace(/,/g, ".")

  return Number(value);
}

class BillService {
  static async createBill({ body }) {
    try {
      const db = await connectToDatabase();
      const bills = await db.collection("bill");
  
      bills.insertOne({
        username: body.username,
        date: body.date,
        people: body.people,
        category: body.category,
        value: body.value, 
        item: body.item,
        card: body.card,
      })

      return {
        error: false,
        message: "Gasto criado com sucesso!"
      };
    } catch {
      console.error("Erro ao criar o gasto:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async createBillInstallment({ body }) {
    try {
      const db = await connectToDatabase();
      const bills = await db.collection("bill");
  
      bills.insertMany(body)

      return {
        error: false,
        message: "Gasto criado com sucesso!"
      };
    } catch {
      console.error("Erro ao criar o gasto:", error);

      return {
        error: true,
        message: "Ocorreu um problema, tente novamente!"
      };
    }
  }

  static async findAllBillByUsernameAndDate(username, date) {
    try {
      const db = await connectToDatabase();
      const billList = await db.collection("bill").find({ username, date }).toArray();
      const cardList = await getCards(username);
      const peopleList = await getPeoples(username);
      const categoryList = await getCategorys(username)
  
      return {
        billList,
        cardList,
        peopleList,
        categoryList,
      }
    } catch {
      return false
    }
  }

  static async getDataChart(username, year) {
    try {
      const dataChart = [
        { month: 'Jan', value: 0 },
        { month: 'Fev', value: 0 },
        { month: 'Mar', value: 0 },
        { month: 'Abr', value: 0 },
        { month: 'Mai', value: 0 },
        { month: 'Jun', value: 0 },
        { month: 'Jul', value: 0 },
        { month: 'Ago', value: 0 },
        { month: 'Set', value: 0 },
        { month: 'Out', value: 0 },
        { month: 'Nov', value: 0 },
        { month: 'Dez', value: 0 },
      ]

      const db = await connectToDatabase();
      const billList = await db.collection("bill").find({ username }).toArray();
      const billByYear = billList.filter(bill => bill.date.includes(year) && bill.people === "Eu")
      billByYear.forEach((bill) => {
        dataChart.forEach((item) => {
          if (bill.date.includes(item.month)) {
            item.value += formatCurrencyToNumber(bill.value);
          }
        });
      });
  
      return dataChart;
    } catch {
      return false;
    }
  }

  static async updateBill(_id, item, value) {
    try {
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
  
      return result.matchedCount !== 0 && result.modifiedCount !== 0;
    } catch {
      return false;
    }
  }

  static async deleteBillItem(_id) {
    try {
      const objectId = new ObjectId(_id);
      const db = await connectToDatabase();
      const result = await db.collection("bill").deleteOne({ _id: objectId });
  
      return result.deletedCount !== 0
    } catch {
      return false
    }
  };
}

module.exports = BillService