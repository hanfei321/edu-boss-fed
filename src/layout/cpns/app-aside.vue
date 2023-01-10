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
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router="true"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/resource">资源管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="/course">
      <el-icon><icon-menu /></el-icon>
      <template #title>课程管理</template>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><document /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><location /></el-icon>
        <span>广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/advert">广告列表</el-menu-item>
        <el-menu-item index="advert-space">广告位列表</el-menu-item>
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
