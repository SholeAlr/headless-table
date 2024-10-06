import { ColumnFiltersState, ColumnResizeMode } from '@tanstack/react-table'

export type UseCreateTableProps = {
  data: any
  columns: any
  columnFilters?: ColumnFiltersState
  setColumnFilters: (prop: any) => void
  debugTable: boolean
  debugHeaders: boolean
  debugColumns: boolean
  columnResizeMode: ColumnResizeMode | undefined
  columnResizeDirection?: 'ltr' | 'rtl'
}
