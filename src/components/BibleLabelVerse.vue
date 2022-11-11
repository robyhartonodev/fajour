<template>
  <div style="width: 100%">
    <span class="text-primary">
      {{ bookName }} {{ chapterNumber }}:{{ verseNumber }}
      <q-tooltip>
        <div>
          <span class="text-bold">{{ chapterNumber }}</span>
          {{ bibleStore.getVerseText(bookName, chapterNumber, verseNumber) }}
        </div>
      </q-tooltip>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useBibleStore } from 'src/stores/bible';

export default defineComponent({
  name: 'BibleLabelVerse',
  props: {
    bookName: {
      type: String,
      default: 'Genesis',
    },
    chapterNumber: {
      type: Number,
      default: 1,
    },
    verseNumber: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const bibleStore = useBibleStore();

    return {
      bibleStore,
    };
  },
});
</script>
