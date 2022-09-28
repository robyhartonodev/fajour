<template>
  <q-item>
    <div class="row items-start full-width">
      <div class="col-3">
        <div
          class="
            q-pa-md
            rounded-borders
            bg-secondary
            text-h4 text-white text-center
          "
        >
          14
        </div>
      </div>
      <div class="col-9">
        <q-list>
          <journey-detail-item v-for="index in 15" :key="index">
          </journey-detail-item>
        </q-list>
      </div>
    </div>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JourneyDetailItem from 'src/components/JourneyDetailItem.vue';

export default defineComponent({
  name: 'JourneyItem',
  components: {
    JourneyDetailItem,
  },
  setup() {
    return {};
  },
});
</script>
