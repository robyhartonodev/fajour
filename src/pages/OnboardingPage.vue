<template>
  <q-page padding>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      arrows
      swipeable
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" color="primary" size="56px" />
        <div class="q-mt-md q-pa-lg text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" color="primary" size="56px" />
        <div class="q-mt-md q-pa-lg text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" color="primary" size="56px" />
        <div class="q-mt-md q-pa-lg text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" color="primary" size="56px" />
        <div class="q-mt-md q-pa-lg text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-page-sticky position="bottom" :offset="[0, 18]">
      <div class="row justify-between">
        <q-btn flat color="primary" label="Skip" to="/" />
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'OnboardingPage',
  setup() {
    return {
      slide: ref('style'),
      options: ref([
        { label: 1, value: 'style' },
        { label: 2, value: 'tv' },
        { label: 3, value: 'layers' },
        { label: 4, value: 'map' },
      ]),
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?',
    };
  },
});
</script>
