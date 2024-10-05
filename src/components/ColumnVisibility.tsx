import React from 'react'

export const ColumnVisibility = ({ table }: any) => {
  return (
    <div className='inline-block border border-black shadow rounded'>
      <div className='px-1 border-b border-black'>
        <label>
          <input
            {...{
              type: 'checkbox',
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{' '}
          Toggle All
        </label>
      </div>
      {table.getAllLeafColumns().map((column: any) => {
        return (
          <div key={column.id} className='px-1'>
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{' '}
              {column.id}
            </label>
          </div>
        )
      })}
    </div>
  )
}
