<template>
  <div>
    <h3 class="mb-4 text-xl font-semibold">Notes and Notebooks</h3>
    <Suspense>
      <AllNotebooks></AllNotebooks>
    </Suspense>
    <Suspense>
      <RecentNotes :display="5"></RecentNotes>
    </Suspense>
  </div>
</template>
