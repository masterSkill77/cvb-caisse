new Vue({
	el:'#fou',
	data:{
		  website:'http://localhost:8091/fournisseurs/',
          websearch:'http://localhost:8091/cherch/',
          searchfou:"",
          liste:{},
          name:"",
          adress:"",
          contact:"",
          email:"",
           nameEdit:"",
        adressEdit:"",
        contactEdit:"",
        emailEdit:"",
        idEdit:"",
        idSuppre:"",

        // serach
        nom:"",
        addr:"",
        contacta:"",
        mail:""

	},
	methods:{
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
		 addclient(){
            axios.post(this.website, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
                 .then(()=>{
                        axios.get(this.website).then(response=>{this.liste = response.data})
                 })
        },
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