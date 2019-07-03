<template>
	<div class="sales-board">
		<food :foods="data" v-for="(data,index) in foods" :key="index"></food>
	</div>
</template>
<script>
import Food from '../../components/base/food'
export default {
	components: {
		Food
	},
	data(){
		return {
			foods:[
				{
					src: require('../../assets/images/good2.jpg'),
			        name: "糖果",
			    	preference:"买一送一",
			        price: 12.5,
			        sold: 1.2,
			        foodId:0
				},
				{
					src: require('../../assets/images/good3.jpg'),
			        name: "布丁100g",
			    	preference:"买一送二",
			        price: 13,
			        sold: 1,
			        foodId:1
				},
			]
		}
	}
}
</script>
<style scoped>
.goods{

}
</style>