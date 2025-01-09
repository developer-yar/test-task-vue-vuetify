<template>
  <v-navigation-drawer v-model="isOpened">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>Профили</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list>
            <v-list-item link to="/all">
              <div class="d-flex align-center ga-4">
                <v-icon icon="mdi-check-circle" color="info" size="x-small" />
                <v-list-item-title>Все</v-list-item-title>
              </div>
            </v-list-item>
            <v-list-item link to="/processed">
              <div class="d-flex align-center ga-4">
                <v-icon
                  icon="mdi-check-circle"
                  color="info"
                  size="x-small"
                ></v-icon
                ><v-list-item-title>Обработанные</v-list-item-title>
              </div>
            </v-list-item>
            <v-list-item link to="/unprocessed">
              <div class="d-flex align-center ga-4">
                <v-icon
                  icon="mdi-information"
                  color="info"
                  size="x-small"
                ></v-icon
                ><v-list-item-title>Необработанные</v-list-item-title>
              </div>
            </v-list-item>
          </v-list></v-expansion-panel-text
        >
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  isNavigationOpened: boolean;
}

const props = defineProps<Props>();

const isOpened = computed(() => props.isNavigationOpened);
</script>
