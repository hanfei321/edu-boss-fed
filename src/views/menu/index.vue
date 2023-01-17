<template>
  <div class="login">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>菜单列表</span>
          <el-button class="button" text @click="addMenu" style="color: #00aeef"
            >添加菜单</el-button
          >
        </div>
      </template>
      <el-table :data="menuPageList" style="width: 100%">
        <el-table-column type="index" label="编号" min-width="80" />
        <el-table-column prop="name" label="菜单名称" min-width="80" />
        <el-table-column prop="level" label="菜单级数" min-width="80" />
        <el-table-column prop="icon" label="前端图标" min-width="80" />
        <el-table-column prop="orderNum" label="排序" min-width="80" />
        <el-table-column prop="createdTime" label="创建时间" min-width="80" />
        <el-table-column prop="updatedTime" label="更新时间" min-width="80" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              style="color: #00aeef"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="menu-pagination">
        <el-pagination
          v-model:current-page="fromPage.paginData.current"
          v-model:page-size="fromPage.paginData.size"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fromPage.paginData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { getMenuAll, getDeleteMenu, getMenuPages } from '@/services/menu';
import { onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
const router = useRouter();
const menuDataList = ref([]);
const menuPageList = ref([]);

const getMenuList = async () => {
  debugger;
  const data = await getMenuAll();
  console.log(data.data.data);
  menuDataList.value = data.data.data;
};
const fromPage = reactive({
  paginData: {
    current: 1,
    size: 10,
    total: 0,
  },
});
const addMenu = () => {
  router.push({ name: 'menu-create' });
};
const handleEdit = (index: any, row: any) => {
  debugger;
  router.push({ name: 'menu-edit', params: { id: row.id } });
  console.log(row);
};
const handleDelete = (index: any, row: any) => {
  console.log(row);
  // const data = await getDeleteMenu(row);
  ElMessageBox.confirm('你确定要删除这行菜单吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      debugger;
      const { data } = await getDeleteMenu(row.id);
      if (data.code == '000000') {
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
        menuPages();
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
const menuPages = async () => {
  const { data } = await getMenuPages(fromPage.paginData);
  console.log(data);
  menuPageList.value = data.data.records;
  fromPage.paginData.total = data.data.total;
  data.data.records.forEach((el: any) => {
    el.createdTime = dayjs(el.createdTime).format('YYYY-MM-DD HH:mm:ss');
    el.updatedTime = dayjs(el.updatedTime).format('YYYY-MM-DD HH:mm:ss');
  });
};
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  fromPage.paginData.size = val;
  fromPage.paginData.current = 1;
  menuPages();
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  fromPage.paginData.current = val;
  menuPages();
};

onMounted(() => {
  menuPages();
});
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.menu-pagination {
  margin: 20px 0px 20px 5px;
  float: right;
}
</style>
