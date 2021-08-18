new Vue({
    el:"#payement",
    data:{
        website:'/payementclis/',
        liste:{},
        idSuppre:"",

        payeeEdit:"",
        datepayementEdit:"",
        dateEcheanceEdit:"",
        netEdit:"",
        idEdit:"",

        // commande
        listePanier : "/commandeliste",

        // payement
        payee:"",
        net:"",
        date_echeance:"",
        datepayement:"",
        listefarany:"/compay"



    },
    methods:{

        sup(id){
            this.idSuppre=id
        },
        suppression(){
            axios.delete(this.website + this.idSuppre).then(() => {
            //  axios.get(this.website).then(response => {this.liste = response.data})  
             axios.get(this.website).then(({data})=>{
                // console.log(this.liste=data.date)
                this.liste=data.date
            })
         })
     },
     edit(payement){
        this.payeeEdit=payement.payee,
        this.datepayementEdit=payement.datepayement,
        this.dateEcheanceEdit=payement.date_echeance,
        this.netEdit=payement.net,
        this.idEdit=payement.id
    },
    update(){
        axios.put(this.website + this.idEdit , {payee : this.payeeEdit,datepayement:this.datepayementEdit,dateEcheance:this.dateEcheanceEdit,net:this.netEdit}).then(() => {
    //    axios.get(this.website).then(response => {this.liste = response.data})  
       axios.get(this.website).then(({data})=>{
        // console.log(this.liste=data.date)
        this.liste=data.date
    })
     })
    },
    payee(){
        axios.post(this.website,{paye:this.paye,net:this.net,dateEcheance:this.dateEcheance,datepayement:this.datepayement})
             .then(()=>{
                        axios.get(this.website).then(response=>{this.liste = response.data})
              })
    }

    },
    
    mounted(){
        // axios.get(this.website).then(response=>{this.liste = response.data})
        axios.get(this.website).then(({data})=>{
            console.log(this.liste=data.date)
            this.liste=data.date
        })
        axios.get(this.listePanier).then(response=>{this.panier = response.data})
        axios.get(this.listePanier).then(response=>console.log(response.data))

    }
})