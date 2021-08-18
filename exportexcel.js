const exportExcel = require('./excel');

const users=[{
    id:1,
    name:'oskar',
    age:89
},
{
    id:2,
    name:'ojdkdd',
    age:78
}]

const workSheetColumnName=[
    "ID","NAME","AGE"
]

const workSheetName = "users";
const filePath = './outputfile/excel.xlsx';

exportExcel(users,workSheetColumnName, workSheetName,filePath)