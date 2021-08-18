const express = require('express');
const app = express()
const pdf=require('html-pdf');
const ejs=require('ejs')
app.use(express.json());

app.get('/pdf',(req, res)=>{

    ejs.renderFile("./to.ejs", {name:"mandeh"},(err, html)=>{
        if(err){
            return res.status(500).json({message:'hello'})
        }
        const option={
            format:'A4',
            border:{
                right:'8'
            }
        }
    pdf.create(html, option).toFile('./uploads/kl.pdf',(error, response)=>{
        if(!err){
            res.json({message:'pdf generate'})
        }else{
            res.json({message:'ts mety'})
        }
    })

    })
})

app.get('/download', (req, res)=>{
    res.type('pdf');
    res.download('./uploads/kl.pdf')
})

app.listen(3333, ()=>{
    console.log('mandeha')
})