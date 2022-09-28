<template>
  <q-item>
    <q-item-section>
      <q-item-label>Single line item</q-item-label>
      <q-item-label caption lines="2"
        >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
        elit.</q-item-label
      >
    </q-item-section>

    <q-item-section side>
      <q-icon name="speaker_notes" color="deep-purple" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'JourneyDetailItem',
  setup() {
    return {};
  },
});
</script>
