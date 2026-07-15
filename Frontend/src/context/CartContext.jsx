import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth";
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);


    const fetchCart = async()=> {
        try {
            const res = await authFetch(`${baseUrl}/api/cart/`);
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.log("Error fetching Cart:", error)
        }
    }

    useEffect(()=> {
        fetchCart();
    }, []);

    // Add product to cart

    const addToCart = async (productId) => {
        try{
            await authFetch(`${baseUrl}/api/cart/add/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({product_id: productId}),
            });

            fetchCart();
        }catch(error){
            console.log("Add to cart error ", error)
        }
    }

    const removeFromCart = async (itemId) => {
            try {
                await authFetch(`${baseUrl}/api/cart/remove/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({item_id: itemId})
                });
                fetchCart();
            } catch (error) {
                console.log("Remove error ", error)
            }
    }

    const updateQuantity = async (itemId, quantity)=> {
            if(quantity< 1){
                await removeFromCart(itemId)
                return;
            }
            try {
                await authFetch(`${baseUrl}/api/cart/update/`, {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({item_id: itemId, quantity}),
                });
                fetchCart();
            } catch (error) {
                console.log("Update quantity error: ",error)
            }
    }

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);

    }

    return (
    <CartContext.Provider value={{cartItems, total,  addToCart, removeFromCart, updateQuantity, clearCart}}>
        {children}
    </CartContext.Provider>
)
};

export const useCart = ()=> useContext(CartContext);

