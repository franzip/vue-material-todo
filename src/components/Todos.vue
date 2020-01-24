<template>
  <div class="todos-container">
    <md-progress-spinner
      v-if="fetching"
      md-mode="indeterminate"
    ></md-progress-spinner>
    <div class="md-layout md-gutter" v-else>
      <div class="md-layout-item">
        <div class="md-title">Pending</div>
        <transition-group name="list" mode="out-in">
          <todo
            :key="todo.id"
            v-for="todo in pending"
            :todo="todo"
            :markStatus="markStatus"
          ></todo>
        </transition-group>
      </div>
      <div class="md-layout-item">
        <div class="md-title">Urgent</div>
        <transition-group name="list" mode="out-in">
          <todo
            :key="todo.id"
            v-for="todo in urgent"
            :todo="todo"
            :markStatus="markStatus"
          ></todo>
        </transition-group>
      </div>
      <div class="md-layout-item">
        <div class="md-title">Completed</div>
        <transition-group name="list" mode="out-in">
          <todo
            :key="todo.id"
            v-for="todo in completed"
            :todo="todo"
            :remove="remove"
          ></todo>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import Todo from "./Todo";

export default {
  components: {
    Todo
  },
  mounted() {
    this.getInitialTodos();
  },
  computed: {
    ...mapState("todos", ["fetching"]),
    ...mapGetters({
      pending: "todos/pending",
      urgent: "todos/urgent",
      completed: "todos/completed"
    })
  },
  methods: {
    ...mapActions("todos", ["getInitialTodos"]),
    ...mapMutations("todos", ["markStatus", "remove"])
  }
};
</script>

<style scoped>
.todos-container {
  width: 80vw;
  margin: 40px auto;
}
.md-layout-item {
  margin-bottom: 20px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
