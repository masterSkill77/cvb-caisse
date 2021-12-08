new Vue({
    el:"#paycom",
    data:{
        idSuppre:"",

        // commande
        listePanier : "/commandeliste",
        website:'/payementclis/',

        // payement
        payerVola : "/commandepayement",
        payee:null,
        net:0,
        dateEcheance:"",
        datepayement:null,
        listefarany:"/compay",
        lastidcommande:"/idcommande",
        liste:{},
        total:"",
        vola:0,
        nety:0,
        errors:[],



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
            
            if (this.payee && this.datepayement && this.dateEcheance ) {
                let {id,remise} = await axios.get(this.lastidcommande).then(({data})=>data)
                // console.log(id,remise)
                axios.post(this.payerVola,{payee : this.payee , dateEcheance : this.dateEcheance, datepayement : this.datepayement , idcommande : id , remise,net: this.net}).then(()=>{
                    // alert("Paiement effectué")
                 axios.get(this.website).then(response => {this.liste = response.data})  
    
                })
                 window.location.replace("/historiquepayement")
            }
      
            this.errors = [];
      
            if (!this.payee) {
            this.errors["payee"] = "fenoina lay payement";

            }
            if (!this.datepayement) {
            this.errors["datepayement"] = "date de payement";

              }
            if (!this.dateEcheance) {
            this.errors["dateEcheance"] = "date de payement du reste";

                }
            e.preventDefault();
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