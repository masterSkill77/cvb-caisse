'use strict';
<<<<<<< HEAD
=======
var bcrypt =require('bcrypt');
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User',{
    username: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.INTEGER
},{
  modelName:'users',
  timestamps:false,
})
User.associate=function(models){

}
// User.beforeCreate((user, options)=>{
//   const salt = bcrypt.genSaltSync();
//   user.password = bcrypt.hashSync(user.password, salt)
// })

// User.prototype.validPassword=function(password){
//   return bcrypt.compareSync(password, this.password)
// }

  return User;
};