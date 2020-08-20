<!--
 * @Description: 订单模块
 * @FilePath: /src/views/order/Order.vue
 -->
<template>
  <div id="order">
    <!-- 顶部返回栏 -->
    <van-nav-bar :title="$t('order.inputForm')"
                 left-arrow
                 :fixed=true
                 @click-left="onClickLeft" />

    <!-- 选择收货地址 -->
    <van-contact-card :type="address_type"
                      :add-text="$t('order.location')"
                      :name="address_name"
                      :tel="address_phone"
                      @click="chooseAddress"
                      style="margin-top:3rem" />

    <!-- 所选商品 -->
    <van-cell-group>
      <!-- 商品缩略图 -->
      <div class="wrapper"
           @click="goToGoodsList">
        <div class="productImageWrapper"
             ref="productImageWrapper">
          <ul class="imageWrapper"
              ref="imageWrapper">
            <li ref="subWrapper"
                style="display:inline"
                v-for="(item,index) in goods"
                :key="index">
              <img :src="item.smallImage"
                   alt="">
            </li>
          </ul>
        </div>
        <ul class="productCount">
          {{selectedCount}}
          <van-icon name="arrow" />
        </ul>
      </div>

      <!-- 送达时间 -->
      <!--
      <van-cell :title="$t('order.arrivalTime')"
                :value="deliveryTime"
                is-link
                @click="showTimePickView">
        <template slot="label">
          <span class="custom-title">{{$t('order.outTimeGetMoney')}}</span>
          <van-icon name="question-o" />
        </template>
      </van-cell>
      <!- - 送货时间区间选择器 - ->
      <TimeIntervalList ref="timeInterval"
                        :showDateTimePopView="showDateTimePopView"
                        @changeData="changeData(arguments)"></TimeIntervalList>
      -->
    </van-cell-group>

    <!-- 支付方式选择 -->
    <van-radio-group v-model="radio">
      <van-cell-group :title="$t('mine.payMethod')">
        <!--微信支付-->
        <van-cell clickable
                  @click="radio = '1'">
          <template slot="title">
            <img src="./../../images/order/wx.png"
                 alt=""
                 width="32"
                 height="32"
                 style=" vertical-align: middle;padding-right:5px">
            <span>{{$t('order.wechatPay')}}</span>
          </template>
          <van-radio slot="right-icon"
                     name="1"
                     checked-color="#07c160" />
        </van-cell>
        <!--支付宝支付-->
        <van-cell clickable
                  @click="radio = '2'">
          <template slot="title">
            <img src="./../../images/order/zfb.png"
                 alt=""
                 width="32"
                 height="32"
                 style=" vertical-align: middle;padding-right:5px">
            <span>{{$t('order.aliPay')}}</span>
          </template>
          <van-radio slot="right-icon"
                     name="2"
                     checked-color="#07c160" />
        </van-cell>
        <!--花呗支付-->
        <van-cell clickable
                  @click="radio = '3'">
          <template slot="title">
            <img src="./../../images/order/hb.png"
                 alt=""
                 width="32"
                 height="32"
                 style=" vertical-align: middle; padding-right:5px">
            <span>{{$t('order.huabeiPay')}}</span>
          </template>
          <van-radio slot="right-icon"
                     name="3"
                     checked-color="#07c160" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 优惠券及积分满减 -->
    <!--<van-cell-group style="margin-top: 0.6rem">
      <van-coupon-cell :coupons="coupons"
                       :chosen-coupon="chosenCoupon"
                       @click="showList = true" />

      <van-cell>
        <!- - 优惠券列表 - ->
        <van-popup v-model="showList"
                   position="bottom">
          <van-coupon-list :coupons="coupons"
                           :chosen-coupon="chosenCoupon"
                           @change="onChange"
                           @exchange="onExchange" />
        </van-popup>
        <span slot="title">{{$t('order.use')}}{{integral}}{{$t('order.order12')}}<b>{{integralToprice | moneyFormat}}</b></span>
        <van-switch v-model="checked"
                    slot="right-icon"
                    @input="onInput"
                    active-color="#07c160" />
      </van-cell>
    </van-cell-group>-->

    <!-- 备注 -->
    <van-cell-group style="margin-top: 0.6rem">
      <van-field
          rows="2"
          autosize=""
          :label="$t('order.mark')"
          type="textarea"
          maxlength="30"
          :placeholder="$t('order.tip')"
          show-word-limit
      />
    </van-cell-group>

    <!-- 商品费用 -->
    <van-cell-group style="margin-top: 0.6rem">
      <!--商品金额-->
      <van-cell :title="$t('order.totalMoney')">
        <div class="money">{{(selectedTotalPrice/100) |moneyFormat }}</div>
      </van-cell>
      <!--配送费-->
      <van-cell :title="$t('order.sendMoney')">
        <div class="money">{{sendPrice/100 |moneyFormat}}</div>
      </van-cell>
      <!--积分-->
      <!--<van-cell :title="$t('order.point')"
                v-show="isShowPreferential">
        <div class="integralToMoney">-{{integralToprice | moneyFormat}}</div>
      </van-cell>-->
    </van-cell-group>

    <!-- 提交订单 -->
    <van-submit-bar :price="actualPrice"
                    :label="$t('order.pay')"
                    :button-text="$t('order.sendForm')"
                    @submit="onSubmit" />

    <!-- 路由出口 -->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Toast, Dialog } from 'vant';
import { getLocalStore } from '@/config/global'
// 引入地址订阅
import { CHOOSE_USER_ADDRESS } from '@/config/pubsub_type'
import PubSub from 'pubsub-js'
// 送货时间区间组件
import TimeIntervalList from './children/TimeIntervalList'
import {SELECTED_GOODS} from "@/store/mutation-type";

export default {
  // 数据
  data () {
    return {
      address_type: 'add',           //地址卡片类型
      address_name: null,            // 收货人
      address_phone: null,           // 收货人电话
      address_id: null,              // 收货人地址ID

      radio: '1',                    // 支付方式  
      sendPrice: 500                 // 配送费

      //checked: false,                // 积分兑换开关 //d
      //isShowPreferential: false,     // 展示积分兑换 //d
      //integral: 800,                // 积分         //d
      //showList: false,              // 展示优惠列表  //d
      /*
      deliveryTime: this.$t('order.deliveryTime'), //送达时间
      showDateTimePopView: false,     // 时间选择器
      coupons: [{
        available: 1,
        condition: this.$t('mine.condition'),
        reason: '',
        value: 150,
        name: this.$t('mine.bill'),
        startAt: 1549104000,
        endAt: 1614592000,
        valueDesc: '1.5',
        unitDesc: '元'
      }, {
        available: 1,
        condition: this.$t('mine.condition'),
        reason: '',
        value: 200,
        name: this.$t('mine.bill'),
        startAt: 1549104000,
        endAt: 1614592000,
        valueDesc: '2',
        unitDesc: '元'
      }],                           // 优惠券信息
      chosenCoupon: -1,               // 选中优惠券
      */
    };
  },

  // 计算
  computed: {
    // 数量
    ...mapGetters({
      selectedCount: 'SELECTED_GOODS_COUNT',
      goods: 'SELECTED_GOODS',
      selectedTotalPrice: 'SELECTED_GOODS_PRICE'
    }),
    // 实际价格
    actualPrice () {

      let finalPrice;
      finalPrice=this.selectedTotalPrice + this.sendPrice;
      return finalPrice;//add

      // 如果用户使用积分兑换或使用优惠券
      /*
      if (this.checked) {
        let discountsPrice = this.integralToprice.toFixed(2).toString().replace('.', '');
        finalPrice = this.selectedTotalPrice - discountsPrice;
      } else {
        finalPrice = this.selectedTotalPrice;
      }
      // 是否选择优惠券
      if (this.chosenCoupon > -1) {
        return finalPrice - this.coupons[this.chosenCoupon].value;
      } else {
        return finalPrice;
      }
      */
    },

    // 计算积分兑换人民币
    /*
    integralToprice () {
      if (this.integral > 0) {
        return (this.integral / 100);
      }
    },
    */
  },

  // 挂载请求
  mounted () {
    // 初始化本地购物车数据
    this.INIT_SHOP_CART();
    // 有商品才加载可滑动组件
    if (this.goods.length > 0) {
      this.$nextTick(() => {
        this._initScroll();
      });
    }
    // 订阅发布的通知
    PubSub.subscribe(CHOOSE_USER_ADDRESS, (msg, data) => {
      if (msg === CHOOSE_USER_ADDRESS) {
        // 修改卡片类型
        this.address_type = 'edit';
        this.address_name = data.name;
        this.address_phone = data.tel;
        this.address_id = data.id;
      }
    });
  },

  // 组件
  components: {
    //TimeIntervalList //d
  },
  // 创建
  created(){

  },
  // 方法
  methods: {
    // 初始化本地购物车数据
    ...mapMutations(['INIT_SHOP_CART','INIT_ORDER']),

    // 1.初始化滚动视图
    _initScroll () {
      if (!this.productImageScroll) {
        this.$refs.imageWrapper.style.width = (this.$refs.subWrapper.length * 60) + 'px';
        this.productImageScroll = new BScroll(this.$refs.productImageWrapper, {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true,
        });
      } else {
        this.productImageScroll.refresh();
      }
    },

    // 2.返回到上个界面
    onClickLeft () {
      this.$router.back();
    },

    // 3.商品清单
    goToGoodsList () {
      this.$router.push({ name: 'orderGoodsList' })
    },

    // 4.选择地址
    chooseAddress () {
      this.$router.push('/order/myAddress');
    },

    // 5.提交订单
    onSubmit(){
      if (!this.address_name) {
        Toast({
          message: '请选择收货地址',
          duration: 800
        });
      }
      else{
        let instance = Toast('订单'+'提交成功');

        setTimeout(() => {
          instance.close();
          // 添加到已购订单
              /*let addressID = this.addressID().toString();
              let demo=this.chooseAddress;
              content['id'] = addressID;
              content['address'] = content.province + content.city + content.county + content.addressDetail;
              this.ADD_USER_SHOPPING_ADDRESS({
                addressID,
                content
              });
              this.$router.back();
            },
            // 生成不重复的id
            addressID () {
          var lastUuid = 0;
          return (new Date()).getTime() * 1000 + (lastUuid++) % 1000;
        }*/
          // 显示订单支付情况
          this.$router.push('../payment/Payment');
        }, 800)
      }
    },

    // 4.switch开关
    /*onInput (checked) {
      let discountsPrice = this.integralToprice * 100;
      // 4.1 判断积分使用条件是否满足
      if (discountsPrice > this.selectedTotalPrice) {
        // 4.2不能使用积分
        Dialog.alert({
          message: '您的实际价格小于积分兑换价格,建议您在多买几件'
        }).then(() => {
          this.checked = false;
        });
      } else {
        this.isShowPreferential = !this.isShowPreferential;
      }
    },*/

    // 选择优惠券
    /*onChange (index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    // 优惠券兑换
    onExchange (code) {
      this.coupons.push(coupon);
    },
    // 显示时间选择器
    showTimePickView () {
      this.showDateTimePopView = true;
    },
    changeData () {
      this.showDateTimePopView = arguments[0][0];
      this.deliveryTime = arguments[0][1];
    }*/
  },

  // 销毁订阅地址
  beforeDestroy () {
    PubSub.unsubscribe(CHOOSE_USER_ADDRESS);
  }
}

</script>
<style lang="less" scoped>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin-bottom: 5rem;
  .wrapper {
    height: 4rem;
    width: 100%;
    position: relative;
    .productImageWrapper {
      display: flex;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: start;
      height: 4rem;
      width: 80%;
      overflow: hidden;
      .imageWrapper {
        flex-wrap: nowrap;
        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }
    .productCount {
      right: 0.1rem;
      top: 1.5rem;
      position: absolute;
      color: grey;
    }
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
