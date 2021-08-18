'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const Mode = sequelize.define('Mode',{
  mode: DataTypes.STRING
},{
  modelName:'modes',
  timestamps:false,

})
  
Mode.associate=function(models){
  Mode.hasMany(models.Commandecli,{as:"modes", foreignKey:"idmode"});
  
}
  return Mode;
};