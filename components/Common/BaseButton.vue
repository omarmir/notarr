<template>
  <CommonThemeButton class="absolute bottom-[7px] end-2" @click="$emit('click')">
    <slot></slot>
  </CommonThemeButton>
</template>
<script lang="ts" setup>
defineEmits(['click'])
</script>
