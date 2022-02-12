import type { DataRowKeys } from '../constants';

export type RowDependency = {
  [key in DataRowKeys]?: {
    dependsOn: DataRowKeys
  }
}