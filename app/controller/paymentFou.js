
const {
    Payementfou
} = require('../models/index');
const db =require("../models/index");


const { Op } = require('sequelize');
const sequelize = require("sequelize");

const all= async(req, res)=>{

    const Payementfous = await Payementfou.findAll({
        attributes:['id','payee','datepayement','dateEcheance','net','idprovision'],
        group:[
            'idprovision'
        ],
        order:[
            ["id","DESC"]
        ],
        include:[
            {
                association:'approvision',
                as:'approvision',
                include:[
                    {
                        association:'produit',
                        as:'produit',
                        include:[
                            {
                                association:'intrants',
                                as:'intrants',
                            }
                        ]
                    },{
                        association:'appro',
                        as:'appro',
                        include:[
                            {
                                association:'approfo',
                                as:'approfo'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    return res.json(Payementfous);

}


const get = async(req, res)=>{
    Payementfou.findByPk(req.params.id)
          .then(Payementfous=>{
              res.json(Payementfous)
          })
}
const add =async(req,res)=>{
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

const update = async(req, res)=>{
    const data={
        payee:req.body.payee,
        datepayement:req.body.datepayement,
        dateEcheance:req.body.dateEcheance,
        net:req.body.net,
        idprovision:req.body.idprovision
    }
    const id = req.params.id
    try{
        const Payementfous= Payementfou.update(data,{where:{id}});
        res.json(Payementfous);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Payementfou.destroy({where:{id}})
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
    sql="SELECT DISTINCT payementfous.id,payementfous.payee,payementfous.net,payementfous.idprovision as liste,fournisseurs.name as fourniseur,approfous.dateappro,approfous.id as numfact ,produits.name as nom_produit,produits.puvente,listeappros.condition,listeappros.qt FROM fournisseurs,approfous,produits,payementfous,listeappros WHERE listeappros.id=payementfous.idprovision AND fournisseurs.id=approfous.idfou AND approfous.id=listeappros.idappro and produits.id=listeappros.idpro AND payementfous.id='"+id+"'"
    }else{
    sql="SELECT DISTINCT payementfous.id,payementfous.payee,payementfous.net,payementfous.idprovision as liste,fournisseurs.name as fourniseur,approfous.dateappro,approfous.id as numfact ,produits.name as nom_produit,produits.puvente,listeappros.condition,listeappros.qt FROM fournisseurs,approfous,produits,payementfous,listeappros WHERE listeappros.id=payementfous.idprovision AND fournisseurs.id=approfous.idfou AND approfous.id=listeappros.idappro and produits.id=listeappros.idpro AND payementfous.id='"+id+"'"

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
    const {debi , fii}=req.params
    console.log(debi,fii)
    var sql=null
    if(debi==undefined && fii!==undefined){
        sql="SELECT DISTINCT payementfous.date_echeance,payementfous.id,payementfous.payee,payementfous.datepayement,payementfous.net,payementfous.idprovision as liste,fournisseurs.name as fourniseur,approfous.dateappro,approfous.id as numfact ,produits.name as nom_produit,produits.puvente,listeappros.condition,listeappros.qt FROM fournisseurs,approfous,produits,payementfous,listeappros WHERE listeappros.id=payementfous.idprovision AND fournisseurs.id=approfous.idfou AND approfous.id=listeappros.idappro and produits.id=listeappros.idpro AND payementfous.datepayement BETWEEN '"+debi+"' AND  '"+fii+"'"   
    }else{
        sql="SELECT DISTINCT payementfous.date_echeance,payementfous.id,payementfous.payee,payementfous.datepayement,payementfous.net,payementfous.idprovision as liste,fournisseurs.name as fourniseur,approfous.dateappro,approfous.id as numfact ,produits.name as nom_produit,produits.puvente,listeappros.condition,listeappros.qt FROM fournisseurs,approfous,produits,payementfous,listeappros WHERE listeappros.id=payementfous.idprovision AND fournisseurs.id=approfous.idfou AND approfous.id=listeappros.idappro and produits.id=listeappros.idpro AND payementfous.datepayement BETWEEN '"+debi+"' AND  '"+fii+"'"   
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
    const {debi , fii}=req.params
    console.log(debi,fii)
    var sql=null
    if(debi==undefined && fii!==undefined){
        sql="SELECT MONTHNAME(datepayement) as month , SUM(payee) as commande from payementfous WHERE (datepayement) BETWEEN '"+debi+"' AND '"+fii+"' GROUP BY MONTHNAME(datepayement)"   
    }else{
        sql="SELECT MONTHNAME(datepayement) as month , SUM(payee) as commande from payementfous WHERE (datepayement) BETWEEN '"+debi+"' AND '"+fii+"' GROUP BY MONTHNAME(datepayement)"    
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
    const {id}=req.params
    console.log(id)
    var sql=null
    if(id==undefined ){
        sql="SELECT count(payementfous.id) AS COUNT ,DAYNAME(datepayement) AS dayname FROM payementfous GROUP BY DAYNAME(datepayement)"
    }else{
        sql="SELECT count(payementfous.id) AS COUNT ,DAYNAME(datepayement) AS dayname FROM payementfous GROUP BY DAYNAME(datepayement)"
  
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
module.exports={
    all,add,update,get,del,facture,datediff,
    chart,compteur
    // ,get,add,update,del
}