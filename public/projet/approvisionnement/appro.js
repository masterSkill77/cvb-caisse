new Vue({
	el:'#appro',
	data:{
		fournisseur:'/fournisseurs/',
		produit:'/produits/',
		approvision:'/appro/',
		createAppro:'/appro/create',
		panier:'/panier/',	
		listefou:{},
		idfou:null,
		dateappro:null,
		produitliste:{},
		idpro:null,
		qt:null,
		condition:0,
		idappro:"",

		listecomm:{},
		errors:[],
		errofou:[],
		erfou:[],

		//fournisseur
		name:null,
		adress:null,
		contact:null,
		email:"",
		delPanier : "/appro/delete",
		netPayer : 0,
		te:false,
		ajoutfournisseur:'/addfournisseur/',

	},
	computed:{
		netApayer(){
			return this.netPayer
		},

		terminate(){
			if((this.listecomm).length == 0 || (this.dateappro == null) || (this.idfou == null))
				return false;
			else
				return true;
		}
	},
	watch : {
		terminate(val){
			console.log(val);
		}
	},
	methods:{		
		next: function (e) {
            if (this.idpro && this.qt  ) {
				let body = { produit:this.idpro, qt : parseFloat(this.qt), condition:this.condition }
					axios.post(this.approvision,{data:body}).then(response=>{
						axios.get(this.panier).then(response=>{
							this.listecomm=response.data
							this.netPayer=0
							for(let i=0 ;i <this.listecomm.length ; i++){
								this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.puvente * this.listecomm[i].qt) : (this.listecomm[i].produit.puvente * this.listecomm[i].qt)	
							}
						})
					})  
					this.te=true
			}
      
            this.errors = [];
      
            if (!this.idpro) {
			  this.errors["idpro"] = "Fidio ilay produit";
            }
			if (!this.qt) {
				this.errors["qt"] = "Fenoina ilay quantite";
			  }
            e.preventDefault();
           
          }
		,
		terminer: function (e) {
            if (this.idfou && this.dateappro  ) {
				let body={fournisseur:this.idfou, dateappro: this.dateappro,produit:this.listecomm}
				axios.post(this.createAppro, {data:body})
				axios.get(this.panier).then(res=>{
					this.listecomm=res.data
					window.location.replace("/appropay")
				})
			}
      
            this.errors = [];
      
            if (!this.idfou) {
			  this.errors["idfou"] = "Fidio ilay fournisseur";
            }
			if (!this.dateappro) {
				this.errors["dateappro"] = "Fenoina ilay date approvision";
			}
            e.preventDefault();
           
          }
		,
		addfournisseur: function (e) {
            if (this.name && this.adress && this.contact  ) {
				axios.post(this.fournisseur, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
							.then(()=>{
								axios.get(this.fournisseur).then(response=>{this.listefou = response.data})
				
								})
			}
      
            this.erfou = [];
      
            if (!this.name) {
              this.erfou.push('fenoy ny nom fournisseur.');
            }
			if (!this.adress) {
				this.erfou.push('fenoy ny adress.');
			  }
			if (!this.contact) {
			this.erfou.push('fenoy ny contact.');
			}
            e.preventDefault();
           
          },
		deleteThis(appro){
			axios.post(this.delPanier,{appro}).then(({data}) => {
				// axios.get(this.panier).then(response=>{
					this.listecomm=	data
					this.netPayer=0
					for(let i=0 ;i <this.listecomm.length ; i++){
						this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.puvente * this.listecomm[i].qt) : (this.listecomm[i].produit.puvente * this.listecomm[i].qt)	
					}
				// })
			})
		},
			
	
		getPanierList(){
			axios.get(this.panier).then(res=>{
				this.listecomm=res.data
				this.netPayer=0
				for(let i=0 ;i <this.listecomm.length ; i++){
					this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.pudetail * this.listecomm[i].qt) : (this.listecomm[i].produit.pugros * this.listecomm[i].qt)	
				}
			});
		}
	

		

	},
	  mounted(){
        axios.get(this.fournisseur).then(response=>{this.listefou = response.data})
        axios.get(this.produit).then(response=>{this.produitliste = response.data})
		axios.get(this.panier).then(response=>{
			this.listecomm=response.data
			this.netPayer=0
			for(let i=0 ;i <this.listecomm.length ; i++){
				this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.pudetail * this.listecomm[i].qt) : (this.listecomm[i].produit.pugros * this.listecomm[i].qt)	
			}
			// this.netPayer=0
			// for(let i=0 ;i <this.listecomm.length ; i++){
			// 	this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.puvente * this.listecomm[i].qt) : (this.listecomm[i].produit.puvente * this.listecomm[i].qt)		
			// }
		})
    }
})
















// next(){
// 	let body = { produit:this.idpro, qt : parseFloat(this.qt), condition:this.condition }
// 	axios.post(this.approvision,{data:body}).then(response=>{
// 		axios.get(this.panier).then(response=>{
// 			this.listecomm=response.data
// 			this.netPayer=0
// 			for(let i=0 ;i <this.listecomm.length ; i++){
// 				this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.puvente * this.listecomm[i].qt) : (this.listecomm[i].produit.puvente * this.listecomm[i].qt)	
// 			}
// 		})
// 	})
// },
// terminer(){
// 	let body={fournisseur:this.idfou, dateappro: this.dateappro,produit:this.listecomm}
// 	axios.post(this.createAppro, {data:body})
// 	axios.get(this.panier).then(res=>{
// 		this.listecomm=res.data
// 	})
// },
// addfournisseur(){
// 	axios.post(this.fournisseur, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
// 			.then(()=>{
// 				axios.get(this.fournisseur).then(response=>{this.listefou = response.data})

// 				})
// 			}