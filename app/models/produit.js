'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 const Produit=sequelize.define('Produit',{
   name: DataTypes.STRING,
    stocks: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    unite: DataTypes.STRING,
    description: DataTypes.STRING,
    presentation: DataTypes.STRING,
    parpresentation: DataTypes.INTEGER,
    pugros: DataTypes.INTEGER,
    pudetail: DataTypes.INTEGER,
    puvente: DataTypes.INTEGER,
    tva: DataTypes.INTEGER,
    dateperemption: DataTypes.DATEONLY
 },{
  modelName:'produits',
  timestamps:false,
 })
  
  Produit.associate=function(models){
    Produit.hasMany(models.Listeappro,{as:"produit", foreignKey:"idpro"});
    
    Produit.hasMany(models.Listecomm,{as:"produits", foreignKey:"idpro"});
    Produit.belongsTo(models.Intrant, {as:"intrants", foreignKey:"idintrant"});
    
    
  }
  return Produit;
};