const { Produit } = require('../models/index');
const { Intrants } = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const db =require("../models/index");

const all= async(req, res)=>{

    const client = await Produit.findAll({
        attributes:['id','name','stocks','unite','description','presentation','tva','dateperemption','parpresentation','pugros','pudetail','puvente'],
        include:{
            association:'intrants',
            attributes:['name']
        }
        });
    return res.json(client);

}

const alll = async(req, res)=>{
    var sql=null
    sql="SELECT produits.id,produits.name,produits.stocks,produits.unite,produits.description,produits.presentation,produits.parpresentation,produits.pugros,produits.pudetail,produits.puvente,produits.tva,produits.dateperemption,intrants.name as intrants  from produits,intrants  where intrants.id=produits.idintrant"
     
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
const getStockFaible = async(req,res) => {
    // let p = await Produit.findAll({
    //     where : {
    //         stocks : 
    //     }
    // })
}

const get = async(req, res)=>{
    Produit.findByPk(req.params.id)
          .then(clients=>{
              res.json(clients)
          })
}
const add =async(req,res)=>{
 
        const data={
            name:req.body.name,
            unite:req.body.unite,
            presentation:req.body.presentation,
            parpresentation:req.body.parpresentation,
            pugros:parseInt(req.body.pugros),
            pudetail:parseInt(req.body.pudetail),
            puvente:parseInt(req.body.puvente),
            idintrant:req.body.idintrant,
            tva:parseInt(req.body.tva),
            dateperemption:req.body.dateperemption,
            description:req.body.description

        }
        const clients = await Produit.create(data);
        return res.json(clients)
  
}

const update = async(req, res)=>{
    const data={
          name:req.body.name,
            unite:req.body.unite,
            presentation:req.body.presentation,
            parpresentation:req.body.parpresentation,
            pugros:req.body.pugros,
            pudetail:req.body.pudetail,
            puvente:req.body.puvente,
            idintrant:req.body.idintrant,
            tva:req.body.tva,
            dateperemption:req.body.dateperemption,
            description:req.body.description

            
    }
    const id = req.params.id
    try{
        const clients= Produit.update(data,{where:{id}});
        res.json(clients);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Produit.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}
const recherche = async(req, res)=>{
    const {nom}=req.query
    console.log(nom)
    try{    
        // var sql=null
        sql="SELECT produits.id,produits.name,produits.stocks,produits.unite,produits.description,produits.presentation,produits.parpresentation,produits.pugros,produits.pudetail,produits.puvente,produits.tva,produits.dateperemption,intrants.name as intrants  from produits,intrants  where produits.idintrant=intrants.id  AND intrants.name LIKE '"+nom+"%' OR produits.name LIKE '"+nom+"%' group by id"

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



const produitLanyDaty = async(req,res) => {
    ProduitLanyDatyAndroany = await Produit.findAll({
        where : {dateperemption}
    })
}
const ruptureStock = async (req,res) => {
    let ProduitLany = await Produit.findAll({
        where : {stocks : {[Op.lte] : 0}}
    })
    res.json(ProduitLany);
}
const sound = async(req, res)=>{
    try{
        var sql=null
 
        sql="SELECT produits.id,produits.name,produits.stocks,produits.unite,produits.description,produits.presentation,produits.parpresentation,produits.pugros,produits.pudetail,produits.puvente,produits.tva,produits.dateperemption,intrants.name as intrants  from produits,intrants  where intrants.id=produits.idintrant  and stocks <= 20 order by intrants.name"
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
const affichazy = async(req, res)=>{

    try{
        var sql=null
        sql="SELECT produits.id,produits.name,produits.stocks,produits.unite,produits.description,produits.presentation,produits.parpresentation,produits.pugros,produits.pudetail,produits.puvente,produits.tva,produits.dateperemption,intrants.name as intrant  from produits,intrants  where intrants.id=produits.idintrant order by intrants.name"

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
    all,alll
    ,get,add,update,del,recherche,
    produitLanyDaty,ruptureStock,sound,affichazy    
}