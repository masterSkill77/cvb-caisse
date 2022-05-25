require("dotenv").config();

// module.exports={
//   username:process.env.DB_USERNAME || "cvbshopmg_cvbshopmg",
//   password:process.env.DB_PASSWORD || "123456789analamahitsy!",
//   database:process.env.DB_DATABASE || "cvbshopmg_analamahitsy",
//   host:process.env.DB_HOST || "144.91.112.39",
//   dialect: process.env.DB_DIALECT|| "mysql",
//   define:{
//     timestamps:false,
//     underscored:true,
//   }
// }

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "test",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  define: {
    timestamps: false,
    underscored: true,
  },
};
