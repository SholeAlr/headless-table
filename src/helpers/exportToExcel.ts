import * as XLSX from 'xlsx'

export const exportToExcel = ({ table }: any) => {
  let data: any

  const rows = table.getFilteredRowModel().rows
  const formattedData = rows.map((row: any) => ({
    ...row.original,
    id: row.id,
  }))
  data = formattedData

  const newWorkBook = XLSX.utils.book_new()
  const sheetData = data.map((item: any) => Object.values(item))
  const newWorkSheet = XLSX.utils.json_to_sheet(sheetData)
  const headers = Object.keys(data[0])
  XLSX.utils.sheet_add_aoa(newWorkSheet, [headers], { origin: 'A1' })
  XLSX.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Sheet1')
  XLSX.writeFile(newWorkBook, 'exported_data.xlsx')
}
