// import axios from "axios";

let ctx = document.getElementById('chart').getContext('2d');

let chart = new Chart(ctx,{
    type:'bar',
    // line,horizontalBar,pie,bar
    data:{
        labels:["January","February","March","April","May","June","July","August","Septembre","Octobre","Novembre","Decembre"],
        datasets:[{
            labels:"my first data",
            backgroundColor:[
                'rgb(169,99, 132)',
                'rgb(41,128, 185,0.8)',
                'rgb(50,200, 94,0.8)',
                'rgb(44,62, 80,0.8)',
                'rgb(149,165, 166,0.8)',
                'rgb(127,140, 141,0.8)',
                'rgb(48,99, 132)',
                'rgb(12,99, 128,0.9)',
                'rgb(180,200, 132)',
                'rgb(70,10, 132)',
                'rgb(255,99, 132)',
            ],
            borderColor:'rgb(255,99,132)',
            data:[10,10,5,15,20,50,60,100,90,3,30,90],
        }]
    },
    options:{}
})

let ctxe = document.getElementById('charte').getContext('2d');
let charte = new Chart(ctxe,{
    type:'line',
    // line,horizontalBar,pie,bar
    data:{
        labels:["January","February","March","April","May","June","July","August","Septembre","Octobre","Novembre","Decembre"],
        datasets:[{
            labels:"my first data",
            backgroundColor:[
                'rgb(169,99, 132)',
                'rgb(41,128, 185,0.8)',
                'rgb(50,200, 94,0.8)',
                'rgb(44,62, 80,0.8)',
                'rgb(149,165, 166,0.8)',
                'rgb(127,140, 141,0.8)',
                'rgb(48,99, 132)',
                'rgb(12,99, 128,0.9)',
                'rgb(180,200, 132)',
                'rgb(70,10, 132)',
                'rgb(255,99, 132)',
            ],
            borderColor:'rgb(255,99,132)',
            data:[10,10,5,15,20,50,60,100,90,3,30,90],
        }]
    },
    options:{}
})


axios.get('http://localhost:8091/depenses/').then(({data})=>{
let d = [] 
   
for(i in data){
        d.push((data[i]).montant)
    // console.log(d)
}
    let ctxes = document.getElementById('chartes').getContext('2d');
let chartes = new Chart(ctxes,{
    type:'pie',
    // line,horizontalBar,pie,bar
    data:{
        labels:["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],
        datasets:[{
            labels:"my first data",
            backgroundColor:[
                'rgb(169,99, 132)',
                'rgb(41,128, 185,0.8)',
                'rgb(50,200, 94,0.8)',
                'rgb(44,62, 80,0.8)',
                'rgb(149,165, 166,0.8)',
                'rgb(127,140, 141,0.8)',
                'rgb(48,99, 132)'
            ],
            borderColor:'rgb(255,99,132)',
            data:d,
        }]
    },
    options:{}
})

})