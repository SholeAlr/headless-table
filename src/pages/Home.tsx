import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useReducer, useState } from 'react'
import { ProductListItem } from '../@types/productList.mock.type'
import { productList } from '../mock/productList'

export const Home = () => {
  const [data, _setData] = useState(() => [...productList.queryResult])
  const rerender = useReducer(() => ({}), {})[1]

  const productTableColumns = createColumnHelper<ProductListItem>()

  const columns = [
    productTableColumns.accessor('productName', {
      header: () => <span>نام محصول</span>,
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('distributerImage', {
      header: () => <span>عکس شرکت توریع کننده</span>,
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('smallUnit', {
      header: () => 'واحد فروش کوچک',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('bigUnit', {
      header: () => <span>واحد فروش بزرگ</span>,
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('quantity', {
      header: 'موجودی',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('saleWithBigUnit', {
      header: 'فروش با واحد بزرگ',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('brandName', {
      header: 'نام برند',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('price', {
      header: 'قیمت',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('consumerPrice', {
      header: 'قیمت مصرف کننده',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('minOrder', {
      header: 'کمترین تعداد سفارش',
      enableColumnFilter: true,
    }),
    productTableColumns.accessor('maxOrder', {
      header: 'بیشترین تعداد سفارش',
      enableColumnFilter: true,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log({ table })

  return (
    <div className='p-2'>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
      <div className='h-4' />
      <button onClick={() => rerender()} className='border p-2'>
        Rerender
      </button>
    </div>
  )
}
