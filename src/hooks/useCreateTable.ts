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
  columnFilters,
  setColumnFilters,
  debugTable,
  debugHeaders,
  debugColumns,
  columnResizeMode,
}: UseCreateTableProps) => {
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: debugTable,
    debugHeaders: debugHeaders,
    debugColumns: debugColumns,
    columnResizeMode: columnResizeMode,
  })

  return table
}
