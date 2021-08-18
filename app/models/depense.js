'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 const Depense=sequelize.define('Depense',{
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    motif: DataTypes.STRING,
    type: DataTypes.STRING,
    montant: DataTypes.INTEGER,
    datedepense: DataTypes.DATEONLY
 },{
  modelName:'depenses',
  timestamps:false,
 })
 Depense.associate=function(models){

 }
  return Depense;
};