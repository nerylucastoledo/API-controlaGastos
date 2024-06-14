const CardService = require("../services/cardServices");

const createCard = async (req, res) => {
  try {
    const { name, color, username } = req.body
    const { error, message } = await CardService.createCard(name, color, username);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao criar a cartão:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

const getCards = async (username) => {
  const cards = await CardService.findAlllCardsByUsername(username);

  if (!cards) return [];

  return cards
}

const updateCard = async (req, res) => {
  const { _id, color, name } = req.body;

  try {
    const { error, message } = await CardService.updateCard(_id, color, name);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao atualizar a cartão:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

const deleteCard = async (req, res) => {
  const { _id } = req.body;
  const result = await CardService.deleteCard(_id);

  if (!result) return res.status(500).send({ error: { message: "Não foi possível deletar o cartão!" }});

  res.status(200).json({ message: "Cartão deletada com sucesso!" });
};

module.exports = { createCard, getCards, updateCard, deleteCard };