import { ColumnDef, Table } from '@tanstack/react-table'

export type ExportButtonsProps = {
  table: Table<unknown>
  columns: ColumnDef<any>[]
  neededButtons?: 'csv' | 'excel' | 'all'
}
