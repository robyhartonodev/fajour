<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import localforage from 'localforage';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const quasar = useQuasar();

    const userPreferenceStore = localforage.createInstance({
      name: 'userPreference',
    });

    onMounted(() => {
      // Dark Mode
      userPreferenceStore.getItem('isDarkMode').then((value) => {
        if (value) {
          quasar.dark.set(value as boolean);
        }
      });
    });

    return {};
  },
});
</script>
