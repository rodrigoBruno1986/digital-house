import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('Hero Component', () => {
    it('should render the title', () => {
        render(<Hero />);
        expect(screen.getByText('Plataforma de')).toBeInTheDocument();
        expect(screen.getByText('inscripción a cursos')).toBeInTheDocument();
    });

    it('should render the button', () => {
        render(<Hero />);
        expect(screen.getByText('Ver Cursos Disponibles')).toBeInTheDocument();
    });
});