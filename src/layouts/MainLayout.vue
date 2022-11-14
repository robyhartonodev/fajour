<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar v-if="route.name != 'bible-page'">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ appTitle }} </q-toolbar-title>
      </q-toolbar>
      <q-toolbar v-if="route.name == 'bible-page'">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <div>
          <div v-if="!bibleStore.selectedVerse" class="q-mx-sm text-h6">
            {{ appTitle }}
          </div>
          <div class="row items-center" v-if="bibleStore.selectedVerse">
            <div>
              <q-btn
                flat
                icon="chevron_left"
                round
                @click="bibleStore.setToPreviousChapter"
              />
            </div>
            <div>
              <q-btn
                @click="bibleStore.resetState"
                flat
                :label="`${bibleStore.selectedBook?.name} ${bibleStore.selectedChapter?.num}`"
              />
            </div>
            <div>
              <q-btn
                flat
                icon="chevron_right"
                round
                @click="bibleStore.setToNextChapter"
              />
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="shadow-4 bg-primary text-white"
      show-if-above
      bordered
      style="position: relative"
    >
      <q-list>
        <q-item-label header class="text-h6 text-white">
          Fajour App
        </q-item-label>

        <!-- Drawer navigation items -->
        <q-item
          v-for="item in drawerItemList"
          :key="item.content"
          clickable
          v-ripple
          :to="item.to"
          exact-active-class="text-primary bg-white"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>{{ item.content }}</q-item-section>
        </q-item>

        <q-item style="position: absolute; bottom: 0">
          <q-item-section> Made by Roby Hartono </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useBibleStore } from 'src/stores/bible';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const route = useRoute();
    const leftDrawerOpen = ref(false);
    const appTitle = ref('Fajour App');

    const bibleStore = useBibleStore();

    onMounted(() => {
      if (route.name == 'bible-page') {
        appTitle.value = 'Bible (NKJV)';
      }
    });

    const drawerItemList = ref([
      {
        icon: 'menu_book',
        content: 'Bible',
        to: '/',
      },
      {
        icon: 'psychology',
        content: 'Reflections',
        to: '/reflections',
      },
      // {
      //   icon: 'question_mark',
      //   content: 'Basic Beliefs (FAQ)',
      //   to: '/basic-beliefs',
      // },
      // {
      //   icon: 'edit_note',
      //   content: 'Sermont Notes (Coming Soon...)',
      //   to: '/notes/sermonts',
      // },
      {
        icon: 'settings',
        content: 'Settings',
        to: '/settings',
      },
    ]);

    return {
      appTitle,
      leftDrawerOpen,
      drawerItemList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      route,
      bibleStore,
    };
  },
});
</script>
