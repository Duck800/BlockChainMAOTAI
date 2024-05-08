<template>
    <div class="home-page">
        <div class="btn-group">
            <button @click="GotoProd">生产商</button>
            <button @click="GotoCarr">运输商</button>
            <button @click="GotoCons">消费者</button>
        </div>
    </div>
</template>

<script setup>
import router from "@/router/index.js"

function GotoProd() {
    router.push({ name: 'producer'})
}

function GotoCarr() {
    router.push({ name: 'carrier'})
}

function GotoCons() {
    router.push({ name: 'consumer'})
}
</script>

<style>
.home-page {
    width: 100%;
    height: 100%;
    background-image: url('../home.png');
    /* 背景图片位置 */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    /* 背景图片是否重复 */
    background-size: 100% 100%;
    position: absolute;
    z-index: 1;
    /* 比根元素更高 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.btn-group {
  position: absolute;
  top: 40%;
  right: 31%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

button {
    padding: 10px 20px;
    margin:10px;
    font-size: 16px;
    background-color: #ffffff;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid black;
}
</style>