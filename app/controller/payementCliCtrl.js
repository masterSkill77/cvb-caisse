
const {
    Payementcli
} = require('../models/index');
const { Commandecli } = require('../models/index');
const db =require("../models/index");


const { Op } = require('sequelize');
const sequelize = require("sequelize");


const all= async(req, res)=>{
    var sql=null
        sql="SELECT payementclis.id, payee,datepayement,date_echeance,net,idcommande as numfact,net,clients.name as clien from commandeclis, clients, payementclis,listecomms where commandeclis.idcli= clients.id AND commandeclis.id=listecomms.idcomm AND listecomms.idcomm=payementclis.idcommande GROUP BY numfact ORDER BY id DESC"
  
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



// const get = async(req, res)=>{
//     Payementcli.findByPk(req.params.id)
//           .then(Payementclis=>{
//               res.json(Payementclis)
//           })
// }
const get = async(req, res)=>{
    const {id}=req.params
   
    var sql=null

         sql="SELECT listecomms.id,qt,idcomm,idpro,payementclis.id from payementclis,listecomms WHERE payementclis.id = '"+id+"' AND  idcomm=(SELECT idcomm from listecomms WHERE id=(SELECT idcommande FROM payementclis,clients,listecomms,commandeclis,produits,intrants  WHERE listecomms.id=payementclis.idcommande and produits.id=listecomms.idpro and intrants.id=produits.idintrant and clients.id=commandeclis.idcli and commandeclis.id=listecomms.idcomm AND payementclis.id = '"+id+"'))"
  
        //  SELECT * from listecomms WHERE idcomm=(SELECT idcomm from listecomms WHERE id=(SELECT idcommande FROM payementclis,clients,listecomms,commandeclis,produits,intrants  WHERE listecomms.id=payementclis.idcommande and produits.id=listecomms.idpro and intrants.id=produits.idintrant and clients.id=commandeclis.idcli and commandeclis.id=listecomms.idcomm and payementclis.id = '4' and listecomms.idcomm ORDER BY listecomms.idcomm DESC))
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
const add =async(req,res)=>{
    try{
        const data={
            payee:req.body.payee,
            datepayement:req.body.datepayement,
            dateEcheance:req.body.dateEcheance,
            net:req.body.net,
            idcommande:req.body.idcommande,
            remise : req.body.remise
        }
        const Payementclis = await Payementcli.create(data);
        return res.json(Payementclis)
    }catch(error){
     res.status(500).json({error:message.error});
    }
}

// const update = async(req, res)=>{
//     const data={
//         payee:req.body.payee,
//         datepayement:req.body.datepayement,
//         date_echeance:req.body.date_echeance,
//         net:req.body.net,
//         idcommande:req.body.idcommande
//     }
//     const id = req.params.id
//     try{
//         const Payementclis= Payementcli.update(data,{where:{id}});
//         res.json(Payementclis);
//     }catch(error){
//      res.status(500).json({error:message.error});

//     }
// }
const update = async(req, res)=>{
    const data={
        payee:req.body.payee,
        datepayement:req.body.datepayement,
        dateEcheance:req.body.dateEcheance,
        net:req.body.net,
        idcommande:req.body.idcommande
    }
    const id = req.params.id
    try{
        const Payementclis= Payementcli.update(data,{where:{id}});
        res.json(Payementclis);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Payementcli.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}


const facture = async(req, res)=>{
    const {id}=req.params
    console.log(id)
    var sql=null
    if(id==undefined ){
        // sql="SELECT payementclis.id,payementclis.payee,payementclis.net,payementclis.idcommande as liste,clients.name as client,commandeclis.datecom,commandeclis.id as numfact ,produits.name as nom_produit,produits.pudetail,produits.pugros,listecomms.condition,listecomms.qt FROM clients,commandeclis,produits,payementclis,listecomms WHERE listecomms.id=payementclis.idcommande AND clients.id=commandeclis.idcli AND commandeclis.id=listecomms.idcomm and produits.id=listecomms.idpro AND payementclis.id='"+id+"'"
        sql="SELECT produits.name as nomproduit,modes.mode, clients.adress,commandeclis.datecom, listecomms.qt,listecomms.condition,payementclis.remise ,payementclis.id, payee,datepayement,date_echeance,idcommande as numfact,net,clients.name as clien from produits, commandeclis, clients, payementclis,listecomms,modes where commandeclis.idcli= clients.id AND commandeclis.id=listecomms.idcomm  AND produits.id=listecomms.idpro AND listecomms.idcomm=payementclis.idcommande AND payementclis.id='"+id+"' GROUP BY numfact "
    }else{
        sql="SELECT produits.name as nomproduit,modes.mode, clients.adress,commandeclis.datecom, listecomms.qt,listecomms.condition,payementclis.remise ,payementclis.id, payee,datepayement,date_echeance,idcommande as numfact,net,clients.name as clien from produits, commandeclis, clients, payementclis,listecomms,modes where commandeclis.idcli= clients.id AND commandeclis.idmode=modes.id AND commandeclis.id=listecomms.idcomm  AND produits.id=listecomms.idpro AND listecomms.idcomm=payementclis.idcommande AND payementclis.id='"+id+"' GROUP BY numfact "
  
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

const datediff = async(req, res)=>{
    const {deb , fi}=req.params
    console.log(deb,fi)
    var sql=null
    if(deb==undefined && fi!==undefined){
        // sql="SELECT payementclis.date_echeance payementclis.id,payementclis.payee,payementclis.net,payementclis.datepayement,payementclis.idcommande as liste,clients.name as client,commandeclis.datecom,commandeclis.id as numfact ,produits.name as nom_produit,produits.pudetail,produits.pugros,listecomms.condition,listecomms.qt FROM clients,commandeclis,produits,payementclis,listecomms WHERE listecomms.id=payementclis.idcommande AND clients.id=commandeclis.idcli AND commandeclis.id=listecomms.idcomm and produits.id=listecomms.idpro AND payementclis.datepayement BETWEEN '"+deb+"' and '"+fi+"' "   
        sql="SELECT payementclis.date_echeance,payementclis.id,payementclis.payee,payementclis.net ,payementclis.datepayement,payementclis.idcommande as liste,clients.name as client,commandeclis.datecom,commandeclis.id as numfact ,produits.name as nom_produit,produits.pudetail,produits.pugros,listecomms.condition,listecomms.qt from produits, commandeclis, clients, payementclis,listecomms,modes where commandeclis.idcli= clients.id AND commandeclis.idmode=modes.id AND commandeclis.id=listecomms.idcomm  AND produits.id=listecomms.idpro AND listecomms.idcomm=payementclis.idcommande AND  payementclis.datepayement BETWEEN '"+deb+"' and '"+fi+"' "
    
    }else{
        // sql="SELECT payementclis.date_echeance,payementclis.id,payementclis.payee,payementclis.net ,payementclis.datepayement,payementclis.idcommande as liste,clients.name as client,commandeclis.datecom,commandeclis.id as numfact ,produits.name as nom_produit,produits.pudetail,produits.pugros,listecomms.condition,listecomms.qt FROM clients,commandeclis,produits,payementclis,listecomms WHERE listecomms.id=payementclis.idcommande AND clients.id=commandeclis.idcli AND commandeclis.id=listecomms.idcomm and produits.id=listecomms.idpro AND payementclis.datepayement BETWEEN '"+deb+"' and '"+fi+"'"    
        sql="SELECT payementclis.date_echeance,payementclis.id,payementclis.payee,payementclis.net ,payementclis.datepayement,payementclis.idcommande as liste,clients.name as client,commandeclis.datecom,commandeclis.id as numfact ,produits.name as nom_produit,produits.pudetail,produits.pugros,listecomms.condition,listecomms.qt from produits, commandeclis, clients, payementclis,listecomms,modes where commandeclis.idcli= clients.id AND commandeclis.idmode=modes.id AND commandeclis.id=listecomms.idcomm  AND produits.id=listecomms.idpro AND listecomms.idcomm=payementclis.idcommande AND  payementclis.datepayement BETWEEN '"+deb+"' and '"+fi+"' "
  
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
const chart = async(req, res)=>{
    const {deb , fi}=req.params
    console.log(deb,fi)
    var sql=null
    if(deb==undefined && fi!==undefined){
        sql="SELECT MONTHNAME(datepayement) as month , SUM(payee) as commande from payementclis WHERE (datepayement) BETWEEN '"+deb+"' AND '"+fi+"' GROUP BY MONTHNAME(datepayement)"   
    }else{
        sql="SELECT MONTHNAME(datepayement) as month , SUM(payee) as commande from payementclis WHERE (datepayement) BETWEEN '"+deb+"' AND '"+fi+"' GROUP BY MONTHNAME(datepayement)"    
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
const compteur = async(req, res)=>{
        sql="SELECT SUM(payee) AS COUNT ,DAYNAME(datepayement) AS dayname FROM payementclis GROUP BY DAYNAME(datepayement)"
  
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

const reste = async(req, res)=>{
    sql="SELECT modes.mode, payementclis.date_echeance,payementclis.id,payementclis.payee,payementclis.net ,payementclis.datepayement,payementclis.idcommande as liste,clients.name as client,commandeclis.datecom,commandeclis.id as numfact ,produits.name as nom_produit,produits.pudetail,produits.pugros,listecomms.condition,listecomms.qt from produits, commandeclis, clients, payementclis,listecomms,modes where commandeclis.idcli= clients.id AND commandeclis.idmode= modes.id AND commandeclis.idmode=modes.id AND commandeclis.id=listecomms.idcomm  AND produits.id=listecomms.idpro AND listecomms.idcomm=payementclis.idcommande AND net!=payee"

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
module.exports={
    all,add,update,get,del,facture,datediff,
    chart,compteur,reste
    // ,get,add,update,del
}