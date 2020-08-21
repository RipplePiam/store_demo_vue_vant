<!--
 * @Description: 我的->我的订单->订单类型
 * @FilePath: /src/views/mine/Children/MyOrderChildren/OrderType.vue
 -->
<template>
  <div id="orderType">
    <!--有订单的情况-->
    <div v-if="orderTypeDataArray.length>0"><!--修改orderTypeDataArray-->
      <!--something-->
      <div v-for="(purchasedlist, index) in orderTypeDataArray"
           key="index">
        <!--<van-card
            num="{{purchasedlist.num}}"
            price="{{purchasedlist.finalPrice}}"
            desc=""
            title="{{purchasedlist.name}}"
            thumb="{{purchasedlist.smallImage}}"
        />-->
      </div>
    </div>
    <!--没有订单的情况-->
    <div v-else
         class="noDataPlaceHold">
      <img src="./../../../../images/mine/noData.jpeg"
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
  margin-top: 5rem;
  height: 20rem;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
      height: 60%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
    }
  }
  .noData {
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
</style>
