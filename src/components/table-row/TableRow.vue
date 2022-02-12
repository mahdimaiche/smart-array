<script  lang="ts">
import { defineComponent } from "vue";
import TableItem from "../table-item/TableItem.vue";
import { TableItemEventBus } from "../table-item/table-item-event-bus";

export default defineComponent({
  components: { TableItem },
  setup() {
    const eventBus = TableItemEventBus.getInstance();
    eventBus.subscribe((data) => {
      console.log(data);
    });
  },
});
</script>

<template>
  <div class="table-row">
    <TableItem data="My value" />
    <TableItem data="My value" />
    <TableItem data="My value" />
  </div>
</template>

<style lang="scss">
.table-row {
  display: flex;
}
</style>
