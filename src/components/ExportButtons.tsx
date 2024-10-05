import { DocumentDownload } from 'iconsax-react'
import { exportToCsv } from '../helpers/exportToCSV'
import { exportToExcel } from '../helpers/exportToExcel'

export const ExportButtons = ({ table }: any) => {
  const exportToCsvClick = () => {
    exportToCsv({ table })
  }

  const exportToExcelClick = async () => {
    exportToExcel({ table })
  }
  return (
    <div className='flex'>
      <button
        onClick={exportToCsvClick}
        className='bg-blue-600 text-white p-2 rounded-lg m-2 flex gap-x-2'
      >
        <DocumentDownload className='text-white' />
        CSV
      </button>
      <button
        onClick={exportToExcelClick}
        className='bg-blue-600 text-white p-2 rounded-lg m-2 flex gap-x-2'
      >
        <DocumentDownload className='text-white' />
        Excel
      </button>
    </div>
  )
}
