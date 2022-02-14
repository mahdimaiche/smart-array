import { ref } from 'vue';
import type { Ref } from 'vue';
import { getRowDependencies, DataRowKeys } from "../constants";
import type { DataRow } from '../models';

const reactiveStore: Map<DataRowKeys, Ref<number[]>> = new Map();

export function useReactiveData() {
  function initStore() {
    const rowDependencies = getRowDependencies();
    const dependentKeys = Object.keys(rowDependencies) as DataRowKeys[];
    for (const key of dependentKeys) {
      reactiveStore.set(rowDependencies[key]!.dependsOn, ref([]));
    }
  }

  function loadData(data: DataRow[]) {
    for (const row of data) {
      if (typeof row.data[0].value === 'number') {
        const reactiveValue = reactiveStore.get(row.key);
        if (reactiveValue) {
          reactiveValue.value = row.data.map(dataCell => dataCell.value) as number[];
        }
      }
    }
  }

  function getStoreSlice(dependency: DataRowKeys): Ref<number[]> {
    return reactiveStore.get(dependency)!;
  }

  return {
    initStore,
    loadData,
    getStoreSlice,
    reactiveStore
  }
}