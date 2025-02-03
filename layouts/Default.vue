<template>
  <SlidingSidebar></SlidingSidebar>
  <div
    class="lg:ml-[300px] relative h-full max-h-screen rounded-xl transition-all duration-200 bg-white"
    id="panel">
    <TopBar></TopBar>
    <div class="w-full px-10 py-6 mx-auto">
      <div class="flex flex-wrap -mx-3 mb-5">
        <CallToAction></CallToAction>
        <StatsCard></StatsCard>
      </div>
      <RecentNotebooks></RecentNotebooks>
    </div>
  </div>
</template>
