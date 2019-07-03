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
					src: require('../../assets/images/good5.jpg'),
			        name: "生核桃仁小包装250gx4原味大核桃肉500g新货孕妇零食新疆散装",
			    	preference:"买一送一",
			        price: 12.5,
			        sold: 1.2,
			        foodId:0
				}
			]
		}
	}
}
</script>
<style scoped>
.goods{

}
</style>