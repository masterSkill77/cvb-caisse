'use strict';
const { Approfou } = require('../models/index');
const { Produit } = require('../models/index');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 const Listeappro=sequelize.define('Listeappro',{
   qt: DataTypes.INTEGER,
   condition: DataTypes.STRING
  },{
    modelName:'listeappros',
    timestamps:false,
  })
 Listeappro.associate=function(models){
  Listeappro.belongsTo(models.Approfou, {as:"appro", foreignKey:"idappro"});
  Listeappro.hasMany(models.Payementfou,{as:"approvision", foreignKey:"idprovision"});
  Listeappro.belongsTo(models.Produit, {as:"produit", foreignKey:"idpro"}); 
 }

  return Listeappro;
};