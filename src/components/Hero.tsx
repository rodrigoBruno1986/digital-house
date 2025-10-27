import Link from 'next/link';
import Image from 'next/image';

export const Hero = () => {
    return (
        <section className="relative bg-gray-900 min-h-[calc(100vh-4rem)] flex items-center py-8 lg:py-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-black opacity-75"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="text-left order-1 lg:order-1">

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Plataforma de
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                inscripción a cursos
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8">
                        Sistema de gestión de cursos con inscripciones, administración y panel de control.
                        </p>

                        <Link
                            href="/cursos"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                        >
                            Ver Cursos Disponibles
                        </Link>
                    </div>

                    <div className="relative order-2 lg:order-2">
                        <Image
                            src="/images/image_hero.jpg"
                            alt="Plataforma de cursos digitales"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
