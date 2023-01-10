<template>
  <div class="app-bread">
    <div class="header-bread">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40" :src="userImgUrl" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ username }}</el-dropdown-item>
          <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
          <el-dropdown-item divided @click="exitSysClick"
            >退出登陆</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import LocalCache from '@/utils/cache';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const username = computed(() => store.state.Login.userInfoData.userName);
const userImgUrl = computed(() => store.state.Login.userInfoData.portrait);
const exitSysClick = () => {
  LocalCache.deleteCache('user');
  // LocalCache.setCache('user', null);
  router.push('/login');
};
</script>

<style lang="scss" scoped>
.app-bread {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
