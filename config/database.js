require('dotenv').config();

module.exports={
<<<<<<< HEAD
  username:process.env.DB_USERNAME || "root",
  password:process.env.DB_PASSWORD || "",
  database:process.env.DB_DATABASE || "caisse",
  host:process.env.DB_HOST || "localhost",
=======
  username:process.env.DB_USERNAME || "cvbshopmg_cvbshopmg",
  password:process.env.DB_PASSWORD || "123456789analamahitsy!",
  database:process.env.DB_DATABASE || "cvbshopmg_analamahitsy",
  host:process.env.DB_HOST || "144.91.112.39",
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f
  dialect: process.env.DB_DIALECT|| "mysql",
  define:{
    timestamps:false,
    underscored:true,
  }
}