'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const Fournisseur = sequelize.define('Fournisseur',{
   name: DataTypes.STRING,
    adress: DataTypes.STRING,
    contact: DataTypes.INTEGER,
    email: DataTypes.STRING
  },{
    modelName:'fournisseurs',
    timestamps:false,
  })
Fournisseur.associate=function(models){
    Fournisseur.hasMany(models.Approfou,{as:"approfo", foreignKey:"idfou"});

}
  return Fournisseur;

};