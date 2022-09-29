<template>
  <div v-for="(item, index) in list" :key="index">
    <q-item>
      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label caption lines="2">{{ item.detail }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon :name="getIconString(item.category)" color="primary" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface JourneyItem {
  title: string;
  detail: string;
  category: string;
}

export default defineComponent({
  name: 'JourneyDetailItem',
  props: {
    list: {
      type: Array as PropType<JourneyItem[]>,
      required: true,
    },
  },
  setup() {
    function getIconString(category: string): string {
      if (category == 'comment') {
        return 'comment';
      }
      if (category == 'reflection') {
        return 'psychology';
      }
      if (category == 'thanksgiving') {
        return 'volunteer_activism';
      }
      if (category == 'prayer') {
        return 'accessiblity';
      }
      if (category == 'miracle') {
        return 'flare';
      }

      return 'unknown';
    }

    return {
      getIconString,
    };
  },
});
</script>
