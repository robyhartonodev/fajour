<template>
  <q-page padding>
    <bible-chapter-verse-selector></bible-chapter-verse-selector>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BibleChapterVerseSelector from 'src/components/BibleChapterVerseSelector.vue';

export default defineComponent({
  name: 'BiblePage',
  components: {
    BibleChapterVerseSelector,
  },
  setup() {
    return {};
  },
});
</script>
