'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { LoginModal } from './LoginModal';
import { useInscriptionStore } from '@/stores/inscriptionStore';



export const Header = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session, status } = useSession();
    const user = session?.user;
    const isAuthenticated = status === 'authenticated';
    const isAdmin = user?.role === 'admin';
    const { resetAll } = useInscriptionStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isClickInsideDropdown = target.closest('[role="menu"]');
            const isClickOnButton = target.closest('button');

            if (!isClickInsideDropdown && !isClickOnButton) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 bg-black shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="shrink-0">
                            <Link href="/" className="flex items-center">
                                <h1 className="font-poppins text-2xl font-bold text-white">
                                    DIGITAL HOUSE APP
                                </h1>
                            </Link>
                        </div>

                        <div>
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition-colors cursor-pointer"
                                        aria-expanded={isDropdownOpen}
                                        aria-haspopup="true"
                                        aria-label="Menú de usuario"
                                    >
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-inter text-sm">
                                            {user?.name}
                                        </span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                                            role="menu"
                                            aria-label="Opciones de usuario"
                                        >
                                            {isAdmin ? (
                                                <>
                                                    <Link
                                                        href="/admin"
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        role="menuitem"
                                                        aria-label="Crear Curso"
                                                    >
                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                        </svg>
                                                        Crear Curso
                                                    </Link>
                                                    <Link
                                                        href="/admin/usuarios"
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        role="menuitem"
                                                        aria-label="Ver usuarios"
                                                    >
                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.744M9 21H9m6 0h6" />
                                                        </svg>
                                                        Usuarios
                                                    </Link>
                                                    <Link
                                                        href="/cursos"
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        Gestionar Cursos
                                                    </Link>
                                                    <hr className="my-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        href="/cursos"
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        Cursos
                                                    </Link>
                                                    <Link
                                                        href="/mis-cursos"
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        role="menuitem"
                                                        aria-label="Ver mis cursos inscritos"
                                                    >
                                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                        </svg>
                                                        Mis Cursos
                                                    </Link>
                                                    <hr className="my-1" />
                                                </>
                                            )}
                                            <button
                                                onClick={() => {
                                                    resetAll();
                                                    signOut({ callbackUrl: '/' });
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                                role="menuitem"
                                                aria-label="Cerrar sesión"
                                            >
                                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    className="font-inter text-white px-4 py-2 text-sm font-medium hover:bg-purple-500 transition-colors border border-white cursor-pointer rounded-md"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
        </>
    );
};