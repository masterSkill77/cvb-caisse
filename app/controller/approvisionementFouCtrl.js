const { Approfou } = require('../models/index');
const { Listeappro } = require('../models/index');
const { Produit } = require('../models/index');
const { Fournisseur } = require('../models/index');
const { Payementfou } = require('../models/index');
const db =require("../models/index");

const { Op } = require('sequelize');
const sequelize = require("sequelize");
var approfoulist=[];
var lastidappro=0
const delPanier = async(req,res) => {
    let {appro} = req.body;
    // console.log(appro.produit.id == approfoulist[0].produit.id);
    // console.log(appro.condition == approfoulist[0].condition);
    for(i in approfoulist){
        if(appro.produit.id == approfoulist[i].produit.id && appro.condition == approfoulist[i].condition)
        {
            approfoulist.splice(i,1);
            break;
        }
        else{
            continue;
        }
    }
    res.json(approfoulist)
}


const createAppro = async (req, res, next) => {
    try {
        var {
            fournisseur,
            dateappro,
        
        } = req.body.data;
        const commande = await Approfou.create({
            dateappro: dateappro,
            idfou: fournisseur
        });

        for (let i in approfoulist) {
            await Listeappro.create({
                qt: approfoulist[i].qt,
                condition: approfoulist[i].condition,
                idappro: commande.id,
                idpro: approfoulist[i].produit.id
            });
            let qty = (approfoulist[i].condition == 1) ? (parseInt(approfoulist[i].produit.parpresentation) * approfoulist[i].qt) : (approfoulist[i].qt)
            await Produit.increment({
                stocks: +parseFloat(qty)
            }, {
                where: {
                    id: approfoulist[i].produit.id
                }
            })
        }
        lastidappro={id:commande.id}
        // approfoulist = [];
        res.json(approfoulist)
    }
    catch(e){
        throw e
    }
}
const getIdappro=async(req, res)=>{
    res.json(lastidappro)
}

const approv=async(req, res)=>{
    if(approfoulist.length == 0){
        approfoulist.push(req.body.data)
    }else{
        pushed=false;
        for(let intrant in approfoulist){
            if(approfoulist[intrant].produit.id== req.body.data.produit.id){
                if(req.body.data.condition == approfoulist[intrant].condition){
                    approfoulist[intrant].qt += parseFloat(req.body.data.qt)
                    pushed=true
                    break;
                }else{
                    pushed=false
                    continue;
                }
            }
        }
        if(pushed==false){
            approfoulist.push(req.body.data)
        }
    }
    res.json(approfoulist)
}
const addfournisseur=async(req, res)=>{
    // try {
    //     var {fournisseur, dateappro, produit} = req.body.data;
    //     const commande = await Approfou.create({
    //         idfou:fournisseur,
    //         dateappro:dateappro
    //     });
    //     for(let i in produit){
    //         await Listeappro.create({
    //             qt:produit[i].qt,
    //             condition:produit[i].condition,
    //             idappro:commande.id,
    //             idpro:produit[i].produit.id
    //         });
    //         let qte = (produit[i].condition == 1) ? (produit[i].produit.parpresentation * produit[i].qt) : (produit[i].qt)
    //         await Produit.increment({
    //             stocks: + parseFloat(qte)
    //         },{
    //             where:{
    //                 id: produit[i].produit.id
    //             }
    //         })
    //     }
    //     // approfoulist = [];
    //     res.json({
    //         success: true
    //     })

    // } catch (error) {
    //     throw error
    // }
}
const panier=async(req, res)=>{
    res.json(approfoulist)
 }
const affichageappro = async (req, res) => {
    // const approfournisseur = await Listeappro.findAll({
    //     attributes: ['qt','id', 'condition'],
    //     order: [
    //         ['id', 'DESC']
    //     ],
    //     include: [{
    //             association: "appro",
    //             as: "appro",
    //              include: [{
    //                 association: "approfo",
    //                 as: "approfo"
    //             }]
    //         },
    //         {
    //             association: "produit",
    //             as: "produit",
    //             include: [{
    //                 association: "intrants",
    //                 as: "intrants"
    //             }]
    //         }
    //     ]
    // });
    // return res.json(approfournisseur);
  
    var sql=null
   
        sql=" SELECT approfous.id,listeappros.qt,listeappros.condition, fournisseurs.name as fou,approfous.dateappro,produits.name,produits.puvente,produits.unite,intrants.name as category FROM listeappros, fournisseurs,approfous,produits,intrants where  fournisseurs.id=approfous.idfou AND listeappros.idappro=approfous.id AND produits.id= listeappros.idpro AND produits.idintrant = intrants.id"
     
  
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
    const {deba , fille}=req.params
    console.log(deba,fille)
    var sql=null
    if(deba==undefined && fille!==undefined){
    
        sql=" SELECT approfous.id,listeappros.qt,listeappros.condition, fournisseurs.name as fou,approfous.dateappro,produits.name,produits.puvente,produits.unite,intrants.name as category FROM listeappros, fournisseurs,approfous,produits,intrants where  fournisseurs.id=approfous.idfou AND listeappros.idappro=approfous.id AND produits.id= listeappros.idpro AND produits.idintrant = intrants.id AND approfous.dateappro BETWEEN '"+deba+"' AND '"+fille+"'"
     
    }else{
        //  sql="SELECT fournisseurs.name,listeappros.qt,approfous.dateappro,produits.name,produits.puvente,intrants.name FROM listeappros, fournisseurs,approfous,produits,intrants where listeappros.id=approfous.id AND produits.id= listeappros.id AND approfous.dateappro BETWEEN "+deba+" AND "+fille+""
        sql=" SELECT approfous.id,listeappros.qt,listeappros.condition, fournisseurs.name as fou,approfous.dateappro,produits.name,produits.puvente,produits.unite,intrants.name as category FROM listeappros, fournisseurs,approfous,produits,intrants where  fournisseurs.id=approfous.idfou AND listeappros.idappro=approfous.id AND produits.id= listeappros.idpro AND produits.idintrant = intrants.id AND approfous.dateappro BETWEEN '"+deba+"' AND '"+fille+"'"

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
const addapprovisionnfinal =async(req,res)=>{
  
    try{
        const data={
            payee:req.body.payee,
            datepayement:req.body.datepayement,
            dateEcheance:req.body.dateEcheance,
            net:req.body.net,
            idprovision:req.body.idprovision

        }
        const Payementfous = await Payementfou.create(data);
        return res.json(Payementfous)
    }catch(error){
     res.status(500).json({error:message.error});
    }
}

module.exports={
   approv,panier,addfournisseur,delPanier,createAppro,affichageappro,datediff,
   addapprovisionnfinal,getIdappro 
}