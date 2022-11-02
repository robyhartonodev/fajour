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
import localforage from 'localforage';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const quasar = useQuasar();
    const isDarkMode = ref(false);

    const userPreferenceStore = localforage.createInstance({
      name: 'userPreference',
    });

    const userJourneyStore = localforage.createInstance({
      name: 'userJourney',
    });

    function toggleDarkMode() {
      quasar.dark.toggle();
      isDarkMode.value = quasar.dark.isActive;
      userPreferenceStore.setItem('isDarkMode', isDarkMode.value);
    }

    function removeJourneyRecords() {
      quasar
        .dialog({
          title: 'Confirm',
          message:
            'Would you like to reset your journey records? This operation is irreversible',
          cancel: true,
          persistent: false,
        })
        .onOk(() => {
          userJourneyStore.clear().then(() => {
            quasar.notify({
              message: 'Reseted successfully!',
              color: 'secondary',
              icon: 'check_circle',
            });
          });
        });
    }

    onMounted(() => {
      userPreferenceStore.getItem('isDarkMode').then((value) => {
        isDarkMode.value = value as boolean;
        quasar.dark.set(value as boolean);
      });
    });

    return {
      isDarkMode,
      toggleDarkMode,
      removeJourneyRecords,
    };
  },
});
</script>
