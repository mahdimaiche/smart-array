<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";
import type { PropType } from "vue";
import type { Ref } from "vue";
import type { ApiResponse } from "../../models";
import { rowDependencies, valueComputers } from "../../constants";

import TableRow from "../table-row/TableRow.vue";
import TableItem from "../table-item/TableItem.vue";

export default defineComponent({
  components: { TableRow, TableItem },
  props: {
    data: { type: Object as PropType<ApiResponse>, default: { rows: [] } },
  },
  setup(props) {
    const { data } = toRefs(props);

    const tableRef: Ref<HTMLElement | null> = ref(null);
    const columnsCount = computed(() => getColumnCount(data.value));
    const rowWidth = ref(0);

    onMounted(() => {
      if (tableRef.value) {
        rowWidth.value = computeRowWidth();
        window.addEventListener(
          "resize",
          () => {
            rowWidth.value = computeRowWidth();
          },
          { passive: true }
        );
      }
    });

    function getColumnCount(response: ApiResponse): number {
      let maxColumns = 0;
      for (const row of response.rows) {
        if (!Array.isArray(row.data)) {
          throw "The api response data is malformed";
        }
        maxColumns =
          maxColumns < row.data.length ? row.data.length : maxColumns;
      }
      return maxColumns;
    }

    function computeRowWidth(): number {
      return tableRef.value!.getBoundingClientRect().width;
    }

    return {
      columnsCount,
      tableRef,
      rowWidth,
      valueComputers,
      rowDependencies,
    };
  },
});
</script>

<template>
  <div class="table" ref="tableRef">
    <TableRow
      v-for="(row, i) of data.rows"
      :key="i"
      :columns="columnsCount"
      :rowWidth="rowWidth"
    >
      <TableItem
        v-for="(value, j) of row.data"
        :key="`${i},${j}`"
        :value="value"
        :dependsOn="
          rowDependencies[row.key] && rowDependencies[row.key].dependsOn
        "
        :valueComputer="
          valueComputers[row.key] && valueComputers[row.key](i, j)
        "
      />
    </TableRow>
  </div>
</template>

<style lang="scss">
.table {
  width: "100%";
  height: "100%";
  display: "flex";
  flex-direction: row;
}
</style>
