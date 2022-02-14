new Vue({
    el:'#app',
    data:{
        headers: [
            {
              text: 'id',
              align: 'start',
              filterable: false,
              value: 'id',
            },
            { text: 'Nom', value: 'name' },
            { text: 'Action', value: 'action',filterable:false },
            // { text: 'Contact', value: 'contact' },
            // { text: 'Email', value: 'email' },
            // { text: '', value: 'iron' },
        ],
        name:'',

        website:'/intrants/',
        search:'',
        intrasy:'',
        listeIntrant : [],
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
        
        // addIntrant(){
        // axios.post(this.website , {name : this.nomIntrant}).then(() => {
        //         axios.get(this.website).then(response => {this.listeIntrant = response.data})
        //     }).catch(erreur=>this.listeIntrant=[{name:"cette intrant deja existee"}])
           
        // },
        updateThis(){
          axios.put(this.website + this.idEdit , {name : this.intrantEditName}).then(() => {
                window.location.replace("/intrant/")
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
                    }).catch(erreur=>this.listeIntrant=[{name:"Cet intrant existe déjà"}])
                    return false;
            }
            this.errors = [];
            if (!this.nomIntrant) {
              this.errors["nomIntrant"] = "Fenoina ilay categorie";
              return false
            }
            window.location.replace("/intrant")   
          }
        
    },
    mounted(){
        axios.get(this.website).then(response => {
            this.listeIntrant = response.data;
            this.listeIntrant.map((i) => {
                i.action = ''
            })
        })
    },
    vuetify : new Vuetify()
})
