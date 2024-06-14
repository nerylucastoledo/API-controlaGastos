const PeopleService = require("../services/peopleServices");

const createPeople = async (req, res) => {
  try {
    const { name, username } = req.body
    const { error, message } = await PeopleService.createPeople(name, username);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao criar a pessoa:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

const getPeoples = async (username) => {
  const peoples = await PeopleService.findAlllPeopleByUsername(username);

  if (!peoples) return [];

  return peoples
}

const updatePeople = async (req, res) => {
  const { _id, name } = req.body;

  try {
    const { error, message } = await PeopleService.updatePeople(_id, name);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao atualizar a pessoa:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

const deletPeople = async (req, res) => {
  const { _id } = req.body;
  const result = await PeopleService.deletePeople(_id);

  if (!result) return res.status(500).send({ error: { message: "Não foi possível deletar a pessoa!" }});

  res.status(200).json({ message: "Pessooa deletada com sucesso!" });
};

module.exports = { createPeople, getPeoples, updatePeople, deletPeople };