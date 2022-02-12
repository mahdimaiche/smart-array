import type { DataRowKeys } from '../constants';

export type ValueComputerFunction = (row: number, column: number) => (rowValues: number[]) => number;

export type ValueComputer = {
  [key in DataRowKeys]?: ValueComputerFunction
}