'use client'

import { useState, useEffect } from 'react'

interface CreateProductFormProps {
  onClose: () => void
  onSuccess: () => void
  categorias: string[]
  fabricantes: { id: number; name: string }[]
}

export default function CreateProductForm({ onClose, onSuccess, categorias, fabricantes }: CreateProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoria: '',
    fabricante: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('El nombre del producto es obligatorio')
      return
    }

    setIsSubmitting(true)
    try {
      // 1. Crear el producto
      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Error al crear: ${errorData.error || 'Error desconocido'}`)
        return
      }

      const newProduct = await response.json()

      // 2. Asignar categoría si se seleccionó
      if (formData.categoria) {
        await fetch('/api/productos/categorias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_producto: newProduct.id,
            id_categoria: formData.categoria
          })
        })
      }

      // 3. Asignar fabricante si se seleccionó
      if (formData.fabricante) {
        await fetch('/api/productos/fabricantes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_producto: newProduct.id,
            id_fabricante: parseInt(formData.fabricante)
          })
        })
      }

      alert('Producto creado exitosamente')
      onSuccess()
      onClose()
    } catch (err) {
      alert('Error de conexión al crear producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Laptop HP"
              disabled={isSubmitting}
            />
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción del producto (opcional)"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          {/* Categoría */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Categoría
            </label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Seleccionar categoría (opcional)</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Fabricante */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Fabricante
            </label>
            <select
              value={formData.fabricante}
              onChange={(e) => setFormData({ ...formData, fabricante: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Seleccionar fabricante (opcional)</option>
              {fabricantes.map((fab) => (
                <option key={fab.id} value={fab.id}>
                  {fab.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
