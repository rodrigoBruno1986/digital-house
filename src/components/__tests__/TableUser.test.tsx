import { render, screen } from '@testing-library/react';
import { TableUser } from '../TableUser';

const mockUsuarios = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@test.com',
        role: 'admin',
        created_at: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'María García',
        email: 'maria@test.com',
        role: 'user',
        created_at: '2024-01-16T10:00:00Z'
    }
];

describe('TableUser', () => {
    it('should render table with users', () => {
        render(<TableUser usuarios={mockUsuarios} />);

        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('María García')).toBeInTheDocument();
        expect(screen.getByText('juan@test.com')).toBeInTheDocument();
        expect(screen.getByText('maria@test.com')).toBeInTheDocument();
    });

    it('should show "No hay usuarios" when empty array', () => {
        render(<TableUser usuarios={[]} />);

        expect(screen.getByText('No hay usuarios registrados')).toBeInTheDocument();
    });
});
