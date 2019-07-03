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
					src: require('../../assets/images/good3.jpg'),
			        name: "【碧根果】坚果休闲零食",
			    	preference:"满减优惠",
			        price: 28.5,
			        sold: 1.2,
			        foodId:0
				},
				{
					src: require('../../assets/images/good2.jpg'),
			        name: "混合水果干罐装果脯零食",
			    	preference:"买一送一",
			        price: 21.9,
			        sold: 1,
			        foodId:1
				},
				{
					src: require('../../assets/images/good6.jpg'),
			        name: "【东北松子】坚果休闲零食特产手剥开口原味干果仁",
			    	preference:"满减优惠",
			        price: 39.9,
			        sold: 1.8,
			        foodId:2
				},
				{
					src: require('../../assets/images/good4.jpg'),
			        name: "猕猴桃干奇异果干片猕猴桃水果干脯蜜饯零食",
			    	preference:"买一送一",
			        price: 16.9,
			        sold: 3403,
			        foodId:3
				},
				{
					src: require('../../assets/images/good4.jpg'),
			        name: "猕猴桃干奇异果干片猕猴桃水果干脯蜜饯零食",
			    	preference:"买一送一",
			        price: 16.9,
			        sold: 3403,
			        foodId:3
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