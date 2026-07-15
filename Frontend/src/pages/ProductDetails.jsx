import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function ProductDetails(){
    const {id} = useParams();
    const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {addToCart} = useCart();

    useEffect(()=> {
        fetch(`${baseUrl}/api/products/${id}/`)
            .then((response) => {
                console.log(response)
                if((! response.ok)){
                    throw new Error("Failed to fetch Product detail");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error)=> {
                setError(error.message);
                setLoading(false);
            })
    }, [id, baseUrl]);

    if(loading){
        return <div className="text-center text-3xl ">Loading....</div>
    }
    if(error){
        return <div className="text-2xl">{error}</div>
    }
    if(!product){
        <div className="text-center">No Product Found...</div>
    }

    const handleAddToCart = () => {
    if(!localStorage.getItem('access_token')){
      window.location.href = '/login';
      return;
    }
    addToCart(product.id);
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">

            <img
                src={`${product.image}`}
                alt={product.name}
                className="w-full md:w-96 h-auto object-cover rounded-xl flex-shrink-0"
            />

            <div className="flex flex-col justify-center flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {product.name}
                </h1>

                <p className="text-gray-500 text-lg mb-4">
                    {product.description}
                </p>

                <p className="text-4xl font-bold text-green-600 mb-6">
                    ₹{product.price}
                </p>

                <button onClick={handleAddToCart} className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 mb-3">
                    Add to Cart 🛒
                </button>

                <div>
                    <a 
                       href="/"
                       className="text-blue-600 hover:underline" 
                    >
                        &larr; Back to Home
                    </a>
                </div>
            </div>

        </div>
    </div>
</div>
    )
}

export default ProductDetails;