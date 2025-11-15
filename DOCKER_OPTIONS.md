# Opciones de Docker para Desarrollo

Tu plugin puede usar dos enfoques para la base de datos en desarrollo:

## Opción A: Docker Propio (Standalone)

**Para plugins independientes que NO usan tablas del core**

### Setup

```bash
# 1. Levantar PostgreSQL
docker-compose up -d

# 2. Configurar .env
DATABASE_URL="postgresql://formara:dev123@localhost:5433/formara_plugin_dev"

# 3. Ejecutar migrations
npx prisma db push --schema backend/prisma/schema.prisma
# O ejecutar archivos .sql manualmente

# 4. Ejecutar sandbox
npm run dev
```

### Ventajas
- ✓ Totalmente independiente del core
- ✓ Datos de prueba limpios
- ✓ No necesitas Formara corriendo

### Desventajas
- ✗ Setup inicial más largo
- ✗ Solo para plugins sin dependencias del core

## Opción B: DB del Core (Recomendada)

**Para plugins que usan tablas del core o desarrollo rápido**

### Setup

```bash
# 1. Asegurar que Formara esté corriendo
# (El core ya tiene PostgreSQL)

# 2. Configurar .env
DATABASE_URL="postgresql://formara:password@localhost:5432/formara?schema=public"

# 3. Ejecutar sandbox
npm run dev
```

### Ventajas
- ✓ Setup en 2 minutos
- ✓ Todas las tablas del core disponibles
- ✓ Migrations ya aplicadas
- ✓ Datos reales del core

### Desventajas
- ✗ Necesitas el core corriendo
- ✗ Compartes datos con el core

## ¿Cuál Usar?

### Usa Opción A si:
- Tu plugin es totalmente independiente
- No usas tablas como `Workspace`, `User`, `Document`, etc.
- Quieres desarrollo aislado

### Usa Opción B si:
- Tu plugin usa tablas del core
- Quieres setup rápido
- Ya tienes Formara corriendo

## Ejemplo: docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: mi-plugin-db
    environment:
      POSTGRES_USER: formara
      POSTGRES_PASSWORD: dev123
      POSTGRES_DB: formara_plugin_dev
    ports:
      - "5433:5432"  # Puerto diferente del core (5432)
    volumes:
      - plugin_postgres_data:/var/lib/postgresql/data

volumes:
  plugin_postgres_data:
```

## En .env.example

Documenta ambas opciones:

```bash
# OPCIÓN A: Docker propio
# DATABASE_URL="postgresql://formara:dev123@localhost:5433/formara_plugin_dev"

# OPCIÓN B: DB del core (recomendada)
DATABASE_URL="postgresql://formara:password@localhost:5432/formara?schema=public"
```

