import clsx from 'clsx'
import { ArrowDown2 } from 'iconsax-react'
import { useState } from 'react'
import { IconElement } from './IconElemnt'

export const ColumnVisibility = ({ table }: any) => {
  const [showColumnOptions, setShowColumnOptions] = useState<boolean>(false)
  return (
    <div className='border shadow rounded-t relative w-72 mr-2'>
      <div
        className='px-1 cursor-pointer flex justify-between items-center'
        onClick={() => setShowColumnOptions(!showColumnOptions)}
      >
        <p>انتخاب ستون ها</p>
        <IconElement
          icon={ArrowDown2}
          className={clsx(
            'size-5 transition-transform duration-300',
            showColumnOptions ? 'transform rotate-180' : 'transform -rotate-0',
          )}
        />
      </div>
      {showColumnOptions ? (
        <div className='absolute top-6 z-10 bg-white w-full max-h-96 overflow-y-scroll scrollbar-sm rounded-b border-x'>
          <div
            className='px-1'
            onClick={() => setShowColumnOptions(!showColumnOptions)}
          >
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }}
              />{' '}
              همه
            </label>
          </div>
          <div>
            {table
              .getAllLeafColumns()
              .slice(1, table.getAllLeafColumns().length)
              .map((column: any) => {
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
                      {column.columnDef.header}
                    </label>
                  </div>
                )
              })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
