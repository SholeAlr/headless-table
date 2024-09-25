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
      cell: (info: { getValue: () => any }) => info.getValue(),
      footer: (info: { column: { id: any } }) => info.column.id,
    }),
    productTableColumns.accessor((row: { distributerImage: string }) => row.distributerImage, {
      id: 'distributerImage',
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined
      }) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      footer: (info: { column: { id: any } }) => info.column.id,
    }),
    productTableColumns.accessor('smallUnit', {
      header: () => 'smallUnit',
      cell: (info: { renderValue: () => any }) => info.renderValue(),
      footer: (info: { column: { id: any } }) => info.column.id,
    }),
    productTableColumns.accessor('bigUnit', {
      header: () => <span>Visits</span>,
      footer: (info: { column: { id: any } }) => info.column.id,
    }),
    productTableColumns.accessor('quantity', {
      header: 'quantity',
      footer: (info: { column: { id: any } }) => info.column.id,
    }),
    productTableColumns.accessor('saleWithBigUnit', {
      header: 'saleWithBigUnit',
      footer: (info: { column: { id: any } }) => info.column.id,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
