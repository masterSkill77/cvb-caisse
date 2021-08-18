new Vue({
    el:'#app',
    data:{
        name:'',
        searchQuery: '',
        website:'http://localhost:8091/intrants/',
        search:'http://localhost:8091/intrantrecherch',
        intrasy:'',
        listeIntrant : {},
        nomIntrant : "",
        idSuppression : "",
        intrantEditName : "",
        intrantEdit : "",
        idEdit : "",
        intra:"",
    },
computed:{
    
},
    methods:{
        searchIntrant(){
            if(this.searchQuery){
                axios.get(this.search , {
                    params : {
                        intrasy : this.searchQuery
                    }
                }).then((res) => {
                    this.listeIntrant = res.data
                })
            }
            else{
                axios.get(this.website).then(response => {this.listeIntrant = response.data})                
            }
        },
        addIntrant(){
        axios.post(this.website , {name : this.nomIntrant}).then(() => {
                axios.get(this.website).then(response => {this.listeIntrant = response.data})
            }).catch(erreur=>this.listeIntrant=[{name:"cette intrant deja existee"}])
           
        },
        updateThis(){
          axios.put(this.website + this.idEdit , {name : this.intrantEditName}).then(() => {
              axios.get(this.website).then(response => {this.listeIntrant = response.data})  
            })
          
        },
        displayData(intrant){
            this.intrantEditName = intrant.name;
            this.idEdit = intrant.id
        },
        test(id){
            this.success=false
            this.error=false 
            this.oui=false
            this.non=false
            this.idSuppression = id
        },
        deleteIntrant(){
         

            axios.delete(this.website + this.idSuppression).then(() => {
                axios.get(this.website).then(response => {this.listeIntrant = response.data})  
            })
        },
        intra(){
        axios.get(this.search,{intrasy:this.intrasy}).then(response=>{
            this.listeIntrant=response.data
            console.log( this.listeIntrant=response.data)
        })
        }
    },
    mounted(){
        axios.get(this.website).then(response => {this.listeIntrant = response.data})
    }
})















