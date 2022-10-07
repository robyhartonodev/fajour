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
        :rules="[(val) => !!val || 'Field is required']"
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
        :rules="[(val) => !!val || 'Field is required']"
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

      <q-input
        v-model="detail"
        label="Detail"
        filled
        type="textarea"
        clearable
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

interface JourneyItem {
  id: string;
  title: string;
  detail: string;
  category: string;
  date: string;
}

export default defineComponent({
  name: 'JourneyItemPage',
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

    function onSubmit() {
      if (formMode.value == 'new') {
        const recordObject = {
          id: generateRandomId(),
          title: title.value,
          detail: detail.value,
          category: category.value,
          date: itemDate.value,
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

          router.push('/');
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
            }

            userJourneyStore.setItem(itemDate.value, arrayObject);
          }

          router.push('/');
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
    }

    function generateRandomId() {
      return Math.random().toString(16).slice(2);
    }

    function initializePage() {
      itemDate.value = date.formatDate(Date.now(), 'DD-MM-YYYY');

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
          }
        });
      }
      if (route.name == 'NewJourney') {
        formMode.value = 'new';
      }
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
    };
  },
});
</script>
