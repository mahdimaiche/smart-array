import type { ApiResponse } from "../models";
import { DataRowKeys } from './data-row-keys';

export const apiResponse: ApiResponse = {
  rows: [
    {
      key: DataRowKeys.Row1,
      data: [1, 2, 3],
    },
    {
      key: DataRowKeys.Row2,
      data: [4, 5, 6],
    },
    {
      key: DataRowKeys.Row3,
      data: [7, 8, 9],
    },
  ]
} 