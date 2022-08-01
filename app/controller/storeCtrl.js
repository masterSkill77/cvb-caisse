const StoreService = require("./../services/point-de-vente.service");

const create_store = async (req, res) => {
  const data = req.body;
  console.log(data);
};

const get_all = async (req, res) => {
  res.json(await StoreService.get_all());
};

module.exports = { create_store, get_all };
