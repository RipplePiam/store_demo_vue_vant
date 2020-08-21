import Vue from 'vue'

// 金钱格式过滤 ¥xx.xx
Vue.filter('moneyFormat', (value) => {
    return '¥' + Number(value).toFixed(2);
})