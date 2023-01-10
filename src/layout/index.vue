<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-container>
        <el-header>
          <Bread></Bread>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from './cpns/app-aside.vue';
import Bread from './cpns/app-bread.vue';
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
}
.el-header {
  display: flex;
  align-items: center;
  background: #fff;
  height: 55px;
}
.el-aside {
  background: #fff;
}
</style>
