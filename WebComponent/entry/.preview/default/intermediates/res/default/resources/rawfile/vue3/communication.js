// 抽奖开始函数
function startDraw() {
  // 判断是否可以点击抽奖（防止重复点击）
  if (isClick) {
    count = 0;  // 重置旋转圈数计数器
    // 随机生成中奖位置（1到奖品数组长度的随机整数）
    index = Math.floor(Math.random() * prizesArr.length + 1);
    roll();      // 开始旋转动画
    isClick = false;  // 设置为不可点击状态，防止重复触发
  }
}

// 打开弹窗函数
function openDialog() {
  // 调用原生应用接口，传递当前奖品名称
  linkObj.messageFromHtml(prizesArr[prizesPosition]);
}

// 初始化消息：在document对象上添加一个属性
document._initMsg = 'hello vue'

// 从Web发送消息到Vue应用的函数
function outWeb(){
  // 调用Vue应用中定义的函数，传递消息
  document._changeMsg('I am Web')
}

// 从Vue接收消息并转发到原生应用的函数
document._sendMsgToWeb = (val) =>{
  // 通过linkObj将Vue传递的消息转发到原生应用
  linkObj.messageFromHtml(val);
}