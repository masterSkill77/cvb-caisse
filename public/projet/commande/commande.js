new Vue({
    el:"#commande",
    data:{
        website:'/affichagecommande/',
		client:'/clients/',
		produits:'/produits/',
        commande:'/commandeclis/',
        tsyfact:'/commandetsyfact/',
        addCommande : '/commandeclisave',
        listePanier : "/commandeliste",
        modelist:"/modes",
        modes:{},
        idmode:{},
        mode:"",
        listecli:{},
        idcli:{},
        datecom:"",
        produitliste:{},
        stcockFaible : '',
        remise : 0,
        idpro:{},
        qt:0,
        condition: 0,
        idcomm:"",  
        name:"",
        adress:"",
        contact:"",
        email:"",
        listescommande : {},
        netPayer : 0 ,
        units : '',
        reste : 0,
        delPanier : "/commande/delpanier/",
        vola :0,
        net:0, 
        stockFaible:0,
        stockgros:0,
        nety:'',
     
    },
    computed:{
		sou(){
			return this.netPayer
		}
	},
          
    methods:{
        showStock(liste){
            this.stockFaible = liste.stocks;
            this.units = liste.unite;
            let entier = parseInt(liste.stocks/liste.parpresentation)
            let reste= (liste.stocks%liste.parpresentation);
            this.stockgros = entier + " " + liste.presentation +  " et " + reste + " " + liste.unite

        },
        deleteThis(list){
			axios.post(this.delPanier,{list}).then(({data}) => {
				// axios.get(this.panier).then(response=>{
					this.listescommande=data
					this.netPayer=0
					for(let i=0 ;i <this.listescommande.length ; i++){
						this.netPayer +=(this.listescommande[i].condition==0) ? (this.listescommande[i].produits.pudetail * this.listescommande[i].qt) : (this.listescommande[i].produits.pugros * this.listescommande[i].qt)	
					}
				// })
			})
		},
        next(){
            let body = {produits : this.idpro , qt : parseFloat(this.qt) , condition : this.condition , remise : this.remise}
            axios.post(this.addCommande,{data : body}).then(response => {
                axios.get(this.listePanier).then(res => {
                    this.listescommande = res.data;

                    this.netPayer = (this.listescommande[0].condition == 0) ? (this.listescommande[0].produits.pudetail * this.listescommande[0].qt) : (this.listescommande[0].produits.pugros * this.listescommande[0].qt)
                    for(let i = 1 ; i < this.listescommande.length; i++){
                        this.netPayer += (this.listescommande[i].condition == 0) ? (this.listescommande[i].produits.pudetail * this.listescommande[i].qt) : (this.listescommande[i].produits.pugros * this.listescommande[i].qt)
                    }
                    // console.log(this.netPayer)

                });
            })  
        },
        terminer(){
            let body = {client : this.idcli ,modelist:this.idmode, datecom : this.datecom , produits : this.listescommande , remise : this.remise};
            axios.post(this.commande , {data : body})
            axios.get(this.listePanier).then(res => {
                this.listescommande = res.data;
            })
        },
        tsisy(){
            let body = {client : this.idcli ,modelist:this.idmode, datecom : this.datecom , produits : this.listescommande , remise : this.remise};
            axios.post(this.tsyfact , {data : body})
            axios.get(this.listePanier).then(res => {
                this.listescommande = res.data;
            })
        },
        addclient(){
            axios.post(this.client, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
                 .then(()=>{
                         axios.get(this.client).then(response=>{this.listecli = response.data})
                        // console.log(this.listecli = response.data)
                 })
        },
        addmode(){
            axios.post(this.modelist, {mode:this.mode})
                 .then(()=>{
                         axios.get(this.modelist).then(response=>{this.modes = response.data})
                        // console.log(this.listecli = response.data)
                 })
        },
        famerimbola(){
            this.vola =  parseInt(this.nety) - this.netPayer 
        }

    },
    mounted(){
      
        axios.get(this.client).then(response=>{this.listecli = response.data})
        // axios.get(this.client).then(response=>console.log(response.data))
        axios.get(this.produits).then(response=>{this.produitliste = response.data})
        axios.get(this.modelist).then(response=>{this.modes = response.data
        	// this.netPayer=0
			// for(let i=0 ;i <this.listecli.length ; i++){
			// 	this.netPayer +=(this.listecli[i].condition==0) ? (this.listecli[i].produit.pudetail * this.listecli[i].qt) : (this.listecli[i].produit.pugros * this.listecli[i].qt)		
			// }
        })
       
        // axios.get(this.produits).then(response=>console.log(response.data))
    }
})