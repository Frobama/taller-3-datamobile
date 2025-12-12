import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Asignar categoría a producto
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id_producto, id_categoria } = body

    if (!id_producto || !id_categoria) {
      return NextResponse.json(
        { error: 'id_producto e id_categoria son requeridos' },
        { status: 400 }
      )
    }

    const categoriaProducto = await prisma.categoriaproducto.create({
      data: {
        id_producto,
        id_categoria,
      },
    })

    return NextResponse.json(categoriaProducto, { status: 201 })
  } catch (error) {
    console.error('Error creating categoriaproducto:', error)
    return NextResponse.json(
      { error: 'Error al asignar categoría' },
      { status: 500 }
    )
  }
}
