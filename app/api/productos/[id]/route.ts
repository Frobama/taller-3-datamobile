import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener un producto por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoriaproducto: {
          include: {
            categoria: true,
          },
        },
        productofabricante: {
          include: {
            fabricante: true,
          },
        },
        usuarioproducto: {
          include: {
            usuario: true,
          },
        },
      },
    })

    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(producto)
  } catch (error) {
    console.error('Error fetching producto:', error)
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un producto
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const body = await request.json()
    const { name, description } = body

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const producto = await prisma.producto.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description !== undefined ? description : undefined,
      },
    })

    return NextResponse.json(producto)
  } catch (error) {
    console.error('Error updating producto:', error)
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un producto
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    await prisma.producto.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Producto eliminado' })
  } catch (error) {
    console.error('Error deleting producto:', error)
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    )
  }
}