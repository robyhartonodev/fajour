<template>
  <q-card
    v-for="(item, index) in list"
    :key="index"
    class="q-mb-sm"
    v-ripple
    v-touch-hold:300.mouse="() => onItemClick()"
  >
    <div>
      <q-item clickable>
        <q-item-section>
          <q-item-label style="word-wrap: break-word" class="text-justify">
            {{ item.title }}
          </q-item-label>
          <q-item-label
            caption
            style="word-wrap: break-word"
            class="text-justify"
          >
            {{ item.detail }}
          </q-item-label>
          <q-item-label caption style="word-wrap: break-word">
            <div class="q-my-sm text-secondary font-bold">Verses</div>
            <div class="row q-col-gutter-sm">
              <div
                v-for="(bible, index) in parseBibleVerses(item.bibleVerses)"
                :key="index"
                class="col-6 col-md-3"
              >
                <bible-label-verse
                  :book-name="bible.book"
                  :chapter-number="bible.chapter"
                  :verse-from-number="bible.verse"
                  mode="journey"
                ></bible-label-verse>
              </div>
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon :name="getIconString(item.category)" color="primary" />
        </q-item-section>
      </q-item>
    </div>

    <q-dialog v-model="openDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Select Action</div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item @click="onDelete(item)" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="delete" color="red"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Delete record</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="onEdit(item)">
              <q-item-section avatar>
                <q-icon name="edit" color="accent"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Edit record</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import localforage from 'localforage';
import { useQuasar } from 'quasar';

import BibleLabelVerse from 'src/components/BibleLabelVerse.vue';

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

export default defineComponent({
  name: 'JourneyDetailItem',
  emits: ['delete-item'],
  components: { BibleLabelVerse },
  props: {
    list: {
      type: Array as PropType<JourneyItem[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openDialog = ref(false);
    const router = useRouter();
    const quasar = useQuasar();

    const userJourneyStore = localforage.createInstance({
      name: 'userJourney',
    });

    function getIconString(category: string): string {
      if (category == 'comment') {
        return 'help_outline';
      }
      if (category == 'reflection') {
        return 'psychology';
      }
      if (category == 'thanksgiving') {
        return 'volunteer_activism';
      }
      if (category == 'prayer') {
        return 'accessibility';
      }
      if (category == 'miracle') {
        return 'flare';
      }

      return 'unknown';
    }

    function onItemClick() {
      openDialog.value = true;
    }

    function onDelete(item: JourneyItem) {
      userJourneyStore.iterate((value) => {
        const arrayValue = value as JourneyItem[];

        const recordValue = arrayValue.find((i) => i.id == item.id);

        if (recordValue) {
          const newArrayValue = arrayValue.filter((i) => i.id != item.id);

          // If length still not 0, then keep the key
          if (newArrayValue.length > 0) {
            userJourneyStore.setItem(item.date, newArrayValue).then(() => {
              emit('delete-item');
              quasar.notify({
                message: 'Deleted successfully!',
                color: 'secondary',
                icon: 'check_circle',
              });
            });
          }

          // If length is 0, then delete the key as well
          if (newArrayValue.length == 0) {
            userJourneyStore.removeItem(item.date).then(() => {
              emit('delete-item');
              quasar.notify({
                message: 'Deleted successfully!',
                color: 'secondary',
                icon: 'check_circle',
              });
            });
          }
        }
      });
      openDialog.value = false;
    }

    function onEdit(item: JourneyItem) {
      openDialog.value = false;
      router.push(`/edit/${item.id}/journey`);
    }

    function parseBibleVerses(bibleVerseString: string) {
      if (bibleVerseString) {
        return JSON.parse(bibleVerseString);
      }

      return null;
    }

    return {
      openDialog,
      getIconString,
      onItemClick,
      onDelete,
      onEdit,
      parseBibleVerses,
    };
  },
});
</script>
