<script  lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Table from "./components/table/Table.vue";
import type { ApiResponse } from "./models";
import { HttpService } from "./services";

export default {
  components: { Table },
  setup() {
    const data: Ref<ApiResponse> = ref({ rows: [] });
    const httpService = HttpService.getInstance();
    httpService.getAll().then((response) => {
      data.value = response;
    });

    return {
      data,
    };
  },
};
</script>

<template>
  <h1 class="title">Smart Table</h1>
  <Table
    :data="data"
    :rowHeight="100"
    :columnNames="['column 1', 'column 2', 'column 3']"
  />
</template>

<style>
.title {
  text-align: center;
}

:root {
  --table-border-color: lightgrey;
  --table-font-size: 16px;
  --table-cell-background: #fffafa;
}
</style>
