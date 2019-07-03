<template>
  <div class="login-form">
    <!--g-form样式写在了layout全局样式里-->
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名: </span>
        <div class="g-form-input">
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel:'',
      passwordModel:'',
      errorText:''
    }
  },
  computed: {
    userErrors () {
      let errorText,status
      if (!/@/g.test(this.usernameModel)) {//正则
        status = false
        errorText = '不包含@'
      }
      else {
        status = true
        errorText = ''
      }
      //解决开始就报错问题
      if (!this.userFlag) {//第一次进来，errorText为空
        errorText = ''
        this.userFlag = true//只有刷新可以再进来
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText,status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {//第一次进来，errorText为空
        errorText = ''
        this.passwordFlag = true//只有刷新可以再进来
      }
      return {
        status,
        errorText
      }
    }
  },
  methods:{
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      }
      else{
        this.errorText = ''//清空
        //采用ajax
        this.$http.get('api/login').then((res) => {//正确的回调
          this.$emit('has-log',res.data)//发送事件
        }, (error) => {
          console.log(error)
        })    
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
