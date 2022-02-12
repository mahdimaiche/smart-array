<script  lang="ts">
import { defineComponent } from "vue";
import TableRow from "../table-row/TableRow.vue";
import TableItem from "../table-item/TableItem.vue";

export default defineComponent({
  components: { TableRow, TableItem },
  setup(props, { emit }) {},
});
</script>

<template>
  <div class="table">
    <TableRow :columns="4" :rowWidth="300">
      <TableItem data="My value" />
      <TableItem data="My value" />
      <TableItem data="My value" />
    </TableRow>
  </div>
</template>

<style lang="scss">
.table {
  display: "flex";
  flex-direction: row;
}
</style>
