import { vi, describe, it, expect, beforeAll } from 'vitest';
import type { ApiResponse, RowDependency } from '../models';
import { DataRowKeys } from '../constants';
import * as CONSTANTS from "../constants";
import { useReactiveData } from './use-reactive-data';

const dataMock: ApiResponse = {
  rows: [
    {
      key: DataRowKeys.Row6,
      data: [{ value: 1 }, { value: 2 }, { value: 3 }],
    },
    {
      key: DataRowKeys.Row7,
      data: [{ value: 4 }, { value: 5 }, { value: 6 }],
    },
    {
      key: DataRowKeys.Row8,
      data: [{ value: 7 }, { value: 8 }, { value: 9 }],
    }]
};

const rowDependencyMock: RowDependency = {
  [DataRowKeys.Row6]: {
    dependsOn: DataRowKeys.Row7
  },
  [DataRowKeys.Row8]: {
    dependsOn: DataRowKeys.Row6
  },
};

describe('use-reactive-data', () => {
  beforeAll(() => {
    vi.spyOn(CONSTANTS, 'getRowDependencies').mockReturnValue(rowDependencyMock);
    const { initStore } = useReactiveData();
    initStore();
  });

  it('Should correctly init store based on row dependencies', () => {
    const { reactiveStore } = useReactiveData();
    expect(reactiveStore.size).toEqual(2);
    const storeKeys = Array.from(reactiveStore.keys());
    expect(storeKeys).toContain(DataRowKeys.Row6);
    expect(storeKeys).toContain(DataRowKeys.Row7);
  });

  it('Should correctly load data into the appropriate store slice', () => {
    const { loadData, getStoreSlice } = useReactiveData();
    loadData(dataMock.rows);
    const row7Slice = getStoreSlice(DataRowKeys.Row7);
    expect(row7Slice.value).toEqual([4, 5, 6]); //The data for Row7 in dataMock
    const row6Slice = getStoreSlice(DataRowKeys.Row6);
    expect(row6Slice.value).toEqual([1, 2, 3]); //The data for Row6 in dataMock
  });
});