<template>
  <q-page padding>
    <div class="text-primary text-h4 q-my-md">Reminders</div>

    <q-list padding bordered separator>
      <q-item clickable v-ripple v-for="item in 20" :key="item">
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>
            Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="secondary"
        icon="add_circle"
        size="lg"
        to="/new/schedule"
      >
        <q-tooltip anchor="center left" self="center right">
          New record
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Plugins } from '@capacitor/core';

export default defineComponent({
  name: 'SchedulePage',
  setup() {
    const { LocalNotifications } = Plugins;

    async function testSchedule() {
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Title',
            body: 'Body',
            id: 1,
            schedule: {
              at: new Date(Date.now() + 1000 * 15),
              repeats: true,
              every: 'minute',
              count: 5,
            },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null,
          },
        ],
      });
      console.log('scheduled notifications', notifs);
    }

    onMounted(() => {
      testSchedule();
    });

    return {};
  },
});
</script>
