# AppTaskPop

Aplicación de gestión de tareas desarrollada con Next.js, React y TypeScript. Permite organizar tareas y explorar diferentes funcionalidades de Next.js, utilizando Prisma ORM para gestionar los datos almacenados en una base de datos PostgreSQL.

## Arquitectura y Enfoques de Desarrollo

Este proyecto incluye dos implementaciones diferentes para trabajar con los datos, con el objetivo de explorar y comparar distintas formas de comunicación entre el cliente y el servidor.

Puedes consultar ambas versiones cambiando de rama en este repositorio:

- **Rama `main` (Actual):** Utiliza **Server Components** para realizar consultas desde el servidor y **Server Actions** para ejecutar operaciones de creación, actualización y eliminación, interactuando directamente con Prisma y PostgreSQL.

- **Rama `legacy-api-rest`:** Implementación utilizando **Route Handlers** de Next.js para crear endpoints REST (`/api/todos`), que se consumen desde el cliente mediante peticiones HTTP (`fetch`). Incluye las operaciones CRUD (crear, consultar, actualizar y eliminar).

---

## Development

Pasos para ejecutar el proyecto en desarrollo.

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar la base de datos

```bash
docker compose up -d
```

### 3. Configurar las variables de entorno

- Copiar `.env.template` y crear un archivo `.env`.
- Completar las variables de entorno necesarias.

### 4. Ejecutar las migraciones

```bash
npx prisma migrate dev
```

Esto crea y aplica las migraciones necesarias para sincronizar la estructura de la base de datos.

### 5. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 6. Iniciar la aplicación

```bash
npm run dev
```

Abrir `http://localhost:3000`.

### 7. Generar datos iniciales (SEED)

Con el proyecto en ejecución, acceder a:

`http://localhost:3000/api/seed`

## Prisma

Comandos principales:

```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

- `migrate dev`: crea y aplica migraciones en desarrollo.
- `generate`: genera el cliente de Prisma.
- `studio`: abre la interfaz visual para consultar y gestionar los datos.

## Technologies

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- Yup

# Prod

# Stage
