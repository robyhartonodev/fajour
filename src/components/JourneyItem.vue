<template>
  <div>
    <!-- Month and year filter select -->
    <q-select
      class="q-pa-sm"
      filled
      v-model="filterMonth"
      :options="filterMonthOptions"
      label="Month"
      @update:model-value="getJourneyItem()"
    />

    <div
      v-if="Object.keys(journeyItemList).length === 0"
      class="text-center q-pa-md text-secondary text-bold text-primary"
    >
      <div>Add your journey record here</div>
      <q-icon name="receipt_long" size="12rem" color="secondary"></q-icon>
    </div>

    <q-item v-for="(value, key) in journeyItemList" :key="key">
      <div class="row items-start full-width">
        <div class="col-12 q-mb-sm">
          <div class="q-pa-md bg-secondary text-h5 text-white text-center">
            <div>
              {{ key.toString().slice(0, 2) }}
            </div>
            <div>
              {{ filterMonth.slice(0, 3).toUpperCase() }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <q-list>
            <journey-detail-item
              :list="value"
              @delete-item="getJourneyItem()"
            ></journey-detail-item>
          </q-list>
        </div>
      </div>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import JourneyDetailItem from 'src/components/JourneyDetailItem.vue';
import { date } from 'quasar';
import localforage from 'localforage';

interface IBibleReferenceValue {
  book: string;
  chapter: number;
  verse: number;
}

interface JourneyItem {
  id: string;
  title: string;
  detail: string;
  category: string;
  date: string;
  bibleVerses: string;
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
    const filterMonth = ref('');
    const filterMonthOptions: Ref<string[]> = ref([]);

    const userJourneyStore = localforage.createInstance({
      name: 'userJourney',
    });

    function getJourneyItem() {
      journeyItemList.value = {};

      userJourneyStore.iterate((value, key) => {
        const dateKey = date.extractDate(key, 'DD-MM-YYYY');
        const formattedKey = date.formatDate(dateKey, 'MMMM YYYY');

        // Filtering
        if (formattedKey == filterMonth.value) {
          journeyItemList.value[key] = value as JourneyItem[];
        }
      });
    }

    function generateMonthSelectOptions() {
      userJourneyStore.keys().then((keys) => {
        const formattedKeys = keys
          .map((value) => {
            const dateValue = date.extractDate(value, 'DD-MM-YYYY');
            const formattedDate = date.formatDate(dateValue, 'MMMM YYYY');

            return formattedDate;
          })
          // Filter unique month year option
          .filter((value, index, array) => array.indexOf(value) === index)
          .sort();

        filterMonthOptions.value = formattedKeys;
      });
    }

    onMounted(() => {
      filterMonth.value = date.formatDate(new Date(), 'MMMM YYYY');

      generateMonthSelectOptions();
      getJourneyItem();
    });

    return {
      journeyItemList,
      filterMonth,
      filterMonthOptions,
      getJourneyItem,
    };
  },
});
</script>
