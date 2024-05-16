import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const endpoint= 'http://192.168.217.106:8000/api';

const ShowProducts = () => {

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        console.log('Ejecutando useEffect');
        getAllProducts()
    },[]);

    
        const getAllProducts = async () => {
            const response = await axios.get(`${endpoint}/products`);
            console.log(response.data);
            setProducts(response.data); // Aquí deberías establecer tus productos en el estado
        }
        
    

    const deleteProduct= async(id)=>{
        await axios.delete(`${endpoint}/product/${id}`);
    }
  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>
        </div>
        
        <table className='table table-striped'>
            <thead className='bg-info text-white'>
                <tr>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map( (product)=>(
                    <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                        <button onClick={()=>deleteProduct(product.id)} className='btn btn-danger btn-lg mt-2 mb-2 text-white'>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowProducts