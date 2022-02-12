<script  lang="ts">
import { defineComponent, toRefs, onMounted, ref, watch } from "vue";
import type { Ref, PropType } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { TableItemInfo, ValueComputationFunction } from "../../models";
import { TableItemEventBus } from "./table-item-event-bus";
import type { DataRowKeys } from "../../constants";
import { useReactiveData } from "../../composables";

export default defineComponent({
  props: {
    value: { type: Object as PropType<Number | Function>, default: "" },
    dependsOn: {
      type: String as PropType<DataRowKeys | undefined>,
      default: undefined,
    },
    valueComputationFunction: {
      type: Function as PropType<ValueComputationFunction | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    const { dependsOn, valueComputationFunction, value } = toRefs(props);
    const { getStoreSlice } = useReactiveData();

    const computedValue: Ref<number> = ref(value.value as number);
    const tableItemRef: Ref<HTMLElement | null> = ref(null);
    const eventBus = TableItemEventBus.getInstance();
    const itemId = uuidV4();
    const dependency = dependsOn.value
      ? getStoreSlice(dependsOn.value)
      : ref([]);

    onMounted(() => {
      if (tableItemRef.value) {
        eventBus.pushEvent(itemId, getTableItemInfo());
      }
    });

    watch(
      dependency,
      () => {
        if (valueComputationFunction.value) {
          computedValue.value = valueComputationFunction.value(
            dependency.value
          );
        }
      },
      { immediate: true }
    );

    function getTableItemInfo(): TableItemInfo {
      return {
        id: itemId,
        element: tableItemRef.value!,
      };
    }

    return {
      tableItemRef,
      computedValue,
    };
  },
});
</script>

<template>
  <div class="table-item" ref="tableItemRef">
    {{ computedValue }}
  </div>
</template>

<style lang="scss">
.table-item {
  display: flex;
  height: 100%;
}
</style>
