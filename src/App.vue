<script  lang="ts">
import Table from "./components/table/Table.vue";
import { apiResonse } from "./constants";

export default {
  components: { Table },
  setup() {
    return {
      apiResonse,
    };
  },
};
</script>

<template>
  <Table :data="apiResonse" />
</template>

<style></style>
