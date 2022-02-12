import { ref } from 'vue';
import type { Ref } from 'vue';
import { rowDependencies, DataRowKeys } from "../constants";
import type { DataRow } from '../models';

const reactiveStore: Map<DataRowKeys, Ref<number[]>> = new Map();
const dependentKeys = Object.keys(rowDependencies) as DataRowKeys[];
for (const key of dependentKeys) {
  reactiveStore.set(rowDependencies[key]!.dependsOn, ref([]));
}

export function useReactiveData() {
  function initStore(data: DataRow[]) {
    for (const row of data) {
      if (typeof row.data[0] === 'number') {
        const reactiveValue = reactiveStore.get(row.key);
        if (reactiveValue) {
          reactiveValue.value = row.data;
        }
      } else if (typeof row.data[0] === 'object') {
        initStore(row.data as DataRow[]);
      }
    }
  }

  function getStoreSlice(dependency: DataRowKeys): Ref<number[]> {
    return reactiveStore.get(dependency);
  }

  return {
    initStore,
    getStoreSlice
  }
}