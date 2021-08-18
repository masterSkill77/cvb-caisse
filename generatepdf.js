const PDFdocument  = require('pdfkit');
const fs = require('fs');

const generatePdf=({
filename="out.pdf",
data=[]
})=>{
    const doc = new PDFdocument();
    doc.pipe(fs.createWriteStream('sound.pdf'));

    data.forEach((data)=>{
        console.log('data',data)
    })
    doc.end();

};


module.exports=generatePdf