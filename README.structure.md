## 项目核心架构结构
```
.
├── Easy-Mock-API.zip
├── LICENSE
├── README.md
├── README.structure.md
├── babel.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── vue.config.js
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── main.js
    ├── components
    │   ├── SvgIcon
    │   │   └── index.vue
    │   ├── backToTop
    │   │   └── ToTop.vue
    │   └── goodsDetail
    │       └── GoodsDetail.vue
    ├── config
    │   ├── area.js
    │   ├── filter.js
    │   ├── global.js
    │   ├── pubsub_type.js
    │   └── rem.js
    ├── i18n
    │   ├── index.js
    │   └── zh.js
    ├── icons
    │   ├── index.js
    │   └── svg
    │       ├── QQ.svg
    │       ├── backtotop.svg
    │       ├── car.svg
    │       ├── collection.svg
    │       ├── down.svg
    │       ├── share.svg
    │       ├── up.svg
    │       └── wechat.svg
    ├── images
    │   ├── cart
    │   │   ├── empty.png
    │   │   └── shop-icon.png
    │   ├── home
    │   │   ├── defaultimg.jpg
    │   │   └── backImage.png
    │   ├── login
    │   │   ├── back.jpg
    │   │   ├── back2.jpg
    │   │   ├── back3.jpg
    │   │   ├── back4.jpg
    │   │   ├── blindfold.png
    │   │   ├── greeting.png
    │   │   ├── normal.png
    │   │   └── user.png
    │   ├── mine
    │   │   ├── defaultImg.jpeg
    │   │   ├── female.png
    │   │   ├── male.png
    │   │   └── noData.jpeg
    │   ├── order
    │   │   ├── hb.png
    │   │   ├── noAddress.png
    │   │   ├── wx.png
    │   │   └── zfb.png
    │   ├── Payment
    │   │   └── paysuccess.png
    │   ├── placeholderImg
    │   │   └── product-img-load.png
    │   └── tabbar
    │       ├── home_default.png
    │       ├── home_selected.png
    │       ├── mine_default.png
    │       ├── mine_selected.png
    │       ├── shoppingcart_default.png
    │       └── shoppingcart_selected.png
    ├── plugins
    │   └── vant.js
    ├── router
    │   └── router.js
    ├── serve
    │   └── api
    │       ├── ajax.js
    │       └── index.js
    ├── store
    │   ├── actions.js
    │   ├── getters.js
    │   ├── mutation-type.js
    │   ├── mutations.js
    │   ├── state.js
    │   └── store.js
    └── views
        ├── cart
        │   └── Cart.vue
        ├── dashboard
        │   └── Dashboard.vue
        ├── home
        │   ├── Home.vue
        │   └── components
        │       └── tabbar
        │            ├── ProduceItem.vue
        │            └── TabbarGoodsItem.vue
        ├── login
        │   └── Login.vue
        ├── mine
        │   ├── Children
        │   │   ├── ChangeNickName.vue
        │   │   └── UserCenter.vue
        │   └── Mine.vue
        ├── MyOrder
        │   ├── MyOrder.vue
        │   └── OrderType.vue
        ├── order
        │   ├── Order.vue
        │   └── children
        │       ├── MyAddress.vue
        │       ├── OrderGoodsList.vue
        │       └── children
        │           ├── AddAddress.vue
        │           └── EditAddress.vue
        └── payment
            └── Payment.vue
```
