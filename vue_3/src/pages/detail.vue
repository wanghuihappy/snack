<template>
  <div class="detail-sales">
    <div class="sales-board"> 
      <div class="sales-board-intro" v-for="food in foodsList"  >
        <div class="sales-img">
          <img :src="food.src" alt="">
        </div>    
        <h2>{{ food.name }}</h2>
        <p>{{ food.text }}</p>
      </div>
      <div class="sales-board-form">
        <div class="sales-board-line">
          <div class="sales-board-line-left">
            购买数量：
          </div>
          <div class="sales-board-line-right">
            <!--onParamChange('buyNum')只有参数，没有从组件里传出来的东西，需要手动通过$event变量写进去-->
            <v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
          </div>
        </div>
        <div class="sales-board-line">
          <div class="sales-board-line-left">
            食品口味：
          </div>
        <div class="sales-board-line-right">
          <v-chooser :selections="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
        </div>
        <div class="sales-board-line-right">
          {{ price }} 元
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
          <div class="sales-board-line-right">
            <div class="button" @click="showPayDialog">
              立即购买
            </div>
          </div>
        </div>
      </div>
      <div class="sales-board-desa" v-for="desa in salesdesa">
        <h2>商品详情</h2>
        <p>{{ desa.desc }}</p>

        <ul>
          <li>{{ desa.texta }}</li>
          <li>{{ desa.textb }}</li>
          <li>{{ desa.textc }}</li>
        </ul>
      </div>
      <div class="sales-board-desb">
        <h3>价格说明</h3>
        <p>
          商家以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。
        </p>
      </div>
      <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
          <table class="buy-dialog-table">
            <tr>
              <th>购买数量</th>
              <th>食品口味</th>
              <th>总价</th>
            </tr>
            <tr>
              <td>{{ buyNum }}</td>
              <td>{{ period.label }}</td>
              <td>{{ price }}</td>
            </tr>
          </table>
          <h3 class="buy-dialog-title">请选择银行</h3>
          <bank-chooser @on-change="onChangeBanks"></bank-chooser>
          <div class="button buy-dialog-btn" @click="confirmBuy">
            确认购买
          </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
          支付失败！
      </my-dialog>
      <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
    </div>
  </div>
</template>

<script>
import VCounter from '../components/base/counter'
import VChooser from '../components/base/chooser'
import Dialog from '../components/base/dialog'
import BankChooser from '../components/bankChooser'
import CheckOrder from '../components/checkOrder'
import _ from 'lodash'
export default {
  components: {  
    VCounter,
    VChooser,
    MyDialog: Dialog,
    BankChooser,
    CheckOrder
  },
  data () {
    return {
      buyNum: 0,//产品数目
      period: {},//食品口味
      price: 0,
      periodList: [
        {
          label: '原味',
          value: 0
        },
        {
          label: '牛奶味',
          value: 1
        },
        {
          label: '红枣味',
          value: 2
        }
      ],
      foodsList:[
        {
          src: require('../assets/images/good3.jpg'),
          name: '【碧根果】坚果休闲零食',
          text: '精心挑选，颗粒饱满，原香酥脆，回味无穷',
          foodId:0
        }
      ],
      salesdesa:[
        {
          desc:'壳薄肉厚碧根果，和阳光为伍的碧根果，每一处的自然裂口，都藏着奶香和酥脆',
          texta: '来自南非优质产区，接受阳光的全面洗礼，在湿润的空气里呼吸，长成饱满大颗的诱人果实',
          textb: '颗粒饱满，壳薄易剥，整颗享受',
          textc:'入口奶香，醇香酥脆，回味香甜'
        }
      ],
      isShowPayDialog: false,
      bankId: null,
      orderId: null,
      isShowCheckOrder: false,
      isShowErrDialog: false
    }
  },
  // created(){
  //     this.getParams()
  // },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    // getParams(){
    //   var foodId = this.$route.query.foodId;
    //  console.log(foodId)
    //   // 取到路由带过来的参数
    //   const routerParams = this.$route.query.foodId
    //   // 将数据放在当前组件的数据内
    //   this.mallInfo.searchMap.mallCode = routerParams;
    //   this.keyupMallName()
    // }
    // getDetail (foodId) {
    //   let foodList=foodsList[foodId]
    // },
    getPrice () {
      let reqParams = {
        buyNumber: this.buyNum,
        period: this.period.value,
      }
      this.$http.post('/api/getPrice', reqParams)
      .then((res) => {          
        this.price = res.data.amount
      })
    },
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
    },
    confirmBuy () {
      let reqParams = {
        buyNumber: this.buyNum,
        period: this.period.value,
        bankId: this.bankId
      }
      this.$http.post('/api/createOrder', reqParams)
      .then((res) => {
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }, (err) => {
        this.isShowBuyDialog = false
        this.isShowErrDialog = true
      })
    }
  },
  mounted () {
    // var foodId = this.$route.query.foodId
    // this.foodId = this.$route.query.foodId;
    // console.log(foodId)
    // // this.getDetail(this.foodId);
    // foodsLists: {
    //   return this.foodsList.filter(function (foodId) {
    //     return foodId = this.foodId;
    //     console.log(foodsLists)
    //   })
    // }
    this.buyNum = 1
    this.period = this.periodList[0]
    this.getPrice()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail-sales {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.sales-board {
  background: #fff;
}
.sales-img{
  width: 220px;
  height: 150px;
  float: left;
}
.sales-board-intro{
  width: 1000px;
  height: 10%;
}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-desa {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-desa p {
  line-height: 1.6;
}
.sales-board-desa h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-desa li {
  padding: 5px 0;
}
.sales-board-desb {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-desb p {
  line-height: 1.6;
}
.sales-board-desb h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: orange;
  color: #fff;
}
.sales-board-table td {
  border: 1px solid #f0f2f5;
  padding: 15px;
}
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: orange;
  color: #fff;
  border: 1px solid orange;
}
</style>
