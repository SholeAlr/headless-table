export const ActionButtons = ({ table, setData }: any) => {
  return (
    <div className='flex justify-between'>
      <div>{table.getPrePaginationRowModel().rows.length} ردیف</div>
    </div>
  )
}
