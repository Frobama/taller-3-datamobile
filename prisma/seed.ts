import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  console.log('Iniciando seed...')

  // Limpiar datos existentes (opcional)
  await prisma.usuarioproducto.deleteMany()
  await prisma.productofabricante.deleteMany()
  await prisma.categoriaproducto.deleteMany()
  await prisma.producto.deleteMany()
  await prisma.categoria.deleteMany()
  await prisma.fabricante.deleteMany()
  await prisma.usuario.deleteMany()

  // Crear categorías
  const categorias = await Promise.all([
    prisma.categoria.create({ data: { name: 'Electrónica' } }),
    prisma.categoria.create({ data: { name: 'Ropa' } }),
    prisma.categoria.create({ data: { name: 'Hogar' } }),
    prisma.categoria.create({ data: { name: 'Deportes' } }),
    prisma.categoria.create({ data: { name: 'Juguetes' } }),
  ])
  console.log('✅ Categorías creadas')

  // Crear fabricantes
  const fabricantes = await Promise.all([
    prisma.fabricante.create({ data: { name: 'Samsung' } }),
    prisma.fabricante.create({ data: { name: 'Apple' } }),
    prisma.fabricante.create({ data: { name: 'Nike' } }),
    prisma.fabricante.create({ data: { name: 'Adidas' } }),
    prisma.fabricante.create({ data: { name: 'Sony' } }),
  ])
  console.log('✅ Fabricantes creados')

  // Crear usuarios
  const usuarios = await Promise.all([
    prisma.usuario.create({ data: { username: 'juan_perez' } }),
    prisma.usuario.create({ data: { username: 'maria_gomez' } }),
    prisma.usuario.create({ data: { username: 'pedro_lopez' } }),
  ])
  console.log('✅ Usuarios creados')

  // Crear productos
  const productos = [
    { name: 'Galaxy S24', description: 'Smartphone de última generación' },
    { name: 'iPhone 15 Pro', description: 'iPhone con chip A17' },
    { name: 'Zapatillas Running', description: 'Zapatillas deportivas premium' },
    { name: 'Camiseta Deportiva', description: 'Camiseta técnica transpirable' },
    { name: 'Smart TV 55"', description: 'Televisor 4K HDR' },
    { name: 'AirPods Pro', description: 'Auriculares con cancelación de ruido' },
    { name: 'Balón de Fútbol', description: 'Balón profesional' },
    { name: 'Lámpara LED', description: 'Lámpara inteligente RGB' },
    { name: 'Mochila Deportiva', description: 'Mochila con compartimentos' },
    { name: 'Consola PlayStation 5', description: 'Consola de videojuegos' },
  ]

  for (let i = 0; i < productos.length; i++) {
    const producto = await prisma.producto.create({
      data: productos[i],
    })

    // Asignar categoría
    await prisma.categoriaproducto.create({
      data: {
        id_producto: producto.id,
        id_categoria: categorias[i % categorias.length].name,
      },
    })

    // Asignar fabricante
    await prisma.productofabricante.create({
      data: {
        id_producto: producto.id,
        id_fabricante: fabricantes[i % fabricantes.length].id,
      },
    })

    // Asignar a usuario
    await prisma.usuarioproducto.create({
      data: {
        id_producto: producto.id,
        id_usuario: usuarios[i % usuarios.length].id,
      },
    })
  }

  console.log('✅ Productos creados con relaciones')
  console.log('🎉 Seed completado!')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })