export const request = (params) => {
  // 显示加载中效果哦
  wx.showLoading({
    title: '正在努力加载中哦',
    mask: true
  });


  const baseUrl = 'https://api.zbztb.cn/api/public/v1';
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    });

  })
}