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
  filterFns: {
    fuzzy: any
  }
  state: {
    columnFilters: any
    globalFilter: any
  }
  globalFilterFn: any
  onColumnFiltersChange: any
  onGlobalFilterChange: any
  getCoreRowModel: any
  getFilteredRowModel: any
  getSortedRowModel: any
  getPaginationRowModel: any
}
