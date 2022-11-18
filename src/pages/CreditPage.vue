<template>
  <q-page padding>
    <div class="text-h4 q-pa-sm text-primary">Credits</div>

    <q-list>
      <q-item v-for="source in sources" :key="source.title">
        <q-item-section>
          <q-item-label>
            <a :href="source.link">{{ source.title }} </a>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'CreditPage',
  setup() {
    const sources = ref([
      {
        title: 'Bible (NKJV)',
        link: 'https://github.com/jplehmann/textbites/blob/master/textbites/data/NKJV.bible.json',
      },
      {
        title: '10 Basic Beliefs',
        link: 'https://tjc.org/de/wp-content/uploads/sites/39/2020/06/Glaubensgrundlagen-Karte-4-finalversion.pdf',
      },
    ]);

    return {
      sources,
    };
  },
});
</script>
