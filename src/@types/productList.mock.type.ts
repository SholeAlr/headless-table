export type ProductListItem = {
  id: number
  productName: string
  code: number
  distributerId: number
  distributer: string
  distributerImage: string
  productId: number
  productImage: string
  productNoInPack: number
  netWeight: number
  originCategoryId: number
  originCategory: string
  subCategoryId: number
  subCategory: string
  categoryId: number
  category: string
  smallUnitId: number
  smallUnit: string
  bigUnitId: number
  bigUnit: string
  barcode: string
  brandId: number
  brandName: string
  brandImage: string
  price: number
  consumerPrice: number
  minOrder: number
  maxOrder: number
  discount: null
  tieredDiscount: null
  tax: number
  score: null
  quantity: number
  saleWithBigUnit: boolean
  includePromotion: boolean
}

export type ProductList = {
  pageNumber: number
  pageSize: number
  totalCount: number
  queryResult: ProductListItem[]
}
