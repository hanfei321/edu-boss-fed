<template>
  <div class="resource">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>资源管理</span>
          <el-button
            class="button"
            text
            style="color: #00aeef"
            @click="addResource"
            >添加资源</el-button
          >
        </div>
      </template>
      <div>
        <el-form
          :inline="true"
          :model="from.formInline"
          class="demo-form-inline"
          ref="addFormRef"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input
              v-model="from.formInline.name"
              placeholder="请输入资源名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input
              v-model="from.formInline.url"
              placeholder="请输入资源路径"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              v-model="from.formInline.categoryId"
              clearable
              placeholder="请选择资源分类"
            >
              <el-option
                v-for="item in CategoriesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询</el-button
            >
            <el-button @click="resourseupData" :disabled="isLoading"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableDataList" style="width: 100%" v-loading="isLoading">
        <el-table-column type="index" label="编号" min-width="30" />
        <el-table-column prop="name" label="资源名称" min-width="80" />
        <el-table-column prop="url" label="资源路径" min-width="80" />
        <el-table-column prop="description" label="描述" min-width="80" />
        <el-table-column prop="createdTime" label="添加时间" min-width="80" />
        <el-table-column label="操作" min-width="40">
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
      <div class="resource-pagination">
        <el-pagination
          v-model:current-page.sync="from.tableData.current"
          v-model:page-size="from.tableData.size"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalcont"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog
      v-model="centerDialogVisible"
      title="添加资源"
      width="25%"
      center
    >
      <el-form
        label-position="top"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 400px; margin-left: 20px"
      >
        <el-form-item label="资源名称">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="formLabelAlign.url" />
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select
            v-model="formLabelAlign.categoryId"
            clearable
            placeholder="请选择资源分类"
            style="min-width: 400px"
          >
            <el-option
              v-for="item in CategoriesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="formLabelAlign.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addResourceDialog">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import {
  getResourcePages,
  getResourceCategories,
  saveOrderUpdate,
  saveOrUpdate,
} from '@/services/resource';

const isLoading = ref(true);
const addFormRef = ref();
const onSubmit = async () => {
  const data = await getResourcePages({
    ...from.formInline,
    ...from.tableData,
  });
  tableDataList.value = data.data.data.records;
  // from.tableData.size = data.data.data.size;
  // from.tableData.current = data.data.data.current;
};
const resourseupData = () => {
  resourceTableData();
  // from.formInline = {
  //   name: '',
  //   url: '',
  //   categoryId: '',
  // };
  addFormRef.value.resetFields();
};
const from = reactive({
  tableData: {
    current: 1,
    size: 10,
  },
  formInline: {
    name: '',
    url: '',
    categoryId: '',
  },
});

const tableDataList = ref();
const totalcont = ref();
const resourceTableData = async () => {
  isLoading.value = true;
  const data = await getResourcePages(from.tableData);

  tableDataList.value = data.data.data.records;
  totalcont.value = data.data.data.total;
  isLoading.value = false;
};

const handleSizeChange = (val: number) => {
  from.tableData.size = val;
  from.tableData.current = 1;
  resourceTableData();
};

const handleCurrentChange = (val: number) => {
  from.tableData.current = val;
  resourceTableData();
};

const CategoriesList = ref();
const resourceCategories = async () => {
  const data = await getResourceCategories();

  CategoriesList.value = data.data.data;
};

const centerDialogVisible = ref(false);
const formLabelAlign = reactive({
  id: 0,
  name: '',
  categoryId: '',
  url: '',
  description: '',
});
const addResource = () => {
  centerDialogVisible.value = true;
};
const addResourceDialog = async () => {
  debugger;
  const { data } = await saveOrUpdate(formLabelAlign);
  console.log(data);
};
onMounted(() => {
  resourceTableData();
  resourceCategories();
});
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.resource-pagination {
  margin: 20px 0px 20px 5px;
  float: right;
}
</style>
