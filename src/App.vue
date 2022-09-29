<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const quasar = useQuasar();

    function initialJourneyPreference() {
      Preferences.get({
        key: 'fajour-journey-record',
      })
        .then((value) => {
          if (value.value === null) {
            console.log('Value has not been set. Initialize preferences...');
            Preferences.set({
              key: 'fajour-journey-record',
              value: '{}',
            }).catch(() => {
              quasar.notify({
                message: 'Failed to fetch journey records',
                color: 'danger',
                icon: 'cancel',
              });
            });
          } else {
            console.log('Value has been set. Skipped initialization...');
          }
        })
        .catch(() => {
          quasar.notify({
            message: 'Failed to fetch journey records',
            color: 'danger',
            icon: 'cancel',
          });
        });
    }

    onMounted(() => {
      initialJourneyPreference();
    });
  },
});
</script>
