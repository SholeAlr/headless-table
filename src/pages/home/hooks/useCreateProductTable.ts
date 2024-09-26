import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { ProductListItem } from '../../../@types/productList.mock.type'

export const useCreateProductTableColumns = () => {
  const columns = useMemo<ColumnDef<ProductListItem, any>[]>(
    () => [
      {
        accessorKey: 'productName',
        header: () => 'نام محصول',
        meta: {
          filterVariant: 'text',
        },
      },
      {
        accessorKey: 'distributerImage',
        header: () => 'عکس شرکت توزیع کننده',
        enableColumnFilter: true,
      },
      {
        accessorKey: 'smallUnit',
        header: () => 'واحد فروش کوچک',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'bigUnit',
        header: () => 'واحد فروش بزرگ',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'quantity',
        header: 'موجودی',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'saleWithBigUnit',
        header: 'فروش با واحد بزرگ',
        meta: {
          filterVariant: 'checkbox',
        },
      },
      {
        accessorKey: 'brandName',
        header: 'نام برند',
        meta: {
          filterVariant: 'multi-select',
        },
      },
      {
        accessorKey: 'price',
        header: 'قیمت',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'consumerPrice',
        header: 'قیمت مصرف کننده',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'minOrder',
        header: 'کمترین تعداد سفارش',
        meta: {
          filterVariant: 'range',
        },
      },
      {
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
