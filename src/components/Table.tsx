import { flexRender } from '@tanstack/react-table'
import React from 'react'
import Filter from './Filter'
import { TableProps } from './@types/table'
import { ArrowDown3, ArrowUp3, Sort } from 'iconsax-react'
import clsx from 'clsx'

export const Table = ({ table }: TableProps) => {
  return (
    <table className='text-center'>
      <thead className='bg-gray-800 text-white'>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className='border w-fit text-nowrap p-2'
              >
                {header.isPlaceholder ? null : (
                  <>
                    <div
                      className={clsx(
                        'flex justify-between gap-x-4 mb-2',
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                      )}
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: <ArrowUp3 className='text-white' />,
                        desc: <ArrowDown3 className='text-white' />,
                      }[header.column.getIsSorted() as string] ?? (
                        <Sort className='text-white' />
                      )}
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
        {table.getRowModel().rows.map((row: any, index: number) => (
          <tr
            key={row.id}
            className={clsx(
              'border odd:bg-white ',
              index % 2 === 0 ? '' : 'bg-gray-100',
            )}
          >
            {row.getVisibleCells().map((cell: any) => (
              <td key={cell.id} className='border text-nowrap p-4'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup: any) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header: any) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
