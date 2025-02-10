<template>
  <div>
    <NotebookAllNotebooks></NotebookAllNotebooks>
    <Suspense>
      <NoteRecentNotes :display="5"></NoteRecentNotes>
    </Suspense>
  </div>
</template>
