const { Fournisseur } = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const db =require("../models/index");

const all= async(req, res)=>{
try{
    const fournisseurs = await Fournisseur.findAll();
    return res.json(fournisseurs);
}catch(error){
    res.status(500).json({error:message.error});
}
}


const get = async(req, res)=>{
    Fournisseur.findByPk(req.params.id)
          .then(test=>{
              res.json(test)
          })
}
const add =async(req,res)=>{
    try{
        const data={
            name:req.body.name,
            adress:req.body.adress,
            contact:req.body.contact,
            email:req.body.email

        }
        const fournisseurs = await Fournisseur.create(data);
        return res.json(fournisseurs)
    }catch(error){
     res.status(500).json({error:message.error});
    }
}

const update = async(req, res)=>{
    const data={
        name:req.body.name,
        adress:req.body.adress,
        contact:req.body.contact,
        email:req.body.email
    }
    const id = req.params.id
    try{
        const fournisseurs= Fournisseur.update(data,{where:{id}});
        res.json(fournisseurs);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Fournisseur.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}
const recherch = async(req, res)=>{
    const {nom,addr,contacta,mail}=req.query
    console.log(nom,addr,contacta,mail)

        sql="SELECT id,name,adress,contact,email from fournisseurs where adress LIKE '"+addr+"%' OR name LIKE '"+nom+"%'  OR contact LIKE '"+contacta+"%' OR email LIKE '"+mail+"%'"

  
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
    all
    ,get,add,update,del,recherch
}