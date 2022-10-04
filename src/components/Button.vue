<script setup>
defineProps({
  caption: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button class="button">{{ caption }}</button>
</template>

<style scoped>
.btn-blue {
  background: #106EDC;
}

.button.plus::before {
  content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuOTU4MTMgMTMuNjI0OEM2LjQ5NzkgMTMuNjI0OCA2LjEyNDggMTMuMjUxNyA2LjEyNDggMTIuNzkxNUw2LjEyNDggMS4xMjQ4QzYuMTI0OCAwLjY2NDU1OSA2LjQ5NzkgMC4yOTE0NjMgNi45NTgxMyAwLjI5MTQ2MkM3LjQxODM3IDAuMjkxNDYzIDcuNzkxNDcgMC42NjQ1NTkgNy43OTE0NyAxLjEyNDhMNy43OTE0NyAxMi43OTE1QzcuNzkxNDcgMTMuMjUxNyA3LjQxODM3IDEzLjYyNDggNi45NTgxMyAxMy42MjQ4WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEzLjYyNDggNi45NTgxMkMxMy42MjQ4IDYuNDk3ODkgMTMuMjUxNyA2LjEyNDc5IDEyLjc5MTUgNi4xMjQ3OUwxLjEyNDgxIDYuMTI0NzlDMC42NjQ1NyA2LjEyNDc5IDAuMjkxNDczIDYuNDk3ODkgMC4yOTE0NzMgNi45NTgxMkMwLjI5MTQ3MyA3LjQxODM2IDAuNjY0NTY5IDcuNzkxNDYgMS4xMjQ4MSA3Ljc5MTQ2TDEyLjc5MTUgNy43OTE0NkMxMy4yNTE3IDcuNzkxNDYgMTMuNjI0OCA3LjQxODM2IDEzLjYyNDggNi45NTgxMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=);
  margin-right: 13px;
  position: relative;
  top: 2px;
}

.button {
  font-family: 'Geometria';
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #FFFFFF;
  display: block;
  width: max-content;
  cursor: pointer;
}
</style>
