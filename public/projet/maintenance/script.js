new Vue({
    el: '#app',
    methods: {
        reset(){
            fetch('/maintenance/reset/').then(response => response).then(({data}) => {
                window.location.href = '/maintenance';
            })
        }
    }
})