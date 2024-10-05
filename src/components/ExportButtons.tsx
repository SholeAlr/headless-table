import { DocumentDownload } from 'iconsax-react'
import { exportToCsv } from '../helpers/exportToCSV'
import { exportToExcel } from '../helpers/exportToExcel'
import { FC } from 'react'
import { ExportButtonsProps } from './@types/export.buttons.type'

export const ExportButtons: FC<ExportButtonsProps> = ({
  table,
  neededButtons = 'all',
}) => {
  const exportToCsvClick = () => {
    exportToCsv({ table })
  }

  const exportToExcelClick = async () => {
    exportToExcel({ table })
  }
  return (
    <div className='flex'>
      {neededButtons === 'csv' || neededButtons === 'all' ? (
        <button
          onClick={exportToCsvClick}
          className='bg-blue-600 text-white p-2 rounded-lg m-2 flex gap-x-2'
        >
          <DocumentDownload className='text-white' />
          CSV
        </button>
      ) : null}

      {neededButtons === 'excel' || neededButtons === 'all' ? (
        <button
          onClick={exportToExcelClick}
          className='bg-blue-600 text-white p-2 rounded-lg m-2 flex gap-x-2'
        >
          <DocumentDownload className='text-white' />
          Excel
        </button>
      ) : null}
    </div>
  )
}
