const { PointDeVente } = require("./../models/index");
const create_store = async function (name, contact, adresse) {
  try {
    const data = { name, contact, adresse };
    return await PointDeVente.create(data);
  } catch (error) {
    throw new Error(e.message);
  }
};
module.exports = { create_store };
