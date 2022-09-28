export const limitPersonTypes = ['goToPhone','video','conference','tallBack'];
export const triggerType = {
  goToPhone: 'goToPhone', //主呼
  comePhone: 'comePhone', //被呼
  video: 'video', //主呼视频
  goToVideo: 'goToVideo', //主呼视频
  comeVideo: 'comeVideo', //被呼视频
  conference: 'conference', //语音会议
  audioConference: 'audioConference', //语音会议
  videoConference: 'videoConference', //视频会议
  msg: 'msg', //发送结束文本消息
  textMsg: 'textMsg', //发送结束文本消息
  specialMsg: 'specialMsg', //特殊形式消息
  broadCast: 'broadCast', //广播
  audioBroadCast: 'audioBroadCast', //语音广播
  fileBroadCast: 'fileBroadCast', //文件广播
  tallBack: 'tallBack', //对讲
  tallBackPressSpeak: 'pressSpeak', //按下讲话
  tallBackPressListen: 'pressListen', //按下听讲
  dial: 'dial', // 拨号
  end: 'end', // 结束
  logOut: 'logOut',// 退出
  position: 'position', // 定位单兵
  notification: "notification", // 一件通知
  handUp: 'handUp', // 挂断
  answer: 'answer', // 接听
  monitor: 'monitor', //监听
  forceInsert:'force-insert', //强插
  forceDismantle: 'force-dismantle', //强拆
  forward: 'forward', //转发
}
