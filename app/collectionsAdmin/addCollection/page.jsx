"use client"
import React, { useEffect } from 'react';
import {AddCollectionForm} from '../../../components/addForm/addFormCol';
import {useAuthAdmin} from '../../../utils/authPage';

 function AddColeccion(){
    
    useAuthAdmin();
    return (

        <div>
            <AddCollectionForm/>    
        </div>
    );

}

export default  AddColeccion;