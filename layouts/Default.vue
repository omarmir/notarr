<template>
  <SlidingSidebar></SlidingSidebar>
  <div
    class="lg:ml-[300px] relative h-full max-h-screen rounded-xl transition-all duration-200"
    id="panel">
    <TopBar></TopBar>
    <div class="w-full px-10 py-6 mx-auto">
      <slot></slot>
    </div>
  </div>
</template>
