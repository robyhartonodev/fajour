<template>
  <q-page padding>
    <div class="text-h4 text-primary q-my-md">New Record</div>

    <q-input
      label="Time"
      filled
      v-model="time"
      mask="time"
      :rules="['time']"
      error-message="This field is required and must be in time format"
      clearable
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="time">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ScheduleFormPage',
  setup() {
    const time = ref('');

    return { time };
  },
});
</script>
