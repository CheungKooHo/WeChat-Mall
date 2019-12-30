import {
  request
} from "../../request/index.js"
// pages/category/index.js
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],

  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();

    } else {
      if (Date.now() - Cates.time > 1000 * 10 * 6 * 5) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }


  },
  // 获取分类数据
  getCates() {
    request({
      url: '/categories'
    }).then(result => {

      this.Cates = result;
      // 把接口数据存入本地
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.Cates
      })

      // 左侧菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      // 右侧商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        // Cates: result.data.message,
        leftMenuList,
        rightContent
      });

    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    });
  }
})