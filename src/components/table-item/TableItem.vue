<script  lang="ts">
import { defineComponent, toRefs, onMounted, ref } from "vue";
import type { Ref, PropType } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { TableItemInfo, ValueComputerFunction } from "../../models";
import { TableItemEventBus } from "./table-item-event-bus";
import type { DataRowKeys } from "../../constants";

export default defineComponent({
  props: {
    value: { type: Object as PropType<Number | Function>, default: "" },
    dependsOn: {
      type: String as PropType<DataRowKeys | undefined>,
      default: undefined,
    },
    valueComputer: {
      type: Function as PropType<ValueComputerFunction | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    const { dependsOn, valueComputer } = toRefs(props);

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
