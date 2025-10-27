# 🎓 Sistema de Inscripción a Cursos

Una aplicación web moderna para la gestión de cursos e inscripciones.

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd curso-inscripcion
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Las credenciales de Supabase y NextAuth están disponibles en el email privado.

Crea un archivo `.env.local` con las variables necesarias.

### 4. Ejecutar la aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 👤 Usuario Administrador

Para acceder al panel de administración, utiliza las siguientes credenciales:

- **Nombre:** admin
- **Email:** admin@hotmail.com
- **Contraseña:** admin123

## 📚 Storybook

El proyecto incluye Storybook para visualizar los componentes:

```bash
npm run storybook
```

Abre [http://localhost:6006](http://localhost:6006) para ver los componentes. Son dos a modo de ejemplo 

## 🔧 Scripts disponibles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run start            # Servidor de producción
npm test                 # Tests
npm run storybook        # Storybook (puerto 6006)
npm run build-storybook  # Build de Storybook
```

## 🛠️ Tecnologías utilizadas

- **Next.js 16** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Supabase** - Base de datos
- **NextAuth.js** - Autenticación
- **React Query** - Gestión de estado
- **Zustand** - Estado global