<script setup>
import EditIcon from "./icons/EditIcon.vue";
import BasketIcon from "./icons/BasketIcon.vue";
import { toDate } from "../utils/functions";
import { ref } from "vue";
defineProps({
  head: {
    type: Array,
    default: [],
  },
  items: {
    type: Array,
    default: [],
  },
  actions: {
    type: Array,
    default: []
  }
});

const selectedItems = ref([]);

const emit = defineEmits(["onDelete"]);

const deleteHandler = (id) => {
  if (!selectedItems.value.length) selectedItems.value.push(id);
  emit("onDelete", selectedItems.value);

  selectedItems.value = [];
};

const selectItemHandler = (id) => {
  if (selectedItems.value.indexOf(id) !== -1)
    selectedItems.value.splice(selectedItems.value.indexOf(id), 1);
  else
    selectedItems.value.push(id);
}
</script>
<template>
  <ul class="list">
    <li class="list-item list-item-head">
      <div v-for="(title, index) in head" class="list-title" :class="`list-${index+1}`" :key="title">{{ title }}</div>
      <div v-if="actions.length" class="list-actions"></div>
    </li>

    <li v-for="item in items" class="list-item" :class="{selected: selectedItems.indexOf(item[0]) !== -1}"
      :key="item[0]" @click="selectItemHandler(item[0])">
      <div v-for="(title, index) in head" class="list-title" :class="`list-${index + 1}`" :key="title">
        {{ item[index + 1] }}
      </div>
      <div class="list-actions">
        <button v-if="actions.indexOf('edit') >= 0" class="btn-action">
          <RouterLink :to="`task/${item[0]}#general`" class="list-link" @click.stop>
            <EditIcon />
          </RouterLink>
        </button>
        <button v-if="actions.indexOf('delete') >= 0" class="btn-action" @click.stop="deleteHandler(item[0])">
          <BasketIcon />
        </button>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.list {
  list-style: none;
}

.list-item {
  background: #f6f6f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 12px 18px 33px;
  border: 1px solid transparent;
  user-select: none;
}

.list-item.selected {
  border: 1px solid #10171e;
}

.list-item:not(:last-child) {
  margin-bottom: 6px;
}

.list-item.list-item-head {
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 12px 18px 33px;
}

.list-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #10171e;
}

.list-item-head .list-title {
  font-weight: 500;
  margin-left: 15px;
}

.list-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-action {
  border: none;
  margin: 0 20px;
  cursor: pointer;
}

.list-1 {
  width: 30%;
}

.list-3,
.list-2 {
  width: 15%;
}

.list-actions {
  width: 120px;
}
</style>
