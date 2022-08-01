const { point_de_vente } = require("./../models/index");
const create_store = async function (name, contact, adresse) {
  try {
    const data = { name, contact, adresse };
    return await point_de_vente.create(data);
  } catch (error) {
    throw new Error(e.message);
  }
};

const get_all = async function () {
  return await point_de_vente.findAll();
};

module.exports = { create_store, get_all };