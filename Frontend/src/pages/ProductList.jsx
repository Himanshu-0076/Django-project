import { useEffect,useState } from "react";
import ProductCard from "../components/ProductCards.jsx";


function ProductList(){
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(()=> {
        fetch(`${baseUrl}/api/products`)
            .then((response) => {
                if( !response.ok ){
                    throw new Error("Failed to fetch Product");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    },[]);

    if(loading) { 
        return <div className="text-center ">loading ...</div>
    }
    // if (error){
    //     return <div className="text-center">Error:{error}</div>
    // }

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center py-6 bg-gray-800 text-white shadow-lg">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product}/> 
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No Product available.</p>
                    ) }
            </div>
        </div>
    )
}


export default ProductList;