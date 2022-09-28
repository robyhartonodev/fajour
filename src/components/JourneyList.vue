<template>
  <q-list>
    <journey-item></journey-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JourneyItem from 'src/components/JourneyItem.vue';

// TODO per default filter the current month
// TODO maybe get all days of the month
// TODO need persistent in app database

export default defineComponent({
  name: 'JourneyList',
  components: { JourneyItem },
  setup() {
    return {};
  },
});
</script>
