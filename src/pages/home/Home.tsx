import { ColumnFiltersState, RowData } from '@tanstack/react-table'
import { useState } from 'react'
import { productList } from '../../mock/productList'
import { Table } from '../../components/Table'
import { useCreateTable } from '../../hooks/useCreateTable'
import { useCreateProductTableColumns } from './hooks/useCreateProductTable'
import { Pagination } from '../../components/Pagination'
import { ActionButtons } from '../../components/ActionButtons'
import { SelectedFilters } from '../../components/SelectedFilters'

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'multi-select' | 'checkbox'
  }
}

export const Home = () => {
  const [data, setData] = useState(() => [...productList.queryResult])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useCreateProductTableColumns()

  const table = useCreateTable({
    data,
    columns,
    columnFilters,
    setColumnFilters,
  })

  return (
    <div className='w-screen overflow-x-scroll'>
      <Table table={table} />

      <Pagination table={table} />

      <ActionButtons table={table} setData={setData} />

      <SelectedFilters table={table} />
    </div>
  )
}
