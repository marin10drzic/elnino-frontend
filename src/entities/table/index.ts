export { tableApi } from "./api/tableApi";
export type { Table, TableInput, TableLocation } from "./model/types";
export { useTables } from "./hooks/useTables";
export {
  useCreateTable,
  useUpdateTable,
  useDeleteTable,
} from "./hooks/useTableMutations";
