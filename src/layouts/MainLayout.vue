<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Fajour App </q-toolbar-title>
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
          <q-item-section> Made with ❤️ by Roby Hartono </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInRight slow"
        leave-active-class="animated slideOutLeft slow"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    const drawerItemList = ref([
      { icon: 'home', content: 'Home', to: '/' },
      // { icon: 'accessibility', content: 'Thank God' },
      // { icon: 'schedule', content: 'Schedule', to: '/schedule' },
      { icon: 'settings', content: 'Settings', to: '/settings' },
    ]);

    return {
      leftDrawerOpen,
      drawerItemList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
