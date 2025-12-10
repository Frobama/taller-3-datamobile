'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
  setSearchTerm,
  setSelectedCategory,
  setSelectedFabricante,
  setSortBy,
  setSortOrder,
  resetFilters,
} from '@/store/slices/filtersSlice'

interface FilterPanelProps {
  categorias: string[]
  fabricantes: string[]
}

export default function FilterPanel({ categorias, fabricantes }: FilterPanelProps) {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Búsqueda */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="flex-1 min-w-[200px] px-4 py-2 border rounded"
        />

        {/* Categoría */}
        <select
          value={filters.selectedCategory}
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value="all">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Fabricante */}
        <select
          value={filters.selectedFabricante}
          onChange={(e) => dispatch(setSelectedFabricante(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value="all">Todos los fabricantes</option>
          {fabricantes.map((fab) => (
            <option key={fab} value={fab}>
              {fab}
            </option>
          ))}
        </select>

        {/* Ordenar por */}
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          className="px-4 py-2 border rounded"
        >
          <option value="name">Nombre</option>
          <option value="id">ID</option>
          <option value="recent">Más reciente</option>
        </select>

        {/* Orden */}
        <select
          value={filters.sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value as any))}
          className="px-4 py-2 border rounded"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => dispatch(resetFilters())}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  )
}