import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table'
import { useMemo, useReducer, useState } from 'react'
import { ProductListItem } from '../@types/productList.mock.type'
import { productList } from '../mock/productList'
import Filter from '../components/Filter'

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
    // Implement the logic to create a new person object
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

  const columns = useMemo<ColumnDef<ProductListItem, any>[]>(
    () => [
      {
        accessorKey: 'productName',
        header: () => <span>نام محصول</span>,
        meta: {
          filterVariant: 'text',
        },
      },
      productTableColumns.accessor('distributerImage', {
        header: () => <span>عکس شرکت توریع کننده</span>,
        enableColumnFilter: true,
      }),
      productTableColumns.accessor('smallUnit', {
        header: () => 'واحد فروش کوچک',
        meta: {
          filterVariant: 'select',
        },
      }),
      productTableColumns.accessor('bigUnit', {
        header: () => <span>واحد فروش بزرگ</span>,
        meta: {
          filterVariant: 'select',
        },
      }),
      productTableColumns.accessor('quantity', {
        header: 'موجودی',
        meta: {
          filterVariant: 'range',
        },
      }),
      productTableColumns.accessor('saleWithBigUnit', {
        header: 'فروش با واحد بزرگ',
        meta: {
          filterVariant: 'checkbox',
        },
      }),
      productTableColumns.accessor('brandName', {
        header: 'نام برند',
        meta: {
          filterVariant: 'multi-select',
        },
      }),
      productTableColumns.accessor('price', {
        header: 'قیمت',
        meta: {
          filterVariant: 'range',
        },
      }),
      productTableColumns.accessor('consumerPrice', {
        header: 'قیمت مصرف کننده',
        meta: {
          filterVariant: 'range',
        },
      }),
      productTableColumns.accessor('minOrder', {
        header: 'کمترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
      }),
      productTableColumns.accessor('maxOrder', {
        header: 'بیشترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
      }),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  console.log({ table })

  return (
    <div className='p-2'>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className='flex items-center gap-2'>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            min='1'
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify({ columnFilters: table.getState().columnFilters }, null, 2)}</pre>
    </div>
  )
}
