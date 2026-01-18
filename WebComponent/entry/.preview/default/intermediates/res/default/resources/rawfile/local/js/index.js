// 奖品名称数组
let prizesArr = ["谢谢", "奶茶", "汉堡", "咖啡", "西瓜", "鸡腿", "柠檬", "蛋糕"];
// 图片路径数组
let arrBigImg = ["./img/1-beer.png", "./img/2-milk.png", "./img/3-hamburg.png",
  "./img/4-coffee.png", "./img/5-watermelon.png", "./img/6-drumstick.png",
  "./img/7-lemon.png", "./img/8-cake.png", "./img/9-prizes.png"];

// 获取所有奖品格子元素
let allPrizesLi = document.querySelectorAll('.prizes-li');
// 获取所有图片元素
let prizesImg = document.querySelectorAll('.pic');

// 初始化旋转相关变量
let count = 0;          // 旋转圈数计数器
let isClick = true;     // 是否可以点击抽奖（防止重复点击）
let index = 3;          // 预设中奖位置（默认值）
// 当前旋转到的位置索引
let prizesPosition = 0;

// 绑定图片到对应元素
for (let j = 0;j < prizesImg.length; j++) {
  prizesImg[j].src = arrBigImg[j];  // 设置每个图片元素的src属性
}
// 旋转速度，值越大速度越慢（单位：毫秒）
let speed = 500;

// 旋转函数
function roll() {
  // 速度衰减，每次旋转后速度加快
  speed -= 50;
  if (speed <= 10) {
    speed = 10;  // 设置最小速度限制
  }

  // 移除所有格子的激活状态类名
  for (let j = 0; j < allPrizesLi.length; j++) {
    allPrizesLi[j].classList.remove('active-li');
  }
  prizesPosition++;  // 移动到下一个位置

  // 判断是否完成一圈旋转
  if (prizesPosition >= allPrizesLi.length - 1) {
    prizesPosition = 0;  // 重置到第一个位置
    count++;             // 增加圈数计数
  }

  // 为当前旋转到的格子添加激活状态
  allPrizesLi[prizesPosition].classList.add('active-li');
  let initSpeed = 500;  // 初始速度
  let timer;            // 定时器变量
  // 最少旋转总圈数
  let totalCount = 5;

  // 停止条件：达到最少圈数且旋转到指定中奖位置
  if (count >= totalCount && (prizesPosition + 1) === index) {
    clearTimeout(timer);  // 清除定时器
    isClick = true;       // 恢复可点击状态
    speed = initSpeed;    // 重置旋转速度
    // 等待1秒后打开中奖弹窗
    timer = setTimeout(openDialog, 1000);
  } else {
    // 继续旋转：使用当前速度设置下一次旋转
    timer = setTimeout(roll, speed);
    // 最后几圈减速逻辑
    if (count >= totalCount - 1 || speed <= 50) {
      speed += 100;  // 减速效果
    }
  }
}

// 开始抽奖函数
function startDraw() {
  // 防止重复点击触发多次抽奖
  if (isClick) {
    count = 0;  // 重置圈数计数器
    // 随机生成中奖位置（1到奖品数组长度的随机整数）
    index = Math.floor(Math.random() * prizesArr.length + 1);
    roll();      // 开始旋转
    isClick = false;  // 设置为不可点击状态
  }
}

// 打开弹窗函数
function openDialog() {
  // 调用原生方法显示中奖信息
  linkObj.messageFromHtml(prizesArr[prizesPosition]);
}