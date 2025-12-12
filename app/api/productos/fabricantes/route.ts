import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Asignar fabricante a producto
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id_producto, id_fabricante } = body

    if (!id_producto || !id_fabricante) {
      return NextResponse.json(
        { error: 'id_producto e id_fabricante son requeridos' },
        { status: 400 }
      )
    }

    const productoFabricante = await prisma.productofabricante.create({
      data: {
        id_producto,
        id_fabricante,
      },
    })

    return NextResponse.json(productoFabricante, { status: 201 })
  } catch (error) {
    console.error('Error creating productofabricante:', error)
    return NextResponse.json(
      { error: 'Error al asignar fabricante' },
      { status: 500 }
    )
  }
}
