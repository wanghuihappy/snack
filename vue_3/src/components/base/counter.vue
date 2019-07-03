<template>
    <div class="counter-component">
      <div class="counter-btn" @click="minus"> - </div>
      <div class="counter-show">
        <input type="text" v-model="number" @keyup="fixNumber">
      </div>
      <div class="counter-btn" @click="add"> + </div>
    </div>
</template>

<script>
export default {
  props: {//调用该组件时，传入最大最小值，默认为5,1
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {//number默认值为最小值
      number: this.min
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },
  methods: {
    fixNumber () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
        //将所有不是数字的number删除掉替换掉
      }
      else {
        fix = this.number
      }
      if (fix > this.max || fix < this.min) {
        //若大于最大值或小于最小值，则重置为最小值
        fix = this.min
      }
      this.number = fix
    },
    minus () {
      if (this.number <= this.min) {
        return
      }
      this.number --
    },
    add () {
      if (this.number >= this.max) {
        return
      }
      this.number ++
    }
  }
}
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: orange;
  background: orange;
  color: #fff;
}

</style>
