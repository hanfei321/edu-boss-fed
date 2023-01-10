<template>
  <div class="login">
    <el-form
      :model="form"
      label-width="120px"
      label-position="top"
      class="login-card"
      :rules="rules"
      ref="ruleFormRef"
    >
      <h2 class="login-title">登 录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item style="margin-top: 35px">
        <el-button
          color="#332f63"
          plain
          type="primary"
          :loading="isbtnLoading"
          @click="onSubmit"
          style="width: 100%"
          >登录</el-button
        >
        <div class="login-check">
          <el-checkbox v-model="checkedpassword">记住密码</el-checkbox>
          <el-link type="primary" color="#626aef">忘记密码</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ElForm, FormInstance, FormRules } from 'element-plus';
import LocalCache from '@/utils/cache';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// do not use same name with ref
const form = reactive({
  phone: '18201288771',
  password: '111111',
});
const store = useStore();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
let isbtnLoading = ref(false);
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入11位手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入6到11位密码', trigger: 'blur' },
    { min: 6, max: 11, message: 'Length should be 6 to 11', trigger: 'blur' },
  ],
});
const checkedpassword = ref(true);
const onSubmit = () => {
  console.log('submit!');
  ruleFormRef.value?.validate((valid) => {
    debugger;
    if (valid) {
      isbtnLoading.value = true;
      if (checkedpassword) {
        LocalCache.setCache('phone', form.phone);
        LocalCache.setCache('password', form.password);
      } else {
        LocalCache.deleteCache('phone');
        LocalCache.deleteCache('password');
      }
      store.dispatch('Login/loginAction', { ...form, isbtnLoading });
    }
  });
};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 280px;
    background: #fff;
    border-radius: 10px;
    padding: 30px 30px 20px 30px;
    .login-title {
      display: flex;
      justify-content: center;
    }
    .login-check {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
