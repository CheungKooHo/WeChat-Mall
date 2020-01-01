import {
  request
} from "../../request/index.js"
// pages/order/index.js
Page({
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      },
    ],
  },
  onShow(options) {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const type = currentPage.options;
    this.getOrders(type);
  },
  getOrders(type) {
    request({
      url: '/my/orders/all',
      data: {
        type
      }
    }).then(result => {
      console.log(result);

    })
  },
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
})