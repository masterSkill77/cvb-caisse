new Vue({
    el:"#paycom",
    data:{
        idSuppre:"",

        // commande
        listePanier : "http://localhost:8091/commandeliste",
        website:'http://localhost:8091/payementclis/',

        // payement
        payerVola : "http://localhost:8091/commandepayement",
        payee:"",
        net:0,
        dateEcheance:"",
        datepayement:"",
        listefarany:"http://localhost:8091/compay",
        lastidcommande:"http://localhost:8091/idcommande",
        liste:{},
        total:"",
        vola:0,
        nety:0,



    },
    computed : {
    //     tota () {
    //         this.total=(this.liste[0].condition==1)?(this.liste[0].pugros):(this.liste[0].pudetail)
    //         for ( let i=0;i<total.lenght;i++){
    //             this.total+=(this.liste[i].condition==1)?(this.liste[i].pugros):(this.liste[i].pudetail)
    //         }
    //         return this.total
    //     }  
    },
    methods:{
        async payer(){
            let {id,remise} = await axios.get(this.lastidcommande).then(({data})=>data)
            // console.log(id,remise)
            axios.post(this.payerVola,{payee : this.payee , dateEcheance : this.dateEcheance, datepayement : this.datepayement , idcommande : id , remise,net: this.net}).then(()=>{
                // alert("Paiement effectué")
             axios.get(this.website).then(response => {this.liste = response.data})  

            })
        },
        famerimbola(){
            this.vola =  parseInt(this.nety) - this.net 
            // console.log('mandeh')
        }
        

    },
    
    mounted(){

        axios.get(this.listePanier).then(response=>{
            this.liste = response.data
            console.log(this.liste = response.data)
            this.liste.forEach(element => {
                if(element.condition == 0)
                    this.net += (element.produits.pudetail * element.qt)
                else
                    this.net += (element.produits.pugros * element.qt)
            });
        })
        // axios.get(this.website).then(response=>{this.liste = response.data})

        // axios.get(this.listePanier).then(response=>console.log(response.data))

    }
})