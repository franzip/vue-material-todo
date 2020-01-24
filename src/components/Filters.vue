<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Filters</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>By text</label>
          <md-input
            data-selector="filters-text"
            v-model="searchTerm"
          ></md-input>
        </md-field>
        <md-autocomplete
          data-selector="filters-select"
          v-model="filter"
          :md-options="availableStatuses"
          md-layout="floating"
          v-on:md-selected="addStatusFilter"
          v-on:md-closed="clearCurrentFilter"
          md-dense
        >
          <label>By todo status</label>
        </md-autocomplete>
        <md-chip
          v-for="status in statuses"
          :key="status"
          class="md-primary"
          v-on:md-delete="removeStatusFilter(status)"
          md-deletable
          >{{ status }}</md-chip
        >
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      filter: "",
      availableStatuses: ["pending", "urgent", "completed"]
    };
  },
  methods: {
    ...mapMutations("filters", ["addStatusFilter", "removeStatusFilter"]),
    clearCurrentFilter() {
      this.filter = "";
    }
  },
  computed: {
    ...mapGetters("filters", ["statuses"]),
    searchTerm: {
      get() {
        return this.$store.state.filters.searchTerm;
      },
      set(value) {
        this.$store.commit("filters/updateSearchTerm", value);
      }
    }
  }
};
</script>

<style scoped></style>
