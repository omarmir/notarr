<template>
  <div>
    <h3 class="font-semibold mb-4 text-xl">Notes and Notebooks</h3>
    <RecentNotebooks :display="5"></RecentNotebooks>
    <Suspense>
      <AllNotebooks></AllNotebooks>
    </Suspense>
  </div>
</template>
