<template>
  <v-navigation-drawer v-model="isOpened" location="right" :width="400">
    <v-form class="pa-8 h-100 d-flex flex-column justify-space-between">
      <div class="d-flex flex-column">
        <v-text-field
          label="Имя"
          variant="outlined"
          v-model.trim="profile.firstName"
        />
        <v-text-field
          label="Фамилия"
          variant="outlined"
          v-model.trim="profile.lastName"
        />
        <v-text-field
          label="Компания"
          variant="outlined"
          v-model.trim="profile.company"
        />
        <v-text-field
          label="Cпециальность"
          variant="outlined"
          v-model.trim="profile.jobTitle"
        />
        <v-text-field
          label="Телефон"
          variant="outlined"
          v-model.trim="profile.phone"
        />
        <v-text-field
          label="Email"
          variant="outlined"
          v-model.trim="profile.email"
        />
        <v-text-field
          label="Интересы"
          variant="outlined"
          v-model.trim="profile.interests"
        />
      </div>
      <div class="d-flex justify-end ga-4">
        <v-btn rounded="lg" variant="outlined" @click="clearFilter"
          >Очистить</v-btn
        >
        <v-btn rounded="lg" base-color="#02599f" @click="apply"
          >Применить</v-btn
        >
      </div>
    </v-form>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useClearProfile } from "@/composables/clearProfile";
import { IProfile } from "@/models/IProfile";

interface Props {
  isSearchOpened: boolean;
}

const props = defineProps<Props>();

const isOpened = computed(() => props.isSearchOpened);

const store = useStore();

const { clearProfile } = useClearProfile();

let profile = reactive<Partial<IProfile>>({
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  lastName: "",
  firstName: "",
  interests: "",
});

const apply = (): void => {
  store.dispatch("setFilter", {
    ...profile,
  });
};

const clearFilter = (): void => {
  store.dispatch("setFilter", {});
};

watch(isOpened, (newState) => {
  if (newState === false) {
    clearProfile(profile);
    clearFilter();
  }
});
</script>
