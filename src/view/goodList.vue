<template>
  <div id="shopping">
      <header-nav></header-nav>
      <bread-nav></bread-nav>
      <div class="accessory-result-page accessory-page">
        <div class="container">

        <!-- 价格排序 响应布局 -->
          <div class="filter-nav">
            <span class="sortby">价格排序:</span>
            <a href="javascript:void(0)" :class="{cur:sortWay}" @click="goodsSort(true)">升序</a>
            <a href="javascript:void(0)" :class="{cur:!sortWay}" @click="goodsSort(false)">降序<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="openOverlay">价格:</a>
          </div>
          <div class="accessory-result">

            <!-- 价格划分表 响应布局-->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':priceShow}">
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd>
                    <a href="javascript:void(0)":class="{cur:priceChecked=='All'}"
                    @click="goodsFilter('All')" >全部</a>
                </dd>
                <dd v-for="(price,index) in priceFilter" :key="index" @click="closeOverlay">
                  <a href="javascript:void(0)" @click="goodsFilter(index)"  
                  :class="{cur:priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- 商品信息 -->
            <div class="accessory-list-wrap" >
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsData" :key="index">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                    <!-- 滚动加载 -->
                  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" 
                    infinite-scroll-distance="20" style="text-align:center;">
                      <img src="/static/loading-svg/loading-bars.svg" style="height:80px;"
                      v-show="!busy">
                  </div>
              </div>
            </div>
          </div>
      </div>      
    <!-- 响应式遮罩层 -->
    <div class="md-overlay" v-show="overLay" @click="closeOverlay"></div>
  
  </div>
  <footer-nav></footer-nav>
  <modal :loginModalFlag="logflag" @closeItem="close">
    <p slot="message">{{shopMsg}}</p>
    <div slot="btn">
        <router-link  v-show="btnMsg" to="/cart" class="btn btn--m" style="width:140px;">前往购物车</router-link>
        <a class="btn btn--m "style="width:140px; position:relative;left:150px;"@click="close">取消
        </a>
    </div>
  </modal>
  </div>
</template>

<script>

    import headerNav from '../components/headerNav'
    import footerNav from '../components/footerNav'
    import breadNav from '../components/breadNav'
    import modal from '../components/modal'
    import axios from 'axios'

    export default{
        data(){
            return{
                //商品信息
                goodsData:[],

                //价格划分参数
                priceFilter:[
                    {
                        startPrice:'0.00',
                        endPrice:'100.00'
                    },
                    {
                        startPrice:'100.00',
                        endPrice:'500.00'
                    },
                    {
                        startPrice:'500.00',
                        endPrice:'1000.00'
                    },
                    {
                        startPrice:'1000.00',
                        endPrice:'5000.00'
                    },
                ],
                priceChecked:"All",
                overLay:false,
                priceShow:false,
                sortWay:true,   

                //分页参数
                page:1,
                pageSize:8,
                sort:true,
                busy:true,

                //弹框模块
                mdshow:false,
                shopMsg:'',
                btnMsg:false,
                logflag:false
            }

        },
        components:{
            headerNav,
            breadNav,
            footerNav,
            modal
        },
        beforeCreate(){
            console.log("beforeCreate")
        },
        created(){
            console.log('created')
            this.getGoodList();
        },
 //测试生命周期       
       mounted(){
            console.log('mounted')
        },
        updated(){
            console.log('updated')
        },
        destroyed(){
            console.log('destroy this component')
        },
        methods:{
            //从服务端获取商品参数信息
            getGoodList(flag){
                let param = {
                    'page':this.page,
                    'pageSize':this.pageSize,
                    'sort':this.sort?1:-1,
                    'priceChecked':this.priceChecked
                }
                axios.get('/goods',{
                    params:param
                }).then((res) =>{
                   console.log('获取数据成功')
                   if(flag == true)
                   {
                        this.goodsData = this.goodsData.concat(res.data.result.list)

                        if(res.data.result.listLength == 0) {this.busy = true}
                        else {this.busy = false}
                   }
                   else
                   {    this.busy = false
                        this.goodsData = res.data.result.list
                   }
                }).catch((err) =>{
                    console.log(err)
                })
            },
            //添加购物车
            addCart(productId){
                axios.post('/goods/addCart',{
                    productId:productId,
                    checked:1
                }).then((res) =>{
                    console.log('添加成功')
                    this.mdshow = true
                    if(res.data.status == '0')
                    {
                        this.shopMsg = "添加成功"
                        this.btnMsg = true
                    }
                    else if(res.data.status == '1000'){
                        this.shopMsg = "当前未登录"
                        this.btnMsg = false
                    }
                    else{
                        this.shopMsg = "添加失败"
                        this.btnMsg = false
                    }
                    this.logflag = true
                }).catch((err) => {
                    console.log(err)
                })
            },
        

           //响应式出现遮罩
            openOverlay(){
                this.overLay = true
                this.priceShow = true
            },
            closeOverlay(){
                this.overLay = false
                this.priceShow = false
            },

            //商品排序
            goodsSort(type){
                this.page = 1;  
                this.sort = type
                this.sortWay = type
                this.getGoodList()
            },

            //滚动加载信息
            loadMore(){
                
                setTimeout(() => {
                    this.page++
                    this.getGoodList(true)
                },500)
            },

            //价格划分
            goodsFilter(index){
                this.page = 1
                this.priceChecked = index
                this.getGoodList()
            },

            //关闭遮罩
            close(){
                this.logflag = false
            }
        }
    }
</script>
