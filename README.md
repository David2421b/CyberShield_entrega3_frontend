# CyberShield Academy

Frontend de la Entrega 3 de CyberShield Academy, migrado a Next.js App Router, TypeScript y Tailwind CSS. Conserva el contenido y la identidad visual del sitio original, y obtiene los cursos desde la API.

## Requisitos y configuración

- Node.js 20 o posterior
- API de CyberShield disponible (por defecto `http://localhost:4000`)

1. Instala dependencias con `npm install`.
2. Copia `.env.example` a `.env.local` y configura `NEXT_PUBLIC_API_HOST`.
3. Inicia el entorno local con `npm run dev`.

## Catálogo

La portada carga el catálogo desde `GET /api/cursos`. Los filtros y la paginación se consultan en la API; la página actual se guarda en `?page=2` y se pueden compartir enlaces con categoría seleccionada.

La estructura de código está organizada por features en `src/features/`. El cliente HTTP centralizado se encuentra en `src/features/common/http.ts` y toma el token de `localStorage` cuando existe.

## Sesión y rutas

El login y el registro consumen la API, conservan la sesión al refrescar y muestran errores junto a los campos. Las rutas `/mis-inscripciones` y `/admin` comprueban la sesión y el rol para redirigir por experiencia de usuario; el backend también protege las operaciones.

El token se guarda en `localStorage`, lo que facilita su uso desde el cliente HTTP y conserva la sesión tras recargar. Esto implica riesgo ante una vulnerabilidad XSS, porque JavaScript podría leerlo; por eso se debe mantener el sitio libre de inyección de scripts y considerar una cookie `HttpOnly` para una evolución posterior.
