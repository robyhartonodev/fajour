<template>
  <q-page padding>
    <journey-list></journey-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="secondary"
        icon="add_circle"
        size="lg"
        to="/new/journey"
      >
        <q-tooltip anchor="center left" self="center right">
          New record
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JourneyList from 'src/components/JourneyList.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { JourneyList },
  setup() {
    return {};
  },
});
</script>
