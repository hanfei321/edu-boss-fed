<template>
  <div class="login-boss">
    <svg class="squares">
      <path class="top_l" d="M11.35 0H0v11.35h11.35z"></path>
      <path class="top_r" d="M23.88 0H12.53v11.35h11.35z"></path>
      <path class="bom_l" d="M11.35 12.53H0v11.35h11.35z"></path>
      <path class="bom_r" d="M23.88 12.53H12.53v11.35h11.35z"></path>
    </svg>
    <div class="title">EDU BOSS</div>
  </div>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    router="true"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/role" @click="addTab('role', '角色管理')"
          >角色管理</el-menu-item
        >
        <el-menu-item index="/menu" @click="addTab('menu', '菜单管理')"
          >菜单管理</el-menu-item
        >
        <el-menu-item index="/resource" @click="addTab('resource', '资源管理')"
          >资源管理</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="/course" @click="addTab('course', '课程管理')">
      <el-icon><icon-menu /></el-icon>
      <template #title>课程管理</template>
    </el-menu-item>
    <el-menu-item index="/user" @click="addTab('user', '用户管理')">
      <el-icon><document /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><location /></el-icon>
        <span>广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/advert" @click="addTab('advert', '广告列表')"
          >广告列表</el-menu-item
        >
        <el-menu-item
          index="advert-space"
          @click="addTab('advert-space', '广告位列表')"
          >广告位列表</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import store from '@/store';
// setup
const { currentRoute } = useRouter();
const route = useRoute();

const activeIndex = ref(currentRoute.value.path);

let tabIndex = store.state.tabIndex;
let editableTabs = store.state.editableTabs;
let editableTabsValue = store.state.editableTabsValue;

const path = ref(route.path);
// watch(route, (newValue, oldValue) => {
//   debugger;
//   console.log(newValue.path.slice(1));
//   activeIndex.value = newValue.path;
//   store.state.editableTabsValue = newValue.path.slice(1);
//   window.sessionStorage.setItem('path', newValue.path.slice(1));
// });
onMounted(() => {});

const addTab = (targetName: string, newtitle: string) => {
  let num = null;
  editableTabs.forEach((el: any, index: number) => {
    if (el.name === targetName) {
      num = index;
      store.state.editableTabsValue = targetName;
      return;
    }
  });
  if (num) return;
  const newTabName = `${++tabIndex}`;
  store.state.editableTabs.push({
    title: newtitle,
    name: targetName,
    content: 'New Tab content',
  });
  store.state.editableTabsValue = targetName;
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
}
.squares {
  width: 24px;
  height: 24px;
}
.login-boss {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 10px;
  .title {
    font-weight: 800;
  }
}
.squares {
  margin-right: 15px;
  .top_r {
    fill: #8dc63f;
  }
  .top_l {
    fill: #f26522;
  }
  .bom_l {
    fill: #00aeef;
  }
  .bom_r {
    fill: #ffc20e;
  }
}
</style>
