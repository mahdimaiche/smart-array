<script  lang="ts">
import { defineComponent, toRefs, onMounted, ref } from "vue";
import type { Ref, PropType } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { TableItemInfo } from "../../models";
import { TableItemEventBus } from "./table-item-event-bus";

export default defineComponent({
  props: {
    value: { type: Object as PropType<Number | Function>, default: "" },
  },
  setup(props, { emit }) {
    const tableItemRef: Ref<HTMLElement | null> = ref(null);
    const eventBus = TableItemEventBus.getInstance();
    const itemId = uuidV4();

    onMounted(() => {
      if (tableItemRef.value) {
        eventBus.pushEvent(itemId, getTableItemInfo());
      }
    });

    function getTableItemInfo(): TableItemInfo {
      return {
        id: itemId,
        element: tableItemRef.value!,
      };
    }

    return {
      tableItemRef,
    };
  },
});
</script>

<template>
  <div class="table-item" ref="tableItemRef">
    {{ value }}
  </div>
</template>

<style lang="scss">
.table-item {
  display: flex;
  height: 100%;
}
</style>
