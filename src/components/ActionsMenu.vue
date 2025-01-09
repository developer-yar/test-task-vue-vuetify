<template>
  <div class="d-flex justify-space-around">
    <v-btn color="primary" :disabled="isLoading">
      Действия
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="action in actions"
            :key="action.id"
            @click="action.event"
          >
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const emit = defineEmits(["addItem", "editItem", "removeItem"]);

const addItem = (): void => {
  emit("addItem");
};

const editItem = (): void => {
  emit("editItem");
};

const removeItem = (): void => {
  emit("removeItem");
};

const actions = [
  { id: 0, title: "Добавить", event: addItem },
  { id: 1, title: "Изменить", event: editItem },
  { id: 2, title: "Удалить", event: removeItem },
];

const isLoading = inject<boolean>("isLoading");
</script>
