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
  <Table :data="data" />
</template>

<style></style>
