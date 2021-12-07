new Vue({
    el:'#app',
    data:{
        name:'',
        searchQuery: '',
        website:'/intrants/',
        search:'/intrantrecherch',
        intrasy:'',
        listeIntrant : {},
        nomIntrant : null,
        idSuppression : "",
        intrantEditName : "",
        intrantEdit : "",
        idEdit : "",
        intra:"",
        errors: [],
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
        // addIntrant(){
        // axios.post(this.website , {name : this.nomIntrant}).then(() => {
        //         axios.get(this.website).then(response => {this.listeIntrant = response.data})
        //     }).catch(erreur=>this.listeIntrant=[{name:"cette intrant deja existee"}])
           
        // },
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

        checkForm: function (e) {
            if (this.nomIntrant ) {
                axios.post(this.website , {name : this.nomIntrant}).then(() => {
                        axios.get(this.website).then(response => {this.listeIntrant = response.data})
                    }).catch(erreur=>this.listeIntrant=[{name:"cette intrant deja existee"}])
            }
            
            this.errors = [];
            if (!this.nomIntrant) {
              this.errors["nomIntrant"] = "Fenoina ilay categorie";
            }
            e.preventDefault();
           
          }
        
    },
    mounted(){
        axios.get(this.website).then(response => {this.listeIntrant = response.data})
    }
})















