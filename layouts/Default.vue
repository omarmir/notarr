<template>
  <div>
    <SlidingSidebar></SlidingSidebar>
    <div id="panel" class="relative h-full max-h-screen rounded-xl transition-all duration-200 lg:ml-[350px]">
      <TopBar></TopBar>
      <div class="mx-auto w-full px-10 py-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
