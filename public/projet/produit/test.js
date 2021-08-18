new Vue({
	el:'#test',
	data:{
		website:'https://www.cvb-shop.mg/wp-json/wc/v3/products?consumer_key=ck_a7b3d460f9abc1356945764cc4ac7d4ababd9c4d&consumer_secret=cs_a9885dd7301172ac646179273edf56a6b86db792&fbclid=IwAR3q_hfmvFDeIvgwY0MQqAjQy4r5qv_LGrTqC7-KacFCcAf8MQd-BPdtOCU',       
    },
  mounted(){
        axios.get(this.website).then(response=>console.log(response.data))

    }
})



        