<template>
  <OnClickOutside @trigger="closeForm">
    <div class="custom-wrapper bg-white shadow-4 q-pa-lg">
      <div class="text-h5 text-primary q-mt-md">New Record</div>
    </div>
  </OnClickOutside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { OnClickOutside } from '@vueuse/components';

export default defineComponent({
  name: 'JourneyForm',
  components: { OnClickOutside },
  setup(props, { emit }) {
    function closeForm() {
      emit('close');
    }

    return {
      closeForm,
    };
  },
});
</script>

<style scoped>
  .custom-wrapper {
    border-top-left-radius: 0.75rem; /* 6px */
    border-top-right-radius: 0.75rem; /* 6px */
    height: 80vh;
    width: 100vw;
  }
</style>
