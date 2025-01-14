import React, {useContext, useEffect, useState} from 'react';
import ProductForm from "../Components/ProductForm";
import ShoppingCartIcon from "../Components/ShoppingCartIcon";
import axios from "axios";
import {ShoppingCartContext} from "../Context/ShoppingCartContext";
import Cookies from "universal-cookie";
import {v4, v4 as uuidv4} from 'uuid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Components/Sidebar";



function Shop() {
    const {selectedProducts,setSelectedProducts}=useContext(ShoppingCartContext);
    const [query,setQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState(""); // ערך ברירת מחדל
    const cookies = new Cookies();
    const [productsOnScreen,setProductsOnScreen] = useState([])
    const [products,setProducts] = useState([])

    const setProducts0 = async () => {


        const response = await axios.get(` http://localhost:8081/products/get-all-products`);
        setProductsOnScreen(response.data);
        setProducts(response.data);



    }


    useEffect(() => {
        const setCookieAndMakeUser = async () => {
            let userId = cookies.get('userId');
            if (!userId) {
                userId = v4();
                cookies.set('userId', userId, { path: '/', maxAge: 60 * 60 * 24 * 30 });
                const response = await axios.post(`http://localhost:8080/shop/add-user/${userId}`);
                console.log("User ID created and saved in cookie:", userId);
            } else {
                if(selectedProducts.length === 0) {
                    const response = await axios.get(`http://localhost:8080/shop/get-user-pruducts/${userId}`);
                    setSelectedProducts(response.data)
                }
                console.log("User ID found in cookie:", userId);
            }
        }
        setProducts0();
        setCookieAndMakeUser();
    }, []);



    const changeCostAndCount = (name, oper) => {
        setProductsOnScreen((prevProducts) =>
            prevProducts.map((product) => {
                if (product.name === name) {
                    const updatedProduct = { ...product };
                    switch (oper) {
                        case '-':
                            if(product.quantity>0){
                                updatedProduct.quantity--;
                            }
                            break;
                        case '+':
                            updatedProduct.quantity++;
                            break;
                        default:
                            return product;
                    }
                    return updatedProduct;
                }
                return product;
            })
        );
    };
    const onSearch = () => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProductsOnScreen(filteredProducts);
    }
    const handleChange = (event) => {
        const selectedValue = event.target.value; // שמירה על הערך שנבחר
        setSelectedOption(selectedValue); // עדכון ה-state
        onPriceFilter(selectedValue); // קריאה לפונקציה עם הערך החדש
    };
    const onPriceFilter=(type)=>{
        switch (type) {
            case "low to high":
                const filteredProducts1 = productsOnScreen.sort((a, b) => a.price - b.price);
                setProductsOnScreen(filteredProducts1);
                break;
            case "high to low":
                const filteredProducts2 = productsOnScreen.sort((a, b) => b.price - a.price);
                setProductsOnScreen(filteredProducts2);
                break;
        }
    }

    const onQueryChange=(e)=>{
        if(query.trim().length===1){
            setProductsOnScreen(products);
        }
        setQuery(e.target.value);
    }
    const onTypeSelect=(type)=>{
        if (type==="all"){
            setProductsOnScreen(products)
            return

        }

        const filteredProducts = products.filter(product =>
            product.type===type
        );
        setProductsOnScreen(filteredProducts);
    }
    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <div style={{flex: '1'}}>
                <div className="container mt-4" style={{backgroundColor: 'transparent'}}>
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="search for product ..."
                            value={query}
                            onChange={(e) => onQueryChange(e)}
                            style={{
                                width: '300px',
                                borderRadius: '30px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                        />
                        <button
                            onClick={onSearch}
                            disabled={query.trim() === ""}
                            className="btn btn-primary btn-lg ms-2"
                            style={{
                                borderRadius: '30px',
                                padding: '10px 20px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                        >
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                        <select
                                    id="select-menu"
                                    value={selectedOption}
                                    onChange={handleChange}
                                    className="form-select form-select-lg ms-2"
                                    style={{
                                        width: '180px',
                                        borderRadius: '30px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        padding: '10px 20px'

                                    }}
                                >
                                    <option value="" disabled>⇅</option>
                                    <option value="low to high">low to high</option>
                                    <option value="high to low">high to low</option>
                                </select>
                    </div>
                    <table
                        className="table text-center"
                        style={{
                            width: "80%",
                            margin: "0 auto",
                            tableLayout: "fixed",
                            borderCollapse: "collapse",
                            backgroundColor: 'transparent',
                        }}
                    >
                        <tbody>
                        {productsOnScreen.length === 0 ? (
                            <h1>no products found</h1>
                        ) : (
                            productsOnScreen
                                .reduce((rows, product, index) => {
                                    if (index % 3 === 0) rows.push([]);
                                    rows[rows.length - 1].push(product);
                                    return rows;
                                }, [])
                                .map((row, rowIndex) => (
                                    <tr key={rowIndex} style={{backgroundColor: 'transparent'}}>
                                        {row.map((product, index) => (
                                            <td key={index} className="text-center" style={{border: "none"}}>
                                                <ProductForm {...product} changeCostAndCount={changeCostAndCount}/>
                                            </td>
                                        ))}
                                        {row.length < 3 && (
                                            <td colSpan={3 - row.length} className="text-center"
                                                style={{border: "none"}}/>
                                        )}
                                    </tr>
                                ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Sidebar onTypeSelect={onTypeSelect} />
        </div>
    );


}

export default Shop;