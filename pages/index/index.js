//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperCurrent: 0,
    testDatas: [

      {
        bgc: '#F00',
        img: 'http://192.168.2.123:8080/mp4/4.jpg',
        swf: 'http://192.168.2.123:8080/mp4/1.mp4'
      },
      {
        bgc: '#0F0',
        img: 'http://192.168.2.123:8080/mp4/2.jpg',
        swf: 'http://192.168.2.123:8080/mp4/2.mp4'
      },
      {
        bgc: '#00F',
        img: 'http://192.168.2.123:8080/mp4/3.mp4',
        swf: 'http://192.168.2.123:8080/mp4/3.mp4'
      },
      {
        bgc: '#00F',
        img: 'http://192.168.2.123:8080/mp4/4.mp4',
        swf: 'http://192.168.2.123:8080/mp4/4.mp4'
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

    this.videoContext = wx.createVideoContext(`video${this.data.swiperCurrent}`, this)
    console.log(this.videoContext)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onSwiperChange(e) {
    this.videoContext.stop()
    this.setData({
      swiperCurrent: e.detail.current
    })
    this.videoContext = wx.createVideoContext(`video${this.data.swiperCurrent}`, this)
    // this.videoContext.seek(0)
  },

})