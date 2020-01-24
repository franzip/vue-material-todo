import { createLocalVue, createWrapper, mount } from "@vue/test-utils";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import Filters from "@/components/Filters.vue";
import store from "../../src/store";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);

const mutations = {
  "filters/addStatusFilter": jest.fn(),
  "filters/removeStatusFilter": jest.fn()
};

store.mutations = mutations;

describe("Filters.vue", () => {
  const wrapper = mount(Filters, {
    localVue,
    store,
    attachToDocument: true
  });

  it("renders the filters", () => {
    const filters = wrapper.find('[data-selector="filters-select"]');
    const status = filters.find("input");
    status.trigger("focus");
    const autocompleteItems = createWrapper(
      document.querySelector(".md-autocomplete-items")
    ).findAll("button");
    expect(autocompleteItems.length).toBe(3);
  });
});
