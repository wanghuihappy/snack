<template>
  <div class="goods-wrap">
    <div class="goods-left">
      <div class="product-board">
        <img :src="productIcon">
        <ul>
          <!--router-link会生成a标签，使用tag属性指定生成li-->
          <router-link v-for="(item,index) in products" :to="{ path: item.path }" tag="li" active-class="active" :key="index">
            {{ item.name }}
          </router-link>
          <!--若不设置active-class="active"则默认显示为router-link-active-->
        </ul>
      </div>
    </div>
    <div class="goods-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [
        {
          name: '肉食卤味',
          path: 'meat',
          icon: require('../assets/images/1.png'),
          active: false
        },
        {
          name: '糖果布丁',
          path: 'fruit',
          active: false
        },
        {
          name: '坚果干货',
          path: 'nut',
          active: false
        },
        {
          name: '面包蛋糕',
          path: 'cake',
          active: false
        }
      ],
      imgMap: {//用当前路由地址做映射
        '/goods/meat': require("../assets/images/1.jpg"),
        '/goods/fruit': require("../assets/images/2.jpg"),
        '/goods/nut': require("../assets/images/3.jpg"),
        '/goods/cake': require("../assets/images/4.jpg")
      }
    }
  },
  computed: {
    productIcon () {//获取当前路由地址
      return this.imgMap[this.$route.path]
    }
  }
}
</script>

<style>
.goods-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.goods-left {
  float: left;
  width: 200px;
  text-align: center;
}
.goods-right {
  float: left;
  width: 980px;
  margin-left: 20px;
  background: #fff;
}
.product-board {
  background: #fff;
}
.product-board ul {
  margin-top: 10px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: orange;
  color: #fff;
}
.product-board li a {
  display: block;
}
</style>
