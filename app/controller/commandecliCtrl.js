const {
    Commandecli
} = require('../models/index');
const {
    Client
} = require('../models/index');
const {
    Produit
} = require('../models/index');
const {
    Listecomm
} = require('../models/index');
const {
    Payementcli
} = require('../models/index');
const db =require("../models/index");


const { Op } = require('sequelize');
const sequelize = require("sequelize");

var commandeClientList = [];
var commandeIdLast = 0;
// commande client
const addCommande = async (req, res) => {
    if (commandeClientList.length == 0) {
        commandeClientList.push(req.body.data)
    } else {
        pushed = false;
<<<<<<< HEAD
        
=======
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f
        for (let intrant in commandeClientList) {
            if (commandeClientList[intrant].produits.id == req.body.data.produits.id) {
                if (req.body.data.condition == commandeClientList[intrant].condition) {
                    commandeClientList[intrant].qt += parseFloat(req.body.data.qt);
                    pushed = true
                    break;
                } else {
                    pushed = false
                    continue;
                }
            }

        }
        if (pushed == false) {
            commandeClientList.push(req.body.data);
            // break;

        }
    }
    res.json(commandeClientList);
}

const getListPanier = async (req, res) => {
    res.json(commandeClientList)
}

const createcommande = async (req, res, next) => {
    try {
        var {
            client,
            modelist,
            datecom,
            produits,
            remise
        } = req.body.data;
        const commande = await Commandecli.create({
            datecom: datecom,
            idcli: client,
            idmode:modelist
        });

        for (let i in produits) {
            await Listecomm.create({
                qt: produits[i].qt,
                condition: produits[i].condition,
                idcomm: commande.id,
                idpro: produits[i].produits.id
            });
            let qty = (produits[i].condition == 1) ? (produits[i].produits.parpresentation * produits[i].qt) : (produits[i].qt)
            await Produit.increment({
                stocks: -parseFloat(qty)
            }, {
                where: {
                    id: produits[i].produits.id
                }
            })
        }
        commandeIdLast = {id : commande.id, remise}
        // commandeClientList = [];
        res.json({
            succees: true
        })
    }
    catch(e){
        throw e
    }
}

const createcommandetsyfact = async (req, res, next) => {
    try {
        var {
            client,
            modelist,
            datecom,
            produits,
            remise
        } = req.body.data;
        const commande = await Commandecli.create({
            datecom: datecom,
            idcli: client,
            idmode:modelist
        });

        for (let i in produits) {
            await Listecomm.create({
                qt: produits[i].qt,
                condition: produits[i].condition,
                idcomm: commande.id,
                idpro: produits[i].produits.id
            });
            let qty = (produits[i].condition == 1) ? (produits[i].produits.parpresentation * produits[i].qt) : (produits[i].qt)
            await Produit.increment({
                stocks: -parseFloat(qty)
            }, {
                where: {
                    id: produits[i].produits.id
                }
            })
        }
        commandeIdLast = {id : commande.id, remise}
        commandeClientList = [];
        res.json({
            succees: true
        })
    }
    catch(e){
        throw e
    }
}
const getIdCommande= async (req,res)=>{
    res.json(commandeIdLast)
}

const affichagecommande = async (req, res) => {
    // const commandeclient = await Listecomm.findAll({
    //     attributes: ['qt', 'condition'],
    //     include: [{
    //             association: "commmande",
    //             as: "commmande",
    //             include: [{
    //                 association: "clients",
    //                 as: "clients"
    //             }]
    //         },
    //         {
    //             association: "produits",
    //             as: "produits",
    //             include: [{
    //                 association: "intrants",
    //                 as: "intrants"
    //             }]
    //         }
    //     ]
    // });
    // return res.json(commandeclient);
    var sql=null
 
    sql=" SELECT commandeclis.id,modes.mode,listecomms.qt,listecomms.condition, clients.name as cli,commandeclis.datecom,produits.name,produits.pugros,produits.unite,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants,modes where  clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id order by id DESC "

try{
   db.sequelize.query(
       sql,
        { type: sequelize.QueryTypes.SELECT}
        )
   .then((date) => {
       return res.status(200).json({date})
   }) 
}
catch (error) {
   console.log(error.message);
   return res.status(500).json({error:error.message})
}
}


const datediff = async(req, res)=>{
    const {deb , fi}=req.params
    console.log(deb,fi)
    var sql=null
    if(deb==undefined && fi!==undefined){
         sql=" SELECT commandeclis.id,modes.mode,listecomms.qt,listecomms.condition, clients.name as cli,commandeclis.datecom,produits.name,produits.pugros,produits.unite,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants,modes where  clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id AND commandeclis.datecom BETWEEN '"+deb+"' AND '"+fi+"'"
    }else{
        sql=" SELECT commandeclis.id,modes.mode,listecomms.qt,listecomms.condition, clients.name as cli,commandeclis.datecom,produits.name,produits.pugros,produits.unite,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants,modes where  clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id AND commandeclis.datecom BETWEEN '"+deb+"' AND '"+fi+"'"    
    }
    try{
        db.sequelize.query(
            sql,
             { type: sequelize.QueryTypes.SELECT}
             )
        .then((date) => {
            return res.status(200).json({date})
        }) 
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
    }

    
}

<<<<<<< HEAD
=======
const final = async(req, res)=>{
    const {deb , fi}=req.params
    console.log(deb,fi)
    var sql=null
    if(deb==undefined && fi!==undefined){
         sql=" SELECT commandeclis.id,modes.mode,listecomms.qt,listecomms.condition, clients.name as cli,commandeclis.datecom,produits.name,produits.pugros,produits.unite,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants,modes where  clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id AND commandeclis.datecom BETWEEN '"+deb+"' AND '"+fi+"'"
    }else{
        sql=" SELECT commandeclis.id,modes.mode,listecomms.qt,listecomms.condition, clients.name as cli,commandeclis.datecom,produits.name,produits.pugros,produits.unite,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants,modes where  clients.id=commandeclis.idcli AND modes.id=commandeclis.idmode AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id AND commandeclis.datecom BETWEEN '"+deb+"' AND '"+fi+"'"    
    }
    try{
        db.sequelize.query(
            sql,
             { type: sequelize.QueryTypes.SELECT}
             )
        .then((date) => {
            return res.status(200).json({date})
        }) 
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
    }

    
}

>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f


const pay = async(req, res)=>{
    const {id}=req.params
    console.log(id)
    var sql=null
    if(id==undefined ){
         sql="SELECT clients.name,listecomms.qt,commandeclis.datecom,produits.name,produits.pugros,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants where  clients.id=commandeclis.idcli AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id AND commandeclis.id ='"+id+"'"
    }else{
        sql="SELECT clients.name,listecomms.qt,commandeclis.datecom,produits.name,produits.pugros,produits.pudetail,intrants.name as category FROM listecomms, clients,commandeclis,produits,intrants where  clients.id=commandeclis.idcli AND listecomms.idcomm=commandeclis.id AND produits.id= listecomms.idpro AND produits.idintrant = intrants.id AND commandeclis.id ='"+id+"'"  
    }
    try{
        db.sequelize.query(
            sql,
             { type: sequelize.QueryTypes.SELECT}
             )
        .then((date) => {
            return res.status(200).json({date})
        }) 
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message})
    }

    
}


const historique=async(req, res)=>{
    const histo = await Listecomm.findAll({
        attributes:['id','qt','condition','idcomm'],
        order:[
            ['id','DESC']
        ],
        include:[
            {
                association:'commmande',
                as:'commmande',
                include:[
                    {
                        association:'clients',
                        as:'clients'
                    },
                    {
                        association:'modes',
                        as:'modes',
                        attributes:['mode']
                    }
                ]
            },
            {
                association:'produits',
                as:'produits',
                include:[{
                    association:'intrants',
                    as:'intrants'
                }]
            }
        ]
    })
    res.json(histo)
 
  

}
const delPanier = async(req,res) => {
    let {list} = req.body;
    for(i in commandeClientList){
        if(list.produits.id == commandeClientList[i].produits.id && list.condition == commandeClientList[i].condition)
        {
            commandeClientList.splice(i,1);
            break;
        }
        else{
            continue;
        }
    }
    res.json(commandeClientList)
}


const addpayement =async(req,res)=>{

        const data={
            payee:req.body.payee,
            datepayement:req.body.datepayement,
            dateEcheance:req.body.dateEcheance,
            net:req.body.net,
            idcommande:req.body.idcommande,
            remise : req.body.remise
        }
        const Payementclis = await Payementcli.create(data);
<<<<<<< HEAD
        // commandeClientList = [];
=======
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f
        commandeClientList = [];

        return res.json(Payementclis)
     
}

module.exports = {
    createcommande,
    affichagecommande,
    addCommande,
    getListPanier,
    datediff,
    historique,
    delPanier,
    pay,
    addpayement,
    getIdCommande,
<<<<<<< HEAD
    createcommandetsyfact
=======
    createcommandetsyfact,
    final
>>>>>>> eccf7f83a45d33782a0e1058b3e9aa5ecd765d9f
}
