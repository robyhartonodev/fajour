<template>
  <div>
    <div v-if="mode == 'default'">
      <q-btn
        :label="label"
        color="primary"
        outline
        @click="openDialog = true"
      />
    </div>
    <div v-if="mode == 'viewer'">
      <q-btn
        icon="description"
        color="primary"
        flat
        round
        @click="openDialog = true"
      />
    </div>
    <q-dialog v-model="openDialog" full-height full-width>
      <q-card class="column full-height">
        <q-card-section>
          <div class="row items-center justify-between">
            <div class="text-h6">
              {{ label }}
            </div>
            <div>
              <q-btn @click="openDialog = false" flat icon="close" round />
            </div>
          </div>
        </q-card-section>

        <q-card-section class="col q-pt-none text-justify">
          <div
            v-for="(verse, key) in bibleStore.getVerses(
              bookName,
              chapterNumber,
              verseFromNumber,
              verseToNumber
            )"
            :key="key"
            class="q-mb-sm q-pa-sm"
            style="font-size: large"
          >
            <span class="text-bold" v-ripple>{{ verse.num }}</span>
            {{ verse.text }}
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';

import { useBibleStore } from 'src/stores/bible';

export default defineComponent({
  name: 'BibleLabelVerse',
  props: {
    bookName: {
      type: String,
      default: 'Genesis',
    },
    chapterNumber: {
      type: Number,
      default: 1,
    },
    verseFromNumber: {
      type: Number,
      default: 1,
    },
    verseToNumber: {
      type: Object as PropType<number | null>,
      default: null,
    },
    mode: {
      type: String as PropType<'default' | 'viewer'>,
      default: 'default',
    },
  },
  setup(props) {
    const bibleStore = useBibleStore();
    const openDialog = ref(false);

    const label = ref('');

    function setLabelValue() {
      label.value = props.verseToNumber
        ? `${props.bookName} ${props.chapterNumber}:${props.verseFromNumber}-${props.verseToNumber}`
        : `${props.bookName} ${props.chapterNumber}:${props.verseFromNumber}`;
    }

    onMounted(() => {
      setLabelValue();
    });

    return {
      bibleStore,
      openDialog,
      label,
    };
  },
});
</script>
