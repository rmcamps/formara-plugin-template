# 🎨 Template de Plugin para Formara

Este es el **template base** para crear nuevos plugins de Formara.

## ⚠️ Importante

Este directorio **NO es un plugin** ejecutable. Es un template que se copia al crear plugins nuevos.

## 📁 Estructura

```
template/
├── manifest.json             # Metadata del plugin
├── README.md                 # Documentación
├── .env.example              # Variables de entorno
├── .cursorignore             # Evitar errores en IDE
├── ecosystem.config.js       # Config PM2
├── docker-compose.yml        # Config Docker
├── frontend/                 # UI del plugin
│   ├── dev.tsx              # Sandbox visual
│   ├── dev.html             # HTML del sandbox
│   ├── package.json         # Dependencias frontend
│   └── vite.config.ts       # Config Vite
├── backend/                 # API del plugin
│   ├── dev-server.ts        # Express standalone
│   ├── routes.ts            # Rutas HTTP
│   ├── package.json         # Dependencias backend
│   ├── .env.example         # Variables backend
│   ├── tsconfig.json        # Config TypeScript
│   └── services/
│       └── prisma.local.ts  # Prisma client local
├── prisma/                  # Database
│   ├── schema.prisma        # Schema completo
│   └── seed.ts              # Datos de prueba
├── core/                    # Archivos compartidos
│   └── types/               # Contratos TypeScript
│       ├── plugin-contracts.ts        # Frontend
│       └── plugin-backend-contracts.ts # Backend
├── docprocessor/            # Procesamiento de docs (opcional)
│   └── normalize.py
└── scripts/
    └── setup-core.sh        # Setup automático
```

## 🚀 Cómo Usar

### Crear Nuevo Plugin

```bash
cd formara
./scripts/create-plugin.sh mi-plugin 5189 4008 5440

# Genera plugins/mi-plugin/ con toda esta estructura
```

### Copiar Manualmente

```bash
cp -r plugins/template plugins/mi-plugin

# Personalizar:
# - manifest.json (nombre, description)
# - Puertos en vite.config.ts, .env, docker-compose.yml
# - backend/routes.ts (implementar rutas)
# - prisma/schema.prisma (agregar modelos)
```

## 🎯 Archivos con Placeholders

Estos archivos tienen placeholders que se reemplazan al crear un plugin:

- `manifest.json` → `PLUGIN_NAME`
- `ecosystem.config.js` → `PLUGIN_NAME`, `BACKEND_PORT`, `FRONTEND_PORT`
- `docker-compose.yml` → `PLUGIN_NAME`, `DB_PORT`
- `dev.html` → `{{PLUGIN_NAME}}`
- `backend/dev-server.ts` → `PLUGIN_NAME`
- `backend/package.json` → `PLUGIN_NAME`
- `prisma/schema.prisma` → `PLUGIN_NAME`

## 📖 Documentación

Ver los siguientes archivos en la raíz del proyecto:

- `PLUGIN_DEVELOPER_GUIDE.md` - Guía completa
- `FINAL_PLUGIN_ARCHITECTURE.md` - Arquitectura
- `ARQUITECTURA_PLUGINS_RESUMEN_VISUAL.md` - Resumen visual
- `plugins/PORT_REGISTRY.md` - Puertos asignados

## ✨ Características del Template

### Frontend
- ✅ Sandbox visual (dev.tsx)
- ✅ Vite configurado
- ✅ React 19 + Tailwind 4
- ✅ shadcn/ui components

### Backend
- ✅ Express standalone
- ✅ Mock de autenticación
- ✅ Prisma local
- ✅ CORS configurado
- ✅ TypeScript

### Base de Datos
- ✅ Schema completo (core + plugin)
- ✅ Seed con datos de prueba
- ✅ Soporte SQLite y PostgreSQL

### DevOps
- ✅ PM2 config
- ✅ Docker Compose
- ✅ Dockerfiles de desarrollo
- ✅ Scripts de setup automático

---

**Template Versión:** 2.0.0  
**Última Actualización:** 16 de noviembre, 2025
