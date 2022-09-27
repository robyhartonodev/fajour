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
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const quasar = useQuasar();
    const isDarkMode = ref(false);

    function toggleDarkMode() {
      quasar.dark.toggle();
      isDarkMode.value = quasar.dark.isActive;
    }

    onMounted(() => {
      isDarkMode.value = quasar.dark.isActive;
    });

    return {
      isDarkMode,
      toggleDarkMode,
    };
  },
});
</script>
