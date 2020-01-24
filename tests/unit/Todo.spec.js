import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import Todo from "@/components/Todo.vue";
import store from "../../src/store";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);

const markStatus = jest.fn(args => args);
const remove = jest.fn(args => args);

describe("Todo.vue", () => {
  it("renders a todo element as pending", () => {
    const todo = {
      title: "blablabla",
      status: "pending"
    };
    const wrapper = mount(Todo, {
      localVue,
      store,
      propsData: {
        todo,
        markStatus,
        remove
      }
    });
    expect(wrapper.find('[data-selector="todo-title"]').text()).toBe(
      "blablabla"
    );
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe("Urgent");
    expect(buttons.at(1).text()).toBe("Completed");

    buttons.at(0).trigger("click");
    expect(markStatus).toHaveBeenCalledWith({ todo, status: "urgent" });
    buttons.at(1).trigger("click");
    expect(markStatus).toHaveBeenCalledWith({ todo, status: "completed" });
  });

  it("renders a todo element as urgent", () => {
    const todo = {
      title: "blablabla",
      status: "urgent"
    };
    const wrapper = mount(Todo, {
      localVue,
      store,
      propsData: {
        todo,
        markStatus,
        remove
      }
    });
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(1);
    expect(buttons.at(0).text()).toBe("Completed");
    buttons.at(0).trigger("click");
    expect(markStatus).toHaveBeenCalledWith({ todo, status: "completed" });
  });

  it("renders a todo element as completed", () => {
    const todo = {
      title: "blablabla",
      status: "completed"
    };
    const wrapper = mount(Todo, {
      localVue,
      store,
      propsData: {
        todo,
        markStatus,
        remove
      }
    });
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(1);
    expect(buttons.at(0).text()).toBe("Remove");
    buttons.at(0).trigger("click");
    expect(remove).toHaveBeenCalledWith(todo);
  });
});
