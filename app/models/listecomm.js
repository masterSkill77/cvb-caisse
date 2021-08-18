'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Listecomm=sequelize.define('Listecomm',{
    qt: DataTypes.INTEGER,
    condition: DataTypes.STRING
  },{
    modelName:'listecomms',
    timestamps:false,
  })
  Listecomm.associate=function(models){
    Listecomm.belongsTo(models.Commandecli, {as:"commmande", foreignKey:"idcomm"});
    Listecomm.hasMany(models.Payementcli,{as:"commmandes", foreignKey:"idcommande"});
    Listecomm.belongsTo(models.Produit, {as:"produits", foreignKey:"idpro"});

  }
  return Listecomm;
};