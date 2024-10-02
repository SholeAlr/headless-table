import React from 'react'

export const Pagination = ({ table }: any) => {
  return (
    <div className='flex items-center gap-2 text-center'>
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
        <div>صفحه</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
        </strong>
      </span>
      <span className='flex items-center gap-1'>
        | برو به صفحه:
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
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}
