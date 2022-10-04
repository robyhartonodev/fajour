<template>
  <q-page padding>
    <div class="text-h4 text-primary q-mt-md">New Record</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-my-md">
      <!-- Date -->
      <q-input
        filled
        v-model="itemDate"
        label="Date*"
        mask="##-##-####"
        clearable
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
        v-model="name"
        label="Title *"
        lazy-rules
        clearable
        :rules="[
          (val) => (val && val.length > 0) || 'This field cannot be empty',
        ]"
      />

      <q-input
        v-model="detail"
        label="Detail *"
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
import { defineComponent, onMounted, ref } from 'vue';
import { date, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import localforage from 'localforage';

// TODO unique id for each item, inside of the
// TODO structure array like this:
// [
// '30-08-2022': [{'title': 'title1', 'detail': 'detail1', 'category': 'category1' }, {'title': 'title2', 'detail': 'detail2', 'category': 'category2' }],
// '01-09-2022': [{'title': 'title1', 'detail': 'detail1', 'category': 'category1' }]
// ]

export default defineComponent({
  name: 'NewJourneyItemPage',
  setup() {
    const router = useRouter();
    const quasar = useQuasar();

    const detail = ref(null);
    const name = ref('');
    const itemDate = ref('');
    const category = ref(null);
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

    function onSubmit() {
      const recordObject = {
        title: name.value,
        detail: detail.value,
        category: category.value,
      };

      const userJourneyStore = localforage.createInstance({
        name: 'userJourney',
      });

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

    function onReset() {
      detail.value = null;
      name.value = '';
      itemDate.value = date.formatDate(Date.now(), 'DD-MM-YYYY');
      category.value = null;
    }

    onMounted(() => {
      itemDate.value = date.formatDate(Date.now(), 'DD-MM-YYYY');
    });

    return {
      itemDate,
      detail,
      name,
      category,
      categoryOptions,
      onSubmit,
      onReset,
    };
  },
});
</script>
