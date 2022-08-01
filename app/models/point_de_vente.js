"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const PointDeVente = sequelize.define(
    "point_de_vente",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      contact: { type: DataTypes.STRING, allowNull: false },
      adresse: { type: DataTypes.STRING, allowNull: false },
    },
    {
      modelName: "point_de_vente",
      timestamps: false,
    }
  );
  //   Client.associate = function (models) {
  //     Client.hasMany(models.Commandecli, { as: "clients", foreignKey: "idcli" });
  //   };
  return PointDeVente;
};
