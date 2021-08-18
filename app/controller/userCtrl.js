const { User } = require('../models/index');
const bycript = require("bcryptjs")
const webtoken = require("jsonwebtoken")
require("dotenv").config()
const { Op } = require('sequelize');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');


const all= async(req, res)=>{
try{
    const Users = await User.findAll();
    return res.json(Users);
}catch(error){
    res.status(500).json({error:message.error});
}
}


const get = async(req, res)=>{
    User.findByPk(req.params.id)
          .then(test=>{
              res.json(test)
          })
}
const add =async(req,res)=>{
    try{
        const data={
            username: req.body.username,
            lastname: req.body.lastname,
            password: req.body.password,
            type: req.body.type,
            email: req.body.email,
            contact: req.body.contact,

        }
        const Users = await User.create(data);
        return res.json(Users)
    }catch(error){
     res.status(500).json({error:message.error});
    }
}

const update = async(req, res)=>{
    const data={
        username: req.body.username,
        lastname: req.body.lastname,
        password: req.body.password,
        type: req.body.type,
        email: req.body.email,
        contact: req.body.contact,
    }
    const id = req.params.id
    try{
        const Users= User.update(data,{where:{id}});
        res.json(Users);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await User.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}


module.exports={
    all
    ,get,add,update,del
}