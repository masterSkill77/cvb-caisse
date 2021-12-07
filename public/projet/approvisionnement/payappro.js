new Vue({
    el:"#payappro",
    data:{
        listePanier : "/panier",
        payee:"",
        datepayement:"",
        dateEcheance:"",
        net:0,
        liste:{},
        errors:[],
        // listes:[],
        getlastidappro : "/idappro",
        payerboby : "/payevola",
        website:'/payementfournis/',




    },
    methods:{
        async payer(){
            if(this.payee && this.datepayement && this.dateEcheance){
                let {id}= await axios.get(this.getlastidappro).then(({data})=>data)
                axios.post(this.payerboby,{payee:this.payee,datepayement:this.datepayement,dateEcheance:this.dateEcheance,idprovision:id,net:this.net})
                     .then(()=>{
                         axios.get(this.website).then(response=>{this.liste=response.data})
                     }).then(()=> window.location.replace("/histopayementfou"))
            }
            this.errors = [];
      
            if (!this.payee) {
              this.errors["payee"] = "montant du payement";
            }
			if (!this.datepayement) {
                this.errors["datepayement"] = "fenoy ilay date de payement";
			  }
			if (!this.dateEcheance) {
            this.errors["dateEcheance"] = "Fenoy ilay date du reste";
			}
            e.preventDefault();
        }
    },
    mounted(){
        axios.get(this.listePanier).then(response=>{    
            this.liste=response.data
            this.liste.forEach(element =>{
                if(element.condition==0)
                    this.net += (element.produit.puvente * element.qt)
                else
                    this.net += (element.produit.puvente * element.qt)
            })

        })
        // axios.get(this.listePanier).then(response => {this.liste=response.data})  
    


    } 
})