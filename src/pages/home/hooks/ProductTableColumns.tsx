import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { ProductListItem } from '../../../@types/productList.mock.type'
import { IndeterminateCheckbox } from '../../../components/IndeterminateCheckbox'

export const ProductTableColumns = () => {
  const columns = useMemo<ColumnDef<ProductListItem>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: 'productName',
        header: 'نام محصول',
        meta: {
          filterVariant: 'text',
        },
        size: 180,
      },
      {
        accessorKey: 'distributerImage',
        header: 'عکس شرکت توزیع کننده',
        enableColumnFilter: true,
      },
      {
        accessorKey: 'smallUnit',
        header: 'واحد فروش کوچک',
        meta: {
          filterVariant: 'select',
        },
        size: 180,
      },
      {
        accessorKey: 'bigUnit',
        header: 'واحد فروش بزرگ',
        meta: {
          filterVariant: 'select',
        },
        size: 180,
      },
      {
        accessorKey: 'quantity',
        header: 'موجودی',
        meta: {
          filterVariant: 'range',
        },
        size: 180,
      },
      {
        accessorKey: 'saleWithBigUnit',
        header: 'فروش با واحد بزرگ',
        meta: {
          filterVariant: 'checkbox',
        },
        size: 180,
      },
      {
        accessorKey: 'brandName',
        header: 'نام برند',
        meta: {
          filterVariant: 'multi-select',
        },
        size: 180,
      },
      {
        accessorKey: 'price',
        header: 'قیمت',
        meta: {
          filterVariant: 'range',
        },
        size: 180,
      },
      {
        accessorKey: 'consumerPrice',
        header: 'قیمت مصرف کننده',
        meta: {
          filterVariant: 'range',
        },
        size: 180,
      },
      {
        accessorKey: 'minOrder',
        header: 'کمترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
        size: 180,
      },
      {
        accessorKey: 'maxOrder',
        header: 'بیشترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
        size: 180,
      },
    ],
    [],
  )

  return columns
}
