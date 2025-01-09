<template>
  <v-dialog max-width="480" v-model="isActive">
    <v-card class="px-4 py-8">
      <div class="d-flex justify-space-between">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-actions>
          <v-btn color="black" icon="mdi-close" @click="closeModal" />
        </v-card-actions>
      </div>
      <div class="d-flex flex-column justify-space-between pa-4 ga-4">
        <slot></slot>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCloseModal } from "@/composables/closeModal";

interface Props {
  title: string;
  isOpened: boolean;
}

const props = defineProps<Props>();
const isActive = computed<boolean>(() => props.isOpened);

const emit = defineEmits(["closeModal"]);
const { closeModal } = useCloseModal(emit);
</script>
