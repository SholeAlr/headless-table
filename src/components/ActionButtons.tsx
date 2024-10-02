import { ProductListItem } from '../@types/productList.mock.type'

export const ActionButtons = ({ table, setData }: any) => {
  const refreshData = () => setData((_old: any) => makeData(50_000))

  function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): ProductListItem[] => {
      const len = lens[depth]!
      return range(len).map((d): ProductListItem => {
        return {
          ...newProduct(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
      })
    }

    return makeDataLevel()
  }

  const newProduct = (): ProductListItem => {
    return {
      id: 0,
      productName: '',
      code: 0,
      distributerId: 0,
      distributer: '',
      distributerImage: '',
      productId: 0,
      productImage: '',
      productNoInPack: 0,
      netWeight: 0,
      originCategoryId: 0,
      originCategory: '',
      subCategoryId: 0,
      subCategory: '',
      categoryId: 0,
      category: '',
      smallUnitId: 0,
      smallUnit: '',
      bigUnitId: 0,
      bigUnit: '',
      barcode: '',
      brandId: 0,
      brandName: '',
      brandImage: '',
      price: 0,
      consumerPrice: 0,
      minOrder: 0,
      maxOrder: 0,
      discount: null,
      tieredDiscount: null,
      tax: 0,
      score: null,
      quantity: 0,
      saleWithBigUnit: false,
      includePromotion: false,
    }
  }

  const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
      arr.push(i)
    }
    return arr
  }

  return (
    <div className='flex justify-between'>
      <div>{table.getPrePaginationRowModel().rows.length} ردیف</div>

      <div>
        <button onClick={() => refreshData()}>رفرش</button>
      </div>
    </div>
  )
}
