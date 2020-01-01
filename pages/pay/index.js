import {
  request
} from "../../request/index.js"
// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked)

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  // 支付
  orderPay() {
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync('cart', newCart);
    wx.showModal({
      title: '由于小程序权限限制，只能企业账号成功调用支付api，所以此处仅模拟支付完毕，购物车随之更新',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      complete: () => {
        wx.navigateBack({
          delta: 1
        });
      }
    });
  }
})