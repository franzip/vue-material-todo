import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import VueMaterial from "vue-material";
import AddTodoForm from "@/components/AddTodoForm.vue";
import store from "../../src/store";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(Vuelidate);

describe("AddTodoForm.vue", () => {
  const wrapper = mount(AddTodoForm, {
    localVue,
    store
  });

  it("renders the form", () => {
    expect(wrapper.text()).toMatch("What needs to be done?");
  });

  it("validates the input", () => {
    wrapper.find('[data-selector="todo-form-submit"]').trigger("click");
    expect(
      wrapper.find('[data-selector="todo-body-required"]').isVisible()
    ).toBe(true);

    const todo = wrapper.find('[data-selector="todo-body"]');
    todo.setValue("foo");
    todo.trigger("input");
    localVue.nextTick(() => {
      expect(
        wrapper.find('[data-selector="todo-body-minlength"]').isVisible()
      ).toBe(true);
    });
    todo.setValue("bla bla bla");
    todo.trigger("input");

    const remarks = wrapper.find('[data-selector="todo-remarks"]');
    remarks.setValue("foo");
    remarks.trigger("input");
    localVue.nextTick(() => {
      expect(
        wrapper.find('[data-selector="todo-remarks-minlength"]').isVisible()
      ).toBe(true);
    });
  });
});
