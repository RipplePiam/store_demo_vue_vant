<!--
 * @Description: 订单模块->添加地址
 * @FilePath: /src/views/order/children/children/AddAddress.vue
 -->
<template>
  <div id="addAddress">
    <van-nav-bar :title="$t('order.addLocation')"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <!--AddressEdit 地址编辑，返回参数：content(表单内容)-->
    <van-address-edit :area-list="areaList"
                      show-postal
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      :save-button-text="$t('order.comfirmAndUse')"
                      @save="onSave"
                      style="margin-top:3rem" />
  </div>
</template>

<script type="text/javascript">

import { mapMutations } from 'vuex'

import areaList from './../../../../config/area.js'
export default {
  data () {
    return {
      areaList: areaList,
      searchResult: []
    }
  },
  components: {

  },
  methods: {

    ...mapMutations(['ADD_USER_SHOPPING_ADDRESS']),
    // 1.返回上级界面
    onClickLeft () {
      this.$router.go(-1);
    },

    // 2. 保存（content是表单内容）
    onSave (content) {
      let addressID;
      addressID = this.addressID().toString();
      // 2.1添加content的内容：id、address
      content['id'] = addressID;
      content['address'] = content.province + content.city + content.county + content.addressDetail;
      // 2.2添加到本地用户送货地址数据中
      this.ADD_USER_SHOPPING_ADDRESS({
        content
      });
      this.$router.back();
    },

    // 3. 生成不重复的id
    addressID () {
      var lastUuid = 0;
      return (new Date()).getTime() * 1000 + (lastUuid++) % 1000;
    }
  }
}
</script>
<style lang="less" scoped>
#addAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
  .van-address-edit {
    .van-button {
      background-color: #45c763;
    }
  }
}
</style>
