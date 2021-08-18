const { Mode } = require('../models/index');

const { Op } = require('sequelize');

const all= async(req, res)=>{
    try{
        const client = await Mode.findAll();
        return res.json(client);
    }catch(error){
        res.status(500).json({error:message.error});
    }
    }

const get = async(req, res)=>{
    Mode.findByPk(req.params.id)
          .then(clients=>{
              res.json(clients)
          })
}
const add =async(req,res)=>{
    const { mode}=req.body
    Mode.findOne({
        attributes:['mode'],
        where:{mode}
    }).then((value)=>{
        if(value==null){
            Mode.create({mode:req.body.mode})
                   .then((value)=>{
                       res.status(201).json({
                           message:"Modes enregistree",
                           status:res.statusCode
                       })
                   }).catch(err=>res.status(404).json({message:"tsy haiko 2"}))
        }else{
            res.status(401).json({message:"Modes deja enregistree", status:res.statusCode})
        }})
}

const update = async(req, res)=>{
    const data={
        mode:req.body.mode,
    }
    const id = req.params.id
    try{
        const clients= Mode.update(data,{where:{id}});
        res.json(clients);
    }catch(error){
     res.status(500).json({error:message.error});

    }
}

const del = async(req, res)=>{
    const id=req.params.id;
try{
    const reg = await Mode.destroy({where:{id}})
    res.json(reg);
}catch(error){
    res.status(500).json({error:message.error})
}    
}


const recherch = async(req, res)=>{
    const {intrasy}=req.query
    try {
        const Mode = await Mode.findAll({
            where:{mode:{[Op.like]:intrasy + '%'}}
        })
        res.json(Mode)
    } catch (error) {
    res.status(500).json({error:message.error})
        
    }
     
}

module.exports={
    all
    ,get,add,update,del,recherch
}
