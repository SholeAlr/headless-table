import {
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingFn,
  sortingFns,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { productList } from '../../mock/productList'
import { Table } from '../../components/Table'
import { useCreateTable } from '../../hooks/useCreateTable'
import { ProductTableColumns } from './hooks/ProductTableColumns'
import { Pagination } from '../../components/Pagination'
import { ActionButtons } from '../../components/ActionButtons'
import { SelectedFilters } from '../../components/SelectedFilters'
import { ExportButtons } from '../../components/ExportButtons'
import '../../main.css'
import { ColumnVisibility } from '../../components/ColumnVisibility'
import DebouncedInput from '../../components/DebouncedInput'
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'multi-select' | 'checkbox'
  }

  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const Home = () => {
  const [data, setData] = useState(() => [...productList.queryResult])
  const [globalFilter, setGlobalFilter] = useState('')

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const productTablecolumns = ProductTableColumns()

  const [columns] = useState(() => [...productTablecolumns])

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]?.itemRank!,
        rowB.columnFiltersMeta[columnId]?.itemRank!,
      )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
  }

  const table = useCreateTable({
    data,
    columns,
    columnFilters,
    setColumnFilters,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'rtl',
    filterFns: {
      fuzzy: fuzzyFilter, // a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter,
    },
    globalFilterFn: 'includesString',
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  return (
    <div className='w-screen overflow-x-scroll'>
      <ExportButtons table={table} columns={columns} />

      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className='p-2 font-lg shadow border border-block'
          placeholder='جستجو در تمام جدول...'
        />
      </div>

      <ColumnVisibility table={table} />

      <Table table={table} />

      <Pagination table={table} />

      <ActionButtons table={table} setData={setData} />

      <SelectedFilters table={table} />
    </div>
  )
}
