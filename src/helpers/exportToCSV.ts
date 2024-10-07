import { ColumnDef, Table } from '@tanstack/react-table'
import { download, generateCsv, mkConfig } from 'export-to-csv'

export const exportToCsv = ({
  table,
  columns,
}: {
  table: Table<unknown>
  columns: ColumnDef<any>[]
}) => {
  // create an array for title of each column in English
  const columnsKeys: string[] = columns
    .slice(1, columns.length)
    .map((eachColumn: any) => eachColumn.accessorKey)

  const rows = table.getFilteredRowModel().rows
  const rawTableData = rows.map((row: any) => row.original)

  interface RawItem {
    [key: string]: any
  }

  // man through rawTableData and columnsKeys to
  // extract the data which is currently displaying
  // on the screen, and save it into result
  const result = rawTableData.map((item: RawItem) => {
    const newItem: { [key: string]: any } = {}
    columnsKeys.forEach((key: string) => {
      newItem[key] = item?.[key]
    })
    return newItem
  })

  // create an array of objects to use as header of CSV file table
  const columnHeaders = columns
    .slice(1, columns.length)
    .map((eachHeader: any) => ({
      key: eachHeader.accessorKey,
      displayLabel: eachHeader.header,
    }))

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    filename: 'table-export',
    decimalSeparator: '.',
    useKeysAsHeaders: false,
    columnHeaders: columnHeaders,
  })
  const csv = generateCsv(csvConfig)(result)
  download(csvConfig)(csv)
}
