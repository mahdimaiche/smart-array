import type { RowDependency } from '../models';
import { DataRowKeys } from '../constants';

export const rowDependencies: RowDependency = {
  [DataRowKeys.Row2]: {
    dependsOn: DataRowKeys.Row1
  },
  [DataRowKeys.Row3]: {
    dependsOn: DataRowKeys.Row1
  }
};
