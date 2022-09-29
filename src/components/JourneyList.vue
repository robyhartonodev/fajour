<template>
  <q-list>
    <journey-item></journey-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JourneyItem from 'src/components/JourneyItem.vue';

export default defineComponent({
  name: 'JourneyList',
  components: { JourneyItem },
  setup() {
    return {};
  },
});
</script>
