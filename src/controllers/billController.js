const BillServices = require('../services/billServices');

const getBillByUsernameAndDate = async (req, res) => {
  const { username, date } = req.query
  const data = await BillServices.findAllBillByUsernameAndDate(username, date);

  if (!data) return res.status(500).send({ error: "Ocorreu um erro interno!" });

  res.status(200).json(data);
}

const getDataChart = async (req, res) => {
  const { username, year } = req.params;
  const data = await BillServices.getDataChart(username, year);

  if (!data) return res.status(500).send({ error: "Ocorreu um erro interno!" });

  res.status(200).json(data);
}

const updateBill = async (req, res) => {
  const { _id, item, value } = req.body
  const result = BillServices.updateBill(_id, item, value)

  if (!result )res.status(404).json({ message: "Não foi possível atualizar!" });

  res.status(200).json({ message: "Atualizado com sucesso!" });
}

const deleteBillItem = async (req, res) => {
  const { _id } = req.body;
  const result = await BillServices.deleteBillItem(_id);

  if (!result) return res.status(500).send({ error: "Ocorreu um erro interno!" });

  res.status(200).json({ message: "Deletado com sucesso!" });
};

module.exports = { getBillByUsernameAndDate, getDataChart, updateBill, deleteBillItem };