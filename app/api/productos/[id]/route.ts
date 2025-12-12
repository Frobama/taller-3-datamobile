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

// PUT - Actualizar un producto con relaciones
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const body = await request.json()
    const { name, description, categorias, fabricantes, usuarios } = body

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    // Actualizar producto base
    await prisma.producto.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description !== undefined ? description : undefined,
      },
    })

    // Actualizar categorías si se proporcionan
    if (categorias !== undefined && Array.isArray(categorias)) {
      // Eliminar relaciones existentes
      await prisma.categoriaproducto.deleteMany({
        where: { id_producto: id },
      })
      // Crear nuevas relaciones
      if (categorias.length > 0) {
        await prisma.categoriaproducto.createMany({
          data: categorias.map((categoria: string) => ({
            id_producto: id,
            id_categoria: categoria,
          })),
        })
      }
    }

    // Actualizar fabricantes si se proporcionan
    if (fabricantes !== undefined && Array.isArray(fabricantes)) {
      // Eliminar relaciones existentes
      await prisma.productofabricante.deleteMany({
        where: { id_producto: id },
      })
      // Crear nuevas relaciones
      if (fabricantes.length > 0) {
        await prisma.productofabricante.createMany({
          data: fabricantes.map((fabricanteId: number) => ({
            id_producto: id,
            id_fabricante: fabricanteId,
          })),
        })
      }
    }

    // Actualizar usuarios si se proporcionan
    if (usuarios !== undefined && Array.isArray(usuarios)) {
      // Eliminar relaciones existentes
      await prisma.usuarioproducto.deleteMany({
        where: { id_producto: id },
      })
      // Crear nuevas relaciones
      if (usuarios.length > 0) {
        await prisma.usuarioproducto.createMany({
          data: usuarios.map((usuarioId: number) => ({
            id_producto: id,
            id_usuario: usuarioId,
          })),
        })
      }
    }

    // Retornar producto actualizado con relaciones
    const productoActualizado = await prisma.producto.findUnique({
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

    return NextResponse.json(productoActualizado)
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