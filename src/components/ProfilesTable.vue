<template>
  <div
    class="d-flex flex-column flex-sm-row justify-space-between align-center ga-4 pa-8"
  >
    <div class="d-flex ga-4 align-center">
      <p class="text-h4">{{ title }}</p>
      <v-icon
        color="#02599f"
        icon="mdi-refresh"
        size="x-large"
        @click.stop="loadData"
      />
    </div>
    <ActionsContainer :selected="selected" />
  </div>
  <div class="px-4 d-flex justify-center">
    <v-data-table
      v-if="!isError"
      :items="profiles"
      :headers="headers"
      show-select
      v-model="selected"
      item-value="id"
      :loading="isLoading"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
    <p class="py-8" v-else>Ошибка загрузки данных</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, readonly, ref } from "vue";
import { useStore } from "vuex";
import ActionsContainer from "@/components/ActionsContainer.vue";
import { IProfile } from "@/models/IProfile";
import { profileStatus } from "@/models/profileStatus";

interface Props {
  title: string;
  type: profileStatus;
}

const props = defineProps<Props>();

const store = useStore();

const isError = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const profiles = computed((): IProfile[] => store.getters.filteredProfiles);

const loadData = async () => {
  if (isError.value) isError.value = false;
  isLoading.value = true;
  try {
    await store.dispatch("loadProfiles", props.type);
  } catch {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const selected = ref<[]>([]);

onMounted(() => {
  loadData();
});

const headers = [
  { title: "Имя", value: "firstName" },
  { title: "Фамилия", value: "lastName" },
  { title: "Компания", value: "company" },
  { title: "Cпециальность", value: "jobTitle" },
  { title: "Телефон", value: "phone" },
  { title: "Email", value: "email" },
  { title: "Интересы", value: "interests" },
];

provide("isLoading", readonly(isLoading));
</script>
