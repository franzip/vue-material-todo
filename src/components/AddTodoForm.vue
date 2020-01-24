<template>
  <div class="form-wrapper">
    <form
      novalidate
      class="md-layout md-alignment-center-center"
      @submit.prevent="validateTodo"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">What needs to be done?</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('todoBody')">
                <label for="todo-body">Task</label>
                <md-input
                  name="todo-body"
                  id="todo-body"
                  autocomplete="given-name"
                  data-selector="todo-body"
                  v-model="form.todoBody"
                  :disabled="sending"
                />
                <span
                  data-selector="todo-body-required"
                  class="md-error"
                  v-if="!$v.form.todoBody.required"
                  >The task is required</span
                >
                <span
                  data-selector="todo-body-minlength"
                  class="md-error"
                  v-else-if="!$v.form.todoBody.minlength"
                  >Invalid task</span
                >
                <span
                  data-selector="todo-body-maxlength"
                  class="md-error"
                  v-else-if="!$v.form.todoBody.maxlength"
                  >Invalid task</span
                >
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('todoRemarks')">
                <label for="todo-remarks">Remarks</label>
                <md-input
                  name="todo-remarks"
                  id="todo-remarks"
                  autocomplete="family-name"
                  data-selector="todo-remarks"
                  v-model="form.todoRemarks"
                  :disabled="sending"
                />
                <span
                  data-selector="todo-remarks-minlength"
                  class="md-error"
                  v-if="!$v.form.todoRemarks.minlength"
                  >Invalid todo remarks</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.todoRemarks.maxlength"
                  >Invalid todo remarks</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            data-selector="todo-form-submit"
            type="submit"
            class="md-primary"
            :disabled="sending"
            >Create Todo</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="todoSaved"
        >Todo saved with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "AddTodoForm",
  mixins: [validationMixin],
  data: () => ({
    form: {
      todoBody: null,
      todoRemarks: null
    },
    todoSaved: false,
    sending: false
  }),
  validations: {
    form: {
      todoBody: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50)
      },
      todoRemarks: {
        minLength: minLength(5),
        maxLength: maxLength(100)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.todoBody = null;
      this.form.todoRemarks = null;
    },
    saveTodo() {
      this.sending = true;

      window.setTimeout(() => {
        this.todoBody = this.form.todoBody;
        this.todoRemarks = this.form.todoRemarks;
        this.sending = false;
        this.$store.commit("todos/addTodo", {
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          title: this.todoBody,
          remarks: this.todoRemarks
        });
        this.clearForm();
      }, 500);
    },
    validateTodo() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveTodo();
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  margin-bottom: 40px;
}
</style>
