import type { ApiResponse } from "../models";
import { DataRowKeys } from './data-row-keys';

export const apiResponse: ApiResponse = {
  rows: [
    {
      key: DataRowKeys.Row1,
      data: [{ value: 1 }, { value: 2 }, { value: 3 }],
    },
    {
      key: DataRowKeys.Row2,
      data: [{ value: 4 }, { value: 5 }, { value: 6 }],
    },
    {
      key: DataRowKeys.Row3,
      data: [{ value: 6 }, { value: 7 }, { value: 8 }],
    },
    {
      key: DataRowKeys.Row4,
      data: [{
        value: [{
          key: DataRowKeys.Row5,
          data: [{ value: 9 }, { value: 10 }, { value: 11 }],
        },
        {
          key: DataRowKeys.Row6,
          data: [{ value: 12 }, { value: 13 }, { value: 14 }],
        }]
      },
      {
        value: [{
          key: DataRowKeys.Row7,
          data: [{ value: 15 }, { value: 16 }, { value: 17 }],
        },
        {
          key: DataRowKeys.Row8,
          data: [{ value: 18 }, { value: 19 }, { value: 20 }],
        }]
      }]
    },
  ]
};