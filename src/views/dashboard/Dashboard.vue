<!--
 * @Description: 项目根入口
 * @FilePath: /src/views/dashboard/Dashboard.vue
 -->
<template>
  <div id="dashboard">
    <van-tabbar
      v-model="active"
      :safe-area-inset-bottom="true"
      class="active_tab"
      active-color="#75a342"
    >
      <!-- 给购物车的Tabbar加个ID 方便做加入购物车的小球动画 -->
      <van-tabbar-item
        v-for="(item, index) in tabbars"
        :key="index"
        :id="index === 3 ? 'buycar' : ''"
        @click="tab(index, item.name)"
        :info="item.name === 'cart' ? goodsNum : ''"
      >
        <span :class="currIndex === index ? active : ''">{{
          $t(item.title)
        }}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.active : item.normal"  alt=""/>
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 缓存界面选择加载 -->
    <keep-alive>
      <!--需被缓存的视图组件-->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
      <!--不被缓存的视图组件-->
      <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DashBoard',
  created() {
    //通过路由跳转绑定Tabbar的选中
    this.tabbarSelected(this.$route.name)
  },

  watch: {
    // 监听路由变化,保证路由跳转Tabbar选中正常
    $route: {
      handler(val) {
        this.tabbarSelected(val.name)
      }
    },
    deep: true
  },

  data() {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: 'home',
          title: 'home.home',
          normal: require('@/images/tabbar/home_default.png'),
          active: require('@/images/tabbar/home_selected.png')
        },
        {
          name: 'cart',
          title: 'home.cart',
          normal: require('@/images/tabbar/shoppingcart_default.png'),
          active: require('@/images/tabbar/shoppingcart_selected.png'),
          num: 5
        },
        {
          name: 'mine',
          title: 'home.mine',
          normal: require('@/images/tabbar/mine_default.png'),
          active: require('@/images/tabbar/mine_selected.png')
        }
      ]
    }
  },

  components: {},

  mounted() {
    this._initData()
  },

  computed: {
    ...mapState(['shopCart', 'userInfo']),
    goodsNum() {
      let num = 0
      Object.values(this.shopCart).forEach((goods, index) => {
        num += goods.num
      })
      if (num > 0) {
        return num
      }
    }
  },

  methods: {
    // 0. 延展mutations方法
    ...mapMutations(['INIT_SHOP_CART', 'INIT_USER_INFO','INIT_ORDER']),//Vuex突变
    // 1.点击tabbar触发的方法
    tab(index, val) {
      this.currIndex = index
      this.$router.push(val)
    },
    // 2.初始化购物车数据
    _initData() {
      this.INIT_SHOP_CART()
      this.INIT_USER_INFO()
      this.INIT_ORDER()
    },
    tabbarSelected(item) {
      const mapType = {
        home: 0,
        cart: 1,
        mine: 2
      }
      this.active = mapType[item]
    }
  }
}
</script>

<style lang="less" scoped>
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
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.moveToCart {
  animation: mymove 0.5s ease-in-out;//动画
}
</style>
