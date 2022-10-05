<script setup>
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { useTaskStore } from "./stores/TaskStore";
import Loader from "./components/Loader.vue";

const taskStore = useTaskStore();

onBeforeMount(async () => {
  taskStore.isLoaded || (await taskStore.get());
});
</script>

<template>
  <Loader v-if="!taskStore.isLoaded"/>
  <RouterView v-else/>
</template>

<style scoped>

</style>
