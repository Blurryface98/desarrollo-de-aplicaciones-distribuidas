import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endpoint= 'http://192.168.217.106:8000/api/product';

function CreateProduct() {

    const [description,setDescription]=useState('');
    const [price,setPrice]=useState(0);
    const [stock,setStock]=useState(0);

    const navigate=useNavigate();

    const store = (e) => {
        e.preventDefault();
        axios.post(endpoint,{description:description, price:price,stock:stock})
        navigate('/')
    }
  return (
    <div>
        <h1>CreateProduct</h1>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Descripcion</label>
                <input 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Precio</label>
                <input 
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Stock</label>
                <input 
                    value={stock}
                    onChange={(e)=> setStock(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>

            <button type='submit' className='btn btn-primary'>Store</button>

        </form>

    </div>
  )
}

export default CreateProduct 


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/product';

function CreateProduct() {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Ejecutando useEffect');
        fetchCsrfToken();
    },[]);

    const store = async (e) => {
        e.preventDefault();
    
        try {
            const data = {
                description: description,
                price: price,
                stock: stock
            };

            console.log('Datos enviados:', data); // Añade esta línea
            const config = {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json'
                }
            };

            console.log('Datos enviados:', config);
    
            const response = await axios.post(endpoint, JSON.stringify(data), config);
    
            navigate('/');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };
    
    

    const fetchCsrfToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/csrf-token'); // Cambia la URL según sea necesario
            //console.log(data.csrfToken);
            console.log('Token CSRF obtenido:', data.csrfToken);
            setCsrfToken(data.csrfToken);
        } catch (error) {
            console.error('Error al obtener el token CSRF:', error);
        }
    };
    

    return (
        <div>
            <h1>CreateProduct</h1>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Descripcion</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Stock</label>
                    <input
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type='number'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Store</button>
            </form>
        </div>
    );
}

export default CreateProduct;
*/