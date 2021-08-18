new Vue({
	el:'#journalpayee',
	data:{

	
		//client commandee payee
		webclient:'http://localhost:8091/payementdatecli/',
		cli:{},
		deb:"",
		fi:"",
		total:0,

		//fournisseur approv payee
		webfournisseur:'http://localhost:8091/payementdatefou/',
		fou:{},
		debi:"",
		fii:"",
		// totaly:0,
		 tota:0,
	

	},
	computed:{
		TOTAL(){
			return this.total
		},
		TOTA(){
			return this.tota
		}
	},
	methods:{
	
		comm(){
			axios.get(this.webclient+this.deb+"/"+this.fi).then(({data})=>{
				console.log(this.cli = data.date)
				this.cli = data.date
				this.total=this.cli[0].payee
				for(let i = 1; i < this.cli.length; i++){
					this.total +=this.cli[i].payee
				
				}
				
			})
        },
        appro(){
			axios.get(this.webfournisseur+this.debi+"/"+this.fii).then(({data})=>{
				console.log(this.fou = data.date)
				this.fou = data.date
					this.tota=this.fou[0].payee
				for(let i = 1; i < this.fou.length; i++){
					this.tota +=this.fou[i].payee
				
				}
				
			})
		}


	},
	mounted(){

        // axios.get(this.webfournisseur).then(response=>console.log(response.data))
	}

})