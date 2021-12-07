new Vue({
	el:'#fou',
	data:{
		  website:'/fournisseurs/',
          websearch:'/cherch/',
          searchfou:"",
          liste:{},
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

            }
            if (!this.adress) {
                this.errors["adress"] = "Fenoina ilay adress";

              }
            if (!this.contact) {
                this.errors["contact"] = "Fenoina ilay contact";
           
            }
            e.preventDefault();
           
          },
        search(){
            if(this.searchfou){
                axios.get(this.websearch,{
                    params:{
                        nom:this.searchfou,
                        addr:this.searchfou,
                        contacta:this.searchfou,
                        mail:this.searchfou
                    }
                }).then(({data}) => {
                    this.liste = data.date
                })
            }else{
              axios.get(this.website).then(response=>{this.liste = response.data})

            }
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
    }
})