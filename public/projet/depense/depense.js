new Vue({
	el:'#depense',
	data:{
		website:'/depenses/',
        liste:{},
        name:"",
        motif:"",
        description:"",
        type:"",
        montant:"",
        datedepense:"",

        idSuppre:"",

        nameEdit:"",
        motifEdit:"",
        descriptionEdit:"",
        typeEdit:"",
        montantEdit:"",
        datedepenseEdit:"",
        idEdit:"",

	},
	methods:{
		ajouter(){
			  axios.post(this.website, {name: this.name,motif:this.motif,description:this.description,type:this.type,montant:this.montant,datedepense:this.datedepense})
                 .then(()=>{
                        axios.get(this.website).then(response=>{this.liste = response.data})
                 })
		},
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