new Vue({
	el:'#journal',
	data:{

		// depense
		website:'http://localhost:8091/depensedate/',
		liste:{},
		debut:"",
		fin:"",
		
		total:0,
		//client commandee
		webclient:'http://localhost:8091/datecomm/',
		cli:{},
		deb:"",
		fi:"",
		tota:0,

		//fournisseur approv
		webfournisseur:'http://localhost:8091/dateappro/',
		fou:{},
		deba:"",
		fille:"",
		totaly:0,
		to:0,

		restpayee:'http://localhost:8091/rest/',
		rest:{},
		resta:0,

		rupture:'http://localhost:8091/rupturestoky/',
		rupstock:{},
	

	},
	computed:{
		TOTAL(){
			return this.total
		},
		TOTA(){
			return this.tota
		},
		TO(){
			return this.to
		},
		tatorest(){
			return this.resta
		}
	},
	methods:{
			
		depe(){
	axios.get(this.website+this.debut+"/"+this.fin	).then(({data})=>{
				// console.log(this.liste = response.data)
				this.liste = data.date
					this.total= this.liste[0].montant
				for(let i = 1; i < this.liste.length; i++){
					this.total += this.liste[i].montant
				}
       
		})

		},
		comm(){
			axios.get(this.webclient+this.deb+"/"+this.fi).then(({data})=>{
				console.log(this.cli = data.date)
				this.cli = data.date
					this.tota=(this.cli[0].condition==0)?(this.cli[0].pudetail * this.cli[0].qt):(this.cli[0].pugros * this.cli[0].qt)
				for(let i = 1; i < this.cli.length; i++){
					this.tota +=(this.cli[i].condition==0)?(this.cli[i].pudetail * this.cli[i].qt):(this.cli[i].pugros * this.cli[i].qt)
				
				}
				
			})
		},
		appro(){
			axios.get(this.webfournisseur+this.deba+"/"+this.fille).then(({data})=>{
				console.log(this.fou = data.date)
				this.fou = data.date
				this.to=(this.fou[0].condition==0)?(this.fou[0].puvente * this.fou[0].qt):(this.fou[0].puvente * this.fou[0].qt)
				for(let i = 1; i < this.fou.length; i++){
					this.to +=(this.fou[i].condition==0)?(this.fou[i].puvente * this.fou[i].qt):(this.fou[i].puvente * this.fou[i].qt)
				
				}
				
			})

		}

	},
	mounted(){
		axios.get(this.restpayee).then(response => {this.rest = response.data})
		axios.get(this.restpayee).then(({data})=>{
            console.log(this.rest=data.date)
			this.rest=data.date
			this.resta=(this.rest[0].net - this.rest[0].payee)
			for(let i = 1; i < this.rest.length; i++){
				this.resta +=(this.rest[0].net - this.rest[0].payee)
			}
		})
		axios.get(this.rupture).then(({data}) => {this.rupstock = data.date})
		
	}

})