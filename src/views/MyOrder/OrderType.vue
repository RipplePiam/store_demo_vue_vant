<!--
 * @Description: 我的->我的订单->订单类型
 * @FilePath: /src/views/mine/Children/OrderType.vue
 -->
<template>
  <div id="orderType">
    <!--有订单的情况-->
    <div v-if="orderTypeDataArray.length > 0 ">

      <div v-for="(list, index) in orderTypeDataArray"
           :key="index">
        <!--订单编号-->
        <div class="listitle">
          <span>{{$t('order.order')}}</span>
          <span class="id">{{list.orderID}}</span>
        </div>
        <!--送货地址-->
        <van-cell
            icon="location-o"
            :title="list.orderAddress.name + list.orderAddress.tel"
            :label="list.orderAddress.address"
        />
        <!--商品卡片列表-->
        <div v-for="(product,index) in list.products"
             :key="index">
            <van-card
                class="card"
                :thumb="product.smallImage"
                :title="product.name"
                :num="product.num"
                :price="product.price"
            />
        </div>
        <van-cell-group>
          <!--备注信息-->
          <van-cell center
                    border
                    :title="$t('order.mark')"
                    :label="list.message" />
          <!--实付总价-->
          <van-cell
              icon="shop-o"
              border
              :title="$t('order.finalPrice')"
              :value="list.finalPrice/100 | moneyFormat"
          />
        </van-cell-group>
      </div>
    </div>

    <!--没有订单的情况-->
    <div v-else
         class="noDataPlaceHold">
      <img src="../../images/mine/noData.jpeg"
           alt="">
      <span class="desc">{{$t('mine.feedbackTip')}}</span><!--msg:暂时还没有相关订单-->
    </div>
  </div>
</template>

<script type="text/javascript">

export default {

  props: {
    orderTypeDataArray: Array
  },
  computed: {

  },
  mounted () {

  },
  data () {
    return {
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
#orderType {
  margin-top: 2.8rem;
  height: 100%;

  .listitle { //'订单号'标题栏
    padding-left: 0.5rem;
    margin-top: 1rem;
    height: 1.5rem;
    width: auto;
    line-height: 1.5rem;
    background-color: white;
    border-bottom: solid 0.01rem #e8e9e8;
    font-size: 0.8rem;
    .id { // 订单号码
      padding-right: 10rem;
      font-size: 0.8rem;
      float: right;
    }
  }
  .card{
    font-size:0.8rem;
    background-color: whitesmoke;
  }
  .noDataPlaceHold {  // 无订单
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: 60%;
      padding-top: 2.5rem;
    }
    .desc {
      color: grey;
      font-size: 0.8rem;
    }
  }
}
</style>
