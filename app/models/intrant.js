'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 const Intrant =sequelize.define('Intrant',{
    name: DataTypes.STRING

  },{
    modelName:'intrants',
    timestamps:false,
  })
 Intrant.associate=function(models){
    Intrant.hasMany(models.Produit,{as:"intrants", foreignKey:"idintrant"});

 }
  return Intrant;
};