new Vue({
    el:"login",
    data:{
        website:'http://localhost:8091/loginn/',
        registers:'http://localhost:8091/mampiditra',
        email:"",
        mdp:"",
        name:"",
        contact:"",
        type:"",

        
    },
    methods:{
        login(){
            axios.post(this.website,{email:this.email,mdp:this.mdp}).then(response=>{
                console.log(response.data)
            }).catch(erreur=>this.email=[{email:"erreur de chargement"}])

        },
        register(){
            axios.post(this.registers,{email:this.email,mdp:this.mdp,name:this.name,contact:this.contact,type:this.type})
                 .then(response=>{
                     console.log(response.data)
                 })
        }
    }
  
})