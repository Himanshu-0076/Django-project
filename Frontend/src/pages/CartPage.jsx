import { useCart } from "../context/CartContext";
import {Link} from "react-router-dom"

function CartPage(){
    const { cartItems,total, removeFromCart, updateQuantity} = useCart();
    const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log("cart item: ", cartItems)

    return (
        <div className="pt=20 min-h-screen bg-gray-200 p-8">
            <h1 className="text-center font-bold mb-6 text-3xl">Your Cart</h1>
            { cartItems.length === 0 ? (
                <p className="text-center text-gray-600">your Cart is empty</p>
            ) : (
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    { cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-4">
                            <div className="">
                                    {item.product_image && (
                                        <img src={`${baseUrl}${item.product_image}`} alt={item.product_name} className="w-20 h-20 object-cover rounded"/>
                                    )}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{item.product_name}</h2>
                                <p className="text-gray-600">Rs.{item.product_price}</p>
                            </div>

                            <div className="flex items-cneter gap-3">
                                <button 
                                    className="bg-gray-300 px-3 py-2 rounded"
                                    onClick={()=> updateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                    <span className="flex items-center">{item.quantity}</span>
                                <button 
                                    className="bg-gray-300 px-3 py-2 rounded"  
                                    onClick={()=> updateQuantity(item.id, item.quantity + 1)}  
                                >
                                    +
                                </button>

                                <button
                                    className="text-red-500"
                                    onClick={()=> removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Total:</h2>
                        <p classname="text-xl font-semibold">Rs. {total.toFixed(2)}</p>
                        <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Proceed to Checkout </Link>
                    </div>
                </div>
            )
            
            }
        </div>
    )

}

export default CartPage;