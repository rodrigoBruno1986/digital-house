interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface TableUserProps {
  usuarios: Usuario[];
}

export const TableUser = ({ usuarios }: TableUserProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fecha Registro</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {usuarios && usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{usuario.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{usuario.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    usuario.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {usuario.role === 'admin' ? 'Admin' : 'Usuario'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(usuario.created_at).toLocaleDateString('es-ES')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-600">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
