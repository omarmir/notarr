<script setup lang="ts">
import Milkdown from "~/components/MilkdownEditor.vue"
import { MilkdownProvider } from "@milkdown/vue"
import "@milkdown/crepe/theme/common/style.css"
import "@milkdown/crepe/theme/frame.css"
</script>

<template>
  <MilkdownProvider>
    <Milkdown />
  </MilkdownProvider>
</template>
