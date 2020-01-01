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
    const cart = wx.getStorageSync('cart') || [];

    this.setData({
      address
    });
    this.setCart(cart);

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

  changeItemChk(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart)
  },

  // 设置购物车状态，重新计算底部信息
  setCart(cart) {
    const allChecked = cart.length ? cart.every(v => v.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  },

  changeAllChk() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },

  subNum(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].num--;
    if (cart[index].num === 0) {
      console.log(0);
      wx.showModal({
        title: '是否删除该商品？',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1);
            this.setCart(cart)
          } else {
            cart[index].num = 1;
            this.setCart(cart)
          }
        }
      })
    }
    this.setCart(cart)
  },
  addNum(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].num++;
    this.setCart(cart)
  },

  pay() {
    const {
      totalNum,
      address
    } = this.data;
    if (address.userName) {
      if (totalNum > 0) {
        console.log(1);
        wx.navigateTo({
          url: '/pages/pay/index'
        });
      } else {
        wx.showToast({
          title: '您还没有选择任何商品哦！',
          icon: 'none',
          mask: true
        });
      }
    } else {
      wx.showToast({
        title: '请添加收货地址',
        mask: true
      });


    }
  }
})