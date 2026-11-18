# TaskPop

Aplicación web de gestión de tareas desarrollada con **Next.js 16**, **React 19**, **TypeScript**, **Prisma ORM** y **PostgreSQL**. Permite organizar tareas diarias con actualizaciones optimistas en la interfaz y cuenta con una papelera de reciclaje (borrado lógico) para restaurar o eliminar tareas definitivamente.

🚀 **Demo en vivo:** [https://app-task-pop.vercel.app](https://app-task-pop.vercel.app)

## Funcionalidades principales

- **Dashboard resumen (Home):** Contadores en tiempo real de tareas totales y completadas junto con creación rápida de nuevas tareas.
- **Gestión de tareas (Mis tareas):** Creación con validación en cliente y servidor (Yup), marcado instantáneo mediante _Optimistic UI_ (`useOptimistic`) y envío en lote de tareas completadas a la papelera.
- **Papelera (Tareas anuladas):** Selección individual o múltiple para restablecer tareas a pendientes o eliminarlas definitivamente con confirmación previa.
- **Diseño responsive:** Interfaz adaptada a móvil, tablet y escritorio con menú lateral deslizable.

## Arquitectura y Enfoques de Desarrollo

Este repositorio incluye dos implementaciones para comparar distintas formas de comunicación entre cliente y servidor:

- **Rama `main` (Actual):** Utiliza **Server Components** con streaming (`Suspense`) para consultar datos desde el servidor y **Server Actions** para las mutaciones sobre PostgreSQL con Prisma.
- **Rama `legacy-api-rest`:** Implementación previa con **Route Handlers** (`/api/todos`) consumidos mediante `fetch`.

## Ejecución en Desarrollo (Local)

1.  **Instalar dependencias:**

    npm install

2.  **Levantar la base de datos PostgreSQL con Docker:**

    docker compose up -d

3.  **Configurar variables de entorno:**
    Copia `.env.template` a un nuevo archivo `.env` y ajusta `DATABASE_URL` si es necesario.

4.  **Aplicar migraciones y generar el cliente de Prisma:**

    ```bash
    npx prisma migrate dev --config prisma7.config.ts
    npx prisma generate --config prisma7.config.ts

    ```

5.  **Iniciar el servidor de desarrollo:**

        npm run dev

    Abre `http://localhost:3000` en tu navegador. _(Opcional: visita `http://localhost:3000/api/seed` en desarrollo para cargar tareas de ejemplo)._

## Despliegue en Producción (Vercel + PostgreSQL en la nube)

1. Crea una base de datos PostgreSQL externa (por ejemplo en **Neon** o **Supabase**).
2. Configura la variable de entorno `DATABASE_URL` en el panel de **Vercel** con la URL de conexión proporcionada por el proveedor.
3. Ejecuta las migraciones contra la base de datos de producción mediante:

   npx prisma migrate deploy

## Tecnologías utilizadas

- Next.js 16 (App Router) & React 19
- TypeScript
- Prisma ORM & PostgreSQL
- Tailwind CSS v4
- Yup
