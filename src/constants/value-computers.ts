import type { ValueComputation } from "../models/value-computation";
import { DataRowKeys } from '../constants';

export const valueComputers: ValueComputation = {
  [DataRowKeys.Row2]: (dependentItemRow: number, dependentItemCol: number) => (dependencyRowValues: number[]) => {
    return dependencyRowValues[dependentItemCol] * 2;
  },
  [DataRowKeys.Row3]: (dependentItemRow: number, dependentItemCol: number) => (dependencyRowValues: number[]) => {
    return dependencyRowValues[dependentItemCol] * 3;
  }
}; 