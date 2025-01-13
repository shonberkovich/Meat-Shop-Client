import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function ProductForm({ name,productImgUrl,type, price, quantity, changeCostAndCount }) {
    const { setSelectedProducts } = useContext(ShoppingCartContext);

    const saveChosenProduct = async (product) => {
        const cookies = new Cookies();

        const userId = cookies.get("userId");

        try {
            const response = await axios.post(`http://localhost:8080/shop/add-Product-To-User/${userId}`, product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Product added successfully:", response.data);
        } catch (error) {
            console.error("There was an error adding the product:", error);
        }
    }

    const handleAddToCart = async () => {
        setSelectedProducts(prev => {
            const productExists = prev.some(p => p.name === name);

            if (productExists) {


                return prev.map(p => {
                    if (p.name === name) {
                        const updatedProduct = {
                            ...p,
                            quantity,
                        };
                        if (updatedProduct.quantity !== p.quantity) {
                            saveChosenProduct(updatedProduct); // שליחה לשרת
                            Swal.fire({
                                title: "Product Updated!",
                                text: `${name} has been updated in your cart.`,
                                icon: "info",
                                timer: 2000,
                                showConfirmButton: false,
                            });

                        }
                        return updatedProduct;
                    }
                    return p;
                });
            } else {
                const newProduct = {
                    name,
                    productImgUrl,
                    price,
                    quantity,
                    type,
                };
                Swal.fire({
                    title: "Product Added!",
                    text: `${name} has been added to your cart.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                saveChosenProduct(newProduct);
                return [...prev, newProduct];
            }
        });

    };

    return (
        <td className="text-center" >
            <div className="card h-100 shadow-lg border-0 rounded-lg"
                 style={{
                     transition: 'transform 0.3s, box-shadow 0.3s',
                     width: '100%', // Ensure it takes up the full available width
                     margin: 'auto',
                 }}
                 onMouseEnter={(e) => {
                     e.currentTarget.style.transform = "scale(1.05)";
                     e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
                 }}
                 onMouseLeave={(e) => {
                     e.currentTarget.style.transform = "scale(1)";
                     e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
                 }}>
                <img
                    src={productImgUrl}
                    className="card-img-top img-thumbnail rounded-top"
                    alt={name}
                    style={{
                        height: '180px', // keep the image height consistent
                        objectFit: 'cover',
                        borderRadius: '10px 10px 0 0',
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title text-primary fw-bold" style={{width: '100%'}}>
                        <strong>{name}</strong>
                    </h5>
                    <p className="card-text text-muted mb-1">Price: <span
                        className="text-success fw-bold">{price} ₪</span></p>
                    <p className="card-text text-muted mb-3">Total Cost: <span
                        className="text-danger fw-bold">{price*quantity} ₪</span></p>
                    <div className="d-flex align-items-center justify-content-center mb-3">
                        <button className="btn btn-outline-danger btn-sm rounded-circle"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => changeCostAndCount(name, "-")}>-
                            <i className="bi bi-dash"></i>
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="mx-3 text-center form-control-sm bg-light fw-bold"
                            style={{
                                width: '45px',
                                fontSize: '14px',
                                border: '1px solid black',
                                borderRadius: '4px',
                            }}
                        />
                        <button className="btn btn-outline-success btn-sm rounded-circle"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => changeCostAndCount(name, "+")}>+
                            <i className="bi bi-plus"></i>
                        </button>
                    </div>
                    <button
                        className="btn btn-success w-100 fw-bold shadow-sm"
                        onClick={handleAddToCart}
                        disabled={quantity === 0}
                        style={{
                            transition: 'background-color 0.3s, transform 0.2s',
                            fontSize: '14px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#28a745cc";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#28a745";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </td>

    );
}

export default ProductForm;
