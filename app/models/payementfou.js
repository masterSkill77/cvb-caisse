'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Payementfou=sequelize.define('Payementfou',{
        payee: DataTypes.INTEGER,
        datepayement: DataTypes.DATEONLY,
        dateEcheance: DataTypes.DATEONLY,
        net: DataTypes.INTEGER
      },{
        modelName:'payementfous',
        timestamps:false
      })
  Payementfou.associate=function(models){
    Payementfou.belongsTo(models.Listeappro, {as:"approvision", foreignKey:"idprovision"});
    
  }
  return Payementfou;
};