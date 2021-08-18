const { Client } = require('../models/index');
const { Op } = require('sequelize');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const db =require("../models/index");

const all= async(req, res)=>{
try{
    const client = await Client.findAll();
    return res.json(client);
}catch(error){
    res.status(500).json({error:message.error});
}
}


const get = async(req, res)=>{
    Client.findByPk(req.params.id)
          .then(clients=>{
              res.json(clients)
          })
}
const add =async(req,res)=>{

        const data={
            name:req.body.name,
            adress:req.body.adress,
            contact:req.body.contact,
            email:req.body.email

        }
        const clients = await Client.create(data);
        return res.json(clients)

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
        const clients= Client.update(data,{where:{id}});
        res.json(clients);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Client.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}
const recherche = async(req, res)=>{
    const {nom,addr,contacta,mail}=req.query
    console.log(nom,addr,contacta,mail)

        sql="SELECT id,name,adress,contact,email from clients where  name LIKE '"+nom+"%'  OR contact LIKE '"+contacta+"%' OR email LIKE '"+mail+"%'"

  
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
    ,get,add,update,del,recherche
}