<template>
  <div>
    <q-dialog> </q-dialog>

    <div class="row q-col-gutter-sm q-ma-sm">
      <q-btn
        color="secondary"
        flat
        :label="selectedBook"
        icon-right="close"
        @click="resetState"
      ></q-btn>
      <q-btn
        color="secondary"
        flat
        :label="selectedChapter"
        icon-right="close"
        @click="resetState"
      ></q-btn>
      <q-btn
        color="secondary"
        flat
        :label="selectedVerse"
        icon-right="close"
        @click="resetState"
      ></q-btn>
    </div>

    <!-- Book Selector -->
    <div class="row justify-center" v-if="isBookSelected == false">
      <div class="col-6 text-center book-scroll">
        <div class="text-h4 q-mb-md text-primary">Old Testament</div>

        <div v-for="n in 39" :key="n" class="q-px-md">
          <q-btn
            outline
            color="primary"
            :label="`${n} - book`"
            class="q-mt-sm w-full"
            @click="isBookSelected = true"
          />
        </div>
      </div>
      <div class="col-6 text-center book-scroll">
        <div class="text-h4 q-mb-md text-secondary">New Testament</div>

        <div v-for="n in 27" :key="n" class="q-px-md">
          <q-btn
            outline
            color="primary"
            :label="`${n} - book`"
            class="q-mt-sm w-full"
            @click="isBookSelected = true"
          />
        </div>
      </div>
    </div>

    <!-- TODO: Chapter Selector -->
    <div class="row" v-if="isBookSelected">
      <div class="col-2 text-center" v-for="n in 150" :key="n">
        <q-btn color="accent" flat :label="n" round></q-btn>
      </div>
    </div>

    <!-- TODO: Verse Selector -->
    <div class="row" v-if="isChapterSelected">
      <div class="col-2 text-center" v-for="n in 60" :key="n">
        <q-btn color="accent" flat :label="n" round></q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'BibleChapterVerseSelector',
  setup() {
    const books = ref([]);

    const isBookSelected = ref(false);
    const isChapterSelected = ref(false);
    const isVerseSelected = ref(false);

    const selectedBook = ref('book');
    const selectedChapter = ref('chapter');
    const selectedVerse = ref('verse');

    function setBook(bookName: string) {
      selectedBook.value = bookName;
    }

    function setChapter(chapterName: string) {
      selectedChapter.value = chapterName;
    }

    function setVerse(verseName: string) {
      selectedVerse.value = verseName;
    }

    function resetState() {
      isBookSelected.value = false;
      isChapterSelected.value = false;
      isVerseSelected.value = false;
    }

    function redirectTo() {
      // TODO
    }

    return {
      books,
      selectedBook,
      selectedChapter,
      selectedVerse,
      setBook,
      setChapter,
      setVerse,
      isBookSelected,
      isChapterSelected,
      isVerseSelected,
      resetState,
      redirectTo,
    };
  },
});
</script>

<style scoped>
.book-scroll {
  height: 100vh;
  overflow-y: auto;
}

.w-full {
  width: 100%;
}
</style>
