const UserService = require("../services/userServices");

const createUser = async (body) => {
  const result = await UserService.createUser(body);
  return result
}

const getAllUsers = async (email) => {
  const result = await UserService.findUserByEmail(email);
  return result
}

const updateSalary = async (req, res) => {
  try {
    const { username, salary } = req.body;
    const { error, message } = await UserService.updateSalary(username, salary);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao atualizar o salário:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

module.exports = { createUser, getAllUsers, updateSalary };