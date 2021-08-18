// import axios from "axios";

new Vue({
    el : '#rupture',
    data(){
        return {
            rupture : {},
            number : 0,
            urlRupture : "http://localhost:8091/ruptureStock"
        }
    },
    mounted(){
        axios.get(this.urlRupture).then(({data}) => {
            this.rupture = data
            this.number = data.length
        })
    }
})