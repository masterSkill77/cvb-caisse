new Vue({
    el:"#vue-app",
    data:{
        sond:"sound"
    },
    methods:{
        test:function(){
            console.log(this.$refs.input.value)
        this.sond=this.$refs.input.value

        },
    }
})
