new Vue({
	el:'#appro',
	data:{
		fournisseur:'/fournisseurs/',
		produit:'/produits/',
		approvision:'/appro/',
		createAppro:'/appro/create',
		panier:'/panier/',	
		listefou:{},
		idfou:{},
		dateappro:"",
		produitliste:{},
		idpro:{},
		qt:0,
		condition:0,
		idappro:"",

		listecomm:{},


		//fournisseur
		name:"",
		adress:"",
		contact:"",
		email:"",
		delPanier : "/appro/delete",
		netPayer : 0,

		ajoutfournisseur:'/addfournisseur/',

	},
	computed:{
		netApayer(){
			return this.netPayer
		}
	},
	methods:{		
		deleteThis(appro){
			axios.post(this.delPanier,{appro}).then(({data}) => {
				// axios.get(this.panier).then(response=>{
					this.listecomm=	data
					this.netPayer=0
					for(let i=0 ;i <this.listecomm.length ; i++){
						this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.pudetail * this.listecomm[i].qt) : (this.listecomm[i].produit.pugros * this.listecomm[i].qt)	
					}
				// })
			})
		},
		next(){
			let body = { produit:this.idpro, qt : parseFloat(this.qt), condition:this.condition }
			axios.post(this.approvision,{data:body}).then(response=>{
				axios.get(this.panier).then(response=>{
					this.listecomm=response.data
					this.netPayer=0
					for(let i=0 ;i <this.listecomm.length ; i++){
						this.netPayer +=(this.listecomm[i].condition==0) ? (this.listecomm[i].produit.pudetail * this.listecomm[i].qt) : (this.listecomm[i].produit.pugros * this.listecomm[i].qt)	
					}
				})
			})
		},	
		terminer(){
			let body={fournisseur:this.idfou, dateappro: this.dateappro,produit:this.listecomm}
			axios.post(this.createAppro, {data:body})
			axios.get(this.panier).then(res=>{
				this.listecomm=res.data
			})
		},
		getPanierList(){
			axios.get(this.panier).then(res=>{this.listecomm=res.data});
		},
		addfournisseur(){
			axios.post(this.fournisseur, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
					.then(()=>{
						axios.get(this.fournisseur).then(response=>{this.listefou = response.data})

						})
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
		})
    }
})