<script  lang="ts">
import { defineComponent, toRefs, onMounted, ref, watch } from "vue";
import type { Ref, PropType } from "vue";
import type {
  DataRow,
  TableItemInfo,
  ValueComputationFunction,
} from "../../models";
import { TableItemEventBus } from "./table-item-event-bus";
import type { DataRowKeys } from "../../constants";
import { useReactiveData } from "../../composables";

export default defineComponent({
  props: {
    rowId: { type: String, default: "" },
    value: {
      type: Object as PropType<Number | DataRow[] | String | undefined>,
      default: undefined,
    },
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
    const { dependsOn, valueComputationFunction, value, rowId } = toRefs(props);
    const { getStoreSlice } = useReactiveData();

    const computedValue = ref(value.value as DataRow | number);
    const tableItemRef: Ref<HTMLElement | null> = ref(null);
    const eventBus = TableItemEventBus.getInstance(rowId.value)!;
    const itemId = `${Math.floor(Math.random() * 10000)}`;
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
        if (typeof computedValue.value !== "object") {
          if (valueComputationFunction.value) {
            computedValue.value = valueComputationFunction.value(
              dependency.value
            );
          }
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
    <slot>
      {{ computedValue }}
    </slot>
  </div>
</template>

<style lang="scss">
.table-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: var(--table-font-size);
  background-color: var(--table-cell-background);
}
</style>
