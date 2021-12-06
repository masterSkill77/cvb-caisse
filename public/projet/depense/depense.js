new Vue({
	el:'#depense',
	data:{
		website:'/depenses/',
        liste:{},
        name:null,
        motif:null,
        description:null,
        type:"",
        montant:null,
        datedepense:null,
        errors: [],

        idSuppre:"",

        nameEdit:"",
        motifEdit:"",
        descriptionEdit:"",
        typeEdit:"",
        montantEdit:"",
        datedepenseEdit:"",
        idEdit:"",
        testa:false

	},
	methods:{
        ajouter: function (e) {
            if (this.name && this.motif && this.description && this.montant && this.datedepense ) {
                axios.post(this.website, {name: this.name,motif:this.motif,description:this.description,type:this.type,montant:this.montant,datedepense:this.datedepense})
                .then(()=>{
                       axios.get(this.website).then(response=>{this.liste = response.data})
                })
                this.testa=true
            }
      
            this.errors = [];
      
            if (!this.name) {
              this.errors["name"] = "Fenoina ilay anarany depense";

            }
            if (!this.motif) {
              this.errors["motif"] = "Fenoina ilay motif";

              }
            if (!this.description) {
            this.errors["description"] = "Fenoina ilay description";

            }
            if (!this.montant) {
            this.errors["montant"] = "Fenoina ilay montant";

            }
            if (!this.datedepense) {
              this.errors["datedepense"] = "Fenoina ilay datedepense";

                }
            e.preventDefault();
           
          }
        ,
		// ajouter(){
		// 	  axios.post(this.website, {name: this.name,motif:this.motif,description:this.description,type:this.type,montant:this.montant,datedepense:this.datedepense})
        //          .then(()=>{
        //                 axios.get(this.website).then(response=>{this.liste = response.data})
        //          })
		// },
		 del(id){
        	this.idSuppre=id
        },
    	suppression(){
           axios.delete(this.website + this.idSuppre).then(() => {
            axios.get(this.website).then(response => {this.liste = response.data})  
        })
        },
        edit(depense){
        	this.nameEdit=depense.name,
        	this.motifEdit=depense.motif,
        	this.descriptionEdit=depense.description,
        	this.typeEdit=depense.type,
        	this.montantEdit=depense.montant,
        	this.datedepenseEdit=depense.datedepense,
        	this.idEdit=depense.id
        },
        update(){
        axios.put(this.website + this.idEdit , {name : this.nameEdit,motif : this.motifEdit,description:this.descriptionEdit,type:this.typeEdit,montant:this.montantEdit,datedepense:this.datedepenseEdit}).then(() => {
              axios.get(this.website).then(response => {this.liste = response.data})  
            })
        }

	},
	mounted(){
		axios.get(this.website).then(response=>{this.liste = response.data})
        axios.get(this.website).then(response=>console.log(response.data))
 
	}
})