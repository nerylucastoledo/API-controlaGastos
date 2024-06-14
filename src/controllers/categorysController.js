const CategoryService = require("../services/categoryServices");

const createCategory = async (req, res) => {
  try {
    const { name, username } = req.body
    const { error, message } = await CategoryService.createCategory(name, username);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao criar a categoria:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

const getCategorys = async (username) => {
  const categorys = await CategoryService.findAlllCategorysByUsername(username);

  if (!categorys) return [];

  return categorys
}

const updateCategory = async (req, res) => {
  const { _id, name } = req.body;

  try {
    const { error, message } = await CategoryService.updateCategory(_id, name);

    if (error) {
      return res.status(400).send({ error: { message }});
    }

    return res.status(200).send({ message });
  } catch (error) {
    console.error("Erro no controlador ao atualizar a categoria:", error);
    
    return res.status(500).send({ error: { message: "Erro interno do servidor" }});
  }
}

const deleteCategory = async (req, res) => {
  const { _id } = req.body;
  const result = await CategoryService.deleteCategory(_id);

  if (!result) return res.status(500).send({ error: { message: "Não foi possível deletar a categoria!" }});

  res.status(200).json({ message: "Categoria deletada com sucesso!" });
};

module.exports = { createCategory, getCategorys, updateCategory, deleteCategory };