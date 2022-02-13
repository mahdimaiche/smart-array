<script lang="tsx">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";
import type { PropType } from "vue";
import type { Ref } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { ApiResponse, DataRow } from "../../models";
import { rowDependencies, valueComputers } from "../../constants";
import { useReactiveData } from "../../composables";

import TableRow from "../table-row/TableRow.vue";
import TableItem from "../table-item/TableItem.vue";

export default defineComponent({
  components: { TableRow, TableItem },
  props: {
    columnNames: { type: Object as PropType<String[]>, default: [] },
    data: { type: Object as PropType<ApiResponse>, default: { rows: [] } },
    rowHeight: { type: Number, default: 0 },
  },
  setup(props) {
    const { initStore } = useReactiveData();
    const { data, rowHeight, columnNames } = toRefs(props);

    const tableRef: Ref<HTMLElement | null> = ref(null);
    const columnsCount = computed(() => getColumnCount(data.value));
    const rowWidth = ref(0);

    watch(
      data,
      () => {
        initStore(data.value.rows);
      },
      {
        immediate: true,
      }
    );

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

    const Row = (props: {
      row: DataRow;
      index: number;
      rowWidth: number;
      rowHeight: number;
      className?: string;
    }) => {
      const { row, index, rowWidth, rowHeight, className } = props;
      const rowId = uuidV4();
      return (
        <TableRow
          class={`table__row ${className ? className : ""}`}
          key={rowId}
          rowId={rowId}
          columns={columnsCount.value}
          rowWidth={rowWidth}
          rowHeight={rowHeight}
        >
          {(row.data as any[]).map(({ value }, j) => (
            <TableItem
              class="table__item"
              key={uuidV4()}
              rowId={rowId}
              value={value}
              dependsOn={
                rowDependencies[row.key] && rowDependencies[row.key]!.dependsOn
              }
              valueComputationFunction={
                valueComputers[row.key] && valueComputers[row.key]!(index, j)
              }
            >
              {Array.isArray(value)
                ? value.map((row: DataRow, index: number) => (
                    <Row
                      className="table__row__nested"
                      row={row}
                      index={index}
                      rowWidth={Math.floor(rowWidth / row.data.length)}
                      rowHeight={Math.floor(rowHeight / value.length)}
                    />
                  ))
                : null}
            </TableItem>
          ))}
        </TableRow>
      );
    };

    return () => {
      const rowId = uuidV4();
      return (
        <div class="table" ref={tableRef}>
          <TableRow
            class="table__row"
            key={rowId}
            rowId={rowId}
            columns={columnsCount.value}
            rowWidth={rowWidth.value}
            rowHeight={rowHeight.value}
          >
            {columnNames.value.map((name) => (
              <TableItem
                class="table__item"
                key={rowId}
                rowId={rowId}
                value={name.toLocaleUpperCase()}
              />
            ))}
          </TableRow>
          {data.value.rows.map((row, i) => (
            <Row
              row={row}
              index={i}
              rowWidth={rowWidth.value}
              rowHeight={rowHeight.value}
            />
          ))}
        </div>
      );
    };
  },
});
</script>

<style lang="scss">
.table {
  width: "100%";
  height: "100%";
  display: "flex";
  flex-direction: row;

  &__row {
    &:first-child {
      border-top: 1px solid var(--table-border-color);
    }

    &__nested {
      .table-item:last-child {
        border-right: none;
      }
    }
  }

  &__item {
    border-bottom: 1px solid var(--table-border-color);
    border-right: 1px solid var(--table-border-color);

    &:first-child {
      border-left: 1px solid var(--table-border-color);
    }
  }
}
</style>
