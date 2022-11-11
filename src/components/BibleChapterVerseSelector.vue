<template>
  <div>
    <div class="row q-col-gutter-xs q-ma-sm" v-if="!bibleStore.selectedVerse">
      <div>
        <q-btn
          color="secondary"
          flat
          :label="bibleStore.selectedBook.name"
          icon-right="close"
          @click="bibleStore.resetState"
          v-if="bibleStore.selectedBook"
          size="sm"
        ></q-btn>
      </div>
      <div>
        <q-btn
          color="secondary"
          flat
          :label="`Chapter: ${bibleStore.selectedChapter.num}`"
          icon-right="close"
          @click="bibleStore.resetChapter"
          v-if="bibleStore.selectedChapter"
          size="sm"
        ></q-btn>
      </div>
      <!-- <div>
        <q-btn
          color="secondary"
          flat
          :label="`Verse: ${bibleStore.selectedVerse.num}`"
          icon-right="close"
          @click="bibleStore.resetVerse"
          v-if="bibleStore.selectedVerse"
          size="sm"
        ></q-btn>
      </div> -->
    </div>

    <!-- Book Selector -->
    <div class="row justify-center" v-if="!bibleStore.selectedBook">
      <div class="col-6 text-center book-scroll">
        <div class="text-h4 q-mb-md text-primary">OT</div>

        <div
          v-for="(book, key) in bibleStore.bible.books"
          :key="key"
          class="q-px-md"
        >
          <q-btn
            outline
            color="primary"
            :label="book.name"
            class="q-mt-sm w-full"
            @click="bibleStore.setBook(book)"
            v-if="key < 39"
          />
        </div>
      </div>
      <div class="col-6 text-center book-scroll">
        <div class="text-h4 q-mb-md text-secondary">NT</div>

        <div
          v-for="(book, key) in bibleStore.bible.books"
          :key="key"
          class="q-px-md"
        >
          <q-btn
            outline
            color="primary"
            :label="book.name"
            class="q-mt-sm w-full"
            @click="bibleStore.setBook(book)"
            v-if="key > 38"
          />
        </div>
      </div>
    </div>

    <div
      class="row"
      v-if="bibleStore.selectedBook && !bibleStore.selectedChapter"
    >
      <div
        class="col-2 text-center"
        v-for="(chapter, key) in bibleStore.selectedBook.chapters"
        :key="key"
      >
        <q-btn
          color="accent"
          flat
          :label="chapter.num"
          round
          @click="bibleStore.setChapter(chapter)"
        ></q-btn>
      </div>
    </div>

    <div
      class="row"
      v-if="bibleStore.selectedChapter && !bibleStore.selectedVerse"
    >
      <div
        class="col-2 text-center"
        v-for="(verse, key) in bibleStore.selectedChapter.verses"
        :key="key"
      >
        <q-btn
          color="accent"
          flat
          :label="verse.num"
          round
          @click="
            bibleStore.setVerse(verse);
            smoothScrollTo(verse.num);
          "
        ></q-btn>
      </div>
    </div>

    <!-- Content -->
    <div ref="swipeElement">
      <div class="text-justify q-pa-sm" v-show="bibleStore.selectedVerse">
        <div
          :id="`verse-${verse.num}`"
          v-for="(verse, key) in bibleStore.selectedChapter?.verses"
          :key="key"
          class="q-mb-sm q-pa-sm"
          style="font-size: large"
          :class="
            bibleStore.selectedVerse?.num == verse.num
              ? 'bg-grey-6 text-white'
              : ''
          "
          @click="
            bibleStore.setVerse(verse);
            smoothScrollTo(verse.num);
          "
        >
          <span class="text-bold" v-ripple>{{ verse.num }}</span>
          {{ verse.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useSwipe } from '@vueuse/core';
import type { SwipeDirection } from '@vueuse/core';

import { useBibleStore } from 'src/stores/bible';

export default defineComponent({
  name: 'BibleChapterVerseSelector',
  setup() {
    const route = useRoute();

    const bibleStore = useBibleStore();

    const swipeElement = ref(null);
    const swipe = useSwipe(swipeElement, {
      threshold: 200,
      onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
        if (direction == 'LEFT') {
          bibleStore.setToNextChapter();
        }
        if (direction == 'RIGHT') {
          bibleStore.setToPreviousChapter();
        }
      },
    });

    onMounted(() => {
      console.log(route.name);
    });

    function smoothScrollTo(verseNum: number) {
      const element = document.getElementById(`verse-${verseNum}`);

      nextTick().then(() => {
        if (element) {
          window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop - 100,
          });
        }
      });
    }

    return {
      swipeElement,
      bibleStore,
      smoothScrollTo,
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
