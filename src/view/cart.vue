<template>
<div id="cart">
  <header-nav></header-nav>
  <bread-nav></bread-nav>

  <!-- 删除图标 -->
  <symbol id="icon-del" viewBox="0 0 32 32">
  <title>delete</title>
  <path class="path1"
        d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
  <path class="path2"
        d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
  <path class="path3"
        d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
  <path class="path4"
        d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
  </symbol>

  <div class="container">
    <div class="cart">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>我的购物车</span></h2>
      </div>
      <div class="item-list-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>商品</li>
              <li>价格</li>
              <li>数量</li>
              <li>操作</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in cartList">
              <div class="cart-tab-1">
                <div class="cart-item-check">
                  <a href="javascipt:;" class="checkbox-btn item-check-btn" 
                  :class="{'ischecked':item.checked?true:false}"
                  @click="noChecked(item)">
                  </a>
                </div>
                <div class="cart-item-pic">
                  <img :src="'/static/' + item.productImage">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{item.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{item.salePrice}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub" @click="opreate(-1,item)">-</a>
                      <span class="select-ipt">{{item.productNumber}}</span>
                      <a class="input-sub" @click="opreate(1,item)">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <a href="javascript:;" class="item-edit-btn" @click="deleteComfire(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-foot-wrap">
        <div class="cart-foot-inner">
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascipt:;" @click="checkAll">
                <span class="checkbox-btn item-check-btn":class="{'ischecked':checked}"></span>
                <span>选择全部</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              商品总价: <span class="total-price">{{total}}</span>
            </div>
            <div class="btn-wrap">
              <a class="btn btn--red" style="width:140px;" @click="checkout" >结账</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-nav></footer-nav>
    <modal :loginModalFlag="logflag" @closeItem="close">
    <p slot="message">{{shopMsg}}</p>
    <div slot="btn">
        <a class="btn btn--m" style="width:140px;" @click="del(deleteId)">{{btnMsg}}</a>
        <a class="btn btn--m "style="width:140px; position:relative;left:150px;"@click="close">取消
        </a>
    </div>
  </modal>
  </div>
</div>

</template>
<script type="text/javascript">
  import headerNav from '@/components/headerNav'
  import footerNav from '@/components/footerNav'
  import breadNav from '@/components/breadNav'
  import modal from '../components/modal'
  import axios from 'axios'  

	export default{
		data(){
      return{
        cartList:[],
        price:0,
        logflag:false,
        deleteId:0,
        shopMsg:'',
        btnMsg:'',
        checked:true
      }
    },
    computed:{
      total(){     
        this.price = 0
        for(let item in this.cartList){
          if(this.cartList[item].checked == 1) 
            this.price += (this.cartList[item].salePrice *this.cartList[item].productNumber)
        }
        return this.price
      }
    },
    watch:{
      cartList:{
        handler(){
          for(let item in this.cartList){
            if(this.cartList[item].checked == 0){
              this.checked = false
              return
            }   
            else{
              this.checked = true
            }   
          }
          
        },
        deep:true
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      checkAll(){
        this.checked = !this.checked
        console.log(this.checked)
        if(this.checked == true){ 
          for(let i in this.cartList){
            this.cartList[i].checked = 1 
          }      
        }
        else{
          for(let i in this.cartList){
            this.cartList[i].checked = 0 
          }  
        }
        axios.post('/users/checkAll',{
            checked:this.checked
          }).then((res) => {
            console.log(res.data.msg)
          }).catch((err) => {
            console.log(err)
          })
      },

      noChecked(item){
        item.checked = !item.checked
        let checked = item.checked?1:0
        axios.post('/users/ischecked',{
          checked:checked,
          productId:item.productId
        },).then((res) => {
          console.log(res.data.msg)
        }).catch((err) => {
          console.log(err)
        })
      },
      close(){
        this.logflag = false
        this.deleteFlag = ''
      },
      init(){
        axios.get('/users/cartList').then((res) => {

          if(res.data.status == '1000'){
            this.logflag = true
          }
          else if(res.status == 200){
            this.cartList = res.data.result
            console.log(this.cartList)
          }
          else  console.log("error")
        }).catch((err) => {
          console.log(err)
        })
      },
      opreate(type,item){
        if(type == 1) item.productNumber++
        else{
          if(item.productNumber == 1) return
            item.productNumber --
        }

        axios.post('/users/opreateCart',{
          type:type,
          productNumber:item.productNumber,
          productId:item.productId
        }).then((res) => {
        
        }).catch((err) => {
          console.log(err)
        })
      },
      deleteComfire(item){

        this.logflag = true
        this.deleteId = item.productId
        this.shopMsg = '确认删除此商品吗'
        this.btnMsg = '删除'
        
      },
      del(item){
        console.log(item)
        axios.post('/users/deleteGoods',{
          productId:item
        }).then((res) => {
          if(res.status == 200){
            this.init()
            this.logflag = false
            this.shopMsg = '确认删除此商品吗'
            this.btnMsg = '删除'
          }
          else console.log("删除失败")
        }).catch((err) => {
          console.log(err)
        })
      },
      checkout(){
        this.logflag = true
        if(this.total == 0){
          this.shopMsg = '金额不能为零'
          this.btnMsg = '确定'
        }
        else{
          this.$router.push('/checkout')
        }
      }
    },
    components:{
      headerNav,
      breadNav,
      footerNav,
      modal
    }
	}
</script>

<style>
    .input-sub,.input-add{
      min-width: 40px;
      height: 100%;
      border: 0;
      color: #605F5F;
      text-align: center;
      font-size: 16px;
      overflow: hidden;
      display: inline-block;
      background: #f0f0f0;
    }
    .item-quantity .select-self-area{
      background:none;
      border: 1px solid #f0f0f0;
    }
    .item-quantity .select-self-area .select-ipt{
      display: inline-block;
      padding:0 3px;
      width: 30px;
      min-width: 30px;
      text-align: center;
    }
    .ischecked{
      background-color: #ee7a23;
    }
</style>