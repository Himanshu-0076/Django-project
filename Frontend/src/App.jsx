import React from 'react'
import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.log(error));
  },[]);
  return (
    <div className='w-full h-screen bg-gray-800' >
      <h1 className='text-3xl font-bold text-white'>Products list</h1>
      <div className='mx-auto p-4'>
            {products.map(product => (
                    <div key={product.id} className='text-white bg-black p-4 rounded shadow mb-4'>
                    <h2 className='font-bold '>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                  </div>
                  
            ))}
      </div>
    </div>
  )
}

export default App;
