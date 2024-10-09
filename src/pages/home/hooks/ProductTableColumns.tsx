import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { ProductListItem } from '../../../@types/productList.mock.type'
import { IndeterminateCheckbox } from '../../../components/IndeterminateCheckbox'
import { Edit } from 'iconsax-react'

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
          <div className='flex gap-x-2'>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
            <Edit className='text-blue-600 size-5' />
          </div>
        ),
      },
      {
        id: 'productName',
        accessorKey: 'productName',
        header: 'نام محصول',
        meta: {
          filterVariant: 'text',
        },
      },
      {
        id: 'distributerImage',
        accessorKey: 'distributerImage',
        header: 'عکس شرکت توزیع کننده',
        enableColumnFilter: true,
      },
      {
        id: 'smallUnit',
        accessorKey: 'smallUnit',
        header: 'واحد فروش کوچک',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        id: 'bigUnit',
        accessorKey: 'bigUnit',
        header: 'واحد فروش بزرگ',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        id: 'quantity',
        accessorKey: 'quantity',
        header: 'موجودی',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        id: 'saleWithBigUnit',
        accessorKey: 'saleWithBigUnit',
        header: 'فروش با واحد بزرگ',
        meta: {
          filterVariant: 'checkbox',
        },
      },
      {
        id: 'brandName',
        accessorKey: 'brandName',
        header: 'نام برند',
        meta: {
          filterVariant: 'multi-select',
        },
      },
      {
        id: 'price',
        accessorKey: 'price',
        header: 'قیمت',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        id: 'consumerPrice',
        accessorKey: 'consumerPrice',
        header: 'قیمت مصرف کننده',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        id: 'minOrder',
        accessorKey: 'minOrder',
        header: 'کمترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        id: 'maxOrder',
        accessorKey: 'maxOrder',
        header: 'بیشترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
      },
    ],
    [],
  )

  return columns
}
