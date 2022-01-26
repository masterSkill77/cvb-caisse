new Vue({
    el:"#histo",
    data:{
        headers: [{
            text: 'id',
            align: 'start',
            filterable: false,
            value: 'id',
        },
        {
            text: 'Client',
            value: 'cli'
        },
        {
            text: 'Catégorie',
            value: 'category'
        },
        {
            text: 'Produit',
            value: 'name'
        },
        {
            text: 'Unité',
            value: 'unite'
        },
        {
            text: 'Quantité',
            value: 'qt'
        },
        {
            text: 'Conditionnement',
            value: 'conditionnement'
        },
        {
            text: 'Prix',
            value: 'prixVente'
        },
        {
            text: 'Mode',
            value: 'mode'
        },
        {
            text: 'Date',
            value: 'datecom'
        },
        {
            text: 'Sous-total',
            value: 'sousTotal'
        },
        {
            text: 'Action',
            value: 'action'
        },
    ],
        website:'/affichagecommande/',
        liste:[],
        clients:[],
        search : ''
    },
    methods:{

    },
    mounted(){
        axios.get(this.website).then(response=>{
            this.liste=response.data.date;
            console.log(this.liste);
            this.liste.map((commande) => {
                commande.conditionnement = (commande.condition == 1) ? 'Gros' : 'Détail';
                commande.prixVente = (commande.condition == 0) ? commande.pudetail ? commande.pugros;
                commande.sousTotal = (commande.condition == 0) ? (commande.pudetail * commande.qt) : (commande.pugros * commande.qt)
            })
        })
    },
    vuetify : new Vuetify()
})