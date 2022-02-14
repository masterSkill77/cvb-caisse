const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const { Depense } = require('./models/index');
const path = require('path')
const {router} = require('./route')
const cors = require("cors");
const PORT = process.env.PORT || 8091;
const { sequelize } = require('./models/index')
const db =require("./models/index");
const cookieParser = require('cookie-parser')
const session = require('express-session');


const { Op } = require('sequelize');



var corsOptions = {
    origin: "http://localhost:8091"
  };
  
  app.use(cors(3));
  
  const pdf=require('html-pdf');
  const ejs = require('ejs');
//midelwer rwq body
app.use(express.urlencoded({ extends:false}));
app.set('view engine', 'ejs')
app.use('/assets',express.static('public'))
app.use('/node_modules',express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(express.json());


app.use(cookieParser());
app.use(session({
    key:'user_sidiss',
    secret:'somesecret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60000000
    }
}))

// app.use((req, res, next) =>{
//     if(req.cookies. && !req.session.users){
//         res.clearCookie('user_sid')
//     }
//     next();
// })
// var ejss = { userName: '',loggedin: false, title:" you are not logged in today", body:" hello word"};

app.use(require('./route'))


app.use(function(req, res,next){
    res.status(404).send("cette url est inaccessible")
    })
    

app.get('/pdf',(req, res)=>{
  Depense.findAll().then((liste)=>{
// res.render("./test.ejs",{test:liste})
    ejs.renderFile("./views/test.ejs", {test:liste},(err, html)=>{
        if(err){
            return res.status(500).json({message:'hello'})
        }
        const option={
            format:'A4',
            border:{
                right:'8'
            }
        }
    pdf.create(html, option).toFile('./uploads/kl.pdf',(error, response)=>{
        if(!err){
            // res.json({message:'pdf generate',status:res.statusCode})
            res.render("./test.ejs",{test:liste})
            res.type('pdf');
            res.download('./uploads/kl.pdf')

        }else{
            res.json({message:'ts mety'})
        }
    })
  
    })
  })
 
})
// app.get('/payementclis/:id',(req,res)=>{
    
//     const {id}=req.params
   
//     var sql=null

//          sql="SELECT listecomms.id,modes.mode,qt,idcomm,idpro,payementclis.date_echeance,payementclis.remise,payementclis.payee,payementclis.net,payementclis.id as numfact,produits.name as nompro,produits.unite,listecomms.condition,produits.pugros,produits.pudetail,commandeclis.datecom,intrants.name as intrante,clients.adress, clients.name as nomclient from commandeclis, produits,payementclis,listecomms,intrants,clients,modes WHERE clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND intrants.id=produits.idintrant and commandeclis.id=listecomms.idcomm AND produits.id=listecomms.idpro and payementclis.id = '"+id+"' and commandeclis.id = payementclis.idcommande"
  
//         //  SELECT * from listecomms WHERE idcomm=(SELECT idcomm from listecomms WHERE id=(SELECT idcommande FROM payementclis,clients,listecomms,commandeclis,produits,intrants  WHERE listecomms.id=payementclis.idcommande and produits.id=listecomms.idpro and intrants.id=produits.idintrant and clients.id=commandeclis.idcli and commandeclis.id=listecomms.idcomm and payementclis.id = '4' and listecomms.idcomm ORDER BY listecomms.idcomm DESC))
//     try{
//         db.sequelize.query(
//             sql,
//              { type: sequelize.QueryTypes.SELECT}
//              )
//         .then((date) => {
//             return   res.render('commande/facture',{date:date})
//         }) 
//     }
//     catch (error) {
//         console.log(error.message);
//         return res.status(500).json({error:error.message})
//     }
//     console.log('server')
// })
app.get('/download', (req, res)=>{
  res.type('pdf');
  res.download('./uploads/kl.pdf')
})


app.listen(PORT,()=>{
    console.log(`mandeha tsar ny port:${PORT}`)

    sequelize.sync({ force: false}).then(()=>{
        console.log('se connecter a la sequelize');
    })
})