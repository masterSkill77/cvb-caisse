$(document).ready(function(){
  piechart()
})
const piechart=async()=>{
    let date=0;
    let count = 0;
    let dayname='';
   await $.ajax({
        url:'/payementclicompteur',
        type:'GET',
        datatype:'json',
        success:(response)=>{
            if(response !==null){
                const total = response.date.COUNT
               count = parseFloat(((date.COUNT / total) * 100).toFixed(2))
               console.log(response)
            }
        },
        error:(err)=>{
            console.log(err)
        }
    })
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Bilan de la payement du commande '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'data',
            colorByPoint: true,
            data: [{
                name: 'Count',
                y: count,
                selected: true,
                color:"yellow"
            }]
        }]
    });
}