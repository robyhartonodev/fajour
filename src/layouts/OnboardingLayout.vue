<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'OnboardingLayout',

  setup() {
    return {};
  },
});
</script>
