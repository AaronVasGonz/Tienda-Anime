import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
export default function CollectionAdmin() {
    return (
        <div className="flex flex-col  items-center justify-center bg-black">
            <div className='flex   self-end'>
             <h3 className='mr-3 mt-2'>Add Collection</h3>
            <div className=' bg-violet-500 px-10 py-3 rounded mb-2 hover:bg-violet-600 cursor-pointer'>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            </div>
            <div className=" ">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Id</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-violet-700 font-normal leading-none opacity-70">Collection Name</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Image</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Description</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-violet-700 font-normal leading-none opacity-70">Status</p>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Action</p>
                            </th>

                        </tr>
                    </thead>
                    <tbody className='mt-4'>

                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p>1</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">One Piece</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                            <img src="https://dibujando.net/files/fs/p/i/2019/363/66629838_187512615579800_6646398972856698775_n_416643.jpg" className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae dignissim ex. Curabitur blandit a dui vel condimentum. Nunc vestibulum non dolor quis pretium. Aenean neque risus, vehicula in quam ultrices, pellentesque sodales diam. Vestibulum libero mauris, faucibus et eros in, interdum rhoncus sapien. Vestibulum sed metus ornare, malesuada augue at, imperdiet nibh. Aliquam scelerisque metus imperdiet tortor viverra, sit amet ultrices neque fermentum. Suspendisse condimentum egestas lectus id gravida. Phasellus varius nulla et tristique imperdiet. Integer ut consequat felis. Praesent eu odio ac nibh suscipit venenatis ut ac eros. Sed in justo lacus. Maecenas eu cursus quam. Nullam dolor odio, sollicitudin eu tortor et, tincidunt rutrum mi. Ut a dapibus ipsum. Pellentesque ullamcorper posuere posuere.</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Active</p>
                            </td>
                           
                            <td className="p-4 border-b  border-blue-gray-50 text-2xl">
                                <div className='flex justify-between'>
                                    <div className='bg-red-500 px-3 py-1 mr-1 rounded hover:bg-red-700 cursor-pointer '> 
                                        <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                    </div>
                                    <div  className='bg-violet-500  px-3  rounded  py-1  hover:bg-violet-600 cursor-pointer'>
                                        <FontAwesomeIcon icon={faPen} className='text-white' />
                                    </div>


                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p>1</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">One Piece</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                            <img src="https://dibujando.net/files/fs/p/i/2019/363/66629838_187512615579800_6646398972856698775_n_416643.jpg" className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae dignissim ex. Curabitur blandit a dui vel condimentum. Nunc vestibulum non dolor quis pretium. Aenean neque risus, vehicula in quam ultrices, pellentesque sodales diam. Vestibulum libero mauris, faucibus et eros in, interdum rhoncus sapien. Vestibulum sed metus ornare, malesuada augue at, imperdiet nibh. Aliquam scelerisque metus imperdiet tortor viverra, sit amet ultrices neque fermentum. Suspendisse condimentum egestas lectus id gravida. Phasellus varius nulla et tristique imperdiet. Integer ut consequat felis. Praesent eu odio ac nibh suscipit venenatis ut ac eros. Sed in justo lacus. Maecenas eu cursus quam. Nullam dolor odio, sollicitudin eu tortor et, tincidunt rutrum mi. Ut a dapibus ipsum. Pellentesque ullamcorper posuere posuere.</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Active</p>
                            </td>
                           
                            <td className="p-4 border-b  border-blue-gray-50 text-2xl">
                                <div className='flex justify-between'>
                                    <div className='bg-red-500 px-3 py-1 mr-1 rounded hover:bg-red-700 cursor-pointer '> 
                                        <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                    </div>
                                    <div  className='bg-violet-500  px-3  rounded  py-1  hover:bg-violet-600 cursor-pointer'>
                                        <FontAwesomeIcon icon={faPen} className='text-white' />
                                    </div>


                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p>1</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">One Piece</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                            <img src="https://dibujando.net/files/fs/p/i/2019/363/66629838_187512615579800_6646398972856698775_n_416643.jpg" className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae dignissim ex. Curabitur blandit a dui vel condimentum. Nunc vestibulum non dolor quis pretium. Aenean neque risus, vehicula in quam ultrices, pellentesque sodales diam. Vestibulum libero mauris, faucibus et eros in, interdum rhoncus sapien. Vestibulum sed metus ornare, malesuada augue at, imperdiet nibh. Aliquam scelerisque metus imperdiet tortor viverra, sit amet ultrices neque fermentum. Suspendisse condimentum egestas lectus id gravida. Phasellus varius nulla et tristique imperdiet. Integer ut consequat felis. Praesent eu odio ac nibh suscipit venenatis ut ac eros. Sed in justo lacus. Maecenas eu cursus quam. Nullam dolor odio, sollicitudin eu tortor et, tincidunt rutrum mi. Ut a dapibus ipsum. Pellentesque ullamcorper posuere posuere.</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Active</p>
                            </td>
                           
                            <td className="p-4 border-b  border-blue-gray-50 text-2xl">
                                <div className='flex justify-between'>
                                    <div className='bg-red-500 px-3 py-1 mr-1 rounded hover:bg-red-700 cursor-pointer '> 
                                        <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                    </div>
                                    <div  className='bg-violet-500  px-3  rounded  py-1  hover:bg-violet-600 cursor-pointer'>
                                        <FontAwesomeIcon icon={faPen} className='text-white' />
                                    </div>


                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p>1</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">One Piece</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                            <img src="https://dibujando.net/files/fs/p/i/2019/363/66629838_187512615579800_6646398972856698775_n_416643.jpg" className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae dignissim ex. Curabitur blandit a dui vel condimentum. Nunc vestibulum non dolor quis pretium. Aenean neque risus, vehicula in quam ultrices, pellentesque sodales diam. Vestibulum libero mauris, faucibus et eros in, interdum rhoncus sapien. Vestibulum sed metus ornare, malesuada augue at, imperdiet nibh. Aliquam scelerisque metus imperdiet tortor viverra, sit amet ultrices neque fermentum. Suspendisse condimentum egestas lectus id gravida. Phasellus varius nulla et tristique imperdiet. Integer ut consequat felis. Praesent eu odio ac nibh suscipit venenatis ut ac eros. Sed in justo lacus. Maecenas eu cursus quam. Nullam dolor odio, sollicitudin eu tortor et, tincidunt rutrum mi. Ut a dapibus ipsum. Pellentesque ullamcorper posuere posuere.</p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Active</p>
                            </td>
                           
                            <td className="p-4 border-b  border-blue-gray-50 text-2xl">
                                <div className='flex justify-between'>
                                    <div className='bg-red-500 px-3 py-1 mr-1 rounded hover:bg-red-700 cursor-pointer '> 
                                        <FontAwesomeIcon className=' text-white-600 hover:tex-white=700 ' icon={faTrash} />
                                    </div>
                                    <div  className='bg-violet-500  px-3  rounded  py-1  hover:bg-violet-600 cursor-pointer'>
                                        <FontAwesomeIcon icon={faPen} className='text-white' />
                                    </div>


                                </div>
                            </td>

                        </tr>


                    </tbody>
                </table>

            </div>
        </div>
    );
};

