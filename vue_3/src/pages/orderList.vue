<template>
  <div class="order-wrap">
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @change="changeStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @change="changeEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import VDatePicker from '../components/base/datepicker'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VDatePicker
  },
  data () {
    return {
      query: '',
      productId: 0,
      startDate: '',
      endDate: '',
      products: [
        {
          label: '肉食卤味',
          value: 0
        },
        {
          label: '坚果干货',
          value: 1
        },
        {
          label: '蛋糕面包',
          value: 2
        },
        {
          label: '糖果布丁',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'//key取什么样的字段
        },
        {
          label: '购买食品',
          key: 'product'
        },
        {
          label: '食品口味',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      currentOrder: 'asc',
      tableData: []
    }
  },
  watch: {
    query () {
      this.getTableData()
    }
  },
  methods: {
    productChange (obj) {
      this.productId = obj.value
      this.getTableData()
    },
    changeStartDate (date) {
      this.startDate = date
      this.getTableData()
    },
    changeEndDate (date) {
      this.endDate = date
      this.getTableData()
    },
    getTableData () {
      let reqParam = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.post('/api/getOrderList',reqParam).then((res) => {
        this.tableData = res.data.list
      }, (err) => {

      })
    },
    changeOrder (headItem) {//升降序排列
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData =_.orderBy(this.tableData,headItem.key,this.currentOrder)//order方法 第一个参数是要排序的数组 第二个参数根据哪一个项目（列）进行排序，第三个参数排序的方式（正序或者倒序）
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: orange;
  color: #fff;
  border: 1px solid orange;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>