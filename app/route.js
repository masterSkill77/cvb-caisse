const express = require('express');
const { User } = require('./models/index');
const router = express.Router();
const client = require('./controller/clientCtrl');
const fournisseur = require('./controller/fournisseurCtrl');
const intrant = require('./controller/intrantCtrl');
const produit = require('./controller/produitCtrl');
const approfou = require('./controller/approvisionementFouCtrl');
const user = require('./controller/userCtrl');
const depense = require('./controller/depenseCtrl');
const commande = require('./controller/commandecliCtrl');
const paementclient = require('./controller/payementCliCtrl');
const paementfournisseur = require('./controller/paymentFou');
const modeP = require('./controller/modeCtrl');

const { sequelize } = require('./models/index')
const db =require("./models/index");
const { test } = require('./models/index');
require("dotenv").config()

var cookieParser = require('cookie-parser');
var session =require('express-session');
var morgan = require('morgan');
var app= express()
var bodyParser= require('body-parser');
var ejs= require('ejs')

router.get('/payementclis/:id',(req,res)=>{
    
    const {id}=req.params
   
    var sql=null

         sql="SELECT listecomms.id,modes.mode,qt,idcomm,idpro,payementclis.date_echeance,payementclis.remise,payementclis.payee,payementclis.net,payementclis.id as numfact,produits.name as nompro,produits.unite,listecomms.condition,produits.pugros,produits.pudetail,commandeclis.datecom,intrants.name as intrante,clients.adress, clients.name as nomclient from commandeclis, produits,payementclis,listecomms,intrants,clients,modes WHERE clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND intrants.id=produits.idintrant and commandeclis.id=listecomms.idcomm AND produits.id=listecomms.idpro and payementclis.id = '"+id+"' and commandeclis.id = payementclis.idcommande"
  
        //  SELECT * from listecomms WHERE idcomm=(SELECT idcomm from listecomms WHERE id=(SELECT idcommande FROM payementclis,clients,listecomms,commandeclis,produits,intrants  WHERE listecomms.id=payementclis.idcommande and produits.id=listecomms.idpro and intrants.id=produits.idintrant and clients.id=commandeclis.idcli and commandeclis.id=listecomms.idcomm and payementclis.id = '4' and listecomms.idcomm ORDER BY listecomms.idcomm DESC))
    try{
        db.sequelize.query(
            sql,
             { type: sequelize.QueryTypes.SELECT}
             )
        .then((date) => {
            return   res.render('commande/facture',{date:date})
        }) 
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
    }
    console.log('server')
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    key:'user_sids',
    secret:'somesecret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60000000
    }
}))

app.use((req, res, next) =>{
    if(req.cookies.user_sids && !req.session.users){
        res.clearCookie('user_sids')
    }
    next();
})
var ejss = { username: '',loggedin: false, title:" you are not logged in today", body:" hello word"};

var sessionCheckr = (req, res, next)=>{
    if(req.session.users && req.cookies.user_sids){
        console.log({"session" : req.session.users,"cookies" : req.cookies.user_sids})
        res.redirect('/dashboard');
    }else{
        next()
    }
}

router.get('/',sessionCheckr,(req, res)=>{
	res.redirect('/login')
})

router.route('/signup')
    .post((req, res)=>{
        User.create({
            username: req.body.username,
            lastname: req.body.lastname,
            password: req.body.password,
            type: req.body.type,
            email: req.body.email,
            contact: req.body.contact,
        })
        .then(user=>{
            req.session.users = user.dataValues;
            res.redirect('/login');
            console.log(user)
        })
    })
        

router.route('/login')
    .get((req,res)=>{
        res.render('authantification/login',ejss)                                                                                                    
    })
    .post((req, res)=>{
        var email = req.body.email
        var password = req.body.password
        User.findOne({where:{email:email}}).then(function(user){
         if(!user){
             res.redirect('/login')
        //  } else if(!user.validPassword(password)){
        } else if(!user.password){
             res.redirect('/login')
         }else{
             req.session.users = user.dataValues;
             res.redirect('dashboard')

         }
            })
       
     })
     router.get('/logout',(req, res)=>{
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin = false;
            ejss.title = "you are lloged out ";
            res.clearCookie('user_id');
            req.session.users = false
            console.log(JSON.stringify(ejss));
            res.redirect('/login')
        }else{
            res.redirect('/login')
        }
    })
   router.post('/accueil',(req, res)=>{
    var email = req.body.email
    var password = req.body.password
    User.findOne({where:{email:email}}).then(function(user){
     if(!user){
         res.redirect('/login')
         console.log('sika')

    //  } else if(!user.validPassword(password)){
    } else if(!user.password){
         res.redirect('/login')
         console.log('fauxs')

     }else{
         req.session.users = user.dataValues;
         res.redirect('dashboard')
         console.log('vraiy')
     }
        })
    })
   
            
     router.get('/dashboard',(req, res)=>{
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.username = req.session.users.username; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('pages/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
   

    //clientt
    
    router.get('/client', (req, res)=>{
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('client/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/clients',client.all)
    router.get('/cherhcli',client.recherche)
    router.get('/clients/:id',client.get)
    router.post('/clients',client.add)
    router.put('/clients/:id',client.update)
    router.delete('/clients/:id',client.del)
    
    //fournisseur
    router.get('/fournisseur', (req, res)=>{
        // res.render('fournisseur/index')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('fournisseur/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/fournisseurs',fournisseur.all)
    router.get('/fournisseurs/:id',fournisseur.get)
    router.post('/fournisseurs',fournisseur.add)
    router.put('/fournisseurs/:id',fournisseur.update)
    router.delete('/fournisseurs/:id',fournisseur.del)
    router.get('/cherch',fournisseur.recherch)
    
    
    
    router.get('/produit', (req, res)=>{
        // res.render('produit/index')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('produit/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/test', (req, res)=>{
        res.render('produit/test')
    })
    router.get('/produits',produit.all)
    router.get('/chercproduits',produit.recherche)
    router.post('/produits',produit.add)
    router.get('/produits/:id',produit.get)
    router.put('/produits/:id',produit.update)
    router.delete('/produits/:id',produit.del)
    
    //intrant
    router.get('/intrant', (req, res)=>{
        // res.render('produit/intrant')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('produit/intrant',ejss);
        }else{
            res.redirect('/login');
        }
        
    })
    router.get('/intrants',intrant.all)
    router.get('/intrants/:id',intrant.get)
    router.post('/intrants',intrant.add)
    router.put('/intrants/:id',intrant.update)
    router.delete('/intrants/:id',intrant.del)
    router.get('/intrantrecherch',intrant.recherch)
    //rupture
    router.get('/rupturestock', (req, res)=>{
        // res.render('produit/rupture')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('produit/rupture',ejss);
        }else{
            res.redirect('/login');
        }
    })
    // mode de payement
    router.get('/modes',modeP.all)
    router.get('/modes/:id',modeP.get)
    router.post('/modes',modeP.add)
    router.put('/modes/:id',modeP.update)
    router.delete('/modes/:id',modeP.del)
    router.get('/modes',modeP.recherch)
    // commande
    router.get('/commandecli', (req, res)=>{
        // res.render('commande/comcli')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/comcli',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/ruptureStock' , produit.sound)
    router.get('/rupturestoky' , produit.sound)
    router.post('/commandeclis',commande.createcommande)
    router.post('/commandetsyfact',commande.createcommandetsyfact)
    router.post('/commandeclisave',commande.addCommande)
    router.get('/commandeliste', commande.getListPanier)
    router.get('/affichagecommande',commande.affichagecommande)
    router.get('/datecomm/:deb/:fi',commande.datediff)
    router.get('/historika',commande.historique)
    router.post('/commande/delpanier',commande.delPanier)
    router.get('/compay/:id',commande.pay)
    router.post('/commandepayement',commande.addpayement)
    
    router.get('/commandepro', (req, res)=>{
        // res.render('commande/compro')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/compro',ejss);
        }else{
            res.redirect('/login');
        }
    })
    // payement client
    router.get('/pagepayement', (req, res)=>{
        // res.render('commande/compayement')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/compayement',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/payementclis',paementclient.all)
    router.post('/payementclis',paementclient.add);
    // router.put('/payementclis/:id',paementclient.update);
    router.put('/payementclis/:id',paementclient.update);
    // router.get('/payementclis/:id',paementclient.get,(req, res)=>{
    //     res.render('commande/facture')
    // });

    
    router.delete('/payementclis/:id',paementclient.del);
    router.get('/clientfacture/:id',paementclient.facture);
    router.get('/payementdatecli/:deb/:fi',paementclient.datediff);
    router.get('/payementclichart/:deb/:fi',paementclient.chart);
    router.get('/payementclicompteur',paementclient.compteur);
    router.get('/rest',paementclient.reste);
    
    router.get('/factureclient', (req, res)=>{
        // res.render('commande/facture')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/facture',ejss);
        }else{
            res.redirect('/login');
        }
    })
    // payement fournisseur
    router.get('/pagepayement', (req, res)=>{
        // res.render('commande/compayement')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/compayement',ejss);
        }else{
            res.redirect('/login');
        }
    })
    
    
    router.get('/idcommande', commande.getIdCommande)
    router.get('/payementfournis',paementfournisseur.all);
    router.post('/payementfournis',paementfournisseur.add);
    router.put('/payementfournis/:id',paementfournisseur.update);
    router.get('/payementfournis/:id',paementfournisseur.get);
    router.delete('/payementfournis/:id',paementfournisseur.del);
    router.get('/fournisseurfacture/:id',paementfournisseur.facture);
    router.get('/payementdatefou/:debi/:fii',paementfournisseur.datediff);
    router.get('/payementchart/:debi/:fii',paementfournisseur.chart);
    router.get('/payementcompteur',paementfournisseur.compteur);
    router.get('/commandehisto', (req, res)=>{
        // res.render('commande/comhistorique')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/comhistorique',ejss);
        }else{
            res.redirect('/login');
        }
    })
    
    router.get('/facture', (req, res)=>{
        res.render('approvisionnement/facture')
    })
    
    router.get('/historiquepayement', (req, res)=>{
        // res.render('commande/historiquepayement')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('commande/historiquepayement',ejss);
        }else{
            res.redirect('/login');
        }
    })
    
    //approvisionnement
    
    router.get('/approfou', (req, res)=>{
        // res.render('approvisionnement/approfou')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('approvisionnement/approfou',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.post('/appro',approfou.approv)
    router.post('/appro/create',approfou.createAppro)
    router.post('/appro/delete',approfou.delPanier)
    router.get('/panier',approfou.panier)
    router.post('/addfournisseur',approfou.addfournisseur)
    router.get('/affichageappro',approfou.affichageappro)
    router.get('/dateappro/:deba/:fille',approfou.datediff)
    router.get('/idappro',approfou.getIdappro)
    router.post('/payevola',approfou.addapprovisionnfinal);
    
    
    router.get('/appropro', (req, res)=>{
        // res.render('approvisionnement/appropro')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('approvisionnement/appropro',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/appropay', (req, res)=>{
        // res.render('approvisionnement/appayement')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('approvisionnement/appayement',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/aprohisto', (req, res)=>{
        // res.render('approvisionnement/aphistorique')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('approvisionnement/aphistorique',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/histopayementfou', (req, res)=>{
        // res.render('approvisionnement/historiquepayement')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('approvisionnement/historiquepayement',ejss);
        }else{
            res.redirect('/login');
        }
    })
    
    // utilisateur
    router.get('/utilisateur', (req, res)=>{
        // res.render('utilisateur/index')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('utilisateur/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/users',user.all)
    router.get('/users/:id',user.get)
    router.post('/users',user.add)
    router.put('/users/:id',user.update)
    router.delete('/users/:id',user.del,(req, res)=>{
        console.log('mandeha ito')
    })
    router.get('/profil', (req, res)=>{
        // res.render('utilisateur/profil')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.lastname = req.session.users.lastname; 
            ejss.contact = req.session.users.contact; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('utilisateur/profil',ejss);
        }else{
            res.redirect('/login');
        }
    })
  
    
    //depense
    router.get('/depense', (req, res)=>{
        // res.render('depense/index')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('depense/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/depenses',depense.all)
    router.get('/depenses/:id',depense.get)
    router.post('/depenses',depense.add)
    router.put('/depenses/:id',depense.update)
    router.delete('/depenses/:id',depense.del)
    router.get('/depensedate/:debut/:fin',depense.datediff)
    
    //journal 
    router.get('/journal', (req, res)=>{
        // res.render('journal/index')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('journal/index',ejss);
        }else{
            res.redirect('/login');
        }
    })
    router.get('/journalpayee', (req, res)=>{
        // res.render('journal/journalpayee')
        if(req.session.users && req.cookies.user_sids){
            ejss.loggedin=true;
            ejss.email = req.session.users.email; 
            ejss.type = req.session.users.type; 
            ejss.title = "You are logged in";
            console.log(req.session)
            res.render('journal/journalpayee',ejss);
        }else{
            res.redirect('/login');
        }
    })
    
    router.get('/authantification', (req, res)=>{
        res.render('authantification/login')
    })
    router.get('/histogramme', (req, res)=>{
        res.render('histogramme/index')
    })
    router.get('/histogrammepaye', (req, res)=>{
        res.render('histogramme/histopaye')
    })
    
    router.get('/excel', (req, res)=>{
        res.render('excel')
    })
    
    router.get('/datable', (req, res)=>{
        res.render('datable')
    })
    
    


module.exports = router;