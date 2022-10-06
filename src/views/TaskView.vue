<script setup>
import { onBeforeMount, onMounted, ref, toRef, watchPostEffect } from "@vue/runtime-core";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Button from "../components/Button.vue";
import { useTaskStore } from "../stores/TaskStore";
import GeneralTab from "../components/tabs/GeneralTab.vue";
import List from "../components/List.vue";
import FilesTab from "../components/tabs/FilesTab.vue";
import CommentsTab from "../components/tabs/CommentsTab.vue";
import Modal from "../components/Modal.vue";

import { toDate } from "../utils/functions.js";
import { STEPS, INITIAL_TASK, MODAL_TYPES } from "../config/default.js";

const taskStore = useTaskStore();
const tasks = toRef(taskStore, 'tasks');
const route = useRoute();
const router = useRouter();
const isShowModal = ref(false);
const modalType = ref(MODAL_TYPES['cancel']);
const task = ref({...INITIAL_TASK});
const step = ref(STEPS[0]);

onBeforeMount(() => {
  if (route.hash && STEPS.includes(route.hash.slice(1)))
    step.value = route.hash.slice(1);
});

onMounted(async () => {
  if (tasks.value.length && route.params.id) {
    task.value = tasks.value.find(t => t._id === route.params.id);
    if (task.value && task.value.ends)
      task.value.ends = toDate(task.value.ends);
  }
});

watchPostEffect(() => {
  if (step.value !== route.hash.slice(1))
    step.value = route.hash.slice(1);
});

const saveHandler = () => {
  modalType.value = { ...MODAL_TYPES['save'] };
  isShowModal.value = true;
}

const cancelHandler = () => {
  modalType.value = { ...MODAL_TYPES['cancel'] };
  isShowModal.value = true;
}

const nextHandler = () => {
  const index = STEPS.indexOf(step.value) + 1;

  router.push(`#${STEPS[index]}`);
}

const prevHandler = () => {
  const index = STEPS.indexOf(step.value) - 1;

  router.push(`#${STEPS[index]}`);
}

const closeModalHandler = () => {
  isShowModal.value = false;
}

const agreeModalHandler = async () => {
  switch (modalType.value.type) {
    case 'save':
      if (!route.params.id) {
        const { name, ends, status, description, files, comments } = { ...task.value };

        task.value._id = await taskStore.add({ name, ends, status, description, files, comments });
        router.replace(`task/${task.value._id}#${step.value}`);
      } else {
        await taskStore.update(task.value);
      }
      break;
    case 'cancel':
      router.push('/');
      task.value = {...INITIAL_TASK};
      break;
  }

  isShowModal.value = false;
}

</script>
<template>
  <section class="tabs">
    <ul class="tabs-list">
      <li class="tab-item" :class="{active: step === 'general', visited: STEPS.indexOf(step) > 0}">
        <RouterLink to="#general" class="tab-link">Основные настройки</RouterLink>
      </li>
      <li class="tab-item" :class="{active: step === 'documents', visited: STEPS.indexOf(step) > 1}">
        <RouterLink to="#documents" class="tab-link" :class="{'no-event': !task.name}">Документы</RouterLink>
      </li>
      <li class="tab-item" :class="{active: step === 'comments', visited: STEPS.indexOf(step) > 2}">
        <RouterLink to="#comments" class="tab-link" :class="{'no-event': !task.name}">Комментарии</RouterLink>
      </li>
    </ul>
  </section>
  <section class="navigation">
    <Button v-if="STEPS.indexOf(step) > 0" caption="Назад" class="btn-white prev" @click="prevHandler" />
    <Button v-if="STEPS.indexOf(step) < 2" caption="Далее" class="btn-white next" @click="nextHandler"
      :disabled="!task.name" />
    <div class="separator"></div>
    <Button caption="Сохранить" class="btn-white save" @click="saveHandler" :disabled="!task.name" />
    <Button caption="Отмена" class="btn-white cancel" @click="cancelHandler" />
  </section>
  <section class="tabs-body">
    <GeneralTab v-if="step === 'general'" :task="task" />
    <FilesTab v-if="step === 'documents'" :task="task" />
    <CommentsTab v-if="step === 'comments'" :task="task" />
  </section>
  <Modal v-if="isShowModal" :title="modalType.title" :buttons="modalType.buttons" @close="closeModalHandler"
    @agree="agreeModalHandler">
    <p>{{ modalType.slot }}</p>
  </Modal>
</template>

<style scoped>
.tabs {
  margin-bottom: 30px;
}

.h1-title {
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #10171E;
  margin-bottom: 24px;
}

.tabs-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0;
}

.tab-item {
  background: #F2F6F9;
  border-radius: 10px 0px 0px 0px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  counter-increment: li;
  width: 100%;
  max-width: 300px;
}

.tab-link {
  display: block;
  padding: 18px 24px;
  color: #10151B;
}

.tab-link.no-event {
  pointer-events: none;
}

.tab-link::before {
  content: counter(li) ".";
  margin-right: 5px;
}

.tab-item.active {
  background: #0C2747;
}

.tab-item.active .tab-link {
  color: #fff;
}

.tab-item.visited {
  background: #304E71;
}

.tab-item.visited .tab-link {
  color: #fff;
}

.tab-item:not(:last-child) {
  margin-right: 10px;
}

.navigation {
  background: #F6F6F6;
  padding: 21px 30px;
  opacity: 0.6;
  border-top: 1px dashed #82898F;
  border-bottom: 1px dashed #82898F;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.navigation .button:not(:last-child) {
  margin-right: 10px;
}

.separator {
  width: 1px;
  height: 40px;
  margin: 0 30px 0 20px;
  background: #BBC0C5;
}
</style>
