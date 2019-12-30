import {
  request
} from "../../request/index.js"
// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false
  },

  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    const allChecked = cart.length ? cart.every(v => v.checked) : false;

    this.setData({
      address,
      cart,
      allChecked
    });

  },
  // 获取用户收货地址
  handleChooseAddress() {
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting['scope.address'];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              this.setData({
                address: result1
              })
              wx.setStorageSync('address', this.data.address)
            }
          })
        } else {
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3) => {
                  this.setData({
                    address: result3
                  })
                  wx.setStorageSync('address', this.data.address)
                }
              })
            }
          })
        }
      }
    })
  },

  onLoad: function (options) {

  },
})