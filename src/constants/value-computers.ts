import type { ValueComputer } from "../models/value-computer";
import { DataRowKeys } from '../constants';

export const valueComputers: ValueComputer = {
  [DataRowKeys.Row1]: (row: number, column: number) => (values: number[]) => {
    return values[column] * 2;
  }
}; 