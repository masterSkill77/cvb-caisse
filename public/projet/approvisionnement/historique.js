new Vue({
    el:"#histo",
    data:{
        website:'/affichageappro/',
        liste:{},
    },
    methods:{

    },
    mounted(){

        axios.get(this.website).then(({data})=>{this.liste=data.date})

    }
})