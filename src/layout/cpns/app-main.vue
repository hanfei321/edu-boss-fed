<template>
  <div class="app-main">
    <!-- <div style="margin-bottom: 20px">
      <el-button size="small" @click="addTab(editableTabsValue)">
        add tab
      </el-button>
    </div> -->
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      :closable="true"
      @tab-remove="removeTab"
      @tab-change="tabClick"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <div class="page-content"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import store from '@/store';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let tabIndex = store.state.tabIndex;
let editableTabsValue = ref(store.state.editableTabsValue);
let editableTabs = ref(store.state.editableTabs);
// const closableCom = computed(() => {
//   debugger;
//   if (store.state.editableTabsValue === 'home') {
//     return false;
//   } else {
//     return true;
//   }
// });
watch(store.state, (newValue) => {
  debugger;
  editableTabsValue.value = store.state.editableTabsValue;
  editableTabs.value = store.state.editableTabs;
});
// const addTab = (targetName: string) => {
//   const newTabName = `${++tabIndex}`;
//   editableTabs.value.push({
//     title: 'New Tab',
//     name: newTabName,
//     content: 'New Tab content',
//   });
//   editableTabsValue.value = newTabName;
// };

//删除tab标签
const removeTab = (targetName: string) => {
  debugger;
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab: any, index: any) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
          router.push({ name: activeName });
        }
      }
    });
  }

  store.state.editableTabs.forEach((el: any, index: number) => {
    if (el.name === targetName) {
      debugger;
      store.commit('deleteTabs', index);
    }
  });

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab: any) => tab.name !== targetName);
};
//点击tab标签
const tabClick = (targetName: string) => {
  debugger;
  if (targetName === '') {
    editableTabsValue.value = 'home';
  }
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  tabs.forEach((tab: any, index: any) => {
    if (tab.name === targetName) {
      router.push({ name: activeName });
    }
  });
};
// watch(editableTabsValue, (newValue) => {
//   console.log(tabRef.value.scrollTop);
// });
watch(store.state.editableTabs, () => {
  window.sessionStorage.setItem(
    'editableTabs',
    JSON.stringify(store.state.editableTabs)
  );
});
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%; /*高度填满外部*/
  overflow: hidden;
}

.demo-tabs {
  overflow: hidden;
  height: 100%;
}
::v-deep .el-tabs__content {
  width: 100% !important;
  height: 100% !important; /*高度填满外部*/
  overflow: auto !important;
  overflow-y: scroll !important; /*内部滚动*/
}
// .el-tabs--card > .el-tabs__header {
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
// }
// .el-tabs__content {
//   overflow: auto;
//   position: relative;
//   overflow-y: scroll;
// }

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
::v-deep #tab-home .is-icon-close {
  display: none;
}
</style>

<!-- <style>
.el-tabs__content {
  width: 100% !important;
  height: 100% !important; /*高度填满外部*/
  overflow: auto !important;
  overflow-y: scroll !important; /*内部滚动*/
}
</style> -->
