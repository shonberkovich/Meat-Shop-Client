import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCartIcon from "./ShoppingCartIcon";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import './NavbarLayout.css';

function NavbarLayout({ children }) {
    const { selectedProducts } = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "active-link" : "";

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div
                        className="navbar-brand order-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Logo
                    </div>
                    <div className="d-flex justify-content-center flex-grow-1 order-2">
                        <span
                            className={`nav-link mx-3 ${isActive("/")}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </span>
                        <span
                            className={`nav-link mx-3 ${isActive("/about")}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/about")}
                        >
                            About
                        </span>
                        <span
                            className={`nav-link mx-3 ${isActive("/contact")}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/contact")}
                        >
                            Contact
                        </span>
                    </div>
                    <div className="order-1 shopping-cart-icon-container">
                        <ShoppingCartIcon count={selectedProducts.length} />
                    </div>
                </div>
            </nav>

            <div className="container mt-4">{children}</div>
        </div>
    );
}

export default NavbarLayout;
