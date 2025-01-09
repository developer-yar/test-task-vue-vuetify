<template>
  <v-form>
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
      <v-btn rounded="lg" variant="outlined" @click="clearProfile(profile)"
        >Очистить</v-btn
      >
      <v-btn rounded="lg" base-color="#02599f" @click="addItem">Добавить</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useClearProfile } from "@/composables/clearProfile";
import { useCloseModal } from "@/composables/closeModal";
import { IProfile } from "@/models/IProfile";

const store = useStore();

const nextID = computed<number>(() => store.getters.profiles.at(-1).id + 1);

const { clearProfile } = useClearProfile();

const emit = defineEmits(["closeModal"]);
const { closeModal } = useCloseModal(emit);

let profile = reactive<Partial<IProfile>>({
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  lastName: "",
  firstName: "",
  interests: "",
});

const addItem = (): void => {
  store.dispatch("addProfile", {
    id: nextID.value,
    status: false,
    ...profile,
  });
  clearProfile(profile);
  closeModal();
};
</script>
