import type { DataRowKeys } from '../constants';


export type ValueComputationFunction = (rowValues: number[]) => number;

export type ValueComputation = {
  [key in DataRowKeys]?: (row: number, column: number) => ValueComputationFunction
}