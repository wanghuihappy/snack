<template>
	<div class="food-nav">
		<div class="food-img">
			<img :src="foods.src">
		</div>
		<div class="food-news">
			<ul>
				<li>{{foods.name}}</li>
				<li>{{foods.preference}}</li>
				<li>¥ {{foods.price}}</li>
				<li>已售{{foods.sold}}万份</li>
			</ul>
			<router-link :to="{path: '/details', query: {foodId: foods.foodId}}">
				<img src="../../assets/images/buy.png">
			</router-link>
			<!-- <a @click="toDetail"><img src="../../assets/images/buy.png"></a>-->
		</div> 
	</div>
</template>
<script>
export default {
  props:
  {
    foods: {//数据以数组形式传入
      type: Object,
      // default: [
	     //  {
	     //  	src: require('../../assets/images/good.jpg'),
	     //    name: '商品名称',
	    	// preference:'优惠',
	     //    price: 0,//价格
	     //    sold: 0  //已售出多少份
	     //  }
      // ]
    }
  },
  methods: {
   //  toDetail () {
   //  	this.$router.push({path: '/detail/:foodId'})
  	// }
  }
}
</script>
<style scoped>
.food-nav{
	width: 22%;
	height: 285px;
	border:1px solid #eeeeee;
	float: left;
	margin: 13px;
}
.food-img{
	width: 100%;
	height: 60%;
}
.food-img img{
	width: 100%;
	height: 100%;
}
.food-news{
	width: 100%;
	height: 37%;
}
.food-nav ul{
	width: 90%;	
	margin: 5px 8px;
}
.food-nav li{
	width: 90%;
	display: block;
	height: 15px;
	margin-top: 11px;
}
.food-nav li:first-child {
	font-weight: bold;
	font-size: 16px;
	letter-spacing: 1px;
	width: 102%;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.food-nav li:nth-of-type(2) {
	color: red;
	border-radius: 8px;
	border: 1px solid red;
	text-align: center;
	letter-spacing: 3px;
	width: 45%;
	padding-top: 3px;
}
.food-nav li:nth-of-type(3){
	color: orange;
	font-size: 18px;
	margin: 15px 10px;
}
.food-nav li:nth-of-type(4){
	font-size: 12px;
	position: relative;
	left: 40%;
	top:-25px;
	color: #adadad;
}
.food-nav a{
	position: relative;
	top:-50px;
	left: 70%;
	width: 60px;
	height: 40px;
	display: block;
	cursor: pointer;
}
.food-nav .food-news img{
    width: 75px;
    height: 40px;
}
   
</style>