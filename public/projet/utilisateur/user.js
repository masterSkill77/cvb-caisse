new Vue({
	el:'#user',
	data:{
		website:'http://localhost:8091/users/',
		ajou:'http://localhost:8091/signup',
        liste:{},
        username:"",
        lastname:"",
        adress:"",
        password:"",
        email:"",
        contact:"",
        type:"",

        idSuppre:"",

        usernameEdit:"",
        lastnameEdit:"",
        adressEdit:"",
        passwordEdit:"",
        emailEdit:"",
        contactEdit:"",
        typeEdit:"",
        idEdit:""
	},
	methods:{
		 ajout(){
            axios.post(this.ajou, {username: this.username,lastname:this.lastname,adress:this.adress,password:this.password,email:this.email,contact:this.contact,type:this.type})
                 .then(()=>{
                        axios.get(this.website).then(response=>{this.liste = response.data})
                        console.log(this.liste = response.data)
                 })
        },
        del(id){
        	this.idSuppre=id
        },
         suppression(){
               axios.delete(this.website + this.idSuppre).then(() => {
                axios.get(this.website).then(response => {this.liste = response.data})  
            })
        },
        edit(user){
        	this.usernameEdit=user.username,
        	this.lastnameEdit=user.lastname,
        	this.adressEdit=user.adress,
        	this.passwordEdit=user.password,
        	this.emailEdit=user.email,
        	this.contactEdit=user.contact,
        	this.typeEdit=user.type,
        	this.idEdit=user.id
        },
        update(){
        	axios.put(this.website + this.idEdit , {username : this.usernameEdit,lastname : this.lastnameEdit,adress:this.adressEdit,password:this.passwordEdit,email:this.emailEdit,contact:this.contactEdit,type:this.typeEdit}).then(() => {
              axios.get(this.website).then(response => {this.liste = response.data})  
            })
        }

	},
	mounted(){
		axios.get(this.website).then(response=>{this.liste = response.data})
		axios.get(this.website).then(response=>console.log(response))
   
	}
})