new Vue({
    el:"#payappro",
    data:{
        listePanier : "/panier",
        payee:"",
        datepayement:"",
        dateEcheance:"",
        net:0,
        liste:{},
        // listes:[],
        getlastidappro : "/idappro",
        payerboby : "/payevola",
        website:'/payementfournis/',




    },
    methods:{
        async payer(){
            let {id}= await axios.get(this.getlastidappro).then(({data})=>data)
            axios.post(this.payerboby,{payee:this.payee,datepayement:this.datepayement,dateEcheance:this.dateEcheance,idprovision:id,net:this.net})
                 .then(()=>{
                     axios.get(this.website).then(response=>{this.liste=response.data})
                 }).then(()=> window.location.replace("/histopayementfou"))
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