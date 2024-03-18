
import React from "react";
function Contact() {

    return (
        <form >
            <div className="w-full text-6xl font-bold mb-10">
                <h1 className="w-full">En qué podemos ayudarte?</h1>
                
            </div>
            <div className="w-full text-3xl font-bold mb-10">
            <h3 className="w-full">Dejanos tu mensaje!</h3>

            </div>
           
            <div className='mb-5'>
                <label
                    htmlFor='name'
                    className='mb-3 block text-base font-medium text-white'
                >
                    Nombre completo
                </label>
                <input
                    type='text'
                    placeholder='Full Name'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'

                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='email'
                    className='mb-3 block text-base font-medium text-white'
                >
                    Email Address
                </label>
                <input
                    type='email'
                    placeholder='Tu correo'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'

                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='message'
                    className='mb-3 block text-base font-medium text-white'
                >
                    Message
                </label>
                <textarea
                    rows={4}
                    placeholder='Tu mensaje'
                    className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'

                ></textarea>
            </div>
            <div>
                <button className='hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none'>
                    Contactar
                </button>
            </div>
        </form>
    );
};

export default Contact;