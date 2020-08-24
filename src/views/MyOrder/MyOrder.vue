<!--
 * @Description: 我的->我的订单
 * @FilePath: /src/views/mine/Children/MyOrder.vue
 -->
<template>
  <div class="myOrder">
    <!--顶栏-->
    <van-nav-bar :title=" $t('mine.myOrders')"
                 :border=false
                 :fixed="true"
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    <!--标签栏-->
    <van-tabs v-model="active"
              swipeable
              sticky
              animated
              :border="true"
              :offset-top="45"
              ref="tabs"
              type="line"
              color="#28BE57"
              title-active-color="#28BE57">
      <!-- 全部 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[0]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待支付 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[1]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待收货 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[2]}}</span>
        </div>
        <OrderType :orderTypeDataArray="PurchasedList" /><!-- 引入 Purchased 数据-->
      </van-tab>
      <!-- 待评价-->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[3]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
    </van-tabs>
    <!-- 路由出口 -->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
import OrderType from './OrderType'
// 引入Vuex
import { mapMutations, mapState } from 'vuex'
import {getHomeData} from "@/serve/api";

export default {
  props: {

  },
  computed: {
    ...mapState(['Purchased'])
  },
  data () {
    return {
      typeArray: [],  // 订单数据样式
      PurchasedList: [], // 已购订单列表
      // 路由传递过来的数据 active
      active: this.$route.params.active,
      itemsTitle: this.$t('mine.itemsTitle'),
    }
  },
  mounted(){
    //初始化订单数据
    this.INIT_ORDER()
    // 初始化传入的订单数据
    this._initData()
  },
  components: {
    OrderType
  },
  methods: {
    ...mapMutations(['INIT_ORDER']),

    // 类似Home组件一样定义不同的typeArray，并在上方进行匹配
    onClickLeft () {
      this.$router.back();
    },
    // 传入订单数据[全部 待支付 待收货√ 待评价]
    async _initData () {
      this.PurchasedList = this.Purchased
    }
  }
}
</script>

<style lang="less" scoped>
.myOrder {
  .van-tabs {
    height: 90px;
    background-color: #f5f5f5;
  }

  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}
</style>
