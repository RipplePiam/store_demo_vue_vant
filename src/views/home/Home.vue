<!--
 * @Description: Home 首页模块
 * @FilePath: /src/views/home/Home.vue
 -->

<template>
  <div id="home">
    <div v-if="!isShowLoading">

      <!--TabbarItem 商品 -->
      <TabbarGoodsItem :tabbar_all_product_list="tabbar_all_product_list"
                       :flash_sale_product_list="flash_sale_product_list" />
      <!-- 最底部提示 -->
      <van-divider>{{ $t('home.bottomTip') }}</van-divider>
      <!-- 回到顶部按钮 -->
      <v-top />
    </div>
  </div>
</template>

<script type="text/javascript">
import { getHomeData } from '@/serve/api'

// 引入Vuex
import { mapMutations, mapState } from 'vuex'

// 引入页面组件
import TabbarGoodsItem from './components/tabbar/TabbarGoodsItem'

export default {
  computed: {
    ...mapState(['userInfo'])
  },
  created () {

  },
  mounted () {
    // 数据初始化,加载数据
    this._initData()
  },
  data () {
    return {
      isShowLoading: true,           // 是否显示加载
      flash_sale_product_list: [],   // 限时抢购商品列表
      tabbar_all_product_list: [],   // 顶部标签栏所有商品列表
    }
  },
  components: {
    TabbarGoodsItem,
  },
  methods: {
    // Vuex中的方法
    ...mapMutations(['ADD_GOODS', 'ADD_TO_CART']),
    // 数据初始化
    async _initData () {
      const response = await getHomeData()
      if (response.success) {
        const data = response.data
        // 给限时抢购商品列表赋值
        this.flash_sale_product_list = data.list[3].product_list
        // 给Tabbar 所有商品列表赋值
        this.tabbar_all_product_list = data.list[12].product_list
        this.isShowLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  background-color: #f5f5f5;
  padding-bottom: 3rem;
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
