import type { RowDependency } from '../models';
import { DataRowKeys } from '../constants';

export const rowDependencies: RowDependency = {
  [DataRowKeys.Row1]: {
    dependsOn: DataRowKeys.Row2
  }
};
