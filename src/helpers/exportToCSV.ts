import { download, generateCsv, mkConfig } from 'export-to-csv'

const csvConfig = mkConfig({
  fieldSeparator: ',',
  filename: 'table-export', // export file name (without .csv)
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

export const exportToCsv = ({ table }: any) => {
  const rows = table.getFilteredRowModel().rows
  const rowData = rows.map((row: any) => row.original)
  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}
