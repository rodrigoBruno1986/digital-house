import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const NoContentState = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonHref 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  buttonText: string; 
  buttonHref: string; 
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <a
        href={buttonHref}
        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors cursor-pointer font-medium"
      >
        {buttonText}
      </a>
    </div>
  );
};

const meta: Meta<typeof NoContentState> = {
  title: 'Components/NoContentState',
  component: NoContentState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente reutilizable para mostrar estados vacíos con icono, título, descripción y botón de acción.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      table: {
        disable: true,
      },
    },
    buttonHref: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoCursos: Story = {
  args: {
    icon: (
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'No hay cursos disponibles',
    description: 'Pronto agregaremos nuevos cursos para ti',
    buttonText: 'Volver al inicio',
    buttonHref: '/'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado vacío para cuando no hay cursos disponibles.'
      }
    }
  }
};

export const NoInscripciones: Story = {
  args: {
    icon: (
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'No tienes cursos inscritos',
    description: 'Explora nuestros cursos disponibles y comienza tu aprendizaje',
    buttonText: 'Ver todos los cursos',
    buttonHref: '/cursos'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado vacío para cuando el usuario no tiene inscripciones.'
      }
    }
  }
};

export const NetworkError: Story = {
  args: {
    icon: (
      <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    title: 'Error de conexión',
    description: 'No pudimos conectar con el servidor. Verifica tu conexión a internet.',
    buttonText: 'Reintentar',
    buttonHref: '/'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado de error cuando hay problemas de conexión de red.'
      }
    }
  }
};



