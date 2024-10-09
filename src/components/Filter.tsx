import React from 'react'
import DebouncedInput from './DebouncedInput'
import { Column } from '@tanstack/react-table'

function Filter({
  column,
  Units,
}: {
  column: Column<any, unknown>
  Units: any
}) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}

  return filterVariant === 'range' ? (
    <div className='flex justify-center items-center'>
      <div className='flex gap-x-2'>
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type='number'
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder='کم'
          className='w-16 border shadow rounded text-black px-2 outline-none'
        />
        <DebouncedInput
          type='number'
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder='بیش'
          className='w-16 border shadow rounded text-black px-2 outline-none'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className='text-black rounded-sm'
    >
      <option value=''>همه</option>
      {Units.map((unit: any) => (
        <option value={unit}>{unit}</option>
      ))}
    </select>
  ) : filterVariant === 'checkbox' ? (
    <input
      type='checkbox'
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  ) : (
    <DebouncedInput
      className='w-36 border shadow rounded outline-none text-black px-2'
      onChange={(value) => column.setFilterValue(value)}
      placeholder='جستجو...'
      type='text'
      value={(columnFilterValue ?? '') as string}
    />
  )
}

export default Filter
