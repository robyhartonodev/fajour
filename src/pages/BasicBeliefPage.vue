<template>
  <q-page padding>
    <q-input
      filled
      bottom-slots
      v-model="searchText"
      label="Search by question or statement title"
    >
      <template v-slot:before>
        <q-icon name="help" color="secondary"> </q-icon>
      </template>
      <template v-slot:append>
        <q-icon
          v-if="searchText !== ''"
          name="close"
          @click="searchText = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" />
      </template>
    </q-input>

    <q-list padding separator bordered>
      <q-expansion-item
        clickable
        :label="chapter.title"
        :caption="`Chapter ${indexChapter + 1}`"
        v-for="(chapter, indexChapter) in chapterList"
        :key="indexChapter"
      >
        <q-list separator>
          <q-item
            v-for="(question, indexQuestion) in chapter.questions"
            class="text-justify"
            :key="indexQuestion"
            :to="`basic-beliefs/chapter/${chapter.id}/question/${question.id}`"
          >
            <q-item-section>
              <q-item-label>
                {{ question.title }}
              </q-item-label>
              <q-item-label caption>
                {{ `Question 1.${question.id}` }}
              </q-item-label>
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

export default defineComponent({
  name: 'BasicBeliefPage',
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

    onMounted(() => {
      //
    });

    return {
      searchText,
      chapterList,
    };
  },
});
</script>
