<template>
  <ActionsMenu
    @add-item="toggleModal('add', true)"
    @edit-item="toggleModal('edit', true)"
    @remove-item="removeItem"
  />
  <ActionsModal
    title="Добавить элемент"
    :isOpened="isModalOpened.add"
    @closeModal="toggleModal('add', false)"
  >
    <ActionAddItem @closeModal="toggleModal('add', false)" />
  </ActionsModal>
  <ActionsModal
    title="Редактировать элемент"
    :isOpened="isModalOpened.edit"
    @closeModal="toggleModal('edit', false)"
  >
    <ActionEditItem @closeModal="toggleModal('edit', false)" />
  </ActionsModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import ActionsMenu from "@/components/ActionsMenu.vue";
import ActionsModal from "@/components/ActionModal.vue";
import ActionAddItem from "@/components/ActionAddItem.vue";
import ActionEditItem from "@/components/ActionEditItem.vue";

interface Props {
  selected: number[];
}

const props = defineProps<Props>();

const store = useStore();

const isModalOpened = ref<{ add: boolean; edit: boolean }>({
  add: false,
  edit: false,
});

const toggleModal = (type: "add" | "edit", state: boolean) => {
  isModalOpened.value[type] = state;
};

const removeItem = () => {
  store.dispatch("removeProfiles", props.selected);
};
</script>
