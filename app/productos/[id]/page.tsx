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
  
  // Estado para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/productos/${params.id}`)
        if (!response.ok) {
          throw new Error('Producto no encontrado')
        }
        const data = await response.json()
        setProduct(data)
        setEditForm({
          name: data.name,
          description: data.description || ''
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto?\n\nEsta acción no se puede deshacer.')) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/productos/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Producto eliminado exitosamente')
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        alert(`Error al eliminar: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (err) {
      alert('Error de conexión al eliminar producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editForm.name.trim()) {
      alert('El nombre del producto es obligatorio')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/productos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name.trim(),
          description: editForm.description.trim() || null,
        }),
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProduct(updatedProduct)
        setIsEditModalOpen(false)
        alert('Producto actualizado exitosamente')
      } else {
        const errorData = await response.json()
        alert(`Error al actualizar: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (err) {
      alert('Error de conexión al actualizar producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditModal = () => {
    if (product) {
      setEditForm({
        name: product.name,
        description: product.description || ''
      })
      setIsEditModalOpen(true)
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
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Volver al dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* ID y descripción */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                ID: {product?.id}
              </span>
            </div>

            <h2 className="text-gray-700 font-semibold mb-2">Descripción</h2>
            <p className="text-gray-600">
              {product?.description || 'Sin descripción disponible'}
            </p>
          </div>

          {/* Categorías */}
          <div className="mb-6">
            <h2 className="text-gray-700 font-semibold mb-2">Categorías</h2>
            <div className="flex flex-wrap gap-2">
              {product?.categoriaproducto && product.categoriaproducto.length > 0 ? (
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
              {product?.productofabricante && product.productofabricante.length > 0 ? (
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
              {product?.usuarioproducto && product.usuarioproducto.length > 0 ? (
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
        <div className="flex gap-4">
          <button
            onClick={openEditModal}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Procesando...' : 'Editar Producto'}
          </button>
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Eliminando...' : 'Eliminar Producto'}
          </button>
        </div>

        {isEditModalOpen && product && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold">Editar Producto</h2>
                <p className="text-blue-100 mt-1">ID: {product.id}</p>
              </div>

              <form onSubmit={handleEdit} className="p-6">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Nombre del Producto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Ej: iPhone 15 Pro Max"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Descripción opcional del producto..."
                    rows={4}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 text-sm">
                    <strong>Nota:</strong> Solo puedes editar el nombre y descripción. 
                    Las categorías, fabricantes y usuarios asociados requieren funcionalidad adicional.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !editForm.name.trim()}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
