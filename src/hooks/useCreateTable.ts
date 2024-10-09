import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { UseCreateTableProps } from '../@types/hooks.type'

export const useCreateTable = ({
  data,
  columns,
  setColumnFilters,
  debugTable,
  debugHeaders,
  debugColumns,
  columnResizeMode,
  columnResizeDirection,
  filterFns,
  state,
  globalFilterFn,
}: UseCreateTableProps) => {
  const table = useReactTable({
    data,
    columns,
    filterFns,
    state,
    globalFilterFn,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: debugTable,
    debugHeaders: debugHeaders,
    debugColumns: debugColumns,
    columnResizeMode: columnResizeMode,
    columnResizeDirection: columnResizeDirection,
  })

  return table
}
