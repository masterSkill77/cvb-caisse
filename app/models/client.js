'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 const Client= sequelize.define('Client',{
 	 name: DataTypes.STRING,
    adress: DataTypes.STRING,
    contact: DataTypes.INTEGER,
    email: DataTypes.STRING
},{
	modelName:'clients',
	timestamps:false,
})
 Client.associate=function(models){
    Client.hasMany(models.Commandecli,{as:"clients", foreignKey:"idcli"});
 }
  return Client;
};