<template>
  <div>
    <h3 class="font-semibold mb-4 text-xl">Notes and Notebooks</h3>
    <RecentNotebooks :count="3"></RecentNotebooks>
    <Suspense>
      <AllNotebooks></AllNotebooks>
    </Suspense>
  </div>
</template>
