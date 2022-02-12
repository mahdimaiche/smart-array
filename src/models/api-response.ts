import type { DataRowKeys } from '../constants';

export interface ApiResponse {
  rows: DataRow[];
}

export interface DataRow {
  key: DataRowKeys;
  data: (number | DataRow)[];
  dependsOn?: DataRowKeys;
}