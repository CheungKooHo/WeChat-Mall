import {
  request
} from "../../request/index.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  getGoodsDetail(goods_id) {
    request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    }).then(result => {
      this.setData({
        goodsObj: result,
        GoodsInfo: result
      });
    })
  },

  // 预览
  handlePrevewImage(e) {
    const urls = this.data.GoodsInfo.pics.map(v => v.pics_big);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })

  },

  // 加入购物车
  addCart() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.data.GoodsInfo.goods_id)
    if (index === -1) {
      this.data.GoodsInfo.num = 1;
      this.data.GoodsInfo.checked = true;
      cart.push(this.data.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '已添加至购物车',
      icon: 'success',
      mask: true
    });

  }
})