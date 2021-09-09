new Vue({
    el:'#cli',
    data:{
        website:'/clients/',
        liste:[],
        name:"",
        adress:"",
        contact:"",
        email:"",
        nameEdit:"",
        adressEdit:"",
        contactEdit:"",
        emailEdit:"",
        idEdit:"",
        idSuppre:"",
        search:'',
        addr:'',
        nom:'',
        contacta:'',
        mail:'',
        typerecherch:'/cherhcli'
    },
    methods:{
        searchcli(){
            if(this.search){
                axios.get(this.typerecherch , {
                    params : {
                        nom : this.search,
                        addr : this.search,
                        contacta : this.search,
                        mail : this.search
                    }
                }).then(({data}) => {
                    this.liste = data.date
                })
            }
            else{
                this.getList()
            }
        },
        addclient(){
            axios.post(this.website, {name: this.name,adress:this.adress,contact:this.contact,email:this.email})
                 .then(()=>{
                    this.getList()
                 })
        },
        edit(client){
            this.nameEdit=client.name,
            this.adressEdit=client.adress,
            this.contactEdit=client.contact,
            this.emailEdit=client.email,
            this.idEdit=client.id
        },
        update(){
               axios.put(this.website + this.idEdit , {name : this.nameEdit,adress:this.adressEdit,contact:this.contactEdit,email:this.emailEdit}).then(() => {
                   this.getList()
            })
        },
        del(id){
            this.idSuppre=id
        },
        suppression(){
                axios.delete(this.website + this.idSuppre).then(() => {
                this.getList()  
            })
        },
        getList(){
                axios.get(this.website).then(response=>{this.liste = response.data})
        }

    },
    mounted(){
        // axios.get(this.website).then(response=>{this.liste = response.data})
        this.getList()
        }
})