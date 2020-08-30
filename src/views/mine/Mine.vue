<!--
 * @Description: 我的
 * @FilePath: /src/views/mine/Mine.vue
 -->
<template>
  <div id="mine">
    <van-nav-bar :title="$t('mine.title')"
                 :fixed=true
                 :border=false
                 style="height:2.5rem" />
    <van-cell-group style="margin-top:2.4rem">
      <van-cell style="background-color: #3bba63;color:#FFF;"
                label-class="labelClass"
                is-link
                center>
        <template slot="title">
          <!-- 已登录状态 -->
          <div class="personMsg"
               v-if="userInfo.token"
               @click="goToPage('userCenter')">
            <img class="iconImage"
                 :src="user_image.login_icon"
                 alt="">
            <div class="sex"
                 v-if="userInfo.sex">
              <img :src="userInfo.sex==='1'?user_image.female:user_image.male"
                   alt="">
            </div>
            <div class="personInfo"
                 v-if="userInfo.token">
              <span>{{userInfo.user_name}}</span>
              <span>{{$t('mine.phone')}}：{{phoneNumber}}</span>
            </div>
          </div>
          <!-- 未登录状态 -->
          <div class="personMsg"
               v-if="!userInfo.token">
            <img class="iconImage"
                 :src="user_image.noLogin_icon"
                 alt="">
            <div class="personInfo"
                 v-if="!userInfo.token">
              <div @click="goToPage('login')">{{$t('mine.login')}}</div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 订单相关-->
    <van-cell-group>
      <!--我的订单-->
      <van-cell :title="$t('mine.myOrder')"
                icon="label"
                :value="$t('mine.allOrder')"
                is-link
                @click="goTomyOrder(-1)">
      </van-cell>
      <!--4个icon订单状态-->
      <van-grid :border=false :column-num="3"><!--自定义3列，不显示边框-->
        <van-grid-item
            v-for="(order,index) in orderData"
            :key="index"
            :icon="order.icon"
            :text="$t(order.title)"
            @click="goTomyOrder(index)" />
      </van-grid>
    </van-cell-group>

    <van-cell-group style="margin-top:0.4rem">

      <!--我的收货地址-->
      <van-cell :title="$t('mine.myLocation')"
                icon="todo-list"
                is-link
                @click="goToPage('myAddress')" />
    </van-cell-group>


    <van-cell-group style="margin-top:0.4rem">
      <!-- 意见反馈 -->
      <van-cell :title="$t('mine.feedback')"
                icon="comment-circle"
                is-link
                @click="onFeedBack" />
    </van-cell-group>
    <!--版本信息-->
    <div class="version">{{$t('mine.version')}}{{version}}</div>
    <!--路由的出口-->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
// 引入vuex
import { mapState } from 'vuex'
import { Dialog, Toast } from 'vant'
import { _VERSION_ } from '@/config/global'

export default {
  data () {
    return {
      // 头像
      user_image: {
        login_icon: require('./../../images/mine/defaultImg.jpg'),
        noLogin_icon: require('./../../images/login/user.png'),
        female: require('./../../images/mine/female.png'),
        male: require('./../../images/mine/male.png')
      },
      // 订单状态
      orderData: [
        { icon: 'cart-circle-o', title: 'mine.itemsTitle[1]' },
        { icon: 'gift-o', title: 'mine.itemsTitle[2]' },
        { icon: 'smile-comment-o', title: 'mine.itemsTitle[3]' }//,
        //{ icon: 'cash-back-record', title: 'mine.waitingFeedback' }//d
      ],
      // 版本信息
      version: _VERSION_,
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['userInfo']),
    phoneNumber () {
      // 设置隐藏手机号中间四位
      let mobile = String(this.userInfo.phone)
      let reg = /^(\d{3})\d{4}(\d{4})$/
      return mobile.replace(reg, '$1****$2')
    }
  },
  methods: {
    // 跳转到我的订单
    goTomyOrder (index) {
      this.$router.push({ name: "myOrder", params: { active: index + 1 } });//add
      /*if (index !== 3) {
        return this.$router.push({ name: "myOrder", params: { active: index + 1 } });
      }
      // 跳转到售后退款界面
      Toast({
        message: this.$t('mine.unrealized'),
        duration: 1500 //持续时间
      })*/ //d
    },
    goToPage (name) {
      this.$router.push({ name });
    },
    // 意见反馈
    onFeedBack () {
      Dialog.alert({
        title: this.$t('mine.tip3'),
        message: this.$t('mine.tip4'),
        confirmButtonText: this.$t('mine.tip2')
      }).then(() => {
        // on close
      });
    }
  }
}
</script>

<style lang="less" scoped>
#mine {
  width: 100%;
  background-color: #f5f5f5;
  margin-bottom: 3rem;
  /*版本信息*/
  .version {
    margin: 0 auto;
    text-align: center;
    font-size: 0.6rem;
    background-color: #ffffff;
    height: 2rem;
    color: grey;
    line-height: 2rem;
  }
  /*顶部标题栏*/
  .van-nav-bar {
    background-color: #3bba63;//#3bba63
    font-size: 0.6rem;
  }
  .van-nav-bar__title {
    color: white;
  }
  /*个人信息栏*/
  .personMsg {
    display: flex;
    align-items: center;
    .sex {
      position: absolute;
      top: 3.5rem;
      left: 3.8rem;
      width: 0.1rem;
      height: 0.1rem;
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 0.8rem;
    }
  }
  /*界面左侧图标*/
  .van-cell__left-icon {
    color: #45c763;
    font-size: 1.2rem;
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
