const StoreService = require("./../services/point-de-vente.service");

const create_store = async (req, res) => {
  const { name, contact, adresse } = req.body;
  res.json(await StoreService.create_store(name, contact, adresse));
};

const get_all = async (req, res) => {
  res.json(await StoreService.get_all());
};

module.exports = { create_store, get_all };
