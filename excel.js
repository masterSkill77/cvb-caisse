const xlsx = require('xlsx');
const path = require('path')
const xportexcel = (data, workSheetColumnNames, workSheetName, filePath)=>{
    const workBook = xlsx.utils.book_new();
    const workShetData=[
        workSheetColumnNames,
        ...data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workShetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportExcel=(users, workSheetColumnNames, workSheetName, filePath)=>{
    const data = users.map(user=>{
        return [user.id, user.name, user.age];
    });
    xportexcel(data, workSheetColumnNames, workSheetName,filePath)
}

module.exports=exportExcel;