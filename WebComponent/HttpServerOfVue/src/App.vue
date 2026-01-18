<script setup>
import { inject, reactive, ref } from "vue";
const changeBase = (src) => new URL(src, import.meta.url).href;

const pics = reactive([
  "/src/assets/img/1-beer.png",
  "/src/assets/img/2-milk.png",
  "/src/assets/img/3-hamburg.png",
  "/src/assets/img/4-coffee.png",
  "/src/assets/img/5-watermelon.png",
  "/src/assets/img/6-drumstick.png",
  "/src/assets/img/7-lemon.png",
  "/src/assets/img/8-cake.png",
  "/src/assets/img/9-prizes.png",
]);
let isClick = true;
let count = 0;
let index = 3;
let speed = 500;
let prizesPosition = 0;
let prizesArr = [
  "谢谢",
  "奶茶",
  "汉堡",
  "咖啡",
  "西瓜",
  "鸡腿",
  "柠檬",
  "蛋糕",
];
let allPrizesLi = pics;
let activeNum = ref(1);

const startDraw = (param) => {
  if (param.indexOf("9-prizes") !== -1 && isClick) {
    count = 0;
    index = Math.floor(Math.random() * prizesArr.length + 1);
    roll();
    isClick = false;
  }
};
function roll() {
  // velocity decay
  speed -= 50;
  if (speed <= 10) {
    speed = 10;
  }
  activeNum.value = 9;
  prizesPosition++;

  // Calculate the number of turns
  if (prizesPosition >= allPrizesLi.length - 1) {
    prizesPosition = 0;
    count++;
  }
  activeNum.value = prizesPosition;

  let initSpeed = 500;
  let timer;
  // Total number of revolutions at least
  let totalCount = 5;

  // Stop when the number of turns and the specified position are met
  if (count >= totalCount && prizesPosition + 1 === index) {
    clearTimeout(timer);
    isClick = true;
    speed = initSpeed;
    // Wait for 1s to open the pop-up window
    timer = setTimeout(openDialog, 1000);
  } else {
    // Wait for 1s to open the pop-up window
    timer = setTimeout(roll, speed);
    // Last lap deceleration
    if (count >= totalCount - 1 || speed <= 50) {
      speed += 100;
    }
  }
}

function openDialog() {
  document._sendMsgToWeb(prizesArr[prizesPosition]);
}

let msg = ref(inject("message"));
const changeMsg = (val) => {
  startDraw("/src/assets/img/9-prizes.png");
  msg.value = val;
};
document._changeMsg = changeMsg;// 全局暴露
</script>

<template>
  <div class="luckyDraw">
    <div></div>
    <ul id="prize" class="prizes">
      <li
        class="prizes-li"
        :id="`img-${index}`"
        v-for="(item, index) in pics"
        :key="item"
        :class="{ active: index === activeNum }"
        :style="{
          'background-repeat': no - repeat,
          'background-size': '100% 100%',
        }"
        @click="startDraw(item)"
      ></li>
    </ul>
  </div>
</template>
<style scoped>
#prize {
  border-radius: 16px 16px 16px 16px;
  background-image: linear-gradient(180deg, #a2daff 0%, #eaf5ff 100%);
  margin-left: 1.82%;
  margin-top: 1.43%;
  width: 96.5%;
  height: 96.7%;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

/* Picture Style */
img {
  width: 100%;
  height: 100%;
  margin: auto;
  display: block;
}

/* Sweepstakes List */
.prizes {
  width: 96.5%;
  height: 96.7%;
  position: absolute;
}

/* Start Sweepstakes Text */
.trigger {
  font-size: 22px;
  text-align: center;
  display: block;
}

/* Prize Plaid */
.prizes li {
  width: 30.6%;
  height: 30.6%;
  box-sizing: border-box;
  position: absolute;
}

/* Prize Grid Position */
.prizes li:nth-of-type(1) {
  left: 3%;
  top: 2.7%;
}

.prizes li:nth-of-type(2) {
  left: 34.9%;
  top: 2.6%;
}

.prizes li:nth-of-type(3) {
  left: 66.8%;
  top: 2.7%;
}

.prizes li:nth-of-type(4) {
  left: 66.8%;
  top: 34.6%;
}

.prizes li:nth-of-type(5) {
  left: 66.8%;
  top: 66.5%;
}

.prizes li:nth-of-type(6) {
  left: 34.9%;
  top: 66.5%;
}

.prizes li:nth-of-type(7) {
  left: 3%;
  top: 66.5%;
}

.prizes li:nth-of-type(8) {
  left: 3%;
  top: 34.6%;
}

.prizes li:nth-of-type(9) {
  left: 34.9%;
  top: 34.6%;
}

/* Draw effect */
.active:after {
  top: 0;
  left: 0;
  width: 100%;
  content: "";
  height: 100%;
  position: absolute;
  opacity: 0.6;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("/src/assets/img/background.svg");
}
#img-0 {
  background-image: url("/src/assets/img/1-beer.png");
}
#img-1 {
  background-image: url("/src/assets/img/2-milk.png");
}
#img-2 {
  background-image: url("/src/assets/img/3-hamburg.png");
}
#img-3 {
  background-image: url("/src/assets/img/4-coffee.png");
}
#img-4 {
  background-image: url("/src/assets/img/5-watermelon.png");
}
#img-5 {
  background-image: url("/src/assets/img/6-drumstick.png");
}
#img-6 {
  background-image: url("/src/assets/img/7-lemon.png");
}
#img-7 {
  background-image: url("/src/assets/img/8-cake.png");
}
#img-8 {
  background-image: url("/src/assets/img/9-prizes.png");
}
</style>