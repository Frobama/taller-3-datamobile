import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  searchTerm: string
  selectedCategory: string
  selectedFabricante: string
  sortBy: 'name' | 'id' | 'recent'
  sortOrder: 'asc' | 'desc'
}

const initialState: FiltersState = {
  searchTerm: '',
  selectedCategory: 'all',
  selectedFabricante: 'all',
  sortBy: 'name',
  sortOrder: 'asc',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setSelectedFabricante: (state, action: PayloadAction<string>) => {
      state.selectedFabricante = action.payload
    },
    setSortBy: (state, action: PayloadAction<'name' | 'id' | 'recent'>) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
    },
    resetFilters: (state) => {
      return initialState
    },
  },
})

export const {
  setSearchTerm,
  setSelectedCategory,
  setSelectedFabricante,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer