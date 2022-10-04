<template>
  <q-item v-for="(value, key) in journeyItemList" :key="key">
    <div class="row items-start full-width">
      <div class="col-3">
        <div
          class="
            q-pa-md
            rounded-borders
            bg-secondary
            text-h4 text-white text-center
          "
        >
          {{ key.toString().slice(0, 2) }}
        </div>
      </div>
      <div class="col-9">
        <q-list>
          <journey-detail-item :list="value"></journey-detail-item>
        </q-list>
      </div>
    </div>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import JourneyDetailItem from 'src/components/JourneyDetailItem.vue';
import { useQuasar } from 'quasar';
import localforage from 'localforage';

interface JourneyItem {
  title: string;
  detail: string;
  category: string;
}

interface JourneyList {
  [key: string]: JourneyItem[];
}

export default defineComponent({
  name: 'JourneyItem',
  components: {
    JourneyDetailItem,
  },
  setup() {
    const journeyItemList = ref<JourneyList>({});

    function getJourneyItem() {
      const userJourneyStore = localforage.createInstance({
        name: 'userJourney',
      });

      userJourneyStore.iterate((value, key) => {
        journeyItemList.value[key] = value as JourneyItem[];
      });
    }

    onMounted(() => {
      getJourneyItem();
    });

    return {
      journeyItemList,
    };
  },
});
</script>
