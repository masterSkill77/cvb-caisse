require('dotenv').config();

module.exports={
  username:process.env.DB_USERNAME || "cvbshopmg_caisseAnkazomanga",
  password:process.env.DB_PASSWORD || "caisseAnkazomanga12345",
  database:process.env.DB_DATABASE || "cvbshopmg_caisseAnkazomanga",
  host:process.env.DB_HOST || "144.91.112.39",
  dialect: process.env.DB_DIALECT|| "mysql",
  define:{
    timestamps:false,
    underscored:true,
  }
}