'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const Approfou = sequelize.define('Approfou',{
    dateappro: DataTypes.DATEONLY
  },
  {
    modelName:'approfous',
    timestamps:false,
  })
Approfou.associate=function(models){
    Approfou.hasMany(models.Listeappro,{as:"appro", foreignKey:"idappro"});
    Approfou.belongsTo(models.Fournisseur, {as:"approfo", foreignKey:"idfou"});

}
  return Approfou;
};