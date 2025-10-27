import type { Meta, StoryObj } from '@storybook/react';

const Introduction = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Curso Inscripción - Storybook
      </h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📚 Sobre este proyecto
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Sistema completo de inscripción a cursos desarrollado con Next.js 14, 
            TypeScript, TailwindCSS, TanStack Query, Zustand y Supabase.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🎯 Funcionalidades principales:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• <strong>Usuarios:</strong> Registro, login, inscripción a cursos</li>
              <li>• <strong>Cursos:</strong> Visualización, inscripción, cancelación</li>
              <li>• <strong>Admin:</strong> Crear, editar, eliminar cursos</li>
              <li>• <strong>Estado:</strong> Persistencia de datos con Zustand</li>
              <li>• <strong>API:</strong> REST endpoints con Next.js API Routes</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🧩 Componentes disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">CourseCard</h3>
              <p className="text-sm text-gray-600">Tarjeta de curso con botones de inscripción/cancelación</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">Header</h3>
              <p className="text-sm text-gray-600">Navegación con login/logout y dropdown de usuario</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">LoginModal</h3>
              <p className="text-sm text-gray-600">Modal con tabs para login y registro</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">InscriptionForm</h3>
              <p className="text-sm text-gray-600">Formulario de inscripción con validación</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">NoContentState</h3>
              <p className="text-sm text-gray-600">Estado vacío reutilizable para páginas sin contenido</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">Hero</h3>
              <p className="text-sm text-gray-600">Página de bienvenida con descripción del sistema</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🛠️ Tecnologías utilizadas
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js 14', 'TypeScript', 'TailwindCSS', 'TanStack Query', 'Zustand', 'Supabase', 'React Hook Form', 'Zod'].map((tech) => (
              <span key={tech} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">🗄️ Base de datos:</h3>
            <p className="text-green-800 text-sm">
              <strong>Supabase</strong> como Backend-as-a-Service (BaaS) que proporciona:
            </p>
            <ul className="text-green-800 text-sm mt-2 space-y-1">
              <li>• <strong>Autenticación:</strong> Login/registro de usuarios</li>
              <li>• <strong>Base de datos PostgreSQL:</strong> Almacenamiento de cursos e inscripciones</li>
              <li>• <strong>Row Level Security (RLS):</strong> Seguridad a nivel de fila</li>
              <li>• <strong>API REST automática:</strong> Endpoints generados automáticamente</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔄 Flujo de la aplicación
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">👤 Usuario normal:</h3>
            <ol className="text-green-800 space-y-1 text-sm list-decimal list-inside">
              <li>Se registra o inicia sesión</li>
              <li>Ve todos los cursos disponibles en <code>/cursos</code></li>
              <li>Se inscribe en cursos que le interesen</li>
              <li>Ve sus cursos suscritos en <code>/mis-cursos</code></li>
              <li>Puede cancelar inscripciones si lo desea</li>
            </ol>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-purple-900 mb-3">👨‍💼 Usuario admin:</h3>
            <ol className="text-purple-800 space-y-1 text-sm list-decimal list-inside">
              <li>Accede al panel de administración en <code>/admin</code></li>
              <li>Crea nuevos cursos con título, descripción, precio, etc.</li>
              <li>Edita cursos existentes</li>
              <li>Elimina cursos que ya no están disponibles</li>
              <li>Ve todos los cursos desde la vista admin</li>
            </ol>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 text-sm font-medium">
                🔑 <strong>Credenciales de admin:</strong><br/>
                Email: <code>admin@hotmail.com</code><br/>
                Contraseña: <code>admin123</code>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
