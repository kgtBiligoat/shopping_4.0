<template>
	<div>
		<header-nav></header-nav>
		<bread-nav></bread-nav>
    <div class="checkout">
      <div style="display: flex;align-items:center;flex-direction:column;">
        <p style="color:red;font-size:50px;margin-bottom:30px;">购买成功</p>
        <p style="">{{time}}秒后返回主页</p>
      </div>
    </div>
		<footer-nav></footer-nav>
  </div>
</template>
<style>
  p{
    font-size: 40px;
  }
  .checkout{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:50px 0px 50px 25%;
    width: 50%;
    height: 400px;

  }
</style>
<script>
  import headerNav from '../components/headerNav'
  import footerNav from '../components/footerNav'
  import breadNav from '../components/breadNav'
  import modal from '../components/modal'

  export default{
    data(){
      return{
        time:5
      }
    }, 
    mounted(){
      this.init()
    },
    methods:{
      init(){
        this.time = 5
        this.gotoHome()
      },
      gotoHome(){
        let clear = setInterval(() => {
           this.time--
           if(this.time == 0){
            clearInterval(clear)
            this.$router.push('/')
           } 
        },1000)
      }
    },
    components:{
      headerNav,
      footerNav,
      breadNav,
      modal
    },
  }
</script>
