<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import request from '@/utils/request';
export default defineComponent({});
</script>

<style lang="scss" scoped>
// @import '~@/styles/variables.scss';
.text {
  color: $success-color;
}
</style>
