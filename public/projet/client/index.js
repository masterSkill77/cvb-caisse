new Vue({
    el:'#cli',
    data:{
        headers: [
            {
              text: 'id',
              align: 'start',
              filterable: false,
              value: 'id',
            },
            { text: 'Nom', value: 'name' },
            { text: 'Adresse', value: 'adress' },
            { text: 'Contact', value: 'contact' },
            { text: 'Email', value: 'email' },
            { text: 'Action', value: 'action' },
        ],
        website:'/clients/',
        liste:[],
        errors:[],
        name:null,
        adress:null,
        contact:null,
        email:"",
        nameEdit:"",
        adressEdit:"",
        contactEdit:"",
        emailEdit:"",
        idEdit:"",
        idSuppre:"",
        search:'',
        addr:'',
        nom:'',
        contacta:'',
        mail:'',
        typerecherch:'/cherhcli',
        testa:false
    },
    methods:{
        addclient: function (e) {
            if (this.name && this.adress && this.contact ) {
                axios.post(this.website, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
                .then(()=>{
                   this.getList()
                })
              this.testa =true
              
            }
      
            this.errors = [];
      
            if (!this.name) {
          
              this.errors["name"] = "Fenoina ilay nom";
                return false;
            }
            if (!this.adress) {
              this.errors["adress"] = "Fenoina ilay adress";
              return false;
              }
            if (!this.contact) {
                this.errors["contact"] = "Fenoina ilay contact";
                return false;
            }
            window.location.replace('/clients')
           
          }
        ,
        searchcli(){
            if(this.search){
                axios.get(this.typerecherch , {
                    params : {
                        nom : this.search,
                        addr : this.search,
                        contacta : this.search,
                        mail : this.search
                    }
                }).then(({data}) => {
                    this.liste = data.date
                })
            }
            else{
                this.getList()
            }
        },
        // addclient(){
        //     axios.post(this.website, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
        //          .then(()=>{
        //             this.getList()
        //          })
        // },
        edit(client){
            this.nameEdit=client.name,
            this.adressEdit=client.adress,
            this.contactEdit=client.contact,
            this.emailEdit=client.email,
            this.idEdit=client.id
        },
        update(){
               axios.put(this.website + this.idEdit , {name : this.nameEdit,adress:this.adressEdit,contact:this.contactEdit,email:this.emailEdit}).then(() => {
                    window.location.replace("/client/")
                    // this.getList()

            })
        },
        del(id){
            this.idSuppre=id
        },
        suppression(){
                axios.delete(this.website + this.idSuppre).then(() => {
                this.getList()  
            })
        },
        getList(){
                axios.get(this.website).then(response=>{
                    this.liste = response.data
                    this.liste.map(c => {
                        c.action = ''
                    })
                })
        }

    },
    mounted(){
        // axios.get(this.website).then(response=>{this.liste = response.data})
        this.getList()
        },
        vuetify : new Vuetify()
})