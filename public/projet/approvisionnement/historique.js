new Vue({
    el:"#histo",
    data:{
        website:'http://localhost:8091/affichageappro/',
        liste:{},
    },
    methods:{

    },
    mounted(){
        axios.get(this.website).then(response=>{this.liste=response.data})
        axios.get(this.website).then(({data})=>{this.liste=data.date})
        axios.get(this.website).then(response=>console.log(response.data))
    }
})