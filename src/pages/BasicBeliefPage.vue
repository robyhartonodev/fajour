<template>
  <q-page padding>
    <div class="text-h4 text-primary q-mb-md q-pa-sm">10 Basic Beliefs</div>
    <q-list padding separator bordered>
      <q-expansion-item
        clickable
        :label="belief.title"
        :caption="`Section ${indexBelief + 1}`"
        v-for="(belief, indexBelief) in beliefs"
        :key="indexBelief"
      >
        <q-list separator>
          <q-item
            v-for="(point, indexPoint) in belief.points"
            class="text-justify"
            :key="indexPoint"
          >
            <q-item-section>
              <q-expansion-item
                clickable
                :label="`${indexPoint + 1}. ${point.title}`"
              >
                <q-list separator>
                  <q-item
                    v-for="(answer, indexAnswer) in point.answers"
                    :key="indexAnswer"
                    class="text-justify"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{ answer.title }}
                      </q-item-label>
                      <q-item-label>
                        <div class="row q-col-gutter-sm">
                          <div
                            v-for="(verse, indexVerse) in answer.verses"
                            :key="indexVerse"
                          >
                            <bible-label-verse
                              :book-name="verse.book"
                              :chapter-number="verse.chapter"
                              :verse-from-number="verse.verseFrom"
                              :verse-to-number="verse.verseTo"
                            >
                            </bible-label-verse>
                          </div>
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import chapterOneJson from 'src/assets/basic-beliefs/chapter1.json';
import chapterTwoJson from 'src/assets/basic-beliefs/chapter2.json';
import chapterThreeJson from 'src/assets/basic-beliefs/chapter3.json';
import chapterFourJson from 'src/assets/basic-beliefs/chapter4.json';
import chapterFiveJson from 'src/assets/basic-beliefs/chapter5.json';
import chapterSixJson from 'src/assets/basic-beliefs/chapter6.json';

import beliefCompacts from 'src/assets/basic-belief-compact/beliefs.json';

import BibleLabelVerse from 'src/components/BibleLabelVerse.vue';

interface IBeliefCompactVerse {
  book: string;
  chapter: number;
  verseFrom: number;
  verseTo: number | null;
}

interface IBeliefCompactAnswer {
  title: string;
  verses: IBeliefCompactVerse[];
}

interface IBeliefCompactPoint {
  id: number;
  title: string;
  answers: IBeliefCompactAnswer[];
}

interface IBeliefCompact {
  id: number;
  title: string;
  points: IBeliefCompactPoint[];
}

export default defineComponent({
  name: 'BasicBeliefPage',
  components: {
    BibleLabelVerse,
  },
  setup() {
    const searchText = ref('');

    const chapterList = [
      chapterOneJson,
      chapterTwoJson,
      chapterThreeJson,
      chapterFourJson,
      chapterFiveJson,
      chapterSixJson,
    ];

    const beliefs: IBeliefCompact[] = beliefCompacts;

    onMounted(() => {
      //
    });

    return {
      searchText,
      chapterList,
      beliefs,
    };
  },
});
</script>
