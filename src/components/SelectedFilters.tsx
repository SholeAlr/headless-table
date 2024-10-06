import React from 'react'

export const SelectedFilters = ({ table }: any) => {
  const filters = table.getState().columnFilters
  return (
    <div className='flex gap-x-2 items-center mb-4'>
      <p>فیلترها: </p>
      {filters.map((filter: any) => (
        <div className='p-2 bg-orange-300 w-fit rounded-lg my-4 mx-2'>
          {filter.value}
        </div>
      ))}
    </div>
  )
}
