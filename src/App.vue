<script setup>
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { useTaskStore } from "./stores/TaskStore";

const taskStore = useTaskStore();

onBeforeMount(async () => {
  taskStore.isLoaded || (await taskStore.get());
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
