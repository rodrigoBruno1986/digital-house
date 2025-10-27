'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <a
            href="/admin"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </a>
          <h1 className="text-4xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-600 mt-2">Lista de usuarios registrados en la plataforma</p>
        </div>
        
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 text-red-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar usuarios</h3>
          <p className="text-gray-600 mb-4 max-w-md">
            No pudimos cargar la lista de usuarios. Por favor, intenta nuevamente.
          </p>
          
          <button
            onClick={reset}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}

