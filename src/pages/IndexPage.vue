<template>
  <q-page padding>
    <journey-list></journey-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="secondary"
        icon="add_circle"
        size="lg"
        @click="openJourneyForm"
      />
    </q-page-sticky>

    <q-page-sticky position="bottom" :offset="[0, 0]">
      <transition
        enter-active-class="animated slower slideInUp"
        leave-active-class="animated slower slideOutDown"
      >
        <journey-form v-show="showJourneyForm" @close="onCloseJourneyForm()" />
      </transition>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JourneyList from 'src/components/JourneyList.vue';
import JourneyForm from 'src/components/JourneyForm.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { JourneyList, JourneyForm },
  setup() {
    const showJourneyForm = ref(false);

    function openJourneyForm() {
      showJourneyForm.value = true;
    }

    function onCloseJourneyForm() {
      showJourneyForm.value = false;
    }

    return {
      showJourneyForm,
      openJourneyForm,
      onCloseJourneyForm,
    };
  },
});
</script>
