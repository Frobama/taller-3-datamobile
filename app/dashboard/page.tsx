'use client'

import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setProducts, setLoading, setError } from '@/store/slices/productsSlice'
import FilterPanel from '@/components/filters/FilterPanel'
import ProductBarChart from '@/components/charts/BarChart'
import Areachart from '@/components/charts/AreaChart'
import PieChart from '@/components/charts/PieChart'
import LineChart from '@/components/charts/LineChart'
import ChartCarousel from '@/components/charts/ChartCarousel'
import Link from 'next/link'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { items: products, loading } = useSelector((state: RootState) => state.products)
  const filters = useSelector((state: RootState) => state.filters)

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const response = await fetch('/api/productos')
        const data = await response.json()
        dispatch(setProducts(data))
      } catch (error) {
        dispatch(setError('Error al cargar productos'))
      }
    }
    fetchProducts()
  }, [dispatch])

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filtro por búsqueda
    if (filters.searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Filtro por categoría
    if (filters.selectedCategory !== 'all') {
      filtered = filtered.filter((p) =>
        p.categoriaproducto.some((cp) => cp.categoria.name === filters.selectedCategory)
      )
    }

    // Filtro por fabricante
    if (filters.selectedFabricante !== 'all') {
      filtered = filtered.filter((p) =>
        p.productofabricante.some((pf) => pf.fabricante.name === filters.selectedFabricante)
      )
    }

    // Ordenar
    filtered.sort((a, b) => {
      let comparison = 0
      if (filters.sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (filters.sortBy === 'id') {
        comparison = a.id - b.id
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [products, filters])

  // Datos para gráficos

  // 1. Gráfico de Barras - Productos por Categoría
  const categoriesData = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredProducts.forEach((p) => {
      p.categoriaproducto.forEach((cp) => {
        counts[cp.categoria.name] = (counts[cp.categoria.name] || 0) + 1
      })
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [filteredProducts])

  // 2. Gráfico de Líneas - Productos por Fabricante
  const fabricantesData = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredProducts.forEach((p) => {
      p.productofabricante.forEach((pf) => {
        counts[pf.fabricante.name] = (counts[pf.fabricante.name] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8) // Top 8 fabricantes
  }, [filteredProducts])

  // 3. Gráfico de Pie - Distribución por Usuario
  const usuariosData = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredProducts.forEach((p) => {
      p.usuarioproducto.forEach((up) => {
        counts[up.usuario.username] = (counts[up.usuario.username] || 0) + 1
      })
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [filteredProducts])

  // 4. Gráfico de Área - Top 5 Categorías con más productos
  const topCategoriesData = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredProducts.forEach((p) => {
      p.categoriaproducto.forEach((cp) => {
        counts[cp.categoria.name] = (counts[cp.categoria.name] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }, [filteredProducts])

  // Extraer categorías y fabricantes únicos
  const categorias = useMemo(
    () => [...new Set(products.flatMap((p) => p.categoriaproducto.map((cp) => cp.categoria.name)))],
    [products]
  )

  const fabricantes = useMemo(
    () => [...new Set(products.flatMap((p) => p.productofabricante.map((pf) => pf.fabricante.name)))],
    [products]
  )

  if (loading) {
    return <div className="p-8">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard - DataMobile</h1>

        {/* Filtros */}
        <FilterPanel categorias={categorias} fabricantes={fabricantes} />

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Productos</h3>
            <p className="text-3xl font-bold">{filteredProducts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Categorías</h3>
            <p className="text-3xl font-bold">{categorias.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Fabricantes</h3>
            <p className="text-3xl font-bold">{fabricantes.length}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="mb-6">
          <ChartCarousel
            items={[
              { id: 'bar', node: <ProductBarChart data={categoriesData} /> },
              { id: 'line', node: <LineChart data={fabricantesData} /> },
              { id: 'pie', node: <PieChart data={usuariosData} /> },
              { id: 'area', node: <Areachart data={topCategoriesData} /> },
            ]}
          />
        </div>

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Categorías</th>
                <th className="px-4 py-3 text-left">Fabricantes</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">
                    {product.categoriaproducto.map((cp) => cp.categoria.name).join(', ')}
                  </td>
                  <td className="px-4 py-3">
                    {product.productofabricante.map((pf) => pf.fabricante.name).join(', ')}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/productos/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}