'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CourseForm } from '@/components/CourseForm';
import Link from 'next/link';

export default function AdminPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const user = session?.user;
    const isAuthenticated = status === 'authenticated';
    const isAdmin = user?.role === 'admin';
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push('/');
                return;
            }

            if (!isAdmin) {
                router.push('/');
                return;
            }

            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [isAuthenticated, isAdmin, user, router]);

    if (isLoading || !isAuthenticated || !isAdmin) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    const handleSuccess = () => {
        router.push('/cursos');
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Home
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900">Crear Curso</h1>
                    <p className="text-gray-600 mt-2">Completa los campos para crear un nuevo curso</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <CourseForm
                        mode="create"
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                        showHeader={false}
                    />
                </div>
            </div>
        </div>
    );
}
