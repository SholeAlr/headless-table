import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  RowData,
} from '@tanstack/react-table'
import { useMemo, useReducer, useState } from 'react'
import { ProductListItem } from '../../@types/productList.mock.type'
import { productList } from '../../mock/productList'
import { Table } from '../../components/Table'
import { useCreateTable } from '../../hooks/useCreateTable'
import { useCreateProductTableColumns } from './hooks/useCreateProductTable'
import { Pagination } from '../../components/Pagination'

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'multi-select' | 'checkbox'
  }
}

export const Home = () => {
  const [data, setData] = useState(() => [...productList.queryResult])
  const rerender = useReducer(() => ({}), {})[1]
  const refreshData = () => setData((_old) => makeData(50_000))
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const productTableColumns = createColumnHelper<ProductListItem>()

  const newProduct = (): ProductListItem => {
    return {
      id: 0,
      productName: '',
      code: 0,
      distributerId: 0,
      distributer: '',
      distributerImage: '',
      productId: 0,
      productImage: '',
      productNoInPack: 0,
      netWeight: 0,
      originCategoryId: 0,
      originCategory: '',
      subCategoryId: 0,
      subCategory: '',
      categoryId: 0,
      category: '',
      smallUnitId: 0,
      smallUnit: '',
      bigUnitId: 0,
      bigUnit: '',
      barcode: '',
      brandId: 0,
      brandName: '',
      brandImage: '',
      price: 0,
      consumerPrice: 0,
      minOrder: 0,
      maxOrder: 0,
      discount: null,
      tieredDiscount: null,
      tax: 0,
      score: null,
      quantity: 0,
      saleWithBigUnit: false,
      includePromotion: false,
    }
  }

  const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
      arr.push(i)
    }
    return arr
  }

  function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): ProductListItem[] => {
      const len = lens[depth]!
      return range(len).map((d): ProductListItem => {
        return {
          ...newProduct(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
      })
    }

    return makeDataLevel()
  }

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
      <div className='flex justify-between'>
        <div>{table.getPrePaginationRowModel().rows.length} ردیف</div>
        <div>
          <button onClick={() => rerender()}>بازنشانی</button>
        </div>
        <div>
          <button onClick={() => refreshData()}>رفرش</button>
        </div>
      </div>
      <pre>
        {JSON.stringify(
          { columnFilters: table.getState().columnFilters },
          null,
          2,
        )}
      </pre>
    </div>
  )
}
