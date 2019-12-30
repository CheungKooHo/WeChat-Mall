import {
  request
} from "../../request/index.js"
//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)页面开始加载就会触发的事件
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getfloorList();
  },
  // 获取轮播图数据
  getSwiperList() {
    // 1.发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  // 获取分类导航数据
  getCatesList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        catesList: result
      })
    })
  },
  // 获取楼层数据
  getfloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      this.setData({
        floorList: result
      })
    })
  }
});