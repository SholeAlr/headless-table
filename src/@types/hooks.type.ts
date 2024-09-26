import { ColumnFiltersState } from '@tanstack/react-table'

export type UseCreateTableProps = {
  data: any
  columns: any
  columnFilters?: ColumnFiltersState
  setColumnFilters: (prop: any) => void
}
