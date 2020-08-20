<!--
@Description: 支付成功页
-->
<template>
  <div class="payment">
    <!-- 顶部返回栏 -->
    <van-nav-bar :title="$t('order.payStatus')" :fixed=true />

    <div class="image">
      <!--支付成功图片-->
      <img src="../../images/payment/paysuccess.png"  alt=""/>
    </div>

    <van-cell-group class="payment-cell-group">
      <!--订单价格-->
      <van-cell>
        <van-row type="flex" justify="space-between">
          <van-col>实付金款</van-col>
          <van-col class="payment-price">{{ (actualPrice/100) |moneyFormat}}</van-col>
        </van-row>
      </van-cell>
      <!--配送方式-->
      <van-cell>
        <van-row type="flex" justify="space-between">
          <van-col span="21">配送方式</van-col>
          <van-col style="-webkit-text-fill-color: #ee0a24;">快递</van-col>
        </van-row>
      </van-cell>
    </van-cell-group>

    <!--商品详细-->
    <div class="listitle">
      <span>{{$t('order.goods')}}</span>
      <span class="total">{{selectedCount}}</span>
    </div>
    <ul>
      <li class="goodsList"
          v-for="(item,index) in goods"
          :key=index>
        <div class="listItem">
          <img :src="item.smallImage"
               alt="">
        </div>
        <div class="textDetail">
          <p class="name">{{item.name}}</p>
          <span class="subParam">{{$t('order.sigalPrice')}}{{item.price | moneyFormat}}</span>
          <span class="subParam">{{$t('order.numbers')}}{{item.num}}</span>
        </div>
        <div class="goodPrice">{{item.price*item.num | moneyFormat}}</div>
      </li>
    </ul>
    <!--提交按钮-->
    <van-submit-bar button-text="返回主页" button-color="#07c160" @submit="onSubmit"/>
    <van-cell class="empty" />

    <!--路由的出口-->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  data() {
    return{
      sendPrice: 500  // 配送费
    }
  },
  computed: {
    // 从store中取选中的商品信息
    ...mapGetters({
      selectedCount: 'SELECTED_GOODS_COUNT',
      goods: 'SELECTED_GOODS',
      selectedTotalPrice: 'SELECTED_GOODS_PRICE'
    }),
    actualPrice () {
      let finalPrice;
      finalPrice=this.selectedTotalPrice + this.sendPrice;
      return finalPrice;
    }
  },
  methods: {
    //
    onSubmit() {
      this.$router.push('../Dashboard/home');
    }
  }
}
</script>

<style lang="less">

.payment {
  .image{
    text-align: center;
    img{
      vertical-align:middle;
      width: 40%;
      height: 40%;
      margin-top:3rem;
    }
  }

  &-price {
    color: #ee0a24;
    font-size: 15px;
  }

  &-cell-group {
    margin: 15px 0;
  }

  .listitle {
    padding-left: 0.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 100%;
    background-color: white;
    border-bottom: solid 0.01rem #e8e9e8;
    font-size: 0.9rem;
    .total {
      padding-right: 2rem;
      font-size: 0.9rem;
      float: right;
    }
  }
  .goodsList {
    display: flex;
    height: 3rem;
    width: 100%;
    background-color: white;
    border-bottom: solid 0.01rem #e8e9e8;
    .listItem {
      height: 3rem;
      width: 10%;
      img {
        padding: 0.5rem;
        width: 100%;
        height: 2.5rem;
      }
    }
    .textDetail {
      height: 3rem;
      width: 70%;
      padding-left: 0.9rem;
      .name {
        font-size: 0.8rem;
        padding: 0.3rem 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .subParam {
        font-size: 0.6rem;
        color: grey;
        padding-right: 0.5rem;
      }
    }
    .goodPrice {
      padding-top: 0.3rem;
      font-size: 0.8rem;
    }
  }
  .empty{
    height: 3rem;
  }
}
</style>