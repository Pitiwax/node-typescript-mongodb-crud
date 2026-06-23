# API de Autenticación y Gestión de Usuarios

Una aplicación backend desarrollada con Node.js, Express y TypeScript que implementa autenticación basada en JWT y gestión de usuarios, conectada a una base de datos MongoDB local.

## 📋 Índice

- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Endpoints API](#endpoints-api)
- [Semilla de Datos](#semilla-de-datos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## 📦 Requisitos previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **MongoDB** (instancia local en ejecución en el puerto 27017)
- **Git** (opcional, para clonar el repositorio)

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd 0.0.1
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## ⚙️ Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
MONGO_URI=mongodb://127.0.0.1:27017/sistema_auth
PORT=3000
```

> **Nota:** Si MongoDB está configurado en otra ubicación o puerto, ajusta `MONGO_URI` en consecuencia.

## ▶️ Ejecución de la Aplicación

Utiliza el script de desarrollo para ejecutar la aplicación en modo recarga automática:

```bash
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

## 📡 Endpoints API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión y obtener token JWT

### Usuarios
- `GET /api/users` - Obtener lista de usuarios (requiere autenticación)
- `GET /api/users/:id` - Obtener detalle de un usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 🌱 Semilla de Datos

Ejecuta el script de semillado para crear usuarios iniciales:

```bash
npm run seed
```

Este comando ejecuta `src/scripts/seedUsers.ts` y crea usuarios de ejemplo en la base de datos.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web para APIs
- **TypeScript** - Superset tipado de JavaScript
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gestión de variables de entorno
- **jsonwebtoken** - Implementación de JWT
- **bcrypt** - Hashing de contraseñas
- **ts-node-dev** - Ejecución de TypeScript con recarga automática

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Sigue estos pasos:

1. Fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y escribe pruebas
4. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

> **Nota:** Asegúrate de tener MongoDB instalado y en ejecución antes de iniciar la aplicación. Si deseas usar una instancia remota, modifica `MONGO_URI` en el archivo `.env`.