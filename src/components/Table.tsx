import { Column, flexRender } from '@tanstack/react-table'
import Filter from './Filter'
import { TableProps } from './@types/table'
import { ArrowDown3, ArrowUp3, Sort } from 'iconsax-react'
import clsx from 'clsx'
import { CSSProperties } from 'react'
import { ProductListItem } from '../@types/productList.mock.type'

export const Table = ({ table }: TableProps) => {
  const Units = ['گالن', 'کیلوگرم', 'عدد', 'بطری']

  const getCommonPinningStyles = (
    column: Column<ProductListItem>,
  ): CSSProperties => {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn =
      isPinned === 'right' && column.getIsFirstColumn('right')

    return {
      boxShadow: isLastLeftPinnedColumn
        ? '-4px 0 4px -4px gray inset'
        : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    }
  }

  return (
    <div className='table-container'>
      <table
        className='text-center text-sm'
        style={{
          width: table.getTotalSize(),
        }}
      >
        <thead className='bg-gray-800 text-white'>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                const { column } = header
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ ...getCommonPinningStyles(column) }}
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
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ArrowUp3
                                className='text-white'
                                {...{
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              />
                            ),
                            desc: (
                              <ArrowDown3
                                className='text-white'
                                {...{
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <Sort
                              className='text-white'
                              {...{
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            />
                          )}
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: 'resizer',
                            }}
                          />
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} Units={Units} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
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
    </div>
  )
}
