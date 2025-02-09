<template>
  <div>
    <AllNotebooks></AllNotebooks>
    <Suspense>
      <RecentNotes :display="5"></RecentNotes>
    </Suspense>
  </div>
</template>
