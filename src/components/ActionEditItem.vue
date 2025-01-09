<template>
  <v-form v-if="hasProfiles">
    <div class="d-flex flex-column">
      <v-select
        v-model="selectedProfile"
        :items="profiles"
        item-title="id"
        item-value="id"
        label="Выберите ID пользователя"
        variant="outlined"
      ></v-select>
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
        label="Специальность"
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
      <v-btn rounded="lg" base-color="#02599f" @click="editItem"
        >Сохранить</v-btn
      >
    </div>
  </v-form>
  <p v-else class="text-center">Пустой список профилей</p>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useCloseModal } from "@/composables/closeModal";
import { IProfile } from "@/models/IProfile";

const store = useStore();

const emit = defineEmits(["closeModal"]);
const { closeModal } = useCloseModal(emit);

const profiles = computed<IProfile[]>(() => store.getters.profiles);
const hasProfiles = computed<boolean>(() => profiles.value.length > 0);

const selectedProfile = ref<number>();
const profile = reactive<Partial<IProfile>>({});

onMounted(() => {
  if (hasProfiles.value) selectedProfile.value = profiles.value[0].id;
});

watch(selectedProfile, () => {
  const id = selectedProfile.value;
  const newProfile: IProfile | undefined = profiles.value.find(
    (profile: IProfile) => profile.id === id
  );
  Object.assign(profile, newProfile);
});

const editItem = (): void => {
  store.dispatch("editProfile", {
    ...profile,
  });
  closeModal();
};
</script>
