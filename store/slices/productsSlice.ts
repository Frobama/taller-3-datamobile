import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  description: string | null
  categoriaproducto: { categoria: { name: string } }[]
  productofabricante: { fabricante: { name: string } }[]
  usuarioproducto: { usuario: { username: string } }[]
}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setProducts, setLoading, setError } = productsSlice.actions
export default productsSlice.reducer