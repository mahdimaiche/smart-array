import type { DataRowKeys } from '../constants';

export type ApiResponse = {
  rows: DataRow[];
}

export type DataRow = {
  key: DataRowKeys;
  data: number[] | DataRow[];
}