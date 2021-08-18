'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Commandecli = sequelize.define('Commandecli',{
    datecom: DataTypes.DATEONLY

  },{
    modelName:'commandeclis',
    timestamps:false
  })
  Commandecli.associate=function(models){
    Commandecli.hasMany(models.Listecomm,{as:"commmande", foreignKey:"idcomm"});
    Commandecli.belongsTo(models.Client, {as:"clients", foreignKey:"idcli"});
    Commandecli.belongsTo(models.Mode, {as:"modes", foreignKey:"idmode"});


  }
  return Commandecli;
};