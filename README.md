# DataMobile Dashboard

Aplicación web móvil para visualización de datos dinámicos con Next.js, Redux Toolkit y Prisma conectado a Supabase.

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase con base de datos PostgreSQL configurada

## 🚀 Instalación

### 1. Clonar el repositorio (o descargar)

```bash
git clone [url-del-repositorio]
cd taller-3-datamobile
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
# Conexión a Supabase (reemplaza con tus credenciales)
DATABASE_URL="postgresql://usuario:password@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://usuario:password@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
```

**Cómo obtener estas URLs:**
1. Ve a tu proyecto en Supabase
2. Settings → Database → Connection String
3. Copia la URI y reemplaza `[YOUR-PASSWORD]` con tu contraseña

### 4. Sincronizar el schema de Prisma

```bash
npx prisma generate
```

### 5. Poblar la base de datos

```bash
npm run seed
```

Esto creará:
- 5 categorías
- 5 fabricantes
- 3 usuarios
- 10 productos con relaciones

### 6. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
taller-3-datamobile/
├── app/
│   ├── api/
│   │   └── productos/          # API Routes (CRUD)
│   ├── dashboard/              # Dashboard principal
│   │   └── page.tsx
│   ├── productos/[id]/         # Vista detallada (por implementar)
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx           # Redux Provider
├── components/
│   ├── charts/                 # Componentes de gráficos
│   │   └── BarChart.tsx        # ✅ Implementado
│   └── filters/
│       └── FilterPanel.tsx     # Panel de filtros
├── lib/
│   └── prisma.ts               # Cliente Prisma
├── prisma/
│   ├── schema.prisma           # Schema de la BD
│   └── seed.ts                 # Script para poblar datos
├── store/
│   ├── store.ts                # Configuración Redux
│   └── slices/
│       ├── productsSlice.ts    # Estado de productos
│       └── filtersSlice.ts     # Estado de filtros
└── prisma.config.ts
```

## ✅ Funcionalidades Implementadas

- ✅ Next.js 14+ con App Router
- ✅ API CRUD completa (GET, POST, PUT, DELETE)
- ✅ Redux Toolkit para gestión de estado
- ✅ Conexión a Supabase con Prisma ORM
- ✅ Dashboard con filtros dinámicos
- ✅ Filtros persistentes (búsqueda, categoría, fabricante, ordenamiento)
- ✅ Métricas (KPIs)
- ✅ Tabla de productos con relaciones
- ✅ 1 gráfico de barras (Recharts)

## 🚧 Pendiente (Para el Equipo)

- [ ] `components/charts/LineChart.tsx` - Gráfico de líneas
- [ ] `components/charts/PieChart.tsx` - Gráfico circular
- [ ] `components/charts/AreaChart.tsx` - Gráfico de área
- [ ] `components/charts/RadarChart.tsx` - Gráfico de radar
- [ ] Integrar los 4 gráficos en `app/dashboard/page.tsx`
- [ ] Crear `app/productos/[id]/page.tsx`
- [ ] Mostrar información completa del producto
- [ ] Botones para editar/eliminar
- [ ] Diseño responsivo
- [ ] Formulario para crear productos
- [ ] Formulario para editar productos
- [ ] Botón de eliminar con confirmación
- [ ] Validación de formularios
- [ ] Optimizar dashboard para móviles
- [ ] Menú hamburguesa para filtros en móvil
- [ ] Cards responsivas
- [ ] Mejorar UX en tablets

## 🛠️ Tecnologías

- **Framework:** Next.js 16
- **Lenguaje:** TypeScript
- **Base de datos:** Supabase (PostgreSQL)
- **ORM:** Prisma 7
- **Estado:** Redux Toolkit
- **Gráficos:** Recharts, Chart.js
- **Estilos:** Tailwind CSS

## 📚 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción
npm run seed         # Puebla la base de datos
npx prisma studio    # Abre editor visual de la BD
npx prisma generate  # Regenera el cliente Prisma
```

## 🔧 Comandos Útiles de Prisma

```bash
# Ver datos en interfaz visual
npx prisma studio

# Sincronizar cambios del schema a la BD
npx prisma db push

# Traer schema desde Supabase
npx prisma db pull

# Regenerar cliente después de cambios
npx prisma generate
```

## 🐛 Solución de Problemas

### Error: Can't reach database server
- Verifica que las URLs en `.env` sean correctas
- Asegúrate de tener la contraseña correcta
- Verifica que tu IP esté permitida en Supabase

### Error: PrismaClient needs adapter
- Ejecuta `npm install @prisma/adapter-pg pg`
- Verifica que `lib/prisma.ts` tenga la configuración del adapter

### Gráficos no se muestran
- Asegúrate de que los datos estén cargando correctamente
- Revisa la consola del navegador para errores
- Verifica que Recharts esté instalado: `npm install recharts`

## 👥 Equipo

- **Líder Técnico:** [Tu nombre]
- **Desarrollador 1:** [Gráficos]
- **Desarrollador 2:** [Vista Detallada]
- **Desarrollador 3:** [CRUD Frontend]
- **Desarrollador 4:** [Diseño Mobile]

## 📄 Licencia

Proyecto académico - UCN
