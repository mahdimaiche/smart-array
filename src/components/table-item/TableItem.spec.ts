import { vi, describe, it, expect, beforeAll } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import * as CONSTANTS from "../../constants";
import TableItemComponent from './TableItem.vue';
import { DataRowKeys } from '../../constants';
import type { RowDependency, ValueComputationFunction } from '../../models';
import { useReactiveData } from '../../composables/use-reactive-data';

const flushPromises = () => new Promise(setImmediate);

const rowDependencyMock: RowDependency = {
  [DataRowKeys.Row1]: {
    dependsOn: DataRowKeys.Row2
  },
};

const valueComputationFunctionMock: ValueComputationFunction = (dependencyRowValues: number[]) => {
  return dependencyRowValues.reduce((val, acc) => val + acc, 0);
};

describe('TableItem', () => {
  beforeAll(() => {
    vi.spyOn(CONSTANTS, 'getRowDependencies').mockReturnValue(rowDependencyMock);
    vi.spyOn(CONSTANTS, 'getValueComputers').mockReturnValue(rowDependencyMock);
    const { initStore } = useReactiveData();
    initStore();
  });


  it('Should render and display the correct value', () => {
    const wrapper = shallowMount(TableItemComponent, {
      props: {
        value: 12
      }
    });
    expect(wrapper.isVisible());
    expect(wrapper.findComponent('.table-item').element.textContent).toBe('12');
  });

  it('Should update the value based on the valueComputer when the dependency changes', async () => {
    const wrapper = shallowMount(TableItemComponent, {
      props: {
        value: 12,
        dependsOn: DataRowKeys.Row2,
        valueComputationFunction: valueComputationFunctionMock
      },
    });
    const { getStoreSlice } = useReactiveData();

    const row2Slice = getStoreSlice(DataRowKeys.Row2);
    row2Slice.value = [1, 2, 3, 5];
    await flushPromises();

    /*
    The result should be the sum of the numbers of the array [1, 2, 3, 5] since 
    the valueComputationFunctionMock calculates the sum 
    */
    expect(wrapper.findComponent('.table-item').element.textContent).toBe('11');
  });

});