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
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';

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
      console.log(detail.value);
      console.log(name.value);
      console.log(category.value);
      console.log(itemDate.value);

      const recordObject = {
        title: name.value,
        detail: detail.value,
        category: category.value,
        itemDate: itemDate.value,
      };

      // 1. Get preference of fajour journey record
      // 2. Parse string json value into array object
      // 3. Push a new valid record into the array
      // 4. Transform array into json string
      // 5. Set the preference with the given key with the new stored value
      Preferences.get({
        key: 'fajour-journey-record',
      })
        .then((value) => {
          const jsonValue = value.value as string;
          let parsedStringJson = JSON.parse(jsonValue);

          console.log(parsedStringJson);

          parsedStringJson.push(recordObject);

          console.log(parsedStringJson);

          parsedStringJson = JSON.stringify(parsedStringJson);

          Preferences.set({
            key: 'fajour-journey-record',
            value: parsedStringJson,
          })
            .then(() => {
              router.push('/');
              quasar.notify({
                message: 'Created successfully!',
                color: 'secondary',
                icon: 'check_circle',
              });
            })
            .catch(() => {
              quasar.notify({
                message: 'Failed to create',
                color: 'danger',
                icon: 'cancel',
              });
            });
        })
        .catch(() => {
          quasar.notify({
            message: 'Failed to fetch journey records',
            color: 'danger',
            icon: 'cancel',
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

      // Get preference of fajour journey record
      // Parse string json value into array object
      // Push a new valid record into the array
      // Transform array into json string
      // Set the preference with the given key with the new stored value
      Preferences.get({
        key: 'fajour-journey-record',
      })
        .then((value) => {
          const jsonValue = value.value as string;
          const parsedStringJson = JSON.parse(jsonValue);

          console.log(parsedStringJson);
        })
        .catch(() => {
          quasar.notify({
            message: 'Failed to fetch journey records',
            color: 'danger',
            icon: 'cancel',
          });
        });
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
