<template>
  <v-app>
    <v-main>
      <app-header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue";
</script>
