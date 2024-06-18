const BillServices = require('../services/billServices');

const createBill = async (req, res) => {
  try {
    let error, message;
    const { installment } = req.body

    if (installment !== 0 ) {
      console.log("parcelado", req.body)
      const result = await BillServices.createBillInstallment(req.body);
      error = result.error
      message = result.message
    } else {
      const result = await BillServices.createBill(req.body);
      error = result.error
      message = result.message
    }

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao criar a cartão:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

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

module.exports = { createBill, getBillByUsernameAndDate, getDataChart, updateBill, deleteBillItem };