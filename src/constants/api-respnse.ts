import type { ApiResponse } from "../models";
import { DataRowKeys } from './data-row-keys';

export const apiResonse: ApiResponse = {
  rows: [
    {
      key: DataRowKeys.Row1,
      data: [1, 2, 3],
    },
    {
      key: DataRowKeys.Row2,
      data: [4, 5, 6],
    },
  ]
} 