<template>
  <q-card
    v-for="(item, index) in list"
    :key="index"
    class="q-mb-sm"
    v-ripple
    v-touch-hold:300.mouse="() => onItemClick()"
  >
    <q-card-section>
      <q-item clickable>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption lines="2">{{ item.detail }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon :name="getIconString(item.category)" color="primary" />
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-dialog v-model="openDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Select Action</div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item @click="onDelete(item)" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="delete" color="red"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Delete record</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="onEdit(item)">
              <q-item-section avatar>
                <q-icon name="edit" color="accent"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Edit record</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import localforage from 'localforage';
import { useQuasar } from 'quasar';

interface JourneyItem {
  id: string;
  title: string;
  detail: string;
  category: string;
  date: string;
}

export default defineComponent({
  name: 'JourneyDetailItem',
  props: {
    list: {
      type: Array as PropType<JourneyItem[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openDialog = ref(false);
    const router = useRouter();
    const quasar = useQuasar();

    const userJourneyStore = localforage.createInstance({
      name: 'userJourney',
    });

    function getIconString(category: string): string {
      if (category == 'comment') {
        return 'help_outline';
      }
      if (category == 'reflection') {
        return 'psychology';
      }
      if (category == 'thanksgiving') {
        return 'volunteer_activism';
      }
      if (category == 'prayer') {
        return 'accessibility';
      }
      if (category == 'miracle') {
        return 'flare';
      }

      return 'unknown';
    }

    function onItemClick() {
      openDialog.value = true;
    }

    function onDelete(item: JourneyItem) {
      userJourneyStore.iterate((value) => {
        const arrayValue = value as JourneyItem[];

        const recordValue = arrayValue.find((i) => i.id == item.id);

        if (recordValue) {
          const newArrayValue = arrayValue.filter((i) => i.id != item.id);
          userJourneyStore.setItem(item.date, newArrayValue);

          if (newArrayValue.length == 0) {
            userJourneyStore.removeItem(item.date);
          }

          emit('delete-item');
          quasar.notify({
            message: 'Deleted successfully!',
            color: 'secondary',
            icon: 'check_circle',
          });
        }
      });
      openDialog.value = false;
    }

    function onEdit(item: JourneyItem) {
      openDialog.value = false;
      router.push(`/edit/${item.id}/journey`);
    }

    return {
      openDialog,
      getIconString,
      onItemClick,
      onDelete,
      onEdit,
    };
  },
});
</script>
