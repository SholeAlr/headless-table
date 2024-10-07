import { ColumnFiltersState, RowData } from '@tanstack/react-table'
import { useState } from 'react'
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

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'multi-select' | 'checkbox'
  }
}

export const Home = () => {
  const [data, setData] = useState(() => [...productList.queryResult])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const productTablecolumns = ProductTableColumns()

  const [columns] = useState(() => [...productTablecolumns])

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
  })

  return (
    <div className='w-screen overflow-x-scroll'>
      <ExportButtons table={table} columns={columns} />

      <ColumnVisibility table={table} />

      <Table table={table} />

      <Pagination table={table} />

      <ActionButtons table={table} setData={setData} />

      <SelectedFilters table={table} />
    </div>
  )
}
