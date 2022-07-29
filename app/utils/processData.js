const _ = require("lodash");
const { default: axios } = require("axios");
const KeyCorrespondance = require("./key-correspondance");
const processProductData = async function (element) {
  element[KeyCorrespondance.Code] = element["Code"];
  delete element["Code"];
  element[KeyCorrespondance.Catégorie] = (
    await processCategorieData(element["Catégorie"])
  ).id;
  delete element["Catégorie"];
  element[KeyCorrespondance.Designation] = element["Designation"];
  delete element["Designation"];
  element[KeyCorrespondance.Stock] = element["Stock"];
  delete element["Stock"];
  element[KeyCorrespondance.Unité] = element["Unité"];
  delete element["Unité"];
  element[KeyCorrespondance.Présentation] = element["Présentation"];
  delete element["Présentation"];
  element[KeyCorrespondance.Conditionnement] = element["Conditionnement"];
  delete element["Conditionnement"];
  element[KeyCorrespondance["PU (D)"]] = element["PU (D)"];
  delete element["PU (D)"];
  element[KeyCorrespondance["PU (G)"]] = element["PU (G)"];
  delete element["PU (G)"];
  element[KeyCorrespondance["Prix d'achat"]] = element["Prix d'achat"];
  delete element["Prix d'achat"];
  element[KeyCorrespondance.Déscription] = element["Déscription"];
  delete element["Déscription"];
  element[KeyCorrespondance.TVA] = 0;
  delete element["TVA"];
  element[KeyCorrespondance["Date de péremption"]] =
    element["Date de péremption"];
  delete element["Date de péremption"];

  return element;
};

const processCategorieData = async function (categorieName) {
  const categorie = await axios
    .get("http://localhost:8091/intrants")
    .then((response) => response.data);
  let intrant = _.find(categorie, (element) => element.name == categorieName);
  return intrant;
};

module.exports = { processProductData };
