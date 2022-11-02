<template>
  <q-page padding>
    <div class="text-justify text-h5 text-primary q-ma-md">
      {{ `${chapterId}.${questionId} ${question?.title}` }}
    </div>
    <q-list>
      <q-card
        v-for="(answer, index) in question?.answers"
        :key="index"
        class="q-mb-sm shadow-4"
      >
        <q-card-section class="text-justify" v-ripple>
          {{ answer }}
        </q-card-section>
      </q-card>
    </q-list>
  </q-page>

  <q-page-sticky
    position="bottom-left"
    :offset="[18, 18]"
    v-if="questionId > 1"
  >
    <q-btn
      color="secondary"
      icon="arrow_back"
      round
      @click="onButtonClick(chapterId, questionId - 1)"
    />
  </q-page-sticky>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
    v-if="questionId != lastQuestionNumber"
  >
    <q-btn
      color="secondary"
      icon="arrow_forward"
      round
      @click="onButtonClick(chapterId, questionId + 1)"
    />
  </q-page-sticky>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import chapterOneJson from 'src/assets/basic-beliefs/chapter1.json';
import chapterTwoJson from 'src/assets/basic-beliefs/chapter2.json';
import chapterThreeJson from 'src/assets/basic-beliefs/chapter3.json';
import chapterFourJson from 'src/assets/basic-beliefs/chapter4.json';

interface QuestionItem {
  id: number;
  title: string;
  answers: string[];
}

export default defineComponent({
  name: 'BasicBeliefDetailPage',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const question: Ref<QuestionItem | undefined> = ref(undefined);

    const chapterId = ref(0);
    const questionId = ref(0);

    const lastQuestionNumber: Ref<number | undefined> = ref(undefined);

    const chapterList = [
      chapterOneJson,
      chapterTwoJson,
      chapterThreeJson,
      chapterFourJson,
    ];

    function getQuestionItem() {
      const chapter = chapterList.find((val) => val.id == chapterId.value);

      if (chapter) {
        question.value = chapter.questions.find(
          (question) => question.id == questionId.value
        );

        lastQuestionNumber.value = chapter.questions.length;
      }
    }

    function onButtonClick(chapter: number, question: number) {
      questionId.value = question;
      chapterId.value = chapter;
      router.push(`/basic-beliefs/chapter/${chapter}/question/${question}`);
      getQuestionItem();
    }

    watch(
      () => route.params,
      () => {
        chapterId.value = Number(route.params.chapterId as string);
        questionId.value = Number(route.params.questionId as string);
        getQuestionItem();
      }
    );

    onMounted(() => {
      chapterId.value = Number(route.params.chapterId as string);
      questionId.value = Number(route.params.questionId as string);

      getQuestionItem();
    });

    return {
      chapterList,
      question,
      questionId,
      chapterId,
      lastQuestionNumber,
      onButtonClick,
    };
  },
});
</script>
