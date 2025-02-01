<template>
  <MilkdownProvider>
    <Milkdown v-model="md" />
  </MilkdownProvider>

  {{ md }}
</template>

<script setup lang="ts">
import Milkdown from "~/components/MilkdownEditor.vue"
import { MilkdownProvider } from "@milkdown/vue"
import "@milkdown/crepe/theme/common/style.css"
import "@milkdown/crepe/theme/frame.css"

const md = ref(`# Milkdown Vue Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **Vue**.`)
</script>
