new Vue({
	el:'#pro',
	data:{
		website:'http://localhost:8091/produits/',
        liste:{},
        intrantsite:'http://localhost:8091/intrants/',
        intrantliste:{},
        idintrant:{},
        name:"",
        namee:"",
        unite:"",
        presentation:"",
        parpresentation:"",
        pugros:"",
        pudetail:"",
        puvente:"",
        dateperemption:"",
        tva:"",
        description:"",

        idSuppre:"",
        nomIntrant:"",
        nameEdit:"",
        uniteEdit:"",
        presentationEdit:"",
        parpresentationEdit:"",
        pugrosEdit:"",
        pudetailEdit:"",
        puventeEdit:"",
        idEdit:"",
        idintrantEdit:"",
        dateperemptionEdit:"",
        tvaEdit:"",
        descriptionEdit:'',
        idintrant:"",
        // class="label label-sm label-success"

        // search
        websearch:'http://localhost:8091/chercproduits',
        searchproduit:"",
        nom:"",
        intra:"",
    },
    computed : {
        notif () {
            return this.class
        }  
    },
	methods:{
        search(){
            if(this.searchproduit){
                axios.get(this.websearch,{
                    params:{
                        nom:this.searchproduit,
                    }
                }).then(({data}) => {
                    this.liste = data.date
                })
            }else{
                axios.get(this.website).then(response => {this.liste = response.data})  
                // axios.get(this.website).then(({data}) => { this.liste = data.date}) 
          }
        }
        ,
		 addproduit(){
            axios.post(this.website, {
                name: this.name,
                unite:this.unite,
                presentation:this.presentation,
                parpresentation:this.parpresentation,
                pugros:this.pugros,
                pudetail:this.pudetail,
                puvente:this.puvente,
                idintrant:this.idintrant,
                tva:this.tva,
                description:this.description,
                dateperemption:this.dateperemption})
                 .then(()=>{
                        axios.get(this.website).then(response=>{this.liste = response.data})
                        // axios.get(this.website).then(({data}) => { this.liste = data.date}) 
                 })
        },
        del(id){
        	this.idSuppre=id;
        },
         suppression(){
               axios.delete(this.website + this.idSuppre).then(() => {
                axios.get(this.website).then(response => {this.liste = response.data})  
                // axios.get(this.website).then(({data}) => { this.liste = data.date}) 
            })
        },
        edit(produit){
        	this.nameEdit=produit.name,
        	this.idintrantEdit=produit.idintrant,
        	this.uniteEdit=produit.unite,
        	this.presentationEdit=produit.presentation,
        	this.parpresentationEdit=produit.parpresentation,
        	this.pugrosEdit=produit.pugros,
        	this.pudetailEdit=produit.pudetail,
        	this.puventeEdit=produit.puvente,
            this.idEdit=produit.id,
            this.dateperemptionEdit=produit.dateperemption,
            this.tvaEdit=produit.tva,
            this.descriptionEdit=produit.description
        },
         update(){
               axios.put(this.website + this.idEdit , {name : this.nameEdit,idintrant:this.idintrantEdit,
               	unite:this.uniteEdit,presentation:this.presentationEdit,parpresentation:this.parpresentationEdit,pugros:this.pugrosEdit,
                   pudetail:this.pudetailEdit,puvente:this.puventeEdit,tva:this.tvaEdit,dateperemption:this.dateperemptionEdit,description:this.descriptionEdit})
                   .then(() => {
                   axios.get(this.website).then(response => {this.liste = response.data})  
                // axios.get(this.website).then(({data}) => { this.liste = data.date}) 
            })
        },
        addIntrant(){
            axios.post(this.intrantsite , {name : this.nomIntrant}).then(() => {
                axios.get(this.website).then(response => {this.liste = response.data}) 
                 
                })
               
            },

	},
  mounted(){
        axios.get(this.website).then(({data})=>{
            this.liste = data.date
            console.log(this.liste = data.date)
       
       })
        axios.get(this.website).then(response => {this.liste = response.data
        console.log(this.liste = response.data)
        })                              
        // axios.get(this.website).then(({data}) => { this.liste = data.date})  
        axios.get(this.intrantsite).then(response=>{this.intrantliste = response.data})


    }
})



        