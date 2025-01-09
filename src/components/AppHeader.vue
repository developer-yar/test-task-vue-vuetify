<template>
  <v-app-bar app color="#02599f">
    <div class="pa-4 w-100 d-flex align-center ga-12 justify-space-between">
      <v-app-bar-nav-icon color="white" @click.stop="toggleMenu" />
      <v-btn icon="mdi-magnify" color="white" @click.stop="toggleSearch" />
    </div>
  </v-app-bar>
  <app-navigation :isNavigationOpened="isNavigationOpened" />
  <app-search :isSearchOpened="isSearchOpened" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AppNavigation from "@/components/AppNavigation.vue";
import AppSearch from "@/components/AppSearch.vue";

let isNavigationOpened = ref(false);
let isSearchOpened = ref(false);

const toggleMenu = (): void => {
  isNavigationOpened.value = !isNavigationOpened.value;
};

const toggleSearch = (): void => {
  isSearchOpened.value = !isSearchOpened.value;
};
</script>
