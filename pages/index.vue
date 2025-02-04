<template>
  <div>
    <h3 class="font-semibold mb-4 text-xl">Notes and Notebooks</h3>
    <Suspense>
      <AllNotebooks></AllNotebooks>
    </Suspense>
    <Suspense>
      <RecentNotes :display="5"></RecentNotes>
    </Suspense>
  </div>
</template>
