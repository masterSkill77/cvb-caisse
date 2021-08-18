'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Payementcli=sequelize.define('Payementcli',{
        payee: DataTypes.INTEGER,
        datepayement: DataTypes.DATEONLY,
        dateEcheance: DataTypes.DATEONLY,
        remise: DataTypes.INTEGER,
        net: DataTypes.INTEGER
        
      },{
        modelName:'payementclis',
        timestamps:false,
      })
      Payementcli.associate=function(models){
        Payementcli.belongsTo(models.Listecomm, {as:"commmandes", foreignKey:"idcommande"});
        
      }
  return Payementcli;
};