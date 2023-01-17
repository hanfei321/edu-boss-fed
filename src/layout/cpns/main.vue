<template>
  <!-- 公共多Tab缓存组件 -->
  <div id="common-tabs-keep-alive">
    <a-tabs
      v-model="activeKey"
      :hide-add="true"
      type="editable-card"
      @change="changePage"
      @edit="onEdit"
      style="margin-top: 10px"
      v-if="tabsState !== 'hide'"
    >
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.fullPath"
        :tab="pane.title"
        :closable="closable"
      ></a-tab-pane>
    </a-tabs>
    <!-- router-view 插槽 -->
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CommonTabsKeepAlive',
  data() {
    return {
      panes: [], // Tabs基础数据
      activeKey: '', // 当前选中Tab - 默认为当前路由
      keepAliveData: [], // 用于处理缓存组件
    };
  },
  created() {
    this.tabsInit();
  },
  computed: {
    // 菜单基础数据、标签页状态
    ...mapState({
      userMenu: (state) => state.permission.userMenu,
      tabsState: (state) => state.frontSettings.tabsState,
    }),
    // 标签页关闭状态
    closable() {
      return this.panes.length !== 1;
    },
  },
  methods: {
    // 初始化数据
    tabsInit() {
      // 重置
      delete sessionStorage.keepAliveData;
      if (
        this.$route.fullPath !== '/system/exception/404/list' &&
        this.$route.fullPath !== '/system/exception/301/list'
      ) {
        // 初始化 Tab 标签
        this.activeKey = this.$route.fullPath;
        this.keepAliveData = [this.$route.name];
        const data = { ...this.$route, title: '' };
        this.panes = [data];
        this.getPaneTitle(this.$route.name, this.userMenu);
        this.updateLocalKeepAlive();
      }
    },
    /**
     * 递归处理标签标题
     * @param routeName 组件名
     * @param menuData 菜单基础数据
     */
    getPaneTitle(routeName, menuData) {
      let data = menuData.filter((item) => routeName.match(item.name));
      if (data[0].children.length > 0) {
        this.getPaneTitle(routeName, data[0].children);
      } else {
        this.$set(
          this.panes.filter((item) => item.name === routeName)[0],
          'title',
          data[0].meta.title
        );
      }
    },
    // 选择 Tab
    changePage(activeKey) {
      this.activeKey = activeKey;
      this.$router.push(activeKey);
      this.updateLocalKeepAlive();
    },
    // 关闭 Tab
    onEdit(targetKey) {
      if (this.panes.length > 1) {
        this.keepAliveData = this.keepAliveData.filter(
          (item) =>
            item !==
            this.panes.filter((item) => item.fullPath === targetKey)[0].name
        );
        this.panes = this.panes.filter((item) => item.fullPath !== targetKey);
        // 强制更新路由实现清除缓存 - 重定向
        this.$router.push('/system/exception/301/list');
        // 选中最后一个Tab
        this.changePage(this.panes[this.panes.length - 1].fullPath);
      }
    },
    // 更新本地缓存组件
    updateLocalKeepAlive() {
      sessionStorage.keepAliveData = JSON.stringify(this.keepAliveData);
    },
  },
  watch: {
    // 监听路由变化，处理Tab基础数据
    $route(val) {
      // 处理详情页空白 - 因路由定义问题导致浏览器返回显示空白页，暂无法处理
      if (
        val.path !== '/' &&
        val.path !== '/system/exception/404/list' &&
        val.path !== '/system/exception/301/list'
      ) {
        // 判断当前路由是否已打开 Tab 页
        if (
          this.panes.filter((item) => item.fullPath === val.fullPath).length ===
          0
        ) {
          // 添加 Tab 数据
          const data = { ...val, title: '' };
          this.panes =
            this.tabsState === 'more' ? [...this.panes, data] : [data];
          this.getPaneTitle(val.name, this.userMenu);
          // 添加缓存组件数据
          this.keepAliveData =
            this.tabsState === 'more'
              ? [...this.keepAliveData, val.name]
              : [val.name];
        }
        this.changePage(val.fullPath);
      }
    },
    // 监听标签页显示状态
    tabsState(val) {
      this.tabsInit();
    },
  },
};
</script>

<style lang="less" scoped></style>
