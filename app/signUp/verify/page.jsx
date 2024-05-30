"use client"
import React from 'react';
import { Image } from "@nextui-org/react";
import { useSearchParams, useRouter } from 'next/navigation';

function ComponentName() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    if (!name || !email) {
        router.push('/');
    }
    return (
        <div className='flex  flex-col justify-center items-center'>
            <div className='w-full flex flex-col justify-center items-center bg-violet-black   py-10 px-3 rounded '>
                <div className='flex flex-col justify-center p-10 text-center text-3xl font-bold text-slate-700 text-shadow rounded'>
                    <div className='flex flex-col md:flex-row justify-center items-center p-10 text-center text-3xl font-bold text-slate-700 text-shadow rounded'>
                        <Image
                            isBlurred
                            width={240}
                            src="/verifylogo.jpg"
                            alt="Verify Logo"
                            className="mb-2 md:mr-4"
                        />
                    </div>
                    <h1 className='text-slate-300'>Bienvenido a Nuestra Comunidad!</h1>
                </div>
                <div className='flex flex-col justify-center items-center p-10 text-center text-white text-shadow border-1 sm:px-20 border-purple-500 rounded mb-4'>
                    <p className='mb-8 w-96'>
                        Estimado  <span className='text-violet-500'>{name}</span>, antes de continuar con el proceso de autenticación, por favor confirme su correo electrónico <span className='text-violet-500'>{email}</span> para continuar con el inicio de sesión.
                    </p>
                    <div className='flex justify-center items-center align-center p-3 px-10 text-center bg-violet-500   rounded hover:bg-violet-600 transition-transform duration-300 transform-gpu hover:scale-105 cursor-pointer'>
                        <a className='text-white' href="/login">Iniciar Sesión</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentName;