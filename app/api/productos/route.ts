import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los productos
export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
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
      orderBy: {
        id: 'asc',
      },
    })

    return NextResponse.json(productos)
  } catch (error) {
    console.error('Error fetching productos:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo producto
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      )
    }

    const producto = await prisma.producto.create({
      data: {
        name,
        description: description || null,
      },
    })

    return NextResponse.json(producto, { status: 201 })
  } catch (error) {
    console.error('Error creating producto:', error)
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}