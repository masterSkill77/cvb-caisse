new Vue({
	el:'#fou',
	data:{
        headers: [
            {
              text: 'ID',
              align: 'start',
              filterable: false,
              value: 'id',
            },
            { text: 'Nom', value: 'name' },
            { text: 'Adresse', value: 'adress' },
            { text: 'Contact', value: 'contact' },
            { text: 'Email', value: 'email' },
            // { text: '', value: 'iron' },
        ],
		  website:'/fournisseurs/',
          websearch:'/cherch/',
          search:"",
          liste:[],
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
        errors:[],

        // serach
        nom:"",
        addr:"",
        contacta:"",
        mail:"",
        test:false,

	},
	methods:{
        
        addclient: function (e) {
            if (this.name && this.adress && this.contact ) {
                axios.post(this.website, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
                .then(()=>{
                       axios.get(this.website).then(response=>{this.liste = response.data})
                }) 
                this.test=true
                this.name=" "
                this.adress=" "
                this.contact=" "
            }
      
            this.errors = [];
      
            if (!this.name) {
              this.errors["name"] = "Fenoina ilay anarana";
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
            
            window.location.replace("/fournisseur")
          }
        ,
		//  addclient(){
        //     axios.post(this.website, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
        //          .then(()=>{
        //                 axios.get(this.website).then(response=>{this.liste = response.data})
        //          })
        // },
         edit(fournisseur){
            this.nameEdit=fournisseur.name,
            this.adressEdit=fournisseur.adress,
            this.contactEdit=fournisseur.contact,
            this.emailEdit=fournisseur.email,
            this.idEdit=fournisseur.id
        },
         update(){
               axios.put(this.website + this.idEdit , {name : this.nameEdit,adress:this.adressEdit,contact:this.contactEdit,email:this.emailEdit}).then(() => {
              axios.get(this.website).then(response => {this.liste = response.data})  
            })
        },
         del(id){
            this.idSuppre=id
        },
          suppression(){
               axios.delete(this.website + this.idSuppre).then(() => {
                axios.get(this.website).then(response => {this.liste = response.data})  
            })
        }
	},
	 mounted(){
        axios.get(this.website).then(response=>{this.liste = response.data})
        // axios.get(this.website).then(response=>console.log(response.data))
    },
    vuetify : new Vuetify()
})