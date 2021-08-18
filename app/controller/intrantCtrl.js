const { Intrant } = require('../models/index');
const db =require("../models/index");
const pdf=require('html-pdf');
const ejs = require('ejs');

const { Op } = require('sequelize');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const all= async(req, res)=>{
    try{
        const client = await Intrant.findAll();
        return res.json(client);
    }catch(error){
        res.status(500).json({error:message.error});
    }
    }

const get = async(req, res)=>{
    Intrant.findByPk(req.params.id)
          .then(clients=>{
              res.json(clients)
          })
}
const add =async(req,res)=>{
    const { name}=req.body
    Intrant.findOne({
        attributes:['name'],
        where:{name}
    }).then((value)=>{
        if(value==null){
            Intrant.create({name:req.body.name})
                   .then((value)=>{
                       res.status(201).json({
                           message:"intrants enregistree",
                           status:res.statusCode
                       })
                   }).catch(err=>res.status(404).json({message:"tsy haiko 2"}))
        }else{
            res.status(401).json({message:"INtrants deja enregistree", status:res.statusCode})
        }})
}

const update = async(req, res)=>{
    const data={
        name:req.body.name,
    }
    const id = req.params.id
    try{
        const clients= Intrant.update(data,{where:{id}});
        res.json(clients);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Intrant.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}


const recherch = async(req, res)=>{
    const {intrasy}=req.query
    try {
        const intrant = await Intrant.findAll({
            where:{name:{[Op.like]:intrasy + '%'}}
        })
        res.json(intrant)
    } catch (error) {
    res.status(500).json({error:message.error})
        
    }
     
}

module.exports={
    all
    ,get,add,update,del,recherch
}
