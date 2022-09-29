<template>
  <q-page>
    <q-list padding>
      <q-item-label header>Appearance</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item tag="label">
            <q-item-section avatar>
              <q-icon color="primary" name="lightbulb" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dark mode</q-item-label>
              <q-item-label caption> Switch the dark mode </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                color="primary"
                v-model="isDarkMode"
                @update:model-value="toggleDarkMode()"
              />
            </q-item-section>
          </q-item>
        </q-item-section>
      </q-item>

      <q-separator></q-separator>

      <q-item-label header>System</q-item-label>

      <q-item clickable v-ripple @click="removeJourneyRecords()">
        <q-item-section>
          <q-item tag="label">
            <q-item-section avatar>
              <q-icon color="primary" name="delete_outline" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Reset Journey</q-item-label>
              <q-item-label caption> Delete your journey records </q-item-label>
            </q-item-section>
          </q-item>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Preferences } from '@capacitor/preferences';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const quasar = useQuasar();
    const isDarkMode = ref(false);

    function toggleDarkMode() {
      quasar.dark.toggle();
      isDarkMode.value = quasar.dark.isActive;
    }

    function removeJourneyRecords() {
      Preferences.remove({ key: 'fajour-journey-record' })
        .then(() => {
          quasar.notify({
            message: 'Reseted successfully!',
            color: 'secondary',
            icon: 'check_circle',
          });

          initialJourneyPreference();
        })
        .catch(() => {
          quasar.notify({
            message: 'Failed to remove',
            color: 'danger',
            icon: 'cancel',
          });
        });
    }

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
      isDarkMode.value = quasar.dark.isActive;
    });

    return {
      isDarkMode,
      toggleDarkMode,
      removeJourneyRecords,
    };
  },
});
</script>
