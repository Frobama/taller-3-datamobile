import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los fabricantes
export async function GET() {
  try {
    const fabricantes = await prisma.fabricante.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(fabricantes)
  } catch (error) {
    console.error('Error fetching fabricantes:', error)
    return NextResponse.json(
      { error: 'Error al obtener fabricantes' },
      { status: 500 }
    )
  }
}
