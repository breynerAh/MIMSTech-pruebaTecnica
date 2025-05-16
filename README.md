## Inicio del repositorio

Primero, instale las dependencias necesarias:

```bash
npm install
```

Segundo, ejecute el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura de archivos

Siguiendo la arquitectura basada en convenciones de Next.js App Router. La estructura principal es la siguiente:

Dentro de la carpeta app se organiza el enrutamiento a través de archivos y carpetas según las convenciones de Next.js, incluyendo layout.tsx y globals.css para definir la estructura global y estilos del proyecto.

Fuera de app, se encuentran:

components: componentes base generados con shadcn/ui.

componentsUI: componentes personalizados reutilizables creados específicamente para este proyecto.

lib: funciones auxiliares o utilidades compartida por shadcn.

redux: contiene la configuración del store y slices para manejar el estado global de la aplicación usando Redux Toolkit.
