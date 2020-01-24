<template>
  <div :data-selector="dataClass" class="todo-container">
    <md-card :class="classObject" md-with-hover>
      <md-card-header :style="completedStyle">
        <div data-selector="todo-title" class="md-title">{{ todo.title }}</div>
      </md-card-header>
      <md-card-content :style="completedStyle" v-if="todo.remarks">{{
        todo.remarks
      }}</md-card-content>
      <md-card-actions>
        <md-button
          v-if="pending"
          @click="markStatus({ todo, status: 'urgent' })"
          >Urgent</md-button
        >
        <md-button
          v-if="pending || urgent"
          @click="markStatus({ todo, status: 'completed' })"
          >Completed</md-button
        >
        <md-button v-if="completed" @click="remove(todo)">Remove</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
    markStatus: Function,
    remove: Function
  },
  computed: {
    dataClass() {
      return `todo-${this.todo.status}`;
    },
    completed() {
      return this.todo.status === "completed";
    },
    pending() {
      return this.todo.status === "pending";
    },
    urgent() {
      return this.todo.status === "urgent";
    },
    classObject() {
      return {
        "md-primary": true,
        "md-accent": this.urgent
      };
    },
    completedStyle() {
      return {
        "text-decoration": this.completed ? "line-through" : "none"
      };
    }
  }
};
</script>

<style scoped>
.todo-container {
  margin-bottom: 20px;
}

.todo-enter-active,
.todo-leave-active {
  transition: all 1s;
}
.todo-enter,
.todo-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
