'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  description: string | null
  categoriaproducto: { categoria: { name: string } }[]
  productofabricante: { fabricante: { name: string } }[]
  usuarioproducto: { usuario: { username: string } }[]
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/productos/${params.id}`)
        if (!response.ok) {
          throw new Error('Producto no encontrado')
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      const response = await fetch(`/api/productos/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Producto eliminado')
        router.push('/dashboard')
      } else {
        alert('Error al eliminar producto')
      }
    } catch (err) {
      alert('Error al eliminar producto')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-semibold mb-2">Error</h2>
            <p className="text-red-600">{error || 'Producto no encontrado'}</p>
            <Link
              href="/dashboard"
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              ← Volver al dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Volver al dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* ID y descripción */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                ID: {product.id}
              </span>
            </div>

            <h2 className="text-gray-700 font-semibold mb-2">Descripción</h2>
            <p className="text-gray-600">
              {product.description || 'Sin descripción disponible'}
            </p>
          </div>

          {/* Categorías */}
          <div className="mb-6">
            <h2 className="text-gray-700 font-semibold mb-2">Categorías</h2>
            <div className="flex flex-wrap gap-2">
              {product.categoriaproducto.length > 0 ? (
                product.categoriaproducto.map((cp, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {cp.categoria.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Sin categorías</span>
              )}
            </div>
          </div>

          {/* Fabricantes */}
          <div className="mb-6">
            <h2 className="text-gray-700 font-semibold mb-2">Fabricantes</h2>
            <div className="flex flex-wrap gap-2">
              {product.productofabricante.length > 0 ? (
                product.productofabricante.map((pf, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {pf.fabricante.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Sin fabricantes</span>
              )}
            </div>
          </div>

          {/* Usuarios asociados */}
          <div className="mb-6">
            <h2 className="text-gray-700 font-semibold mb-2">Usuarios Asociados</h2>
            <div className="flex flex-wrap gap-2">
              {product.usuarioproducto.length > 0 ? (
                product.usuarioproducto.map((up, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                  >
                    @{up.usuario.username}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Sin usuarios asociados</span>
              )}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => alert('Función de editar por implementar')}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Editar Producto
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Eliminar Producto
          </button>
        </div>

        {/* Nota para el equipo */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Nota para el equipo:</strong> El botón "Editar" está pendiente de implementar.
            Debes crear un formulario modal o página aparte para editar el producto usando la API PUT.
          </p>
        </div>
      </div>
    </div>
  )
}
