<template>
  <q-page padding>
    <div class="text-h4 text-primary q-my-md">
      {{ formMode == 'new' ? 'New' : 'Edit' }} Record
    </div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-my-md">
      <!-- Date -->
      <q-input
        filled
        v-model="itemDate"
        label="Date*"
        mask="##-##-####"
        clearable
        :rules="[(val: any) => !!val || 'Field is required']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="itemDate" mask="DD-MM-YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <!-- Category Selects -->
      <q-select
        filled
        v-model="category"
        :options="categoryOptions"
        label="Category*"
        clearable
        options-selected-class="text-secondary"
        emit-value
        :rules="[(val: any) => !!val || 'Field is required']"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon color="secondary" :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        filled
        v-model="title"
        label="Title *"
        lazy-rules
        clearable
        :rules="[(val) => !!val || 'Field is required']"
      />

      <!-- Reference verses -->
      <q-select
        filled
        v-model="bibleVerses"
        :options="verseOptions"
        label="Verses"
        options-selected-class="text-secondary"
        emit-value
        multiple
        use-input
        input-debounce="500"
        option-value="value"
        option-label="label"
        @filter="onFilterBibleSelect"
        use-chips
        map-options
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
            <!-- <q-item-section side>
              <bible-label-verse
                :book-name="scope.opt.value.book"
                :chapter-number="scope.opt.value.chapter"
                :verse-from-number="scope.opt.value.verse"
                mode="viewer"
              />
            </q-item-section> -->
          </q-item>
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-secondary"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        v-model="detail"
        label="Detail"
        filled
        type="textarea"
        clearable
        class="q-pt-md"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { date, useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import localforage from 'localforage';
import { useBibleStore } from 'src/stores/bible';

import BibleLabelVerse from 'src/components/BibleLabelVerse.vue';

interface IBibleReferenceValue {
  book: string;
  chapter: number;
  verse: number;
}

interface IBibleReference {
  label: string;
  value: IBibleReferenceValue;
}

interface JourneyItem {
  id: string;
  title: string;
  detail: string;
  category: string;
  date: string;
  bibleVerses: string; // stringified of IBibleReferenceValue
}

export default defineComponent({
  name: 'JourneyItemPage',
  // components: { BibleLabelVerse },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const quasar = useQuasar();

    const formMode: Ref<'new' | 'edit'> = ref('new');

    const itemId = ref('');
    const detail = ref('');
    const title = ref('');
    const itemDate = ref('');
    const category = ref('');
    const bibleVerses: Ref<IBibleReferenceValue[]> = ref([]);

    const bibleStore = useBibleStore();
    const verseOptions: Ref<IBibleReference[]> = ref([]);

    const categoryOptions = ref([
      {
        label: 'Comments',
        value: 'comment',
        icon: 'help_outline',
      },
      {
        label: 'Reflection',
        value: 'reflection',
        icon: 'psychology',
      },
      {
        label: 'Thanksgiving',
        value: 'thanksgiving',
        icon: 'volunteer_activism',
      },
      {
        label: 'Prayer',
        value: 'prayer',
        icon: 'accessibility',
      },
      {
        label: 'Miracle',
        value: 'miracle',
        icon: 'flare',
      },
    ]);

    const userJourneyStore = localforage.createInstance({
      name: 'userJourney',
    });

    function onFilterBibleSelect(
      val: string,
      update: (arg0: () => void) => void
    ) {
      if (val === '') {
        update(() => {
          verseOptions.value = bibleStore.bible.books
            .map((book) => {
              return book.chapters.map((chapter) => {
                return chapter.verses.map((verse) => {
                  return {
                    value: {
                      book: book.name,
                      chapter: chapter.num,
                      verse: verse.num,
                    },
                    label: `${book.name} ${chapter.num}:${verse.num}`,
                  };
                });
              });
            })
            .flat()
            .flat();
        });
        return;
      }

      update(() => {
        verseOptions.value = bibleStore.bible.books
          .map((book) => {
            return book.chapters.map((chapter) => {
              return chapter.verses.map((verse) => {
                return {
                  value: {
                    book: book.name,
                    chapter: chapter.num,
                    verse: verse.num,
                  },
                  label: `${book.name} ${chapter.num}:${verse.num}`,
                };
              });
            });
          })
          .flat()
          .flat()
          .filter((item) => {
            return item.label.toLowerCase().indexOf(val) > -1;
          });
      });
    }

    function onSubmit() {
      if (formMode.value == 'new') {
        const recordObject = {
          id: generateRandomId(),
          title: title.value,
          detail: detail.value,
          category: category.value,
          date: itemDate.value,
          bibleVerses: JSON.stringify(bibleVerses.value),
        };

        userJourneyStore.getItem(itemDate.value).then((value) => {
          if (value == null) {
            userJourneyStore.setItem(itemDate.value, [recordObject]);
          }

          if (value != null) {
            const arrayObject = value as unknown[];
            arrayObject.push(recordObject);
            userJourneyStore.setItem(itemDate.value, arrayObject);
          }

          router.push('/reflections');
          quasar.notify({
            message: 'Created successfully!',
            color: 'secondary',
            icon: 'check_circle',
          });
        });
      }
      if (formMode.value == 'edit') {
        userJourneyStore.getItem(itemDate.value).then((value) => {
          if (value != null) {
            const arrayObject = value as JourneyItem[];

            const record = arrayObject.find((item) => item.id === itemId.value);

            if (record) {
              record.title = title.value;
              record.detail = detail.value;
              record.category = category.value;
              record.date = itemDate.value;
              record.bibleVerses = JSON.stringify(bibleVerses.value);
            }

            userJourneyStore.setItem(itemDate.value, arrayObject);
          }

          router.push('/reflections');
          quasar.notify({
            message: 'Edited successfully!',
            color: 'secondary',
            icon: 'check_circle',
          });
        });
      }
    }

    function onReset() {
      detail.value = '';
      title.value = '';
      category.value = '';
      itemDate.value = date.formatDate(Date.now(), 'DD-MM-YYYY');
      bibleVerses.value = [];
    }

    function generateRandomId() {
      return Math.random().toString(16).slice(2);
    }

    function initializePage() {
      itemDate.value = date.formatDate(Date.now(), 'DD-MM-YYYY');

      // Edit page
      if (route.name == 'EditJourney') {
        formMode.value = 'edit';
        itemId.value = route.params.id as string;

        let recordValue: JourneyItem | undefined;

        // Get the record from the user journey store
        userJourneyStore.iterate((value) => {
          const arrayValue = value as JourneyItem[];

          recordValue = arrayValue.find((item) => item.id == itemId.value);

          if (recordValue) {
            itemDate.value = recordValue.date;
            itemId.value = recordValue.id;
            detail.value = recordValue.detail;
            category.value = recordValue.category;
            title.value = recordValue.title;
            bibleVerses.value = JSON.parse(recordValue.bibleVerses);
          }
        });
      }

      // New page
      if (route.name == 'NewJourney') {
        formMode.value = 'new';
      }

      // Verse options pre-fill
      verseOptions.value = bibleStore.bible.books
        .map((book) => {
          return book.chapters.map((chapter) => {
            return chapter.verses.map((verse) => {
              return {
                value: {
                  book: book.name,
                  chapter: chapter.num,
                  verse: verse.num,
                },
                label: `${book.name} ${chapter.num}:${verse.num}`,
              };
            });
          });
        })
        .flat()
        .flat();
    }

    onMounted(() => {
      initializePage();
    });

    return {
      itemDate,
      detail,
      title,
      category,
      categoryOptions,
      onSubmit,
      onReset,
      formMode,
      verseOptions,
      bibleVerses,
      onFilterBibleSelect,
      bibleStore,
    };
  },
});
</script>
