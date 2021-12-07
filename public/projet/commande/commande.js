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
        idmode:null,
        mode:null,
        listecli:{},
        idcli:null,
        datecom:null,
        produitliste:{},
        stcockFaible : '',
        remise : 0,
        idpro:null,
        qt:null,
        condition: 0,
        idcomm:"",  
        name:null,
        adress:null,
        contact:null,
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
        errors: [],
        errera:[],
        errorcli:[],
        errormode:[],
        test:false
     
    },
    computed:{
		sou(){
			return this.netPayer
		}
	},
          
    methods:{

        // manao anle commande
        req: function (e) {
            if (this.idpro && this.qt) {
                let body = {produits : this.idpro , qt : parseFloat(this.qt) , condition : this.condition , remise : this.remise}
                axios.post(this.addCommande,{data : body}).then(response => {
                    axios.get(this.listePanier).then(res => {
                        this.listescommande = res.data;
    
                        this.netPayer = (this.listescommande[0].condition == 0) ? (this.listescommande[0].produits.pudetail * this.listescommande[0].qt) : (this.listescommande[0].produits.pugros * this.listescommande[0].qt)
                        for(let i = 1 ; i < this.listescommande.length; i++){
                            this.netPayer += (this.listescommande[i].condition == 0) ? (this.listescommande[i].produits.pudetail * this.listescommande[i].qt) : (this.listescommande[i].produits.pugros * this.listescommande[i].qt)
                        }
    
                    });
                })   
                this.test=true
            }
      
            this.errors = [];
      
            if (!this.idpro) {
              this.errors["idpro"] = "Fidio ilay produit";
              

            }
            if (!this.qt) {
              this.errors["qt"] = "Fenoina ilay quantite";
              
              }
            e.preventDefault();
           
          },
        //   commande final avec facture
          finaly: function (e) {
          
            if (this.idcli && this.datecom && this.idmode) {
                let body = {client : this.idcli ,modelist:this.idmode, datecom : this.datecom , produits : this.listescommande , remise : this.remise};
                axios.post(this.commande , {data : body})
                axios.get(this.listePanier).then(res => {
                    this.listescommande = res.data;
                })
                
                window.location.replace("/pagepayement")

            }
      
            this.errors = [];
      
            if (!this.idcli) {
              this.errors["idcli"] = "Fidio ilay client";

            }
            if (!this.datecom) {
              this.errors["datecom"] = "Fenoina ilay date";

              }
            if (!this.idmode) {
            this.errors["idmode"] = "Fidio ilay mode de payement";

            }
      
            e.preventDefault();
           
          },
        //   commande tsisy facture
          tsisyfact: function (e) {
          
            if (this.idcli && this.datecom && this.idmode) {
                let body = {client : this.idcli ,modelist:this.idmode, datecom : this.datecom , produits : this.listescommande , remise : this.remise};
                axios.post(this.tsyfact , {data : body})
                axios.get(this.listePanier).then(res => {
                    this.listescommande = res.data;
                })
                window.location.replace("/commandehisto")
            }
      
            this.errors = [];
      
            if (!this.idcli) {
              this.errors["idcli"] = "Fidio ilay client";

            }
            if (!this.datecom) {
              this.errors["datecom"] = "Fenoina ilay date";

              }
            if (!this.idmode) {
            this.errors["idmode"] = "Fidio ilay mode de payement";

            }
      
            e.preventDefault();
           
          }
          ,
        //   afficahge stock
        showStock(liste){
            this.stockFaible = liste.stocks;
            this.units = liste.unite;
            let entier = parseInt(liste.stocks/liste.parpresentation)
            let reste= (liste.stocks%liste.parpresentation);
            this.stockgros = entier + " " + liste.presentation +  " et " + reste + " " + liste.unite

        },
        // suppression
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
        // ajout client
        addclient: function (e) {
          
            if (this.name && this.adress && this.contact) {
                axios.post(this.client, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
                         .then(()=>{
                                 axios.get(this.client).then(response=>{this.listecli = response.data})
                                // console.log(this.listecli = response.data)
                         })
            }
      
            this.errors = [];
      
            if (!this.name) {
              this.errors["name"] = "fenoy ilay anaranle client";
            }
            if (!this.adress) {
              this.errors["adress"] = "fenoy ilay adress";
              }
            if (!this.contact) {
              this.errors["contact"] = "contact du client";
            }
      
            e.preventDefault();
           
          },
          

          addmode: function (e) {
          
            if (this.mode) {
                     axios.post(this.modelist, {mode:this.mode})
                         .then(()=>{
                                 axios.get(this.modelist).then(response=>{this.modes = response.data})
                                // console.log(this.listecli = response.data)
                         })
                         this.mode=""
            }
      
            this.errormode=[]
           
      
            if (!this.mode) {
              this.errormode.push('Fenoy ilay mode de payement.');
            }
      
            e.preventDefault();
           
          },
          
      
        famerimbola(){
            this.vola =  parseInt(this.nety) - this.netPayer 
        },
      

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

















 // next(){
        //     let body = {produits : this.idpro , qt : parseFloat(this.qt) , condition : this.condition , remise : this.remise}
        //     axios.post(this.addCommande,{data : body}).then(response => {
        //         axios.get(this.listePanier).then(res => {
        //             this.listescommande = res.data;

        //             this.netPayer = (this.listescommande[0].condition == 0) ? (this.listescommande[0].produits.pudetail * this.listescommande[0].qt) : (this.listescommande[0].produits.pugros * this.listescommande[0].qt)
        //             for(let i = 1 ; i < this.listescommande.length; i++){
        //                 this.netPayer += (this.listescommande[i].condition == 0) ? (this.listescommande[i].produits.pudetail * this.listescommande[i].qt) : (this.listescommande[i].produits.pugros * this.listescommande[i].qt)
        //             }
        //             // console.log(this.netPayer)

        //         });
        //     })  
        // },
        // terminer(){
        //     let body = {client : this.idcli ,modelist:this.idmode, datecom : this.datecom , produits : this.listescommande , remise : this.remise};
        //     axios.post(this.commande , {data : body})
        //     axios.get(this.listePanier).then(res => {
        //         this.listescommande = res.data;
        //     })
        // },
        // tsisy(){
        //     let body = {client : this.idcli ,modelist:this.idmode, datecom : this.datecom , produits : this.listescommande , remise : this.remise};
        //     axios.post(this.tsyfact , {data : body})
        //     axios.get(this.listePanier).then(res => {
        //         this.listescommande = res.data;
        //     })
        // },
        
        // addclient(){
        //     axios.post(this.client, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
        //          .then(()=>{
        //                  axios.get(this.client).then(response=>{this.listecli = response.data})
        //                 // console.log(this.listecli = response.data)
        //          })
        // },
        // addmode(){
        //     axios.post(this.modelist, {mode:this.mode})
        //          .then(()=>{
        //                  axios.get(this.modelist).then(response=>{this.modes = response.data})
        //                 // console.log(this.listecli = response.data)
        //          })
        // },