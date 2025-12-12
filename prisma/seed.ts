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
    prisma.categoria.create({ data: { name: 'Libros' } }),
    prisma.categoria.create({ data: { name: 'Alimentos' } }),
    prisma.categoria.create({ data: { name: 'Accesorios' } }),
  ])
  console.log('✅ Categorías creadas')

  // Crear fabricantes
  const fabricantes = await Promise.all([
    prisma.fabricante.create({ data: { name: 'Samsung' } }),
    prisma.fabricante.create({ data: { name: 'Apple' } }),
    prisma.fabricante.create({ data: { name: 'Nike' } }),
    prisma.fabricante.create({ data: { name: 'Adidas' } }),
    prisma.fabricante.create({ data: { name: 'Sony' } }),
    prisma.fabricante.create({ data: { name: 'LG' } }),
    prisma.fabricante.create({ data: { name: 'Xiaomi' } }),
    prisma.fabricante.create({ data: { name: 'Puma' } }),
    prisma.fabricante.create({ data: { name: 'Microsoft' } }),
    prisma.fabricante.create({ data: { name: 'HP' } }),
  ])
  console.log('✅ Fabricantes creados')

  // Crear usuarios
  const usuarios = await Promise.all([
    prisma.usuario.create({ data: { username: 'juan_perez' } }),
    prisma.usuario.create({ data: { username: 'maria_gomez' } }),
    prisma.usuario.create({ data: { username: 'pedro_lopez' } }),
    prisma.usuario.create({ data: { username: 'ana_martinez' } }),
    prisma.usuario.create({ data: { username: 'carlos_rodriguez' } }),
    prisma.usuario.create({ data: { username: 'lucia_fernandez' } }),
  ])
  console.log('✅ Usuarios creados')

  // Crear productos
  const productos = [
    // Electrónica
    { name: 'Galaxy S24', description: 'Smartphone de última generación con pantalla AMOLED' },
    { name: 'iPhone 15 Pro', description: 'iPhone con chip A17 Pro y cámara de 48MP' },
    { name: 'Smart TV 55"', description: 'Televisor 4K HDR con inteligencia artificial' },
    { name: 'AirPods Pro', description: 'Auriculares con cancelación de ruido activa' },
    { name: 'Consola PlayStation 5', description: 'Consola de videojuegos de nueva generación' },
    { name: 'Laptop HP Pavilion', description: 'Laptop Intel Core i7, 16GB RAM, SSD 512GB' },
    { name: 'Tablet iPad Air', description: 'Tablet con chip M1 y pantalla Liquid Retina' },
    { name: 'Smartwatch Galaxy Watch 6', description: 'Reloj inteligente con monitor de salud' },
    { name: 'Auriculares Sony WH-1000XM5', description: 'Auriculares premium con cancelación de ruido' },
    { name: 'Cámara Canon EOS R6', description: 'Cámara mirrorless profesional 20MP' },
    
    // Deportes
    { name: 'Zapatillas Running Nike', description: 'Zapatillas deportivas con tecnología Air Max' },
    { name: 'Camiseta Deportiva Adidas', description: 'Camiseta técnica transpirable Climalite' },
    { name: 'Balón de Fútbol', description: 'Balón profesional oficial FIFA' },
    { name: 'Mochila Deportiva Puma', description: 'Mochila resistente con múltiples compartimentos' },
    { name: 'Raqueta de Tenis Wilson', description: 'Raqueta profesional para competición' },
    { name: 'Bicicleta Mountain Bike', description: 'Bicicleta todo terreno 21 velocidades' },
    { name: 'Colchoneta de Yoga', description: 'Colchoneta antideslizante premium' },
    
    // Hogar
    { name: 'Lámpara LED Inteligente', description: 'Lámpara RGB controlable por app' },
    { name: 'Aspiradora Robot Xiaomi', description: 'Aspiradora inteligente con mapeo láser' },
    { name: 'Cafetera Nespresso', description: 'Cafetera de cápsulas automática' },
    { name: 'Licuadora Oster', description: 'Licuadora 600W con jarra de vidrio' },
    { name: 'Microondas LG', description: 'Microondas 25L con grill' },
    { name: 'Ventilador de Torre', description: 'Ventilador silencioso con control remoto' },
    
    // Ropa
    { name: 'Jean Levi\'s 501', description: 'Jean clásico corte recto' },
    { name: 'Polera Nike Dri-FIT', description: 'Polera deportiva de secado rápido' },
    { name: 'Chaqueta North Face', description: 'Chaqueta impermeable para trekking' },
    { name: 'Zapatillas Converse', description: 'Zapatillas casuales estilo clásico' },
    
    // Juguetes
    { name: 'LEGO Star Wars', description: 'Set de construcción Millennium Falcon' },
    { name: 'Muñeca Barbie', description: 'Muñeca coleccionable edición especial' },
    { name: 'Hot Wheels Pack 5', description: 'Pack de autos coleccionables' },
    
    // Libros
    { name: 'Libro "Cien Años de Soledad"', description: 'Novela clásica de García Márquez' },
    { name: 'Libro "1984"', description: 'Novela distópica de George Orwell' },
    
    // Alimentos
    { name: 'Café Premium Starbucks', description: 'Café molido origen colombiano 250g' },
    { name: 'Chocolate Lindt', description: 'Chocolate suizo 70% cacao' },
    
    // Accesorios
    { name: 'Reloj Casio G-Shock', description: 'Reloj resistente deportivo' },
    { name: 'Mochila Samsonite', description: 'Mochila para laptop con USB' },
    { name: 'Gafas de Sol Ray-Ban', description: 'Lentes polarizados UV400' },
  ]

  // Mapeo de productos a categorías (algunos tienen múltiples)
  const productoCategorias = [
    [0, 1], // Galaxy - Electrónica, Accesorios
    [0, 1], // iPhone - Electrónica, Accesorios
    [0], // TV
    [0, 1], // AirPods
    [0, 4], // PlayStation - Electrónica, Juguetes
    [0], // Laptop
    [0], // iPad
    [0, 1], // Smartwatch
    [0], // Auriculares Sony
    [0], // Cámara
    [3, 1], // Zapatillas Running - Deportes, Ropa
    [3, 1], // Camiseta - Deportes, Ropa
    [3, 4], // Balón - Deportes, Juguetes
    [3, 1], // Mochila deportiva
    [3], // Raqueta
    [3], // Bicicleta
    [3], // Colchoneta
    [2, 0], // Lámpara - Hogar, Electrónica
    [2, 0], // Aspiradora
    [2], // Cafetera
    [2], // Licuadora
    [2, 0], // Microondas
    [2], // Ventilador
    [1], // Jean
    [1, 3], // Polera - Ropa, Deportes
    [1, 3], // Chaqueta
    [1], // Converse
    [4], // LEGO
    [4], // Barbie
    [4], // Hot Wheels
    [5], // Libro 1
    [5], // Libro 2
    [6], // Café
    [6], // Chocolate
    [7, 1], // Reloj
    [7], // Mochila
    [7, 1], // Gafas
  ]

  // Mapeo de productos a fabricantes
  const productoFabricantes = [
    [0], // Samsung
    [1], // Apple
    [5], // LG
    [1], // Apple
    [4], // Sony
    [9], // HP
    [1], // Apple
    [0], // Samsung
    [4], // Sony
    [4], // Sony (Canon se usa Sony)
    [2], // Nike
    [3], // Adidas
    [2, 3], // Balón - Nike, Adidas
    [7], // Puma
    [2], // Nike (Wilson se usa Nike)
    [0, 6], // Bici - Samsung, Xiaomi
    [3], // Adidas
    [6], // Xiaomi
    [6], // Xiaomi
    [5], // LG (Nespresso se usa LG)
    [5], // LG (Oster se usa LG)
    [5], // LG
    [6], // Xiaomi
    [2], // Nike (Levi's se usa Nike)
    [2], // Nike
    [2], // Nike (North Face se usa Nike)
    [2], // Nike (Converse se usa Nike)
    [4], // Sony (LEGO se usa Sony)
    [4], // Sony
    [4], // Sony
    [4], // Sony (Libros se usa Sony)
    [4], // Sony
    [5], // LG (Starbucks se usa LG)
    [5], // LG
    [0], // Samsung (Casio se usa Samsung)
    [9], // HP (Samsonite se usa HP)
    [1], // Apple (Ray-Ban se usa Apple)
  ]

  for (let i = 0; i < productos.length; i++) {
    const producto = await prisma.producto.create({
      data: productos[i],
    })

    // Asignar categorías (puede tener múltiples)
    for (const catIndex of productoCategorias[i]) {
      await prisma.categoriaproducto.create({
        data: {
          id_producto: producto.id,
          id_categoria: categorias[catIndex].name,
        },
      })
    }

    // Asignar fabricantes (puede tener múltiples)
    for (const fabIndex of productoFabricantes[i]) {
      await prisma.productofabricante.create({
        data: {
          id_producto: producto.id,
          id_fabricante: fabricantes[fabIndex].id,
        },
      })
    }

    // Asignar a usuarios (distribuir aleatoriamente)
    const numUsuarios = Math.floor(Math.random() * 2) + 1 // 1 o 2 usuarios
    const usuariosAsignados = new Set<number>()
    
    for (let j = 0; j < numUsuarios; j++) {
      let usuarioIndex
      do {
        usuarioIndex = Math.floor(Math.random() * usuarios.length)
      } while (usuariosAsignados.has(usuarioIndex))
      
      usuariosAsignados.add(usuarioIndex)
      
      await prisma.usuarioproducto.create({
        data: {
          id_producto: producto.id,
          id_usuario: usuarios[usuarioIndex].id,
        },
      })
    }
    
    console.log(`  ✓ Producto ${i + 1}/${productos.length}: ${producto.name}`)
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