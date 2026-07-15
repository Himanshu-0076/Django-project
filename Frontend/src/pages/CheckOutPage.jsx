import { useState} from "react";
import {useNavigate} from "react-router-dom";
import { useCart } from "../context/CartContext";


function CheckOutPage(request){
    const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const {clearCart } = useCart();

    const [form, setForm ] = useState({
        name: "",
        address : "",
        phone: "",
        payment_method: "COD`"
    })
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try{
            const res = await fetch(`${baseUrl}/api/orders/create/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if(res.ok ){
                setMessage("Order placed Successifully");
                fetch(`${baseUrl}/api/cart`)
                clearCart();
                setTimeout(()=> {
                    navigate("/")

                }, 2000);
            }
            else{
                setMessage(data.error || "failed to placed Order. Please try again.")
            }
        }
        catch(error){
            setMessage("An error occurred. Please try again.");
        }
    }


    return (
        <div className="min-h-screen bg-gray-500 flex justify-center items-center p-6">
            <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
                <h1 className="text-2xl font-bold mb-4">Check out </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    <textarea 
                        name="address"
                        placeholder="Full Adress"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />
                    
                    <input  
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                     <select 
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"    
                    >
                        <option value='COD'>Cash on Delivery</option>
                        <option value='CreditCard'>Online Payment</option>
                    </select>

                    <button 
                        type="Submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded"
                    >
                        {loading ? "Processing..." : "Order Placed"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CheckOutPage;