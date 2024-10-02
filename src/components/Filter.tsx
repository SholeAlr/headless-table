import React from 'react'
import DebouncedInput from './DebouncedInput'
import { Column } from '@tanstack/react-table'

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}

  return filterVariant === 'range' ? (
    <div>
      <div className='flex space-x-2'>
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type='number'
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder='کمترین'
          className='w-24 border shadow rounded'
        />
        <DebouncedInput
          type='number'
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder='بیشترین'
          className='w-24 border shadow rounded'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value=''>All</option>
      <option value='opt1'>opt1</option>
      <option value='opt2'>opt2</option>
      <option value='opt2'>opt2</option>
    </select>
  ) : filterVariant === 'checkbox' ? (
    <input
      type='checkbox'
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  ) : (
    <DebouncedInput
      className='w-36 border shadow rounded'
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  )
}

export default Filter
