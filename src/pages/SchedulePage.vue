<template>
  <q-page padding>
    <div class="text-primary text-h4 q-my-md">Your Schedules</div>

    <q-list padding bordered>
      <q-item clickable v-ripple v-for="item in 20" :key="item">
        <q-item-section>Title</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SchedulePage',
  setup() {
    return {};
  },
});
</script>
