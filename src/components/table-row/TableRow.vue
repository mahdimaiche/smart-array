<script  lang="ts">
import {
  computed,
  defineComponent,
  onUpdated,
  onMounted,
  ref,
  toRefs,
} from "vue";
import type { Ref } from "vue";
import { TableItemEventBus } from "../table-item/table-item-event-bus";
import type { TableItemInfo } from "../../models";

export default defineComponent({
  props: {
    rowWidth: { type: Number, default: 0 },
    columns: { type: Number, default: 4 },
  },
  setup(props) {
    const { rowWidth, columns } = toRefs(props);
    const tableRowRef: Ref<HTMLElement | null> = ref(null);
    const eventBus = TableItemEventBus.getInstance();
    const tableItems: Map<string, TableItemInfo> = new Map();
    const tableItemWidth = computed(() => rowWidth.value / columns.value);

    onMounted(() => {
      eventBus.subscribe((items: TableItemInfo[]) => {
        for (const item of items) {
          tableItems.set(item.id, item);
        }
      });
      updateItemsWidth();
    });

    onUpdated(() => {
      updateItemsWidth();
    });

    function updateItemsWidth() {
      const items = Array.from(tableItems.values());
      for (const item of items) {
        item.element.style.width = `${tableItemWidth.value}px`;
      }
    }

    return {
      tableRowRef,
    };
  },
});
</script>

<template>
  <div class="table-row">
    <slot />
  </div>
</template>

<style lang="scss">
.table-row {
  display: flex;
  height: "50px";
}
</style>
