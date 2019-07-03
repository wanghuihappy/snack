<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>

        <template v-for="product in productList">
          <h3>{{ product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{ item.name }}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div> 
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
            <li v-for="item in newsList" :key="index">
              <a :href="item.url" class="new-item">{{ item.title }}</a>
            </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <!--幻灯片组件-->
      <slide-show :slides="slides" :inv="slideSpeed" @onchange="doSomethingOnSlideChange"></slide-show>
      
      <div class="index-board-list">
        <div class="index-board-item" v-for="(item, index) in boardList" :class="[{'line-last' : index % 2 !==0},'index-board-'+item.id]">
          <div class="index-board-item-inner">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description}}</p>
            <div class="index-board-button">
              <router-link class="button" :to="{path: 'goods/' + item.toKey}">立即购买</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from '../components/slideShow'

  export default {
    components: {
    slideShow
    },
    // created: function () {
    //   this.$http.get('api/getNewsList')
    //   .then((res) => {
    //     this.newsList = res.data.data;
    //   }, (err) => {
    //     console.log(err)
    //   })
    // },
    methods:{
      doSomethingOnSlideChange () {
        console.log('doSomethingOnSlideChange run!') 
       },
       getNewsList(){
         this.$http.get('../../static/data/db.json')
        .then(function(res){
          console.log(res)
          })
          .catch(function(err){
             if(err.response) {
              console.log(err.response)
                 //控制台打印错误返回的内容
             }
          })
       }
    
    },
    mounted() {
      this.getNewsList()
    },
    data () {
      return {
        slideSpeed: 2000,
        slides: [
          {
            src: require('../assets/slideShow/pic1.jpg'),
            title: '周末零食',
            href: 'goods/nut'
          },
          {
            src: require('../assets/slideShow/pic2.jpg'),
            title: '美食任你选',
            href: 'goods/meat'
          },
          {
            src: require('../assets/slideShow/pic3.jpg'),
            title: '吃货尝鲜',
            href: 'goods/meat'
          },
          {
            src: require('../assets/slideShow/pic4.jpg'),
            title: '吃货节',
            href: 'goods/fruit'
          }
        ],
        boardList: [
          {
            title: '坚果干货',
            description: '为你找到全球的好坚果&果干',
            id: 'car',
            toKey: 'nut',
            saleout: false
            },
          {
            title: '肉食卤味',
            description: '肉香醇厚，嚼劲十足',
            id: 'earth',
            toKey: 'meat',
            saleout: false
          },
          {
            title: '糖果布丁',
            description: '选料上乘，才有当仁不让的美味',
            id: 'loud',
            toKey: 'fruit',
            saleout: true
          },
          {
            title: '面包蛋糕',
            description: '少女的颜值，色彩缤纷的小惊喜',
            id: 'hill',
            toKey: 'cake',
            saleout: false
          }
        ],
        newsList: [
          {
            title: '聚划算10万份爆款半价抢',
            url: 'http://starcraft.com'
          },
          {
            title: '新品上市，欢迎尝鲜',
            url: 'http://warcraft.com'
          },
          {
            title: '188元抱走一大箱哦，速速抢购',
            url: 'http://overwatch.com',
            hot: true
          },
          {
            title: '领劵立减50元！！！',
            url: 'http://hearstone.com'
          }
        ],
        productList: {
          pc: {
          title: '热门食品',
          last:true,
          list: [
            {
              name: '肉食卤味',
              url: 'http://starcraft.com'
            },
            {
              name: '糖果布丁',
              url: 'http://warcraft.com'
            },
            {
              name: '坚果干货',
              url: 'http://overwatch.com',
              hot: true
            },
            {
              name: '面包蛋糕',
              url: 'http://hearstone.com'
            }
          ]
          },
          app: {
            title: '其他分类',
            last: true,
            list: [
              {
                name: '必买爆款',
                url: 'http://phone.com',
                hot: true
              },
              {
                name: '当季新品',
                url: 'http://weixin.com'
              },
              {
                name: '海外专享',
                url: 'http://twitter.com'
              },
              {
                name: '精美礼盒',
                url: 'http://maps.com'
              }     
            ]
          }
        }
      }
    } 
  }
</script>

<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: orange;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>