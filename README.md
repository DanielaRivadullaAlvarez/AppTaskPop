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

### 5. Generar datos iniciales (SEED)

Con el proyecto en ejecución, acceder a:

`http://localhost:3000/api/seed`

### 6. Iniciar la aplicación

```bash
npm run dev
```

Abrir `http://localhost:3000`.

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
