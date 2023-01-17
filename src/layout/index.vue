<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-container class="page">
        <el-header>
          <Bread></Bread>
        </el-header>
        <el-main class="page-content">
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from './cpns/app-aside.vue';
import Bread from './cpns/app-bread.vue';
import Main from './cpns/app-main.vue';
import { onMounted, Ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
onMounted(() => {
  debugger;
  store.dispatch('Login/userinfoAction');
});
</script>

<style lang="scss" scoped>
.layout {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.el-container,
.page {
  height: 100%;
  display: flex;
}
.page-content {
  height: calc(100% - 55px);
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
