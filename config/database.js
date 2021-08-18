require('dotenv').config();

module.exports={
  username:process.env.DB_USERNAME || "cvbshopmg_cvbshopmg",
  password:process.env.DB_PASSWORD || "analamitsy12345!",
  database:process.env.DB_DATABASE || "cvbshopmg_analamahitsy",
  host:process.env.DB_HOST || "144.91.112.39",
  dialect: process.env.DB_DIALECT|| "mysql",
  define:{
    timestamps:false,
    underscored:true,
  }
}