<!--
 * @Description: GoodsDetail 商品详情页组件 （由于是Mock数据->通过上级页面通过路由的query传值）
 * @FilePath: /src/components/goodsDetail/GoodsDetail.vue
 -->

<template>
  <div id="goodsDetail">
    <van-nav-bar :title="$t('goodsDetail.goodsDetail')"
                 :fixed=true
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div class="goodsDetailWrapper">
      <!-- 商品图 -->
      <div class="goodsImage">
        <img :src="goodsInfo.small_image" alt="">
      </div>

      <!-- 商品信息 -->
      <div class="productInfo">
        <div class="title">{{goodsInfo.name}}</div><!-- 标题 -->
        <div class="subTitle">{{goodsInfo.spec}}</div><!-- 子标题 -->
        <span class="originPrice">{{goodsInfo.origin_price | moneyFormat}}</span><!-- 原价 -->
        <span class="price">{{goodsInfo.price}}</span><!-- 现价 -->
        <span class="totalSales">{{$t('goodsDetail.sold')}}:{{goodsInfo.total_sales}}</span><!-- 已售数量 -->
        <!-- 商品提示 -->
        <van-divider />
        <div class="shippingInfo">
          <van-icon name="cluster-o" />{{$t('goodsDetail.goodsTips')}}</div>
        <!-- 最快送达时间 -->
        <van-divider />
        <div class="shippingInfo">
          <van-icon name="clock-o" />{{$t('goodsDetail.quickTime')}}</div>
      </div>

      <!-- 规格说明 -->
      <div class="specifications">
        <div class="specificationsTitle">{{$t('goodsDetail.specifications')}} </div>
        <!-- 保存条件 -->
        <van-divider dashed />
        <div class="conditions">
          <span>{{$t('goodsDetail.preservationConditions')}}</span>
          <span class="conditionsOne">{{$t('goodsDetail.coldStorage')}}</span>
        </div>
        <!-- 保质期 -->
        <van-divider dashed />
        <div class="conditions">
          <span>{{$t('goodsDetail.shelfLife')}}</span>
          <span class="conditionsTwo">{{$t('goodsDetail.day')}}</span>
        </div>
        <van-divider dashed />
      </div>

      <!-- 商品详情图 -->
      <div class="showGoods">
        <!-- 选中商品图 -->
        <img :src="goodsInfo.small_image"
             alt="">
        <!-- 统一说明图 -->
        <img src="../../images/home/defaultImg.jpg"
             alt="">
      </div>

      <!-- 底部商品导航    -->
      <van-goods-action :safe-area-inset-bottom=true
                        style="z-index:100">
        <van-goods-action-icon icon="cart-o"
                               :info="goodsNum"
                               @click="onClickCar" />
        <van-goods-action-button type="warning"
                                 :text="$t('goodsDetail.addToCar')"
                                 @click="onClickAddToCar" />
      </van-goods-action>
    </div>

    <!-- 回到顶部按钮 -->
    <v-top />
  </div>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from 'vuex'

export default {
  created () {
  },
  mounted () {
    console.log();

  },
  data () {
    return {
      // 商品详情
      goodsInfo: this.$route.query,
    }
  },
  computed: {
    ...mapState(['shopCart']),
    // 购物车商品数量
    goodsNum () {
      let num = 0;
      Object.values(this.shopCart).forEach((goods, index) => {
        num += goods.num;
      });
      if (num > 0) {
        return num;
      }
    }
  },
  components: {

  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    // 返回
    onClickLeft () {
      this.$router.go(-1);
    },
    // 加入购物车
    onClickAddToCar () {
      this.ADD_TO_CART(this.goodsInfo);
    },
    // 点击了购物车
    onClickCar () {
      this.$router.push({ name: 'cart' });
    }
  }
}
</script>

<style lang="less" scoped>
#goodsDetail {
  background-color: #f5f5f5;
  .goodsDetailWrapper {
    overflow: hidden;
    margin-top: 2.7rem;
    .goodsImage {
      width: 100%;
      img {
        width: 100%;
        height: 80%;
      }
    }
    .productInfo {
      background-color: white;
      padding: 0.5rem;
      .title {
        color: black;
        font-size: 0.8rem;
      }
      .subTitle {
        padding: 0.5rem 0;
        color: grey;
        font-size: 0.6rem;
      }
      .originPrice {
        color: #e25450;
        padding-right: 0.5rem;
        font-size: 0.8rem;
      }
      .price {
        color: grey;
        font-size: 0.5rem;
        text-decoration: line-through;
      }
      .totalSales {
        float: right;
        color: #e25450;
        font-size: 0.8rem;
      }
      .shippingInfo {
        font-size: 0.6rem;
        height: 0.8rem;
        color: grey;
      }
    }
    .specifications {
      width: 100%;
      background-color: white;
      margin-top: 1rem;
      padding-left: 0.5rem;
      .specificationsTitle {
        padding-top: 1rem;
        font-size: 1rem;
        color: black;
      }
      .conditions {
        font-size: 0.6rem;
        height: 1rem;
        color: grey;
        .conditionsOne {
          padding-left: 2rem;
        }
        .conditionsTwo {
          padding-left: 2.5rem;
        }
      }
    }
    .showGoods {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
