<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs } from "vue";
import type { PropType } from "vue";
import type { Ref } from "vue";
import type { ApiResponse } from "../../models";
import TableRow from "../table-row/TableRow.vue";
import TableItem from "../table-item/TableItem.vue";

export default defineComponent({
  components: { TableRow, TableItem },
  props: {
    data: { type: Object as PropType<ApiResponse>, default: { rows: [] } },
  },
  setup(props, { emit }) {
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
    };
  },
});
</script>

<template>
  <div class="table" ref="tableRef">
    <TableRow
      :key="i"
      v-for="(row, i) of data.rows"
      :columns="columnsCount"
      :rowWidth="rowWidth"
    >
      <TableItem
        :key="`${i},${j}`"
        v-for="(value, j) of row.data"
        :value="value"
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
