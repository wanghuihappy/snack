<template>
	<div class="goods-nav">
		<div class="goods-img">
			<img src="../assets/images/good.jpg">
		</div>
		<div class="goods-news">
			<ul>
				<li>{{foods.name}}</li>
				<li>{{foods.preference}}</li>
				<li>¥ {{foods.price}}</li>
				<li>已售{{foods.sold}}万份</li>
			</ul>
			<!-- <router-link :to="{path:'/detail',query:{foodId:foods.foodId}}"><img src="../assets/images/buy.png"></router-link> -->
			<a @click="toDetail(foods.foodId)"><img src="../assets/images/buy.png"></a>
		</div>
	</div>
</template>
<script>
export default {
  props:
  {
    foods: {//数据以数组形式传入
      type: Array,
      default: [
	      {
	        name: '生核桃仁小包装250gx4原味大核桃肉500g新货孕妇零食新疆散装',
	    	preference:'买一送一',
	        price: 12.5,
	        sold: 1.2
	      }
      ]
    }
  },
  methods: {
    // toDetail (foodId) {
    	// this.$router.push({
     //      path: '/detail',
     //      query: {
     //        foodId:foods.foodId
     //      }
     //    })
toDetail (foodId) {
    	this.$router.push({
          path: '/detail/${foodId}',
        })
    	// this.$router.push({path: '/detail'})
  	}
  }
}
</script>
<style scoped>
.goods-nav{
	width: 22%;
	height: 285px;
	border:1px solid #eeeeee;
	float: left;
	margin: 13px;
}
.goods-img{
	width: 100%;
	height: 60%;
}
.goods-img img{
	width: 100%;
	height: 100%;
}
.goods-news{
	width: 100%;
	height: 37%;
}
.goods-nav ul{
	width: 90%;	
	margin: 5px 8px;
}
.goods-nav li{
	width: 90%;
	display: block;
	height: 15px;
	margin-top: 11px;
}
.goods-nav li:first-child {
	font-weight: bold;
	font-size: 16px;
	letter-spacing: 1px;
	width: 102%;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.goods-nav li:nth-of-type(2) {
	color: red;
	border-radius: 8px;
	border: 1px solid red;
	text-align: center;
	letter-spacing: 3px;
	width: 45%;
	padding-top: 3px;
}
.goods-nav li:nth-of-type(3){
	color: orange;
	font-size: 18px;
	margin: 15px 10px;
}
.goods-nav li:nth-of-type(4){
	font-size: 12px;
	position: relative;
	left: 40%;
	top:-25px;
	color: #adadad;
}
.goods-nav a{
	position: relative;
	top:-50px;
	left: 70%;
	width: 60px;
	height: 40px;
	display: block;
	cursor: pointer;
}
.goods-nav .goods-news img{
    width: 75px;
    height: 40px;
}
   
</style>