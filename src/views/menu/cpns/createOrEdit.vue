<template>
  <div class="menu-create">
    <el-card class="box-card">
      <el-skeleton :rows="5" animated :loading="skeletonLoading" />
      <template #header>
        <div class="card-header">
          <span>{{ editTlite.fatherTitle ? '编辑菜单' : '添加菜单' }}</span>
          <!-- <el-button class="button" text>Operation button</el-button> -->
        </div>
      </template>
      <el-form :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.formModelData.name" />
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.formModelData.href" />
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.formModelData.parentId"
            placeholder="请选择上级菜单"
          >
            <el-option label="无上级菜单" :value="-1" />
            <el-option
              :label="item.name"
              :value="item.id"
              :key="item.id"
              v-for="item in parentMenuList"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.formModelData.icon" />
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.formModelData.shown" class="ml-4">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.formModelData.orderNum"
            :min="1"
            :max="10"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.formModelData.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!editTlite.fatherTitle">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, onUpdated } from 'vue';
import { ElMessage } from 'element-plus';
import { saveOrUpdate, getEditMenuInfo } from '@/services/menu';
import router from '@/router';
import { useRoute } from 'vue-router';
let route = useRoute();

const editTlite = defineProps({
  fatherTitle: {
    type: Boolean,
    default: '标题',
  },
});
// do not use same name with ref
let form = reactive({
  formModelData: {
    parentId: -1,
    name: '',
    href: '',
    icon: '',
    orderNum: 0,
    description: '',
    shown: true,
  },
});

const skeletonLoading = ref(false);
const parentMenuList: any = ref([]);
const onSubmit = async () => {
  const { data } = await saveOrUpdate(form.formModelData);
  if (data.code == '000000') {
    ElMessage({
      message: '提交成功.',
      type: 'success',
    });
    router.back();
  }
};

const loadMenuInfo = async () => {
  debugger;
  const { data } = await getEditMenuInfo(route.params.id || -1);
  console.log(data.data.menuInfo);

  if (data.data.menuInfo) {
    debugger;
    form.formModelData = data.data.menuInfo;
  }

  if (data.code == '000000') {
    parentMenuList.value = data.data.parentMenuList;
  }
};
onMounted(() => {
  loadMenuInfo();
});
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
