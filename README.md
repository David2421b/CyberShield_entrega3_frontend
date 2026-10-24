# CyberShield Academy — Frontend

Frontend de la Entrega 3 de CyberShield Academy. Está construido con Next.js App Router, React, TypeScript y Tailwind CSS. Conserva la identidad visual del sitio original y consulta el catálogo y las inscripciones desde el backend.

## Enlaces de la entrega

- Sitio desplegado: **pendiente de publicar en Vercel**.
- API utilizada: **pendiente de desplegar**.
- Repositorio público del frontend: **pendiente de publicar**.
- Repositorio público del backend: **pendiente de publicar**.

Reemplaza estos estados por las URLs reales cuando termines la publicación.

## Funcionalidades

- Catálogo conectado a la API, con filtros por categoría y paginación guardados en la URL.
- Registro e inicio de sesión con persistencia de sesión al recargar.
- Formulario de inscripción y página para consultar las solicitudes propias.
- Panel administrativo para crear, editar y eliminar cursos, y consultar inscripciones.
- Rutas protegidas por sesión y rol, además de autorización equivalente en el backend.
- Diseño adaptable para dispositivos móviles y escritorio.

## Tecnologías

- Next.js 15 y React 19.
- TypeScript.
- Tailwind CSS.
- Cliente HTTP centralizado en `src/features/common/http.ts`.

## Requisitos y ejecución local

- Node.js 20 o posterior y npm.
- El backend de CyberShield en ejecución con una base de datos configurada.

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` como `.env.local` y configura la URL de la API.

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre `http://localhost:3000`.

### Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_API_HOST` | URL base pública del backend, sin barra final. En local: `http://localhost:4000`. |

El frontend necesita que el backend esté disponible en esa URL. Si aparece un error de conexión o CORS, revisa `NEXT_PUBLIC_API_HOST` y configura `FRONTEND_URL` en el backend con el origen exacto del frontend.

## Rutas principales

| Ruta | Acceso | Función |
| --- | --- | --- |
| `/` | Público | Portada, catálogo, filtros y formulario de inscripción. |
| `/login` | Público | Inicio de sesión. |
| `/registro` | Público | Creación de cuenta. |
| `/mis-inscripciones` | Usuario autenticado | Consulta de solicitudes propias. |
| `/admin` | Administrador | Gestión de cursos y consulta global de inscripciones. |

El frontend muestra las rutas según la sesión y el rol para orientar la navegación. El backend vuelve a comprobar los permisos en cada operación protegida.

## Organización del código

Las funcionalidades están agrupadas en `src/features/` por dominio (`auth`, `courses`, `enrollments` y `common`). Las páginas de Next.js están en `src/app/`. El cliente HTTP agrega el token de sesión a las peticiones autenticadas y gestiona respuestas `401`.

La sesión se conserva en `localStorage`. Esto facilita las llamadas desde el cliente, pero hace que el token sea accesible para JavaScript; una vulnerabilidad XSS podría exponerlo. Como mejora futura se puede migrar a cookies `HttpOnly` y reforzar las medidas contra XSS.

## Despliegue en Vercel

El despliegue todavía está pendiente. Cuando el backend esté publicado:

1. Importa el repositorio del frontend en Vercel.
2. Configura `NEXT_PUBLIC_API_HOST` con la URL pública de la API, sin barra final.
3. Despliega y comprueba que el catálogo cargue desde la API.
4. Configura `FRONTEND_URL` en el backend con el origen exacto asignado por Vercel para permitir CORS.
5. Reemplaza los estados de la sección “Enlaces de la entrega” por las URLs definitivas.

## Evidencias de entrega

Agrega las capturas que solicita la guía, incluida una petición autenticada en la pestaña Network del navegador. Antes de compartirla, oculta el valor del token y deja visible el encabezado `Authorization`.

## Explicación para la sustentación

Completa esta sección con tus propias palabras antes de entregar:

- ¿Cómo consume el catálogo los datos de la API y cómo conserva los filtros en la URL?
- ¿Cómo se controla el acceso a las páginas de usuario y administración?
- ¿Qué responsabilidad tiene el cliente HTTP centralizado?
- ¿Qué herramientas de IA utilizaste y qué partes revisaste o modificaste por tu cuenta?
