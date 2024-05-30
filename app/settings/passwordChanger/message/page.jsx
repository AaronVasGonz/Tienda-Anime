"use client"
import React from 'react';
import { Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function PasswordChangeMessage() {
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
                            height={240}
                            src="/verifylogo.jpg"
                            alt="Verify Logo"
                            className="mb-2 md:mr-4"
                        />
                    </div>
                    <h1 className='text-slate-300'>Confirmacion de cambio de contraseña</h1>
                </div>
                <div className='flex flex-col bg-neutral-950 rounded-lg p-10 text-center text-md'>
                    <p className='w-96'>
                        Estimado  <span className='text-main-purple'>{name}</span>, para poder continuar con el cambio de contraseña le hemos enviado un correo electrônico a la cuenta de <span className='text-main-purple'>{email}</span> para verificar su nueva contraseña y continuar con el proceso.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordChangeMessage;