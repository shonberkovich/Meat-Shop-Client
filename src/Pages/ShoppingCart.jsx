import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import axios from "axios";

function ShoppingCart() {
    const { selectedProducts, setSelectedProducts } = useContext(ShoppingCartContext);


    const handleRemoveFromCart = async (productName) => {
        const cookies = new Cookies();
        const userId = cookies.get("userId");

        try {
            console.log(productName+"12454");
            const response = await axios.post(`http://localhost:8080/shop/remove-Product-From-User/${userId}/${productName}`);
            const updatedProducts = selectedProducts.filter(product => product.name !== productName);
            setSelectedProducts(updatedProducts);
            console.log(response.data);
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };


    const totalShoppingCartPrice = () => {
        return selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {selectedProducts.map(product => (
                    <div key={product.name} className="col-md-3 mb-4">
                        <div className="card h-100 shadow-lg border-0 rounded-lg"
                             style={{
                                 transition: 'transform 0.3s, box-shadow 0.3s',
                                 overflow: 'hidden',
                             }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.transform = "scale(1.03)";
                                 e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.transform = "scale(1)";
                                 e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
                             }}>
                            <img
                                src={product.productImgUrl}
                                className="card-img-top"
                                alt={product.name}
                                style={{
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '10px 10px 0 0',
                                }}
                            />
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-primary">{product.name}</h6>
                                <p className="card-text text-muted mb-1">
                                    Quantity: <span className="fw-bold text-dark">{product.quantity}</span>
                                </p>
                                <p className="card-text text-muted mb-2">
                                    Price: <span
                                    className="text-success fw-bold">{product.price * product.quantity} ₪</span>
                                </p>
                                <button
                                    className="btn btn-outline-danger btn-sm w-100 shadow-sm"
                                    style={{
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#ff6666'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                                    onClick={() => handleRemoveFromCart(product.name)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                {selectedProducts.length > 0 ? (
                    <div>
                        <h4 className="fw-bold text-primary">
                            Total Price: <span className="text-success">{totalShoppingCartPrice()} ₪</span>
                        </h4>
                        <button
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '12px 25px',
                                border: 'none',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                marginTop: '20px',
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                transition: 'background-color 0.3s, transform 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#218838';
                                e.target.style.transform = 'translateY(-3px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#28a745';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Purchase
                        </button>
                    </div>
                ) : (
                    <h4 className="text-muted">Shopping cart is empty</h4>
                )}
            </div>
        </div>
    );
}

export default ShoppingCart;
