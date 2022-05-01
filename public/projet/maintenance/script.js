new Vue({
    el: '#app',
    data(){
        return {
            depot: true
        }
    },
    methods: {
        reset(){
            console.log("Mandeha")
            fetch('/maintenance/reset/' + this.depot).then(response => JSON.parse(response)).then(response => console.log(response.data))
        }
    }
})