import {
  request
} from "../../request/index.js"
// pages/goods_list/index.js
Page({
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: []
  },
  // 接口参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,

  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 标题点击事件处理
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })

  },

  // 获取商品列表数据
  getGoodsList() {
    request({
      url: '/goods/search',
      data: this.QueryParams
    }).then(result => {
      const total = result.total;
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
      this.setData({
        goodsList: [...this.data.goodsList, ...result.goods]
      })
    })
  },

  // 页面触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: 'no more thing',
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  }
})